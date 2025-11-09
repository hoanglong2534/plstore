import React, { useEffect, useState, useMemo } from 'react';
import './Detail.css'
import DetailInfo from './DetailInfo'
import RateStar from './RateStar';
import {
    useParams,
    Link
} from "react-router-dom";
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { getproductById, getAllProduct } from '../../actions/ProductAction';
import CommentProduct from './CommentProduct';
import BlogContent from './BlogContent';
import ImageWithFallback from '../ImageWithFallback';
import AIChatbot from '../AIChatbot/AIChatbot';

function Detail(props) {
    const dispatch = useDispatch()
    const { id } = useParams();
    const detailProduct = useReduxSelector(state => state.getProductById.product)
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');

    const allProducts = useReduxSelector(state => state.allProduct?.product || []);
    
    // Touch/swipe handling
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    useEffect(() => {
        dispatch(getproductById(id))
    }, [dispatch, id])

    useEffect(() => {
        if (!allProducts || allProducts.length === 0) {
            dispatch(getAllProduct());
        }
    }, [dispatch, allProducts?.length])

    // Build image array with unique items; if backend has gallery, prefer it
    const rawImages = (detailProduct?.images && detailProduct.images.length)
        ? detailProduct.images
        : [detailProduct?.image].filter(Boolean);

    const productImages = Array.from(new Set(rawImages)).slice(0, 8);
    const hasThumbnails = productImages.length > 1;

    // Lấy thông số kỹ thuật; nếu thiếu, dùng dữ liệu mặc định theo sản phẩm
    const defaultSpecifications = detailProduct ? [
        { label: 'Màn hình', value: detailProduct.screen || 'OLED 6.7" 120Hz' },
        { label: 'Chip', value: detailProduct.cpu || 'A16 Bionic / Snapdragon 8 Gen 2' },
        { label: 'RAM', value: (detailProduct.ram && `${detailProduct.ram} GB`) || '8 GB' },
        { label: 'Bộ nhớ', value: (detailProduct.rom && `${detailProduct.rom} GB`) || '128 GB' },
        { label: 'Camera', value: detailProduct.camera || 'Chính 48MP, Selfie 12MP' },
        { label: 'Pin & Sạc', value: detailProduct.battery || '4500 mAh, sạc nhanh 65W' },
        { label: 'Kết nối', value: '5G, Wi‑Fi 6/6E, Bluetooth 5.3, NFC' },
        { label: 'Chống nước', value: 'IP68' }
    ] : [];

    const specifications = detailProduct?.specifications && Object.keys(detailProduct.specifications).length
        ? Object.entries(detailProduct.specifications).map(([label, value]) => ({ label, value }))
        : defaultSpecifications;

    const features = (detailProduct?.features && detailProduct.features.length)
        ? detailProduct.features
        : ['Màn hình mượt 120Hz', 'Camera chống rung OIS', 'Sạc nhanh', 'Bảo hành 12 tháng'];

    const related = useMemo(() => {
        const pool = (allProducts || []).filter(p => p && p._id !== detailProduct?._id);
        if (!pool.length) return [];
        // shuffle
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 4);
    }, [allProducts, detailProduct?._id]);

    // Navigation functions
    const goToNextImage = () => {
        if (productImages.length > 1) {
            setSelectedImage(selectedImage === productImages.length - 1 ? 0 : selectedImage + 1);
        }
    };

    const goToPrevImage = () => {
        if (productImages.length > 1) {
            setSelectedImage(selectedImage === 0 ? productImages.length - 1 : selectedImage - 1);
        }
    };

    // Touch handlers
    const handleTouchStart = (e) => {
        setTouchEnd(0);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) goToNextImage();
        if (isRightSwipe) goToPrevImage();
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToPrevImage();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                goToNextImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, productImages.length]);

    return (
        <section id="detail">
            {
                detailProduct ? (
            <div className="detail">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <div className="container">
                        <nav className="breadcrumb-nav">
                            <a href="/">Trang chủ</a>
                            <span>/</span>
                            <a href="/product">Sản phẩm</a>
                            <span>/</span>
                            <span>{detailProduct.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Product Header */}
                <div className="product-header">
                    <div className="container">
                        <div className="product-title">
                            <h1>{detailProduct.name}</h1>
                            <div className="product-badges">
                                <span className="badge new">Mới</span>
                                <span className="badge discount">-{detailProduct.percentDiscount}%</span>
                                <span className="badge warranty">Bảo hành 12 tháng</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Product Info */}
                <div className="detail-info">
                    <div className="container">
                        <div className="detail-grid">
                            {/* Image Gallery */}
                            <div className="image-gallery">
                                <div 
                                    className="main-image"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <ImageWithFallback src={productImages[selectedImage]} alt={detailProduct.name} />
                                    
                                    {/* Navigation Arrows */}
                                    {productImages.length > 1 && (
                                        <>
                                            <button 
                                                className="nav-btn nav-prev"
                                                onClick={goToPrevImage}
                                                title="Ảnh trước (←)"
                                            >
                                                &#8249;
                                            </button>
                                            <button 
                                                className="nav-btn nav-next"
                                                onClick={goToNextImage}
                                                title="Ảnh tiếp theo (→)"
                                            >
                                                &#8250;
                                            </button>
                                        </>
                                    )}
                                    
                                    {/* Image Counter */}
                                    {productImages.length > 1 && (
                                        <div className="image-counter">
                                            {selectedImage + 1} / {productImages.length}
                                        </div>
                                    )}
                                    
                                    <div className="image-zoom">
                                        <span>🔍</span>
                                    </div>
                                </div>
                                
                                {/* Thumbnail Navigation */}
                                {hasThumbnails && (
                                    <div className="thumbnail-container">
                                        <div className="thumbnail-images">
                                            {productImages.map((image, index) => (
                                                <div 
                                                    key={index}
                                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                                    onClick={() => setSelectedImage(index)}
                                                >
                                                    <ImageWithFallback src={image} alt={`${detailProduct.name} ${index + 1}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Dot Indicators */}
                                {productImages.length > 1 && (
                                    <div className="dot-indicators">
                                        {productImages.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`dot ${selectedImage === index ? 'active' : ''}`}
                                                onClick={() => setSelectedImage(index)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <DetailInfo product={detailProduct}></DetailInfo>
                        </div>
                    </div>
                </div>

                {/* Product Tabs */}
                <div className="product-tabs">
                    <div className="container">
                        <div className="tabs-header">
                            <button 
                                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Mô tả sản phẩm
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                                onClick={() => setActiveTab('specifications')}
                            >
                                Thông số kỹ thuật
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                                onClick={() => setActiveTab('features')}
                            >
                                Tính năng nổi bật
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Đánh giá ({Math.floor(Math.random() * 100) + 50})
                            </button>
                        </div>

                        <div className="tabs-content">
                            {activeTab === 'description' && (
                                <div className="tab-panel">
                                    <BlogContent></BlogContent>
                                </div>
                            )}
                            
                            {activeTab === 'specifications' && (
                                <div className="tab-panel">
                                    <div className="specifications-grid">
                                        {specifications.map((spec, index) => (
                                            <div key={index} className="spec-item">
                                                <span className="spec-label">{spec.label}</span>
                                                <span className="spec-value">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'features' && (
                                <div className="tab-panel">
                                    <div className="features-grid">
                                        {features.map((feature, index) => (
                                            <div key={index} className="feature-item">
                                                <span className="feature-icon">✓</span>
                                                <span className="feature-text">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'reviews' && (
                                <div className="tab-panel">
                                    <RateStar></RateStar>
                                    <CommentProduct></CommentProduct>
                                </div>
                            )}
                        </div>                    </div>
                </div>

                {/* Related Products */}
                    <div className="related-products">
                        <div className="container">
                            <h2 className="section-title">Sản phẩm liên quan</h2>
                            <div className="related-grid">
                                {related.length ? (
                                    related.map(item => (
                                        <Link key={item._id} to={`/detail/${item._id}`} className="related-card">
                                            <div className="related-image">
                                                <ImageWithFallback src={item.image} alt={item.name} />
                                                {item.percentDiscount ? (
                                                    <div className="related-discount">-{item.percentDiscount}%</div>
                                                ) : null}
                                            </div>
                                            <div className="related-info">
                                                <h3>{item.name}</h3>
                                                <div className="related-price">
                                                    <span className="current-price">{new Intl.NumberFormat('vi-VN').format(item.salePrice)}đ</span>
                                                    <span className="old-price">{new Intl.NumberFormat('vi-VN').format(item.price)}đ</span>
                                                </div>
                                                <div className="related-rating">
                                                    <span className="stars">★★★★☆</span>
                                                    <span className="rating-count">({Math.floor(Math.random()*200)+10})</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    [1,2,3,4].map(idx => (
                                        <div key={idx} className="related-card" style={{opacity:.6}}>
                                            <div className="related-image" />
                                            <div className="related-info"><h3>Đang tải...</h3></div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
            </div>
            ) : (
                <div className="loading-state">
                    <div className="container">
                        <div className="loading-content">
                            <div className="loading-spinner"></div>
                            <p>Đang tải thông tin sản phẩm...</p>
                        </div>
                    </div>
                </div>
            )
            }
            
            {/* AI Chatbot */}
            <AIChatbot products={[detailProduct]} />
        </section>
    );
}

export default Detail;