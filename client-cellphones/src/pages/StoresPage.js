import React, { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './StoresPage.css';
import ImageWithFallback from '../components/ImageWithFallback';

function StoresPage() {
    const [selectedCity, setSelectedCity] = useState('all');

    const cities = [
        { id: 'all', name: 'Tất Cả' },
        { id: 'hanoi', name: 'Hà Nội' },
        { id: 'haiphong', name: 'Hải Phòng' }
    ];

    const stores = [
        {
            id: 3,
            name: 'PL Store Ba Đình',
            address: '789 Láng Hạ, Ba Đình, Hà Nội',
            phone: '024.71.087.088',
            hours: '8:00 - 22:00',
            city: 'hanoi',
            services: ['Bán hàng', 'Bảo hành', 'Sửa chữa', 'Đổi trả'],
            features: ['Parking', 'WiFi', 'ATM'],
            rating: 4.7,
            reviews: 1100,
            image: 'https://cdn.tgdd.vn/Files/2021/10/16/1390930/topzoneeee-1_1280x720-800-resize.jpg',
            isMain: true
        },
        {
            id: 4,
            name: 'PL Store Cầu Giấy',
            address: '321 Cầu Giấy, Cầu Giấy, Hà Nội',
            phone: '024.71.087.089',
            hours: '8:00 - 22:00',
            city: 'hanoi',
            services: ['Bán hàng', 'Bảo hành', 'Sửa chữa'],
            features: ['Parking', 'WiFi'],
            rating: 4.5,
            reviews: 750,
            image: 'https://www.noithatmasta.com/uploaded/Thiet-ke-cua-hang-dien-thoai-apple-store-dep-2.jpg', 
            isMain: false
        },
        {
            id: 5,
            name: 'PL Store Lê Chân',
            address: '12 Trần Nguyên Hãn, Lê Chân, Hải Phòng',
            phone: '0225.71.087.088',
            hours: '8:00 - 22:00',
            city: 'haiphong',
            services: ['Bán hàng', 'Bảo hành', 'Sửa chữa'],
            features: ['Parking', 'WiFi'],
            rating: 4.6,
            reviews: 650,
            image: 'https://pendecor.vn/uploads/files/2018/12/05/Thiet-ke-cua-hang-dien-thoai-1-.png', 
            isMain: true
        }
    ];

    const filteredStores = selectedCity === 'all' 
        ? stores 
        : stores.filter(store => store.city === selectedCity);

    const mainStores = stores.filter(store => store.isMain);

    const getMapsUrl = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const getTelUrl = (phone) => `tel:${phone.replace(/\D/g, '')}`;

    return (
        <div className="stores-page">
            <Header />
            
            {/* Hero Section */}
            <section className="stores-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Hệ Thống Cửa Hàng</h1>
                        <p className="hero-subtitle">
                            Tìm cửa hàng PL Store gần nhất và trải nghiệm dịch vụ tốt nhất
                        </p>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Cửa Hàng</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">20+</span>
                                <span className="stat-label">Tỉnh Thành</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">24/7</span>
                                <span className="stat-label">Hỗ Trợ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Stores */}
            <section className="main-stores">
                <div className="container">
                    <h2 className="section-title">Cửa Hàng Chính</h2>
                    <div className="main-stores-grid">
                        {mainStores.map(store => (
                            <div key={store.id} className="main-store-card">
                                <div className="store-image">
                                    <ImageWithFallback src={store.image} alt={store.name} />
                                    <div className="main-badge">Cửa Hàng Chính</div>
                                </div>
                                <div className="store-content">
                                    <h3 className="store-name">{store.name}</h3>
                                    <p className="store-address">📍 {store.address}</p>
                                    <p className="store-phone">📞 {store.phone}</p>
                                    <p className="store-hours">🕒 {store.hours}</p>
                                    
                                    <div className="store-rating">
                                        <div className="stars">
                                            {'★'.repeat(Math.floor(store.rating))}
                                            {'☆'.repeat(5 - Math.floor(store.rating))}
                                        </div>
                                        <span className="rating-text">{store.rating} ({store.reviews} đánh giá)</span>
                                    </div>

                                    <div className="store-services">
                                        <h4>Dịch vụ:</h4>
                                        <div className="services-list">
                                            {store.services.map((service, index) => (
                                                <span key={index} className="service-tag">{service}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="store-features">
                                        <h4>Tiện ích:</h4>
                                        <div className="features-list">
                                            {store.features.map((feature, index) => (
                                                <span key={index} className="feature-tag">{feature}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="store-actions">
                                        <a className="directions-btn" href={getMapsUrl(store.address)} target="_blank" rel="noreferrer">Chỉ Đường</a>
                                        <a className="call-btn" href={getTelUrl(store.phone)}>Gọi Ngay</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Stores */}
            <section className="all-stores">
                <div className="container">
                    <div className="stores-header">
                        <h2 className="section-title">Tất Cả Cửa Hàng</h2>
                        
                        {/* City Filter */}
                        <div className="city-filter">
                            {cities.map(city => (
                                <button
                                    key={city.id}
                                    className={`filter-btn ${selectedCity === city.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCity(city.id)}
                                >
                                    {city.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="stores-grid">
                        {filteredStores.map(store => (
                            <div key={store.id} className="store-card">
                                <div className="store-image">
                                    <ImageWithFallback src={store.image} alt={store.name} />
                                </div>
                                <div className="store-content">
                                    <h3 className="store-name">{store.name}</h3>
                                    <p className="store-address">📍 {store.address}</p>
                                    <p className="store-phone">📞 {store.phone}</p>
                                    <p className="store-hours">🕒 {store.hours}</p>
                                    
                                    <div className="store-rating">
                                        <div className="stars">
                                            {'★'.repeat(Math.floor(store.rating))}
                                            {'☆'.repeat(5 - Math.floor(store.rating))}
                                        </div>
                                        <span className="rating-text">{store.rating}</span>
                                    </div>

                                    <div className="store-services">
                                        <div className="services-list">
                                            {store.services.map((service, index) => (
                                                <span key={index} className="service-tag">{service}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="store-actions">
                                        <a className="directions-btn" href={getMapsUrl(store.address)} target="_blank" rel="noreferrer">Chỉ Đường</a>
                                        <a className="call-btn" href={getTelUrl(store.phone)}>Gọi</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Store Services */}
            <section className="store-services-section">
                <div className="container">
                    <h2 className="section-title">Dịch Vụ Tại Cửa Hàng</h2>
                    <div className="services-grid">
                        <div className="service-item">
                            <div className="service-icon">🛒</div>
                            <h3>Bán Hàng</h3>
                            <p>Đa dạng sản phẩm điện thoại, phụ kiện với giá tốt nhất</p>
                        </div>
                        <div className="service-item">
                            <div className="service-icon">🔧</div>
                            <h3>Sửa Chữa</h3>
                            <p>Đội ngũ kỹ thuật viên chuyên nghiệp, sửa chữa nhanh chóng</p>
                        </div>
                        <div className="service-item">
                            <div className="service-icon">🛡️</div>
                            <h3>Bảo Hành</h3>
                            <p>Bảo hành chính hãng, hỗ trợ tận tình</p>
                        </div>
                        <div className="service-item">
                            <div className="service-icon">🔄</div>
                            <h3>Đổi Trả</h3>
                            <p>Chính sách đổi trả linh hoạt trong 30 ngày</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="contact-info">
                <div className="container">
                    <h2 className="section-title">Liên Hệ Hỗ Trợ</h2>
                    <div className="contact-grid">
                        <div className="contact-item">
                            <div className="contact-icon">📞</div>
                            <h3>Hotline</h3>
                            <p>028.71.087.088</p>
                            <span>Hỗ trợ 24/7</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">💬</div>
                            <h3>Chat Online</h3>
                            <p>Live Chat</p>
                            <span>Phản hồi nhanh</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">📧</div>
                            <h3>Email</h3>
                            <p>support@plstore.vn</p>
                            <span>Phản hồi trong 24h</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default StoresPage;
