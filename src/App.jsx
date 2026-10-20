import React, { useState, useEffect } from 'react';
import HeartLock from './components/HeartLock';
import HeartParticles from './components/HeartParticles';
import MusicPlayer from './components/MusicPlayer';
import PhotoSlideshow from './components/PhotoSlideshow';
import LoveLetter from './components/LoveLetter';
import LoveQuotes from './components/LoveQuotes';
import FloatingHeartButton from './components/FloatingHeartButton';
import siteConfig from './config/siteConfig';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const fullTypewriterGreeting = siteConfig.typewriterGreeting;

  // Xử lý khi mở khóa thành công
  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    // Cuộn nhẹ về đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hiệu ứng chữ xuất hiện từng ký tự (Typewriter) mượt mà cho lời chào
  useEffect(() => {
    if (!isUnlocked) return;

    let currentIndex = 0;
    setTypewriterText('');

    const interval = setInterval(() => {
      if (currentIndex < fullTypewriterGreeting.length) {
        setTypewriterText(fullTypewriterGreeting.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isUnlocked, fullTypewriterGreeting]);

  return (
    <div className="app-container">
      {/* 1. Hệ thống trái tim bay lơ lửng toàn trang (Canvas 60fps) */}
      <HeartParticles />

      {/* 2. Trình phát nhạc nền lãng mạn */}
      <MusicPlayer shouldPlay={isUnlocked} />

      {/* 3. MÀN HÌNH MỞ KHÓA HOẶC NỘI DUNG CHÍNH */}
      {!isUnlocked ? (
        <HeartLock onUnlockSuccess={handleUnlockSuccess} />
      ) : (
        <main
          className="main-world-content"
          style={{ animation: 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          {/* PHẦN A: LỜI CHÀO ĐẦU TRANG & TYPEWRITER */}
          <header className="hero-greeting-section section-wrapper" style={{ textAlign: 'center', paddingTop: '80px', paddingBottom: '30px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '30px',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: 'var(--gold-light)',
                fontSize: '0.88rem',
                fontWeight: 600,
                marginBottom: '16px',
              }}
            >
              <Sparkles size={16} />
              <span>Dành riêng cho {siteConfig.wifeName}</span>
              <Sparkles size={16} />
            </div>

            <h1
              className="text-rose-gradient font-serif"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                marginBottom: '14px',
                textShadow: '0 4px 20px rgba(201, 24, 74, 0.4)',
              }}
            >
              {siteConfig.mainTitle}
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: 'var(--blush-light)',
                maxWidth: '680px',
                margin: '0 auto 24px auto',
                fontWeight: 400,
              }}
            >
              {siteConfig.subTitle}
            </p>

            {/* Dòng chữ xuất hiện từng ký tự */}
            <div
              className="glass-panel"
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                padding: '16px 28px',
                border: '1px solid rgba(255, 182, 193, 0.3)',
                background: 'rgba(56, 4, 14, 0.55)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-cursive)',
                  fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
                  color: '#fff',
                  lineHeight: 1.6,
                }}
              >
                “{typewriterText}”
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1.2em',
                    backgroundColor: 'var(--rose-pink)',
                    marginLeft: '4px',
                    verticalAlign: 'middle',
                    animation: 'gentlePulse 1s infinite',
                  }}
                />
              </p>
            </div>
          </header>

          {/* PHẦN B: TRÌNH CHIẾU ẢNH KỶ NIỆM */}
          <PhotoSlideshow />

          {/* PHẦN C: BỨC THƯ TÌNH DÀNH CHO VỢ */}
          <LoveLetter />

          {/* PHẦN D: NHỮNG LỜI YÊU THƯƠNG NGẮN */}
          <LoveQuotes />

          {/* NÚT THẢ TIM BẤT NGỜ (GÓC DƯỚI BÊN PHẢI) */}
          <FloatingHeartButton />

          {/* FOOTER KẾT THÚC TRANG */}
          <footer className="site-footer">
            <p className="footer-quote">
              “Được yêu em là một điều may mắn của anh.”
            </p>
            <div className="footer-signature">
              <span>{siteConfig.husbandName}</span>
              <span>•</span>
              <Heart size={14} fill="#ff4d6d" color="#ff4d6d" />
              <span>{siteConfig.anniversaryDate}</span>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}
