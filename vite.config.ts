import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,  // 👈 Render will bind to this during preview
    allowedHosts: ['what2watch-me1v.onrender.com'],  // 👈 replace with your Render domain if different
  },
});
