import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: /node_modules/,
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import {jsx, css} from '@emotion/react'`,
  },
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
      '~': resolve(__dirname, 'src'),
    },
  },
});
