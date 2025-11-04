import React from 'react';

// Simple fallback phone model (will be replaced with real GLB model later)
const PhoneModel = ({ modelPath, color = '#333333', scale = 1 }) => {
    return (
        <group scale={scale}>
            {/* Body điện thoại */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1, 2, 0.2]} />
                <meshStandardMaterial 
                    color={color} 
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>

            {/* Màn hình */}
            <mesh position={[0, 0, 0.11]} castShadow receiveShadow>
                <boxGeometry args={[0.9, 1.8, 0.01]} />
                <meshStandardMaterial 
                    color="#111111" 
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Camera */}
            <mesh position={[0, 0.8, 0.12]}>
                <circleGeometry args={[0.05, 32]} />
                <meshStandardMaterial color="#000000" />
            </mesh>

            {/* Nút nguồn */}
            <mesh position={[0.52, 0.3, 0]}>
                <boxGeometry args={[0.05, 0.2, 0.05]} />
                <meshStandardMaterial color={color} metalness={0.8} />
            </mesh>
        </group>
    );
};

export default PhoneModel;
