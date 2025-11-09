import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './BlogPage.css';
import { blogPosts } from '../data/blogPosts';
import ImageWithFallback from '../components/ImageWithFallback';

function BlogDetailPage(){
  const { id } = useParams();
  const history = useHistory();
  const post = blogPosts.find(p => String(p.id) === String(id));

  const extended = React.useMemo(() => {
    if(!post) return '';
    const base = post.content || '';
    // Nếu nội dung đã dài (>1500 ký tự) thì giữ nguyên
    if(base.replace(/<[^>]+>/g,'').length > 1500) return base;
    // Khối mở rộng chung theo category
    const extraBlocks = {
      reviews: `
        <h2>Đánh Giá Chi Tiết Hiệu Năng</h2>
        <p>Về hiệu năng, thiết bị cho thấy khả năng xử lý ổn định ngay cả khi đa nhiệm nặng. Trong các bài thử nghiệm bao gồm mở đồng thời nhiều ứng dụng, render ảnh và chơi game đồ họa cao, máy vẫn giữ được mức nhiệt dễ chịu. Chip xử lý mới tối ưu rõ rệt về tiêu thụ điện năng và giảm hiện tượng tụt xung sau thời gian dài.</p>
        <p>Thời lượng pin thực tế đạt gần trọn vẹn một ngày sử dụng với cường độ cao: 4G liên tục, chụp ảnh, xem video 4K và chơi game. Khi sử dụng thông thường (lướt web, mạng xã hội, gọi điện), pin có thể kéo dài sang ngày thứ hai với khoảng 30–35% còn lại, hỗ trợ sạc nhanh giúp quay lại 50% chỉ sau khoảng 25 phút.</p>
        <h2>Trải Nghiệm Camera Thực Tế</h2>
        <p>Camera tele mới tạo độ sâu và chi tiết tốt hơn ở điều kiện thiếu sáng. Ảnh chụp trong nhà giảm nhiễu rõ rệt so với thế hệ trước. Chế độ chân dung nhận diện biên chủ thể chính xác, ít lem nhoè vùng tóc. Khả năng quay video 4K ổn định, chống rung hoạt động hiệu quả khi vừa chạy vừa quay.</p>
        <p>Ảnh zoom 5x vẫn giữ được màu sắc tự nhiên, không đẩy saturation quá đà. Khi zoom cao hơn, thuật toán xử lý vẫn cho ra khung hình có thể sử dụng. Dải động được cân bằng tốt, vùng highlight ít bị cháy và vùng shadow giữ lại chi tiết.</p>
        <h3>Thuật Toán Xử Lý Mới</h3>
        <ul>
          <li>Tối ưu cân bằng trắng trong điều kiện ánh sáng hỗn hợp.</li>
          <li>Giảm ghosting khi chụp chủ thể chuyển động nhanh.</li>
          <li>Tăng độ tương phản vi mô giúp ảnh sắc nét hơn.</li>
        </ul>
        <h2>Màn Hình Và Âm Thanh</h2>
        <p>Màn hình sáng tối đa ngoài trời hiển thị rõ ràng dưới nắng gắt. Dải màu rộng tái tạo nội dung HDR sống động nhưng không bị rực giả tạo. Tần số quét động điều chỉnh mượt nhưng tiết kiệm pin. Loa kép cho âm lượng lớn, cân bằng giữa hai kênh cải thiện; xem phim và chơi game có chiều sâu hơn.</p>
        <blockquote>"Trải nghiệm tổng thể cho thấy sự đồng bộ giữa phần cứng và phần mềm đạt mức trưởng thành hiếm thấy."</blockquote>
        <h2>Bảng Tóm Tắt Nhanh</h2>
        <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.95rem">
          <thead><tr style="background:#f5f6fa"><th style="padding:8px;border:1px solid #e0e0e0">Hạng Mục</th><th style="padding:8px;border:1px solid #e0e0e0">Đánh Giá</th></tr></thead>
          <tbody>
            <tr><td style="padding:8px;border:1px solid #e0e0e0">Hiệu năng</td><td style="padding:8px;border:1px solid #e0e0e0">Rất mạnh, ổn định dài</td></tr>
            <tr><td style="padding:8px;border:1px solid #e0e0e0">Camera</td><td style="padding:8px;border:1px solid #e0e0e0">Đa dụng, tele cải tiến</td></tr>
            <tr><td style="padding:8px;border:1px solid #e0e0e0">Pin & sạc</td><td style="padding:8px;border:1px solid #e0e0e0">Trên trung bình, sạc nhanh</td></tr>
            <tr><td style="padding:8px;border:1px solid #e0e0e0">Màn hình</td><td style="padding:8px;border:1px solid #e0e0e0">Sáng cao, màu chuẩn</td></tr>
            <tr><td style="padding:8px;border:1px solid #e0e0e0">Phần mềm</td><td style="padding:8px;border:1px solid #e0e0e0">Tối ưu mượt</td></tr>
          </tbody>
        </table>
        <h2>Tổng Kết</h2>
        <p>Nếu bạn cần một thiết bị toàn diện về hiệu năng, camera, độ bền và hệ sinh thái phần mềm ổn định, đây là lựa chọn gần như không có nhiều điểm yếu lớn. Giá thành cao vẫn là rào cản, nhưng giá trị sử dụng thực tế tương xứng cho nhóm người dùng nâng cao. Với chu kỳ hỗ trợ phần mềm dài, người dùng có thể an tâm đầu tư lâu dài.</p>
      `,
      news: `
        <h2>Bối Cảnh Thị Trường</h2>
        <p>Năm nay thị trường ghi nhận xu hướng hợp nhất nhiều tính năng AI trực tiếp vào thiết bị thay vì phụ thuộc kết nối đám mây. Các hãng lớn đầu tư mạnh vào tối ưu silicon phục vụ tác vụ AI tại chỗ: nhận dạng hình ảnh, chuyển giọng nói thành văn bản, gợi ý ngữ cảnh thông minh đáp ứng ngay cả khi offline.</p>
        <p>Các chuẩn kết nối như Wi‑Fi 7 và Bluetooth LE Audio bắt đầu xuất hiện trên dòng cao cấp, mở đường cho hệ sinh thái phụ kiện mới. Cạnh tranh về số năm cập nhật bảo mật và hệ điều hành trở thành lợi thế chiến lược.</p>
        <h2>Chiến Lược Giá & Phân Khúc</h2>
        <p>Phân khúc tầm trung được đẩy mạnh với tính năng vốn là độc quyền flagship: màn hình 120Hz thích ứng, sạc 100W, camera cảm biến lớn. Điều này buộc flagship chuyển dịch giá trị sang AI và trải nghiệm tổng thể thay vì chỉ phần cứng.</p>
        <h3>Yếu Tố Thúc Đẩy Mua Sắm</h3>
        <ul>
          <li>Tính năng cá nhân hoá dựa trên hành vi.</li>
          <li>Bảo mật dữ liệu người dùng tại thiết bị.</li>
          <li>Dịch vụ hậu mãi & thương hiệu địa phương.</li>
        </ul>
        <h2>Dự Đoán 6 Tháng Tới</h2>
        <p>AI tùy biến theo ngữ cảnh sẽ xuất hiện: tối ưu lịch pin, đề xuất chế độ chụp, gom nhóm thông báo quan trọng. Công nghệ vệ tinh 2 chiều dần phổ cập ở phân khúc cận cao cấp hỗ trợ an toàn và định vị vùng sâu.</p>
        <blockquote>"Sự thay đổi trọng tâm từ thông số sang trải nghiệm thông minh là dấu hiệu trưởng thành của thị trường."</blockquote>
        <h2>Kết Luận</h2>
        <p>Giai đoạn tới là cuộc đua hệ sinh thái & dịch vụ song hành thiết bị, người dùng hưởng lợi vì giá trị tăng trong khi chi phí không tăng quá mạnh như các năm trước.</p>
      `,
      tips: `
        <h2>Nguyên Tắc Cốt Lõi</h2>
        <p>Bảo vệ thiết bị di động là xây dựng lớp phòng thủ nhiều tầng: cập nhật hệ thống, kiểm soát quyền ứng dụng, mã hóa dữ liệu, sao lưu định kỳ và thói quen sử dụng an toàn. Mỗi tầng giảm rủi ro một nhóm tấn công.</p>
        <h2>Các Sai Lầm Phổ Biến</h2>
        <ul>
          <li>Cấp quyền micro / vị trí cho ứng dụng không cần thiết.</li>
          <li>Tải tập tin APK bên ngoài chợ chính thức.</li>
          <li>Dùng một mật khẩu cho nhiều dịch vụ.</li>
        </ul>
        <h2>Bảo Vệ Tài Khoản</h2>
        <p>Dùng mật khẩu duy nhất, bật xác thực hai yếu tố sử dụng ứng dụng thay vì SMS. Kích hoạt cảnh báo đăng nhập lạ; rà soát thiết bị tin cậy định kỳ.</p>
        <h2>Mã Hóa & Sao Lưu</h2>
        <p>Mã hóa toàn bộ thiết bị (mặc định trên đa số máy hiện đại). Sao lưu ảnh/tài liệu quan trọng lên dịch vụ có mã hóa đầu cuối hoặc ổ cứng ngoại offline cất giữ an toàn.</p>
        <h2>Bảng Checklist Nhanh</h2>
        <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.95rem">
          <thead><tr style="background:#f5f6fa"><th style="padding:8px;border:1px solid #e0e0e0">Mục</th><th style="padding:8px;border:1px solid #e0e0e0">Trạng thái</th></tr></thead>
          <tbody>
            <tr><td style="padding:8px;border:1px solid #e0e0e0">Cập nhật hệ điều hành</td><td style="padding:8px;border:1px solid #e0e0e0">✔</td></tr>
            <tr><td style="padding:8px;border:1px solid #e0e0e0">Xác thực 2 lớp</td><td style="padding:8px;border:1px solid #e0e0e0">✔</td></tr>
            <tr><td style="padding:8px;border:1px solid #e0e0e0">Rà soát quyền ứng dụng</td><td style="padding:8px;border:1px solid #e0e0e0">Hàng tháng</td></tr>
            <tr><td style="padding:8px;border:1px solid #e0e0e0">Sao lưu dữ liệu</td><td style="padding:8px;border:1px solid #e0e0e0">Định kỳ</td></tr>
          </tbody>
        </table>
        <h2>Kết Luận</h2>
        <p>Kết hợp thói quen an toàn với công cụ bảo mật cơ bản giúp giảm phần lớn rủi ro phổ biến hiện nay, đặc biệt đối với người dùng thường xuyên giao dịch trực tuyến.</p>
      `,
      tech: `
        <h2>Nâng Cấp Nổi Bật</h2>
        <p>Màn hình thế hệ mới ưu tiên độ sáng ngoài trời và tiết kiệm năng lượng trong chế độ Always‑On. Camera cải tiến thuật toán HDR nhiều lớp cho kết quả cân bằng sáng tối tự nhiên hơn, hạn chế viền quầng khi chụp ngược sáng.</p>
        <h2>Hiệu Năng & Tản Nhiệt</h2>
        <p>Chip mới tái thiết kế cụm GPU xử lý đồ họa thực tế tăng cường. Buồng hơi lớn và lớp graphite nhiều tầng giúp duy trì xung cao lâu hơn trong phiên chơi game kéo dài, giảm throttling.</p>
        <h2>Phần Mềm Thông Minh</h2>
        <p>Nhiều tính năng AI chạy cục bộ: dịch trực tiếp trên màn hình, gợi ý trả lời tin nhắn theo ngữ cảnh, tự phân loại tài liệu. Dữ liệu cá nhân được xử lý ngay trên thiết bị, giảm phụ thuộc đám mây.</p>
        <h3>Xu Hướng Tương Lai</h3>
        <ul>
          <li>AI hỗ trợ chỉnh ảnh thời gian thực đa tầng.</li>
          <li>Tích hợp vệ tinh khẩn cấp phổ cập hơn.</li>
          <li>Pin silicon-carbon tăng mật độ năng lượng.</li>
        </ul>
        <h2>Tổng Kết</h2>
        <p>Sự kết hợp phần cứng tinh chỉnh và phần mềm tối ưu đem lại cảm giác trọn vẹn hơn so với nâng cấp đơn lẻ từng năm. Thiết bị tập trung vào trải nghiệm thông minh hơn là chỉ gia tăng thông số thô.</p>
      `
    };
    const extra = extraBlocks[post.category] || '';
    return base + extra;
  }, [post]);

  if(!post){
    return (
      <div className="blog-page">
        <Header/>
        <section className="blog-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Bài viết không tồn tại</h1>
              <p className="hero-subtitle">Vui lòng quay lại trang Blog</p>
            </div>
          </div>
        </section>
        <div className="container" style={{padding: '2rem 0'}}>
          <button className="post-read-more" onClick={()=>history.push('/blog')}>Về trang Blog</button>
        </div>
        <Footer/>
      </div>
    )
  }

  return (
    <div className="blog-page">
      <Header/>
      <section className="blog-hero" style={{background: '#fff', color: 'var(--text-primary)'}}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title" style={{color: 'var(--text-primary)'}}>{post.title}</h1>
            <p className="hero-subtitle" style={{color: 'var(--text-secondary)'}}>
              {post.author} • {post.date} • {post.readTime}
            </p>
          </div>
        </div>
      </section>

      <section className="policy-content">
        <div className="container">
          <div className="content-wrapper">
            <article className="policy-card" style={{overflow: 'hidden'}}>
              <ImageWithFallback src={post.image} alt={post.title} style={{width:'100%', borderRadius: '12px', marginBottom: '1rem'}}/>
              <div className="card-content">
                <div className="post-content" dangerouslySetInnerHTML={{__html: extended}}/>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}

export default BlogDetailPage;
