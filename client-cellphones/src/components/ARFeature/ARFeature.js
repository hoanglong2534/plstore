import React from 'react';
import { Link } from 'react-router-dom';
import './ARFeature.css';

const ARFeature = () => {
    return (
        <section className="ar-feature-section">
            <div className="container">                <div className="ar-feature-content">
                    <div className="ar-feature-text">
                        <h2>📱 Trải nghiệm mới: Xem sản phẩm 3D tương tác</h2>
                        <p>
                            Khám phá công nghệ 3D tương tác để xem chi tiết sản phẩm 
                            một cách sống động và chân thực nhất, có thể xoay, phóng to, thu nhỏ tùy ý.
                        </p>
                        <div className="ar-features-list">
                            <div className="feature-item">
                                <span className="feature-icon">🔄</span>
                                <div>
                                    <strong>Xoay 360°:</strong>
                                    <span className='blackText'> Xem sản phẩm từ mọi góc độ</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🔍</span>
                                <div>
                                    <strong>Phóng to/Thu nhỏ:</strong> 
                                    <span className='blackText'> Xem chi tiết từng bộ phận</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">💡</span>
                                <div>
                                    <strong>Tương tác:</strong> 
                                    <span className='blackText'> Điều khiển dễ dàng bằng chuột/chạm</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/model-viewer" className="ar-cta-button">
                            Xem 3D ngay
                        </Link>
                    </div>
                    <div className="ar-feature-visual">
                        <div className="ar-demo-card">
                            <div className="demo-phone">
                                <div className="phone-screen">
                                    <div className="ar-overlay">
                                        <div className="ar-object"></div>
                                        <div className="ar-particles">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="demo-text">
                                <p>Hướng camera vào marker để xem magic! ✨</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ARFeature;
