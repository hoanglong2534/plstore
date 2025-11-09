# ✅ TEST CHECKLIST - 3D MODEL VIEWER

## 📋 KIỂM TRA TRƯỚC KHI CHẠY

### 1. Dependencies
- [ ] Three.js đã cài: `npm list three` → v0.140.0 ✅
- [ ] Không có @react-three/fiber ✅
- [ ] Không có @react-three/drei ✅

### 2. Files tồn tại
- [ ] `client-cellphones/src/components/ThreeDViewer/ThreeDViewer.js` ✅
- [ ] `client-cellphones/src/components/ThreeDViewer/ThreeDViewer.css` ✅
- [ ] `client-cellphones/src/pages/ModelViewerPage.js` ✅
- [ ] `server-cellphones/public/models/` directory ✅

### 3. Code không có lỗi
- [ ] `App.js` - No errors ✅
- [ ] `ThreeDViewer.js` - No errors ✅
- [ ] `Detail.js` - No errors ✅
- [ ] `Header.js` - No errors ✅

---

## 🚀 TEST STEPS

### A. Khởi động Server (Terminal 1)
```powershell
cd server-cellphones
npm start
```

**✅ Kiểm tra:**
- [ ] Server chạy tại `http://localhost:4000`
- [ ] Console không có lỗi
- [ ] Thấy message: "Server is running on port 4000"

### B. Khởi động Client (Terminal 2)
```powershell
cd client-cellphones
npm start
```

**✅ Kiểm tra:**
- [ ] Client chạy tại `http://localhost:3000`
- [ ] Browser tự động mở
- [ ] Console không có lỗi
- [ ] Không có warning về React Three Fiber

### C. Test Menu Navigation
1. [ ] Mở http://localhost:3000
2. [ ] Xem Header menu
3. [ ] Thấy "📱 Xem 3D" (không còn "🚀 AR/VR")
4. [ ] Click "📱 Xem 3D"
5. [ ] Redirect tới `/model-viewer`
6. [ ] ModelViewerPage hiển thị

### D. Test trong Detail Page
1. [ ] Quay lại Home
2. [ ] Click vào một sản phẩm bất kỳ
3. [ ] Scroll xuống
4. [ ] Tìm section **"📱 Xem sản phẩm 3D"**
5. [ ] Component ThreeDViewer hiển thị
6. [ ] Thấy:
   - [ ] Header: "📱 Xem sản phẩm 3D"
   - [ ] Subtitle: "Kéo để xoay • Cuộn để zoom • Tự động xoay"
   - [ ] Canvas với background trắng
   - [ ] Grid helper (lưới)
   - [ ] Fallback model (hộp đen) đang xoay

### E. Test Controls
1. [ ] **Kéo chuột** trên model:
   - [ ] Model xoay theo chuột
   - [ ] Smooth, không giật
2. [ ] **Cuộn chuột**:
   - [ ] Zoom in khi cuộn lên
   - [ ] Zoom out khi cuộn xuống
   - [ ] Có giới hạn min/max distance
3. [ ] **Tự động xoay**:
   - [ ] Model tự xoay khi không tương tác
   - [ ] Dừng khi kéo chuột
   - [ ] Tiếp tục xoay khi thả chuột

### F. Test Loading State
1. [ ] Refresh trang
2. [ ] Trong lúc load, thấy:
   - [ ] Loading spinner (circle xoay)
   - [ ] Text: "Đang tải model 3D..."

### G. Test Error/Fallback
1. [ ] Không có file .glb trong `/models/`
2. [ ] Component vẫn hiển thị
3. [ ] Thấy:
   - [ ] Text: "⚠️ Model 3D chưa có sẵn"
   - [ ] "Hiển thị model mặc định"
   - [ ] Model fallback (hộp đen kim loại)

### H. Test Responsive
1. [ ] Resize browser window
2. [ ] Model vẫn hiển thị đúng tỷ lệ
3. [ ] Controls vẫn hoạt động

---

## 🐛 EXPECTED BEHAVIORS

### ✅ ĐÚNG:
- Model tự động xoay
- Kéo chuột để xoay thủ công
- Cuộn để zoom
- Fallback model khi không có file
- Không có nút Reset/Dừng
- Smooth animation
- Responsive

### ❌ SAI (nếu thấy, cần fix):
- "BatchedMesh is not exported" → Cài sai version Three.js
- "Cannot find module @react-three/fiber" → Chưa gỡ package
- Model không hiển thị gì → Kiểm tra Console
- Lag/giật → Giảm shadow quality

---

## 📦 TEST VỚI MODEL THẬT (Optional)

### 1. Download model
```powershell
.\download-models.ps1
```

