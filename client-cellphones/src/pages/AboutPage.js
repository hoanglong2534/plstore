import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './AboutPage.css';
import ImageWithFallback from '../components/ImageWithFallback';

function AboutPage() {
    return (
        <div className="about-page">
            <Header />
            
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Về Chúng Tôi</h1>
                        <p className="hero-subtitle">
                            PL Store - Điểm đến tin cậy cho mọi nhu cầu công nghệ
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Story */}
            <section className="company-story">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content">
                            <h2>Câu Chuyện Của Chúng Tôi</h2>
                            <p>
                                Được thành lập vào năm 2010, PL Store đã trở thành một trong những 
                                nhà bán lẻ điện thoại và thiết bị công nghệ hàng đầu tại Việt Nam. 
                                Với hơn 13 năm kinh nghiệm, chúng tôi tự hào mang đến cho khách hàng 
                                những sản phẩm chất lượng cao với giá cả cạnh tranh.
                            </p>
                            <p>
                                Từ một cửa hàng nhỏ ở Hà Nội, PL Store đã mở rộng thành hệ thống 
                                với hơn 50 cửa hàng trên toàn quốc và trang web thương mại điện tử 
                                phục vụ hàng triệu khách hàng mỗi năm.
                            </p>
                        </div>
                        <div className="story-image">
                            <ImageWithFallback src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop" alt="Cửa hàng đầu tiên tại Hà Nội" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission-vision">
                <div className="container">
                    <div className="mv-grid">
                        <div className="mv-card">
                            <div className="mv-icon">🎯</div>
                            <h3>Sứ Mệnh</h3>
                            <p>
                                Mang công nghệ đến gần hơn với mọi người, cung cấp những sản phẩm 
                                chất lượng cao với dịch vụ khách hàng xuất sắc và giá cả hợp lý.
                            </p>
                        </div>
                        <div className="mv-card">
                            <div className="mv-icon">👁️</div>
                            <h3>Tầm Nhìn</h3>
                            <p>
                                Trở thành nhà bán lẻ công nghệ số 1 Việt Nam, được tin tưởng 
                                bởi hàng triệu khách hàng và là đối tác chiến lược của các thương hiệu lớn.
                            </p>
                        </div>
                        <div className="mv-card">
                            <div className="mv-icon">💎</div>
                            <h3>Giá Trị Cốt Lõi</h3>
                            <p>
                                Chất lượng, uy tín, sáng tạo và phục vụ khách hàng tận tâm. 
                                Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="statistics">
                <div className="container">
                    <h2 className="section-title">Thành Tựu Của Chúng Tôi</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Cửa Hàng</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">2M+</div>
                            <div className="stat-label">Khách Hàng</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">13+</div>
                            <div className="stat-label">Năm Kinh Nghiệm</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">99%</div>
                            <div className="stat-label">Hài Lòng</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="team-section">
                <div className="container">
                    <h2 className="section-title">Đội Ngũ Của Chúng Tôi</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-avatar">👨‍💼</div>
                            <h4>Nguyễn Văn A</h4>
                            <p>CEO & Founder</p>
                            <span>15 năm kinh nghiệm trong ngành công nghệ</span>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">👩‍💼</div>
                            <h4>Trần Thị B</h4>
                            <p>CTO</p>
                            <span>Chuyên gia về công nghệ và đổi mới</span>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">👨‍💻</div>
                            <h4>Lê Văn C</h4>
                            <p>Head of Sales</p>
                            <span>Dẫn đầu đội ngũ bán hàng xuất sắc</span>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">👩‍🎨</div>
                            <h4>Phạm Thị D</h4>
                            <p>Marketing Director</p>
                            <span>Sáng tạo và chiến lược marketing</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="contact-info">
                <div className="container">
                    <h2 className="section-title">Liên Hệ Với Chúng Tôi</h2>
                    <div className="contact-grid">
                        <div className="contact-item">
                            <div className="contact-icon">📞</div>
                            <h4>Hotline</h4>
                            <p>028.71.087.088</p>
                            <span>07:00 - 21:00 hàng ngày</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">📧</div>
                            <h4>Email</h4>
                            <p><a href="mailto:support@plstore.vn">support@plstore.vn</a></p>
                            <span>Phản hồi trong 24h</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">📍</div>
                            <h4>Địa Chỉ</h4>
                            <p>01 Duy Tân, Cầu Giấy, Hà Nội</p>
                            <span>Trụ sở chính</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default AboutPage;
