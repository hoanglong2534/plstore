# Hướng dẫn sử dụng 3D Models

## Thư mục này chứa các file 3D model (.glb hoặc .gltf)

### Cách thêm model:
1. Đặt file model 3D (.glb hoặc .gltf) vào thư mục này
2. Đặt tên file theo ID sản phẩm, ví dụ: `product-123.glb`
3. Model sẽ tự động được serve tại `/models/product-123.glb`

### Định dạng được hỗ trợ:
- **.glb** (khuyên dùng - binary GLTF, nhẹ và nhanh)
- **.gltf** (text-based GLTF)

### Download mẫu 3D models miễn phí:
- Sketchfab: https://sketchfab.com/
- Google Poly Archive: https://poly.pizza/
- TurboSquid Free: https://www.turbosquid.com/Search/3D-Models/free
- Free3D: https://free3d.com/
- CGTrader Free: https://www.cgtrader.com/free-3d-models

### Ví dụ tên file:
```
models/
  ├── iphone-15.glb
  ├── samsung-s24.glb
  ├── xiaomi-14.glb
  └── oppo-reno.glb
```

### Lưu ý:
- Kích thước file nên < 10MB để tải nhanh
- Tối ưu model trước khi upload (giảm polygon, nén texture)
- Sử dụng công cụ như gltf-pipeline để tối ưu: https://github.com/CesiumGS/gltf-pipeline
