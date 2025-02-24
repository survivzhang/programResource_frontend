import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173, // 确保端口和 Docker 里一致
    strictPort: true,
    cors: true, // 允许跨域
    hmr: {
      host: process.env.VITE_HMR_HOST || 'programresourcehub.com', // HMR 热重载的主机名
    },
  },
  define: {
    'process.env.VITE_API_BASE_URL': JSON.stringify(
      'https://programresourcehub.com:441'
    ),
    'process.env.VITE_API_SECOND_URL': JSON.stringify(
      'https://programresourcehub.com:442'
    ),
  },
});
