import React, { useEffect, useRef } from 'react';

/**
 * Hiệu ứng Canvas Heart Particles siêu mượt, nhẹ nhàng, không gây lag DOM
 * Hỗ trợ các trái tim nhiều kích thước, trôi từ dưới lên, lấp lánh nhẹ và tự điều chỉnh theo màn hình.
 */
export default function HeartParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Kiểm tra prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // Không chạy animation nếu người dùng hạn chế chuyển động
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Bảng màu trái tim lãng mạn
    const colors = [
      'rgba(255, 77, 109, ',   // rose pink
      'rgba(255, 117, 143, ',  // pastel rose
      'rgba(201, 24, 74, ',    // ruby
      'rgba(255, 179, 193, ',  // soft blush
      'rgba(255, 255, 255, ',  // pure white sparkle
      'rgba(243, 229, 171, ',  // champagne gold
    ];

    // Vẽ hình trái tim bằng Bezier curves
    function drawHeart(c, x, y, size, color, opacity, rotation) {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();
      c.fillStyle = color + opacity + ')';
      
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // Top left curve
      c.bezierCurveTo(
        -size / 2, -size / 2,
        -size, topCurveHeight / 3,
        0, size
      );
      // Top right curve
      c.bezierCurveTo(
        size, topCurveHeight / 3,
        size / 2, -size / 2,
        0, topCurveHeight
      );

      c.closePath();
      c.fill();
      c.restore();
    }

    // Khởi tạo các hạt trái tim
    const heartCount = window.innerWidth < 640 ? 24 : 45;
    const hearts = [];

    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.15,
        speedY: Math.random() * 0.65 + 0.35,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayDistance: Math.random() * 1.5 + 0.5,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: (Math.random() - 0.5) * 0.4,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y -= h.speedY;
        h.x += Math.sin(frame * h.swaySpeed + h.swayOffset) * h.swayDistance * 0.4;

        // Nhịp thở mờ dần
        const currentOpacity = h.opacity * (0.8 + 0.2 * Math.sin(frame * h.pulseSpeed + h.pulseOffset));

        drawHeart(ctx, h.x, h.y, h.size, h.color, currentOpacity, h.rotation);

        // Khi bay khỏi mép trên màn hình, xuất hiện lại ở dưới
        if (h.y < -30) {
          h.y = height + 30;
          h.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
