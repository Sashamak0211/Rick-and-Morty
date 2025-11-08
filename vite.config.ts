/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr({})],
  base: '/Rick-and-Morty/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Components': path.resolve(__dirname, './src/Components'),
      '@Pages': path.resolve(__dirname, './src/Pages'),
      '@Assets': path.resolve(__dirname, './src/Assets'),
      '@Widgets': path.resolve(__dirname, './src/Widgets'),
      '@Shared': path.resolve(__dirname, './src/Ahared'),
      '@Core/*': path.resolve(__dirname, './src/Core/*'),
    },
  },
});
