import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import { surpriseToastQuotes } from '../config/loveQuotes';

export default function FloatingHeartButton() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const handleClick = (e) => {
    // 1. Lấy ngẫu nhiên câu yêu thương
    const randomQuote =
      surpriseToastQuotes[Math.floor(Math.random() * surpriseToastQuotes.length)];
    setToastMessage(randomQuote);
    setToastVisible(true);

    // Tự ẩn sau 3.5 giây
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);

    // 2. Bắn tim mini từ vị trí nút bấm
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 70,
      origin: { x, y },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd700'],
      zIndex: 9999,
      scalar: 1.1,
    });
  };

  return (
    <>
      {/* Toast thông điệp ngọt ngào */}
      {toastVisible && (
        <div className="floating-surprise-toast">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Nút bấm hình trái tim bay bổng */}
      <button
        className="floating-heart-btn"
        onClick={handleClick}
        title="Bấm vào đây để nhận thêm một điều ngọt ngào ❤️"
        aria-label="Nhận lời yêu thương"
      >
        <Heart size={26} fill="#fff" />
      </button>
    </>
  );
}
