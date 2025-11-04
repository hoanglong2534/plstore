import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function SpinningBox(props) {
    const meshRef = useRef();
    useFrame((_state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5;
            meshRef.current.rotation.y += delta * 0.8;
        }
    });
    return (
        <mesh ref={meshRef} {...props}>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial color="#4CC3D9" />
        </mesh>
    );
}

function ProductModel({ url, scale = 0.5 }) {
    const groupRef = useRef();
    const [sceneObj, setSceneObj] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const mod = await import('three/examples/jsm/loaders/GLTFLoader.js');
                const GLTFLoader = mod.GLTFLoader || mod.default;
                const loader = new GLTFLoader();
                loader.load(
                    url,
                    (gltf) => {
                        if (cancelled) return;
                        const obj = gltf.scene || gltf.scenes?.[0];
                        if (!obj) {
                            setError('Không thể đọc model');
                            return;
                        }
                        // Center and scale roughly
                        const bbox = new THREE.Box3().setFromObject(obj);
                        const size = new THREE.Vector3();
                        bbox.getSize(size);
                        const maxDim = Math.max(size.x, size.y, size.z) || 1;
                        const desired = scale; // meters
                        const s = desired / maxDim;
                        obj.scale.setScalar(s);
                        const center = new THREE.Vector3();
                        bbox.getCenter(center);
                        obj.position.sub(center.multiplyScalar(s));
                        setSceneObj(obj);
                    },
                    undefined,
                    () => {
                        if (!cancelled) setError('Lỗi khi tải model');
                    }
                );
            } catch (e) {
                if (!cancelled) setError('Không tải được GLTFLoader');
            }
        }
        if (url) load();
        return () => { cancelled = true; };
    }, [url, scale]);

    if (error) return null;
    if (!sceneObj) return null;
    return <primitive object={sceneObj} />;
}

export default function R3FXRViewer({ modelUrl }) {
    const [gl, setGl] = useState(null);
    const [arSupported, setArSupported] = useState(false);
    const [vrSupported, setVrSupported] = useState(false);
    const [isPresenting, setIsPresenting] = useState(false);
    const modelGroupRef = useRef(null);

    useEffect(() => {
        if (!gl) return;
        gl.xr.enabled = true;
        const onSessionStart = () => setIsPresenting(true);
        const onSessionEnd = () => setIsPresenting(false);
        gl.xr.addEventListener('sessionstart', onSessionStart);
        gl.xr.addEventListener('sessionend', onSessionEnd);
        return () => {
            gl.xr.removeEventListener('sessionstart', onSessionStart);
            gl.xr.removeEventListener('sessionend', onSessionEnd);
        };
    }, [gl]);

    useEffect(() => {
        // WebXR feature detection
        let cancelled = false;
        async function checkSupport() {
            try {
                if (navigator.xr && navigator.xr.isSessionSupported) {
                    const [arOK, vrOK] = await Promise.all([
                        navigator.xr.isSessionSupported('immersive-ar').catch(() => false),
                        navigator.xr.isSessionSupported('immersive-vr').catch(() => false)
                    ]);
                    if (!cancelled) {
                        setArSupported(Boolean(arOK));
                        setVrSupported(Boolean(vrOK));
                    }
                }
            } catch (_) {}
        }
        checkSupport();
        return () => { cancelled = true; };
    }, []);

    async function enterAR() {
        if (!gl || !navigator.xr) return;
        try {
            const session = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['local-floor']
            });
            await gl.xr.setSession(session);
            // Tap to place: set model in front of camera on select
            const onSelect = () => {
                try {
                    const renderer = gl;
                    const xrCam = renderer.xr.getCamera();
                    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(xrCam.quaternion);
                    const pos = new THREE.Vector3().setFromMatrixPosition(xrCam.matrixWorld).add(dir.multiplyScalar(0.6));
                    if (modelGroupRef.current) {
                        modelGroupRef.current.position.copy(pos);
                    }
                } catch {}
            };
            session.addEventListener('select', onSelect);
            session.addEventListener('end', () => {
                try { session.removeEventListener('select', onSelect); } catch {}
            });
        } catch (e) {
            // no-op
        }
    }

    async function enterVR() {
        if (!gl || !navigator.xr) return;
        try {
            const session = await navigator.xr.requestSession('immersive-vr', {
                optionalFeatures: ['local-floor']
            });
            await gl.xr.setSession(session);
        } catch (e) {
            // no-op
        }
    }

    async function exitXR() {
        try {
            const session = gl?.xr?.getSession();
            if (session) await session.end();
        } catch {}
    }

    function placeInFront() {
        try {
            if (!gl) return;
            const xrCam = gl.xr.getCamera();
            const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(xrCam.quaternion);
            const pos = new THREE.Vector3().setFromMatrixPosition(xrCam.matrixWorld).add(dir.multiplyScalar(0.6));
            if (modelGroupRef.current) {
                modelGroupRef.current.position.copy(pos);
            }
        } catch {}
    }

    return (
        <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
                <button onClick={enterAR} disabled={!arSupported || !gl} className="btn btn-primary">ENTER AR</button>
                <button onClick={enterVR} disabled={!vrSupported || !gl} className="btn btn-secondary">ENTER VR</button>
            </div>

            <div style={{ width: '100%', height: 420, borderRadius: 12, overflow: 'hidden', border: '1px solid #333', position: 'relative' }}>
                <Canvas onCreated={({ gl: renderer, scene, camera }) => {
                    // Match device pixel ratio for clarity
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    renderer.outputEncoding = THREE.sRGBEncoding;
                    setGl(renderer);
                    // Initial camera position
                    camera.position.set(0, 0.25, 1.2);
                }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[1, 1, 1]} intensity={0.8} />

                    {/* Ground (only visible in VR/desktop) */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                        <planeGeometry args={[10, 10]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>

                    {modelUrl ? (
                        <group ref={modelGroupRef} position={[0, 0.1, 0]}>
                            <ProductModel url={modelUrl} scale={0.4} />
                        </group>
                    ) : (
                        <SpinningBox position={[0, 0, 0]} />
                    )}
                </Canvas>

                {isPresenting && (
                    <div style={{ position: 'absolute', top: 8, left: 8, right: 8, display: 'flex', gap: 8, justifyContent: 'space-between', pointerEvents: 'auto' }}>
                        <div style={{ display: 'grid', gap: 8, gridAutoFlow: 'column' }}>
                            <button onClick={placeInFront} className="btn btn-primary">Đặt trước mặt</button>
                        </div>
                        <button onClick={exitXR} className="btn btn-secondary">Thoát AR/VR</button>
                    </div>
                )}
            </div>

            <p style={{ fontSize: 14, color: '#888', margin: 0 }}>
                Gợi ý: "ENTER AR" cần thiết bị hỗ trợ WebXR (Chrome Android). "ENTER VR" cần trình duyệt/thiết bị hỗ trợ VR.
            </p>
        </div>
    );
}


