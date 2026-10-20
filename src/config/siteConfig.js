/**
 * ==============================================================================
 * BẢNG ĐIỀU KHIỂN TRUNG TÂM (CENTRAL SITE CONFIGURATION)
 * Bạn có thể dễ dàng cá nhân hóa toàn bộ thông tin tại file này!
 * ==============================================================================
 */

export const siteConfig = {
  // 1. THÔNG TIN CÁ NHÂN
  wifeName: "Vợ Yêu",                 // Tên hoặc biệt danh của vợ (VD: "Bé Heo", "Mai Anh", "Vợ Yêu")
  husbandName: "Chồng của em ❤️",     // Tên gọi thân mật của chồng
  anniversaryDate: "20/10",           // Ngày kỷ niệm hoặc dịp lễ đặc biệt

  // 2. MẬT KHẨU MỞ KHÓA BÍ MẬT
  unlockPassword: "0518",
  passwordHint: "Gợi ý cho vợ nè: Ngày của 8 năm về trước...",
  errorToastMessage: "Hình như vợ chưa nhập đúng bí mật rồi nè 🥺 Thử lại nhé!",

  // 3. TIÊU ĐỀ & LỜI CHÀO MỞ ĐẦU
  mainTitle: "Chúc mừng ngày 20/10, vợ yêu của anh ❤️",
  subTitle: "Gửi người con gái đặc biệt và tuyệt vời nhất trong thế giới của anh...",
  typewriterGreeting: "Cảm ơn em vì đã đến bên anh, cùng anh viết nên câu chuyện tình yêu ngọt ngào nhất.",

  // 4. CẤU HÌNH NHẠC NỀN
  music: {
    title: "Tình Lớn - Nhạc Nền Yêu Thương 🎵",
    src: "/music/love-song.m4a",
    autoPlayPrompt: "Chạm để bật nhạc lãng mạn 🎵",
    initialVolume: 0.4,              // Âm lượng mặc định 40%
  },

  // 5. CẤU HÌNH SLIDESHOW ẢNH
  slideshow: {
    autoPlayInterval: 5000,          // Thời gian chuyển mỗi ảnh: 5000ms = 5 giây để ảnh to dần đầy khung
    transitionDuration: 1000,         // Tốc độ hiệu ứng chuyển đổi (ms)
  },

  // 6. TÔNG MÀU SẮC ROMANTIC LUXURY
  theme: {
    primaryWine: "#800f2f",
    crimsonRose: "#c9184a",
    softPink: "#ff758f",
    champagneGold: "#e0a96d",
    creamyWhite: "#fffdfa",
    deepNightWine: "#38040e",
  },
};

export default siteConfig;
