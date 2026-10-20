import React, { useState } from 'react';
import { Mail, Heart, RotateCcw, Sparkles } from 'lucide-react';
import loveLetter from '../config/loveLetter';

export default function LoveLetter() {
  const [keyReset, setKeyReset] = useState(0);

  const handleReplay = () => {
    setKeyReset((prev) => prev + 1);
  };

  return (
    <section className="letter-section section-wrapper">
      {/* Thẻ bức thư parchment sang trọng */}
      <div className="parchment-card" key={keyReset}>
        {/* Con dấu sáp trái tim nổi ở đầu thư */}
        <div className="wax-seal">
          <Heart size={26} fill="#fff" />
        </div>

        {/* Tiêu đề thư */}
        <div className="letter-header">
          <h2 className="letter-title">{loveLetter.envelopeTitle}</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.7 }}>
            <Sparkles size={14} color="#800f2f" />
            <span style={{ fontSize: '0.85rem', color: '#800f2f', fontWeight: 600 }}>
              {loveLetter.dateStamp || 'Dành tặng ngày 20/10'}
            </span>
            <Sparkles size={14} color="#800f2f" />
          </div>
        </div>

        {/* Lời chào đầu thư */}
        <div className="letter-salutation">
          {loveLetter.salutation}
        </div>

        {/* Nội dung các đoạn thư */}
        <div className="letter-body">
          {loveLetter.paragraphs.map((paragraph, idx) => {
            const isLast = idx === loveLetter.paragraphs.length - 1;
            return (
              <p
                key={idx}
                className={`letter-paragraph ${isLast ? 'highlight' : ''}`}
                style={{
                  animation: `fadeInUp 0.7s ease backwards`,
                  animationDelay: `${0.2 + idx * 0.25}s`,
                }}
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Chữ ký cuối thư */}
        <div
          className="letter-footer-block"
          style={{
            animation: `fadeInUp 0.8s ease backwards`,
            animationDelay: `${0.2 + loveLetter.paragraphs.length * 0.25}s`,
          }}
        >
          <span className="letter-closing">{loveLetter.closing}</span>
          <span className="letter-sender">{loveLetter.sender}</span>
        </div>
      </div>

      {/* Nút đọc lại lời yêu thương */}
      <div className="letter-replay-container">
        <button className="btn-replay-letter" onClick={handleReplay}>
          <RotateCcw size={16} />
          <span>Đọc lại lời yêu thương</span>
        </button>
      </div>
    </section>
  );
}
