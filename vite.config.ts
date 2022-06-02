import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '~/styles/mixins';`,
      },
    }
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '~': resolve('./src'),
    },
  },
});
