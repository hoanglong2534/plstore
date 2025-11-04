import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './ThreeDViewer.css';

const ThreeDViewer = ({ product }) => {
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !product) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 5);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 0.5);
        pointLight1.position.set(-5, 5, -5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.3);
        pointLight2.position.set(5, 5, 5);
        scene.add(pointLight2);

        // Grid
        const gridHelper = new THREE.GridHelper(10, 10, 0xcccccc, 0xeeeeee);
        scene.add(gridHelper);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2;
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controlsRef.current = controls;

        // Load model
        const modelUrl = product.model3D || 
                        `http://localhost:4000/models/${product._id}.glb` ||
                        `http://localhost:4000/models/${product.name?.toLowerCase().replace(/\s+/g, '-')}.glb`;

        const loader = new GLTFLoader();
        loader.load(
            modelUrl,
            (gltf) => {
                const model = gltf.scene;
                
                // Center and scale model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim;
                model.scale.multiplyScalar(scale);
                
                model.position.sub(center.multiplyScalar(scale));
                model.position.y = 0;
                
                // Enable shadows
                model.traverse((node) => {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                
                scene.add(model);
                setLoading(false);
            },
            (progress) => {
                // Loading progress
                const percent = (progress.loaded / progress.total) * 100;
                console.log(`Loading: ${percent.toFixed(2)}%`);
            },
            (err) => {
                console.error('Error loading model:', err);
                setError(true);
                setLoading(false);
                
                // Fallback: create a simple phone-like box
                const geometry = new THREE.BoxGeometry(0.5, 1, 0.1);
                const material = new THREE.MeshStandardMaterial({ 
                    color: 0x1a1a1a,
                    metalness: 0.8,
                    roughness: 0.2
                });
                const cube = new THREE.Mesh(geometry, material);
                cube.castShadow = true;
                cube.receiveShadow = true;
                scene.add(cube);
            }
        );

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        };
    }, [product]);

    if (!product) return null;

    return (
        <div className="threed-viewer-wrapper">
            <div className="threed-viewer-header">
                <h2>📱 Xem sản phẩm 3D</h2>
                <p>Kéo để xoay • Cuộn để zoom • Tự động xoay</p>
            </div>
            
            <div className="threed-viewer-container" ref={containerRef}>
                {loading && !error && (
                    <div className="threed-loading">
                        <div className="loading-spinner"></div>
                        <p>Đang tải model 3D...</p>
                    </div>
                )}
                
                {error && (
                    <div className="threed-error">
                        <p>⚠️ Model 3D chưa có sẵn</p>
                        <small>Hiển thị model mặc định</small>
                    </div>
                )}
            </div>
            
            <div className="threed-viewer-info">
                <div className="control-hint">
                    <span>🖱️ Kéo để xoay</span>
                    <span>🔍 Cuộn để zoom</span>
                    <span>🔄 Tự động xoay</span>
                </div>
            </div>
        </div>
    );
};

export default ThreeDViewer;
