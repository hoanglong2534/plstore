import React, { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './CareersPage.css';

function CareersPage() {
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [cvFile, setCvFile] = useState(null);

    const departments = [
        { id: 'all', name: 'Tất Cả' },
        { id: 'tech', name: 'Công Nghệ' },
        { id: 'sales', name: 'Bán Hàng' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'hr', name: 'Nhân Sự' },
        { id: 'finance', name: 'Tài Chính' }
    ];

    const jobOpenings = [
        {
            id: 1,
            title: 'Senior Frontend Developer',
            department: 'tech',
            location: 'Hồ Chí Minh',
            type: 'Full-time',
            experience: '3-5 năm',
            salary: '15-25 triệu',
            description: 'Phát triển giao diện người dùng cho các ứng dụng web và mobile.',
            requirements: [
                'Thành thạo React, Vue.js hoặc Angular',
                'Kinh nghiệm với TypeScript',
                'Hiểu biết về responsive design',
                'Kỹ năng làm việc nhóm tốt'
            ],
            posted: '2 ngày trước',
            urgent: true
        },
        {
            id: 2,
            title: 'Sales Manager',
            department: 'sales',
            location: 'Hà Nội',
            type: 'Full-time',
            experience: '5-7 năm',
            salary: '20-30 triệu',
            description: 'Quản lý đội ngũ bán hàng và phát triển chiến lược kinh doanh.',
            requirements: [
                'Kinh nghiệm quản lý đội ngũ bán hàng',
                'Kỹ năng giao tiếp xuất sắc',
                'Hiểu biết về thị trường điện thoại',
                'Khả năng phân tích dữ liệu'
            ],
            posted: '5 ngày trước',
            urgent: false
        },
        {
            id: 3,
            title: 'Digital Marketing Specialist',
            department: 'marketing',
            location: 'Hồ Chí Minh',
            type: 'Full-time',
            experience: '2-4 năm',
            salary: '12-18 triệu',
            description: 'Phát triển và thực hiện các chiến dịch marketing số.',
            requirements: [
                'Kinh nghiệm với Google Ads, Facebook Ads',
                'Thành thạo SEO/SEM',
                'Kỹ năng phân tích dữ liệu',
                'Sáng tạo và có tư duy chiến lược'
            ],
            posted: '1 tuần trước',
            urgent: false
        },
        {
            id: 4,
            title: 'Backend Developer',
            department: 'tech',
            location: 'Remote',
            type: 'Full-time',
            experience: '2-4 năm',
            salary: '12-20 triệu',
            description: 'Phát triển API và hệ thống backend cho các ứng dụng.',
            requirements: [
                'Thành thạo Node.js, Python hoặc Java',
                'Kinh nghiệm với database (MySQL, MongoDB)',
                'Hiểu biết về microservices',
                'Kỹ năng DevOps cơ bản'
            ],
            posted: '3 ngày trước',
            urgent: true
        },
        {
            id: 5,
            title: 'HR Business Partner',
            department: 'hr',
            location: 'Hà Nội',
            type: 'Full-time',
            experience: '3-5 năm',
            salary: '15-22 triệu',
            description: 'Hỗ trợ các phòng ban trong việc quản lý nhân sự.',
            requirements: [
                'Kinh nghiệm trong lĩnh vực HR',
                'Kỹ năng giao tiếp và thuyết phục',
                'Hiểu biết về luật lao động',
                'Khả năng làm việc đa nhiệm'
            ],
            posted: '1 tuần trước',
            urgent: false
        },
        {
            id: 6,
            title: 'Financial Analyst',
            department: 'finance',
            location: 'Hồ Chí Minh',
            type: 'Full-time',
            experience: '2-4 năm',
            salary: '13-19 triệu',
            description: 'Phân tích tài chính và hỗ trợ ra quyết định kinh doanh.',
            requirements: [
                'Bằng cấp về Tài chính hoặc Kế toán',
                'Thành thạo Excel và các công cụ phân tích',
                'Kỹ năng phân tích dữ liệu',
                'Chú ý đến chi tiết'
            ],
            posted: '4 ngày trước',
            urgent: false
        }
    ];

    const filteredJobs = selectedDepartment === 'all' 
        ? jobOpenings 
        : jobOpenings.filter(job => job.department === selectedDepartment);

    const benefits = [
        { icon: '💰', title: 'Lương Cạnh Tranh', desc: 'Mức lương hấp dẫn theo năng lực' },
        { icon: '🏥', title: 'Bảo Hiểm Đầy Đủ', desc: 'Bảo hiểm sức khỏe và xã hội' },
        { icon: '🎓', title: 'Đào Tạo', desc: 'Cơ hội phát triển kỹ năng liên tục' },
        { icon: '🏖️', title: 'Nghỉ Phép', desc: '12 ngày phép năm + nghỉ lễ' },
        { icon: '🍽️', title: 'Căng Tin', desc: 'Bữa trưa miễn phí tại công ty' },
        { icon: '🚗', title: 'Xe Đưa Đón', desc: 'Hỗ trợ đi lại cho nhân viên' }
    ];

    return (
        <div className="careers-page">
            <Header />
            
            {/* Hero Section */}
            <section className="careers-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Cơ Hội Nghề Nghiệp</h1>
                        <p className="hero-subtitle">
                            Tham gia đội ngũ PL Store và cùng chúng tôi xây dựng tương lai công nghệ
                        </p>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">200+</span>
                                <span className="stat-label">Nhân Viên</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Phòng Ban</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Cửa Hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="container">
                    <h2 className="section-title">Quyền Lợi Nhân Viên</h2>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="benefit-card">
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section className="job-openings">
                <div className="container">
                    <div className="jobs-header">
                        <h2 className="section-title">Vị Trí Tuyển Dụng</h2>
                        
                        {/* Department Filter */}
                        <div className="department-filter">
                            {departments.map(dept => (
                                <button
                                    key={dept.id}
                                    className={`filter-btn ${selectedDepartment === dept.id ? 'active' : ''}`}
                                    onClick={() => setSelectedDepartment(dept.id)}
                                >
                                    {dept.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="jobs-grid">
                        {filteredJobs.map(job => (
                            <div key={job.id} className="job-card">
                                {job.urgent && <div className="urgent-badge">Khẩn Cấp</div>}
                                
                                <div className="job-header">
                                    <h3 className="job-title">{job.title}</h3>
                                    <div className="job-meta">
                                        <span className="department">{departments.find(d => d.id === job.department)?.name}</span>
                                        <span className="location">📍 {job.location}</span>
                                        <span className="type">{job.type}</span>
                                    </div>
                                </div>

                                <div className="job-details">
                                    <div className="detail-item">
                                        <span className="label">Kinh nghiệm:</span>
                                        <span className="value">{job.experience}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Mức lương:</span>
                                        <span className="value salary">{job.salary}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Đăng:</span>
                                        <span className="value">{job.posted}</span>
                                    </div>
                                </div>

                                <div className="job-description">
                                    <p>{job.description}</p>
                                </div>

                                <div className="job-requirements">
                                    <h4>Yêu cầu:</h4>
                                    <ul>
                                        {job.requirements.map((req, index) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="job-actions">
                                    <button className="apply-btn" onClick={() => { setSelectedJob(job); setShowApplyModal(true); }}>Ứng Tuyển Ngay</button>
                                    <button className="save-btn">Lưu Việc Làm</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Culture */}
            <section className="company-culture">
                <div className="container">
                    <h2 className="section-title">Văn Hóa Công Ty</h2>
                    <div className="culture-grid">
                        <div className="culture-item">
                            <div className="culture-icon">🤝</div>
                            <h3>Hợp Tác</h3>
                            <p>Làm việc nhóm hiệu quả và hỗ trợ lẫn nhau</p>
                        </div>
                        <div className="culture-item">
                            <div className="culture-icon">💡</div>
                            <h3>Sáng Tạo</h3>
                            <p>Khuyến khích ý tưởng mới và đổi mới</p>
                        </div>
                        <div className="culture-item">
                            <div className="culture-icon">📈</div>
                            <h3>Phát Triển</h3>
                            <p>Cơ hội thăng tiến và học hỏi liên tục</p>
                        </div>
                        <div className="culture-item">
                            <div className="culture-icon">🎯</div>
                            <h3>Mục Tiêu</h3>
                            <p>Hướng đến thành công và chất lượng</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Process */}
            <section className="application-process">
                <div className="container">
                    <h2 className="section-title">Quy Trình Tuyển Dụng</h2>
                    <div className="process-steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Nộp Hồ Sơ</h3>
                            <p>Gửi CV và đơn ứng tuyển qua website</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Sàng Lọc</h3>
                            <p>HR sẽ xem xét và liên hệ trong 3-5 ngày</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Phỏng Vấn</h3>
                            <p>Phỏng vấn với HR và trưởng phòng</p>
                        </div>
                        <div className="step">
                            <div className="step-number">4</div>
                            <h3>Kết Quả</h3>
                            <p>Thông báo kết quả và onboarding</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="apply-modal-overlay" onClick={() => setShowApplyModal(false)}>
                    <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Nộp CV - {selectedJob?.title}</h3>
                        <p>Chỉ nhận file PDF, tối đa 5MB.</p>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setCvFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                        />
                        <div className="modal-actions">
                            <button className="save-btn" onClick={() => setShowApplyModal(false)}>Huỷ</button>
                            <button
                                className="apply-btn"
                                onClick={() => {
                                    if (!cvFile) { alert('Vui lòng chọn file PDF'); return; }
                                    if (cvFile.type !== 'application/pdf') { alert('Chỉ chấp nhận PDF'); return; }
                                    if (cvFile.size > 5 * 1024 * 1024) { alert('File vượt quá 5MB'); return; }
                                    alert('Đã gửi CV thành công!');
                                    setCvFile(null);
                                    setShowApplyModal(false);
                                }}
                            >
                                Gửi CV
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default CareersPage;