### 2. Hoặc tải thủ công:
- Mở: https://sketchfab.com/3d-models/apple-iphone-15-pro-max-black-df17520841214c1792fb8a44c6783ee7
- Download format: glTF Binary (.glb)
- Copy vào: `server-cellphones/public/models/iphone-15-pro.glb`

### 3. Update product
Có 2 cách:

**Cách 1: Đặt tên theo productId**
```powershell
# Đổi tên file thành productId
Rename-Item iphone-15-pro.glb 674b4bafe4d43b5e43d1f71a.glb
```

**Cách 2: Update database**
```javascript
// Thêm field model3D vào product
product.model3D = "http://localhost:4000/models/iphone-15-pro.glb"
```

### 4. Test
- [ ] Refresh trang detail
- [ ] Model iPhone thật hiển thị
- [ ] Controls hoạt động bình thường
- [ ] Tự động xoay

---

## 📊 PERFORMANCE CHECK

### Browser DevTools → Performance
1. [ ] Open DevTools (F12)
2. [ ] Tab "Performance"
3. [ ] Record 10 seconds
4. [ ] Stop recording
5. [ ] Kiểm tra:
   - [ ] FPS ≥ 30 (tốt ≥ 60)
   - [ ] No memory leaks
   - [ ] No excessive re-renders

### Browser DevTools → Console
1. [ ] Không có errors (màu đỏ)
2. [ ] Warnings (màu vàng) là OK
3. [ ] Thấy logs:
   - [ ] "Loading: X%" khi load model
   - [ ] "Error loading model" nếu không tìm thấy (expected)

### Network Tab
1. [ ] Request tới `/models/*.glb`
2. [ ] Status: 200 OK (nếu file tồn tại)
3. [ ] Status: 404 Not Found (nếu không có file - expected)

---

## 🎯 SUCCESS CRITERIA

### ✅ Thành công khi:
1. [x] Server chạy không lỗi
2. [x] Client chạy không lỗi
3. [x] Component ThreeDViewer hiển thị
4. [x] Fallback model (hộp đen) tự động xoay
5. [x] Kéo chuột để xoay model
6. [x] Cuộn để zoom
7. [x] Không có nút Reset/Dừng
8. [x] Loading state hiển thị
9. [x] Error state hiển thị khi không có model
10. [x] Responsive design hoạt động

### ⚠️ Bonus (optional):
- [ ] Tải được model thật từ Sketchfab
- [ ] Model thật hiển thị trong viewer
- [ ] Tùy chỉnh lighting/camera
- [ ] Performance tốt (60 FPS)

---

## 🛠️ DEBUGGING

### Nếu có lỗi:

#### 1. Console Errors
```powershell
# Mở DevTools → Console
# Copy error message
# Đọc hướng dẫn trong TROUBLESHOOTING section
```

#### 2. Network Errors
```powershell
# DevTools → Network
# Filter: XHR
# Kiểm tra requests tới /models/
# Status 404 = file không tồn tại (expected)
```

#### 3. Component Errors
```powershell
# Kiểm tra file imports:
Get-Content client-cellphones\src\components\ThreeDViewer\ThreeDViewer.js | Select-String "import"

# Expected:
# import * as THREE from 'three';
# import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
# import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
```

---

## 📝 TEST RESULTS

### Fill this out after testing:

**Date:** _______________  
**Tester:** _______________

**Server:**
- [ ] ✅ Running
- [ ] ❌ Error: _______________

**Client:**
- [ ] ✅ Running
- [ ] ❌ Error: _______________

**3D Viewer:**
- [ ] ✅ Working perfectly
- [ ] ⚠️ Working with minor issues: _______________
- [ ] ❌ Not working: _______________

**Controls:**
- [ ] ✅ Drag to rotate: OK
- [ ] ✅ Scroll to zoom: OK
- [ ] ✅ Auto-rotate: OK

**Models:**
- [ ] ✅ Fallback model: OK
- [ ] ✅ Real model loaded: OK
- [ ] ❌ No models: _______________

**Overall:**
- [ ] ✅ Production ready
- [ ] ⚠️ Needs minor fixes
- [ ] ❌ Needs major fixes

---

## 🎉 COMPLETION

Khi tất cả checkboxes đều ✅:

```
╔═══════════════════════════════════════╗
║  🎉 CONGRATULATIONS! 🎉              ║
║                                       ║
║  3D Model Viewer is working!         ║
║  Ready for production! 🚀            ║
╚═══════════════════════════════════════╝
```

---

**Next:** Tải models từ Sketchfab và enjoy! 📦🎨

---

*Checklist version: 1.0*  
*Last updated: November 3, 2025*
