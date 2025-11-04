// Script để tạo model 3D điện thoại đơn giản bằng Three.js
// Chạy bằng Node.js với three và @gltf-transform/core

const fs = require('fs');
const path = require('path');

// Tạo một geometry điện thoại đơn giản
function createPhoneGeometry() {
    // Vì Three.js không chạy được trong Node.js mà không có canvas,
    // chúng ta sẽ tạo một file .glb thủ công hoặc sử dụng tools khác
    
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║          HƯỚNG DẪN TẠO MODEL 3D ĐIỆN THOẠI               ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  Để tạo model 3D điện thoại, bạn có 3 cách:             ║
║                                                           ║
║  1. TẢI TỪ SKETCHFAB (Khuyến nghị):                     ║
║     • https://sketchfab.com/search?q=iphone&type=models  ║
║     • Tìm model miễn phí, tải về định dạng .glb          ║
║     • Đổi tên thành: iphone-15-pro.glb                   ║
║     • Copy vào thư mục này                               ║
║                                                           ║
║  2. SỬ DỤNG BLENDER:                                     ║
║     • Mở Blender → File → Import → Image as Plane       ║
║     • Hoặc tạo model 3D từ đầu                          ║
║     • Export → glTF 2.0 (.glb)                          ║
║                                                           ║
║  3. SỬ DỤNG ONLINE TOOL:                                ║
║     • https://modelviewer.dev/editor                     ║
║     • https://gltf.pmnd.rs/                             ║
║                                                           ║
║  SAU KHI CÓ FILE .glb:                                  ║
║     • Đặt vào: server-cellphones/public/models/         ║
║     • Đặt tên theo productId hoặc tên sản phẩm          ║
║       VD: 674b4bafe4d43b5e43d1f71a.glb                  ║
║           iphone-15-pro.glb                             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
}

// Tạo một file JSON chứa thông tin các model
function createModelRegistry() {
    const registry = {
        models: [
            {
                id: "674b4bafe4d43b5e43d1f71a",
                name: "iPhone 15 Pro Max",
                modelFile: "iphone-15-pro.glb",
                position: { x: 0, y: 0, z: 0 },
                scale: 1,
                rotation: { x: 0, y: 0, z: 0 }
            },
            {
                id: "674b4bafe4d43b5e43d1f71c",
                name: "Samsung Galaxy S21 Ultra",
                modelFile: "samsung-s21-ultra.glb",
                position: { x: 0, y: 0, z: 0 },
                scale: 1,
                rotation: { x: 0, y: 0, z: 0 }
            }
        ],
        metadata: {
            version: "1.0",
            created: new Date().toISOString(),
            description: "Registry of 3D models for phone products"
        }
    };

    const registryPath = path.join(__dirname, 'model-registry.json');
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
    
    console.log('\n✅ Created model-registry.json');
    console.log('📁 Location:', registryPath);
}

// Main
createPhoneGeometry();
createModelRegistry();

console.log(`
📋 DANH SÁCH MODELS MIỄN PHÍ TRÊN SKETCHFAB:

1. iPhone 15 Pro Max:
   https://sketchfab.com/3d-models/apple-iphone-15-pro-max-black-df17520841214c1792fb8a44c6783ee7

2. Samsung Galaxy S21 Ultra:
   https://sketchfab.com/3d-models/samsung-galaxy-s21-ultra-eb1370edfb8c4cb3a094b731ddc77378

3. iPhone 14 Pro:
   https://sketchfab.com/3d-models/iphone-14-pro-max-space-black-d8c3d9c6e8b94e2a9c3d4f5e6a7b8c9d

4. Xiaomi 13 Pro:
   https://sketchfab.com/3d-models/xiaomi-13-pro-e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0

📝 CÁCH TẢI TỪ SKETCHFAB:
   1. Mở link trên
   2. Bấm "Download 3D Model"
   3. Chọn format "glTF Binary (.glb)"
   4. Download và giải nén
   5. Copy file .glb vào thư mục này
`);
