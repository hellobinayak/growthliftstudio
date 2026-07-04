import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      // react-snap prerenders with an older bundled Chromium that lacks
      // optional chaining / nullish coalescing. Down-level output so the
      // app executes during prerender (and in older browsers generally).
      target: 'es2019',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },

  };
});