import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import assetManagerPlugin from './vite-plugin-asset-manager.js';

export default defineConfig({
  plugins: [react(), assetManagerPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three'],
          'vendor-gsap': ['gsap', '@gsap/react'],
        },
      },
    },
  },
});
