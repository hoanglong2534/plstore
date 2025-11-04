import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
// import R3FXRViewer from '../components/ARViewer/R3FXRViewer'; // Disabled - using 3D Viewer instead
import { mockProductsWithAR } from '../data/mockARProducts';

export default function ARWebXRPage() {
    const sampleProducts = mockProductsWithAR;
    const [selectedProduct, setSelectedProduct] = React.useState(sampleProducts[0]);

    return (
        <div className="ar-page">
            <Header />

            <div className="ar-page-header">
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div>
                        <h1>🚀 Trải nghiệm WebXR (Three.js + React Three Fiber)</h1>
                        <p>Phiên bản AR/VR cơ bản sử dụng WebXR, hỗ trợ thiết bị hiện đại</p>
                    </div>
                    <div style={{ display: 'grid', gap: 8, gridAutoFlow: 'column' }}>
                        <Link to="/ar-experience" className="btn btn-secondary">← Trình AR/VR cũ</Link>
                        <Link to="/" className="btn btn-secondary">Trang chủ</Link>
                    </div>
                </div>
            </div>

            <div className="product-selection">
                <div className="container">
                    <h2>Chọn sản phẩm:</h2>
                    <div className="product-cards">
                        {sampleProducts.map(product => (
                            <div
                                key={product.id}
                                className={`product-card ${selectedProduct.id === product.id ? 'active' : ''}`}
                                onClick={() => setSelectedProduct(product)}
                            >
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.price.toLocaleString('vi-VN')}₫</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>            <div className="ar-viewer-section">
                <div className="container">
                    {/* <R3FXRViewer modelUrl={selectedProduct?.modelUrl || 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'} /> */}
                    <div style={{ padding: '40px', textAlign: 'center', background: '#f0f0f0', borderRadius: '10px' }}>
                        <h2>🚧 Tính năng AR/VR đã được thay thế bằng 3D Viewer</h2>
                        <p>Vui lòng truy cập trang chi tiết sản phẩm để xem model 3D</p>
                        <Link to="/product" className="btn btn-primary" style={{ marginTop: '20px' }}>
                            Xem sản phẩm
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}


