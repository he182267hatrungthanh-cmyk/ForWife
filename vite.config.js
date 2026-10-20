import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép điện thoại cùng mạng Wi-Fi truy cập thử nghiệm
    port: 5173,
    open: true,
  },
});
