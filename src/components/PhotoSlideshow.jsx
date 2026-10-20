import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Heart, Camera } from 'lucide-react';
import memories from '../config/memories';
import siteConfig from '../config/siteConfig';

export default function PhotoSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const timerRef = useRef(null);

  const totalPhotos = memories.length;
  const currentMemory = memories[currentIndex] || {};

  // Chuyển sang ảnh tiếp theo
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  };

  // Quay lại ảnh trước
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  // Tự động chuyển ảnh theo chu kỳ
  useEffect(() => {
    if (!isPlaying || totalPhotos <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, siteConfig.slideshow?.autoPlayInterval || 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex, totalPhotos]);

  // Xử lý fallback ảnh nếu ảnh cục bộ chưa được thêm
  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (item, index) => {
    if (imageErrors[index] && item.fallbackSrc) {
      return item.fallbackSrc;
    }
    return item.src || item.fallbackSrc;
  };

  if (!memories || memories.length === 0) {
    return null;
  }

  const activeSrc = getImageSrc(currentMemory, currentIndex);

  return (
    <section className="slideshow-section section-wrapper">
      {/* Tiêu đề phần kỷ niệm */}
      <div className="section-header">
        <div className="section-tag">
          <Camera size={15} />
          <span>Thước Phim Kỷ Niệm</span>
        </div>
        <h2 className="section-title text-rose-gradient">
          Những Khoảnh Khắc Của Hai Ta
        </h2>
        <p className="section-subtitle">
          Từng nụ cười, từng chuyến đi và những bình yên giản dị bên em
        </p>
      </div>

      {/* Khung chiếu ảnh nghệ thuật */}
      <div className="slideshow-container">
        {/* Lớp nền mờ Ambient thích ứng theo màu ảnh */}
        <div
          className="ambient-bg-layer"
          style={{ backgroundImage: `url(${activeSrc})` }}
        />

        {/* Khu vực hiển thị ảnh chính */}
        <div className="slide-theater">
          {memories.map((photo, index) => {
            const isActive = index === currentIndex;
            const src = getImageSrc(photo, index);

            return (
              <div
                key={photo.id || index}
                className={`slide-item ${isActive ? 'active' : ''}`}
                aria-hidden={!isActive}
              >
                <img
                  key={isActive ? `active-${index}-${currentIndex}` : `idle-${index}`}
                  src={src}
                  alt={photo.caption || `Kỷ niệm ${index + 1}`}
                  className="slide-photo"
                  loading="lazy"
                  onError={() => handleImageError(index)}
                />
              </div>
            );
          })}
        </div>

        {/* Nút lùi ảnh */}
        <button
          className="slideshow-nav-btn prev"
          onClick={prevSlide}
          aria-label="Xem ảnh trước"
          title="Ảnh trước"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Nút tiến ảnh */}
        <button
          className="slideshow-nav-btn next"
          onClick={nextSlide}
          aria-label="Xem ảnh tiếp theo"
          title="Ảnh tiếp theo"
        >
          <ChevronRight size={24} />
        </button>

        {/* Thanh chú thích ảnh */}
        <div className="slide-caption-bar">
          <div className="caption-meta">
            <span>{currentMemory.date || `Kỷ niệm #${currentIndex + 1}`}</span>
            <span>
              {currentIndex + 1} / {totalPhotos}
            </span>
          </div>
          <p className="caption-text">
            <Heart size={16} fill="#ff4d6d" color="#ff4d6d" />
            <span>{currentMemory.caption}</span>
          </p>
        </div>
      </div>

      {/* Điều khiển dưới slideshow */}
      <div className="slideshow-bottom-controls">
        {/* Nút Play / Pause */}
        <button
          className="slideshow-pause-btn"
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? 'Tạm dừng để ngắm ảnh' : 'Tiếp tục phát'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? 'Tạm dừng' : 'Tự động chạy'}</span>
        </button>

        {/* Dấu chấm chỉ báo trang */}
        <div className="indicator-dots">
          {memories.map((_, idx) => (
            <button
              key={idx}
              className={`dot-btn ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Chuyển đến ảnh ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
