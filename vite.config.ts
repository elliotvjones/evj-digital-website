import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        relo: resolve(__dirname, 'relo-proposal.html'),
        eventsy: resolve(__dirname, 'investors-eventsy.html'),
      },
    },
  },
});
