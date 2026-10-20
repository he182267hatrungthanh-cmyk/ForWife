import React from 'react';
import { Heart, Sparkles, Home, Sun, Infinity, Smile, Quote } from 'lucide-react';
import { loveQuotes } from '../config/loveQuotes';

// Ánh xạ icon tương ứng
const iconMap = {
  Heart: Heart,
  Sparkles: Sparkles,
  Home: Home,
  Sun: Sun,
  Infinite: Infinity,
  Smile: Smile,
};

export default function LoveQuotes() {
  return (
    <section className="quotes-section section-wrapper">
      <div className="section-header">
        <div className="section-tag">
          <Quote size={15} />
          <span>Lời Thì Thầm Yêu Thương</span>
        </div>
        <h2 className="section-title text-gold-gradient">
          Những Điều Anh Luôn Muốn Nói
        </h2>
        <p className="section-subtitle">
          Dù bình dị hay lớn lao, mỗi câu từ đều gửi trọn tình cảm nơi em
        </p>
      </div>

      <div className="quotes-grid">
        {loveQuotes.map((item) => {
          const IconComponent = iconMap[item.icon] || Heart;

          return (
            <div key={item.id} className="quote-card">
              <div className="quote-card-header">
                <div className="quote-icon-badge">
                  <IconComponent size={20} />
                </div>
                <span className="quote-tag">{item.highlight}</span>
              </div>
              <p className="quote-text">
                “{item.quote}”
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
