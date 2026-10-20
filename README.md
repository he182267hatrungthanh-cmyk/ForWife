# 🌹 MÓN QUÀ TÌNH YÊU 20/10 DÀNH TẶNG VỢ YÊU ❤️

Một website tình yêu cao cấp phong cách **Romantic Luxury** được thiết kế riêng nhân ngày Phụ nữ Việt Nam 20/10.

---

## 🚀 1. Các câu lệnh chạy trên Terminal

Mở terminal (PowerShell, CMD hoặc Git Bash) tại thư mục dự án:

### Bước 1: Cài đặt thư viện (chỉ cần chạy lần đầu)
```bash
npm install
```
*(Nếu trên Windows PowerShell báo lỗi về ExecutionPolicy, hãy dùng: `npm.cmd install`)*

### Bước 2: Khởi động website chạy thử
```bash
npm run dev
```
*(Hoặc: `npm.cmd run dev`)*

Sau đó mở trình duyệt truy cập: **`http://localhost:5173`** (hoặc nhấn giữ `Ctrl` và click vào link trên terminal).

---

## 🔑 2. Mật khẩu mặc định và cách đổi

- **Mật khẩu mở khóa:** `0518`
- **Gợi ý:** *Ngày của 8 năm về trước...*
- **Cách đổi mật khẩu:**
  Mở file [`src/config/siteConfig.js`](file:///src/config/siteConfig.js):
  ```javascript
  unlockPassword: "0518",
  passwordHint: "Gợi ý cho vợ nè: Ngày của 8 năm về trước...",
  ```

---

## 📸 3. Cách thêm ảnh của 2 vợ chồng

1. Chép các file ảnh của 2 vợ chồng vào thư mục: **`public/images/`**
2. Đặt tên file là: `photo-01.jpg`, `photo-02.jpg`, `photo-03.jpg`, ...
3. Mở file [`src/config/memories.js`](file:///src/config/memories.js) để chỉnh sửa caption và ngày tháng kỷ niệm cho từng ảnh.
4. *Website hỗ trợ cả ảnh ngang và ảnh dọc chụp bằng điện thoại, tự động căn chỉnh và có hiệu ứng ambient glow.*

---

## 🎵 4. Cách thêm bài hát tình yêu (MP3)

1. Tải bài hát MP3 yêu thích của vợ chồng bạn (VD: *Until I Found You, Cưới Nhau Đi, Nơi Này Có Anh,...*)
2. Đổi tên file thành: **`love-song.mp3`**
3. Chép file vào thư mục: **`public/music/love-song.mp3`**
4. Mở file [`src/config/siteConfig.js`](file:///src/config/siteConfig.js) để đổi tên bài hát hiển thị.
*(Lưu ý: Nếu chưa kịp thêm file MP3, website đã tích hợp sẵn giai điệu piano êm dịu dự phòng, không bao giờ bị lỗi).*

---

## 💌 5. Cách sửa Bức thư tình & Lời yêu thương

- **Bức thư tình:** Chỉnh sửa tại [`src/config/loveLetter.js`](file:///src/config/loveLetter.js).
- **Những câu nói ngắn:** Chỉnh sửa tại [`src/config/loveQuotes.js`](file:///src/config/loveQuotes.js).
- **Tên vợ / tên chồng:** Chỉnh sửa tại [`src/config/siteConfig.js`](file:///src/config/siteConfig.js).

---

## 🌐 6. Cách đưa website lên mạng (Vercel) để gửi link cho vợ

1. Đưa dự án lên GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "Qua 20-10 tang vo yeu"
   git branch -M main
   git remote add origin https://github.com/TÊN_BẠN/TÊN_REPO.git
   git push -u origin main
   ```
2. Truy cập [vercel.com](https://vercel.com) (đăng nhập bằng tài khoản GitHub).
3. Nhấn **"Add New..."** -> **"Project"** -> Chọn Repository của bạn.
4. Nhấn nút **"Deploy"** (Vercel sẽ tự động nhận diện dự án Vite + React).
5. Sau 30 giây, bạn sẽ nhận được một đường link (VD: `https://tang-vo-yeu-20-10.vercel.app`) để copy gửi cho vợ qua Zalo / Messenger / iMessage!
