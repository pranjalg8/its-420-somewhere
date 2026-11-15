import { defineConfig } from 'vite';

// Relative base so the site works from any GitHub Pages sub-path.
export default defineConfig({
  base: './',
  build: { chunkSizeWarningLimit: 2500 },
});
