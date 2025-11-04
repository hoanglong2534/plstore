import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ImageWithFallback from '../components/ImageWithFallback';
import { mockProductsWithAR } from '../data/mockARProducts';
import './ARPage.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelViewerPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(mockProductsWithAR[0]);
    const [autoRotate, setAutoRotate] = useState(true);
    const [loading, setLoading] = useState(false);
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);
    const modelRef = useRef(null);

    // Initialize Three.js scene
    useEffect(() => {
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 5);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-5, 5, -5);
        scene.add(pointLight);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 2;
        controlsRef.current = controls;

        // Grid Helper
        const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0xcccccc);
        scene.add(gridHelper);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!mountRef.current) return;
            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [autoRotate]);

    // Load model when product changes
    useEffect(() => {
        if (!sceneRef.current) return;

        setLoading(true);

        // Remove old model
        if (modelRef.current) {
            sceneRef.current.remove(modelRef.current);
        }

        const loader = new GLTFLoader();
        const modelUrl = selectedProduct.arModel || `http://localhost:4000/models/${selectedProduct.id}.glb`;

        loader.load(
            modelUrl,
            (gltf) => {
                const model = gltf.scene;

                // Center and scale model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3 / maxDim;
                model.scale.multiplyScalar(scale);

                model.position.x = -center.x * scale;
                model.position.y = -center.y * scale;
                model.position.z = -center.z * scale;

                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                sceneRef.current.add(model);
                modelRef.current = model;
                setLoading(false);
            },
            (progress) => {
                console.log('Loading:', (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('Error loading model:', error);
                setLoading(false);
                // Load a default cube if model fails
                const geometry = new THREE.BoxGeometry(2, 2, 2);
                const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
                const cube = new THREE.Mesh(geometry, material);
                sceneRef.current.add(cube);
                modelRef.current = cube;
            }
        );
    }, [selectedProduct]);
    const resetCamera = () => {
        if (cameraRef.current && controlsRef.current) {
            cameraRef.current.position.set(0, 0, 5);
            controlsRef.current.reset();
        }
    };

    const toggleAutoRotate = () => {
        setAutoRotate(!autoRotate);
        if (controlsRef.current) {
            controlsRef.current.autoRotate = !autoRotate;
        }
    };

    return (
        <div className="ar-page">
            <Header />
            
            <div className="ar-page-header">
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div>
                        <h1>📱 Xem Model 3D (Three.js)</h1>
                        <p>Khám phá sản phẩm với công nghệ 3D tương tác sử dụng Three.js</p>
                    </div>
                    <div>
                        <Link to="/" className="btn btn-secondary">← Về trang chủ</Link>
                    </div>
                </div>
            </div>

            {/* Product Selection */}
            <div className="product-selection">
                <div className="container">
                    <h2>Chọn sản phẩm để xem 3D:</h2>
                    <div className="product-cards">
                        {mockProductsWithAR.map(product => (
                            <div 
                                key={product.id}
                                className={`product-card ${selectedProduct.id === product.id ? 'active' : ''}`}
                                onClick={() => setSelectedProduct(product)}
                            >
                                <ImageWithFallback src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.price.toLocaleString('vi-VN')}₫</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Three.js 3D Viewer */}
            <div className="model-viewer-section">
                <div className="container">
                    <div style={{ position: 'relative' }}>
                        <div 
                            ref={mountRef}
                            style={{
                                width: '100%',
                                height: '600px',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                position: 'relative'
                            }}
                        />
                        
                        {loading && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'rgba(255, 255, 255, 0.9)',
                                padding: '20px 40px',
                                borderRadius: '10px',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}>
                                🔄 Đang tải model...
                            </div>
                        )}

                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(255, 255, 255, 0.95)',
                            padding: '15px 25px',
                            borderRadius: '30px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            display: 'flex',
                            gap: '10px',
                            zIndex: 10
                        }}>
                            <button 
                                onClick={resetCamera}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '20px',
                                    background: '#007bff',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'all 0.3s'
                                }}
                                onMouseOver={(e) => e.target.style.background = '#0056b3'}
                                onMouseOut={(e) => e.target.style.background = '#007bff'}
                            >
                                🔄 Reset Camera
                            </button>
                            <button 
                                onClick={toggleAutoRotate}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '20px',
                                    background: autoRotate ? '#28a745' : '#6c757d',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'all 0.3s'
                                }}
                                onMouseOver={(e) => e.target.style.background = autoRotate ? '#218838' : '#5a6268'}
                                onMouseOut={(e) => e.target.style.background = autoRotate ? '#28a745' : '#6c757d'}
                            >
                                {autoRotate ? '⏸️ Dừng Xoay' : '▶️ Tự Xoay'}
                            </button>
                        </div>
                    </div>
                    
                    <div style={{
                        marginTop: '30px',
                        padding: '30px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '15px',
                        color: 'white'
                    }}>
                        <h2 style={{ marginTop: 0 }}>{selectedProduct.name}</h2>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>
                            {selectedProduct.price.toLocaleString('vi-VN')}₫
                        </p>
                        <p style={{ marginTop: '15px', lineHeight: '1.8', opacity: 0.9 }}>
                            {selectedProduct.description || 'Sản phẩm chất lượng cao với thiết kế hiện đại và tính năng vượt trội.'}
                        </p>
                        
                        <div style={{ 
                            marginTop: '25px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            padding: '20px',
                            borderRadius: '10px'
                        }}>
                            <h3 style={{ marginTop: 0 }}>🎮 Hướng dẫn điều khiển:</h3>
                            <ul style={{ lineHeight: '2', paddingLeft: '20px' }}>
                                <li><strong>Xoay:</strong> Click chuột trái và kéo</li>
                                <li><strong>Zoom:</strong> Cuộn chuột lên/xuống</li>
                                <li><strong>Di chuyển:</strong> Click chuột phải và kéo</li>
                                <li><strong>Mobile:</strong> Chạm và kéo để xoay, pinch để zoom</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ModelViewerPage;
