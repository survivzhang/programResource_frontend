import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173, // 确保端口和 Docker 里一致
    strictPort: true,
    cors: true, // 允许跨
    allowedHosts: ['programresourcehub.com'],
    hmr: {
      host: 'programresourcehub.com', // HMR 监听主机
    },
  },
});
