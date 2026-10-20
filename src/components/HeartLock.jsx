import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, KeyRound, Eye, EyeOff, Sparkles, Heart } from 'lucide-react';
import siteConfig from '../config/siteConfig';

export default function HeartLock({ onUnlockSuccess }) {
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const inputRef = useRef(null);

  // Trigger hiệu ứng bùng nổ trái tim khi mở khóa thành công
  const triggerHeartExplosion = () => {
    // Đợt 1: Bắn pháo hoa trái tim từ trung tâm
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#d4af37', '#ffffff'],
      shapes: ['circle'],
      scalar: 1.2,
      zIndex: 9999,
    });

    // Đợt 2: Thêm các tia lấp lánh sau 200ms
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.3, y: 0.55 },
        colors: ['#c9184a', '#ffd700', '#ff85a1'],
        zIndex: 9999,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.7, y: 0.55 },
        colors: ['#c9184a', '#ffd700', '#ff85a1'],
        zIndex: 9999,
      });
    }, 200);
  };

  const handleUnlock = (e) => {
    if (e) e.preventDefault();

    // Chuẩn hóa mật khẩu (loại bỏ khoảng trắng thừa)
    const trimmedInput = password.trim();
    const targetPassword = String(siteConfig.unlockPassword).trim();

    if (trimmedInput === targetPassword) {
      // Đúng mật khẩu
      setIsError(false);
      setIsUnlocking(true);
      triggerHeartExplosion();

      // Chờ animation hoàn tất và chuyển sang màn hình chính
      setTimeout(() => {
        onUnlockSuccess();
      }, 1000);
    } else {
      // Sai mật khẩu
      setIsError(true);
      setErrorMessage(siteConfig.errorToastMessage || "Hình như vợ chưa nhập đúng bí mật rồi nè 🥺");

      // Rung input và reset sau 700ms
      setTimeout(() => {
        setIsError(false);
      }, 700);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="lock-screen-container">
      {/* Sân khấu trái tim phát sáng & các hạt sao bay quanh */}
      <div className="heart-lock-stage">
        {/* Halo phát sáng */}
        <div className="heart-halo" />

        {/* Vòng quay tinh tú */}
        <div className="orbit-ring">
          <div className="orbit-star" />
          <div className="orbit-star" />
          <div className="orbit-star" />
        </div>

        {/* Trái tim trung tâm */}
        <div
          className={`heart-wrapper ${isUnlocking ? 'unlocking' : isError ? 'shaking' : 'beating'}`}
          onClick={() => {
            if (inputRef.current) inputRef.current.focus();
          }}
          title="Chạm vào đây để nhập mật mã trái tim"
        >
          {/* Trái tim SVG đổ bóng mượt */}
          <svg
            className="heart-svg"
            viewBox="0 0 100 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4d6d" />
                <stop offset="45%" stopColor="#c9184a" />
                <stop offset="85%" stopColor="#800f2f" />
                <stop offset="100%" stopColor="#590d22" />
              </linearGradient>
              <radialGradient id="heartGlow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#ff758f" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Thân trái tim */}
            <path
              d="M50 82C50 82 8 50 8 26C8 13.85 17.85 4 30 4C37.5 4 44.15 7.75 50 13.5C55.85 7.75 62.5 4 70 4C82.15 4 92 13.85 92 26C92 50 50 82 50 82Z"
              fill="url(#heartGradient)"
              stroke="rgba(255, 218, 224, 0.4)"
              strokeWidth="1.5"
            />
            {/* Lớp ánh sáng bóng bẩy phía trên */}
            <path
              d="M50 82C50 82 8 50 8 26C8 13.85 17.85 4 30 4C37.5 4 44.15 7.75 50 13.5C55.85 7.75 62.5 4 70 4C82.15 4 92 13.85 92 26C92 50 50 82 50 82Z"
              fill="url(#heartGlow)"
            />
          </svg>

          {/* Ổ khóa tinh tế nằm gọn bên trong trái tim */}
          <div className={`lock-icon-container ${isUnlocking ? 'unlocked' : ''}`}>
            {isUnlocking ? (
              <Unlock size={38} className="lock-shackle text-gold-gradient" />
            ) : (
              <Lock size={38} className="lock-shackle" />
            )}
          </div>
        </div>
      </div>

      {/* Nội dung tiêu đề & ô mật khẩu */}
      <div className="lock-content">
        <h1 className="lock-title text-rose-gradient">
          Một món quà nhỏ dành riêng cho vợ yêu ❤️
        </h1>
        <p className="lock-subtitle">
          Chỉ có một người mới mở được trái tim này...
        </p>

        {/* Form nhập mật mã */}
        <form className="lock-form" onSubmit={handleUnlock}>
          <div className="input-box-wrapper">
            <KeyRound className="input-icon" size={20} />
            <input
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              className={`password-input ${isError ? 'input-error' : ''}`}
              placeholder="Nhập mật mã trái tim..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (isError) setIsError(false);
              }}
              autoFocus
              disabled={isUnlocking}
            />
            <button
              type="button"
              className="toggle-visibility-btn"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Ẩn mật mã' : 'Hiện mật mã'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Thông báo lỗi khi nhập sai mật khẩu */}
          {errorMessage && isError && (
            <div className="error-toast">
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Nút bấm mở khóa */}
          <button
            type="submit"
            className="btn-romantic-primary"
            disabled={isUnlocking}
          >
            {isUnlocking ? (
              <>
                <Sparkles size={20} className="animate-spin" />
                <span>Đang mở cánh cửa yêu thương...</span>
              </>
            ) : (
              <>
                <Heart size={20} fill="#fff" />
                <span>Mở khóa trái tim</span>
              </>
            )}
          </button>

          {/* Nút bật gợi ý mật khẩu nếu cần */}
          {siteConfig.passwordHint && (
            <div style={{ marginTop: '8px' }}>
              <button
                type="button"
                className="hint-toggle"
                onClick={() => setShowHint(!showHint)}
              >
                <Sparkles size={14} />
                <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý mật khẩu cho vợ nè'}</span>
              </button>
              {showHint && (
                <div className="hint-box" style={{ marginTop: '6px' }}>
                  {siteConfig.passwordHint}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
