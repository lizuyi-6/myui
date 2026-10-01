import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

function physicalPages() {
  return {
    name: 'pulsar-physical-pages',
    configurePreviewServer(server) {
      const directory = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'HEAD') return next();
        const url = new URL(request.url, 'http://localhost');
        let pathname;
        try { pathname = decodeURIComponent(url.pathname); } catch { return next(); }
        const target = path.resolve(directory, `.${pathname}`, 'index.html');
        if (target.startsWith(`${directory}${path.sep}`) && fs.existsSync(target)) {
          request.url = `${url.pathname.replace(/\/$/, '')}/index.html${url.search}`;
        }
        next();
      });
    }
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), physicalPages()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { copyPublicDir: !isSsrBuild, rollupOptions: isSsrBuild ? {} : { output: { manualChunks: { react: ['react', 'react-dom', 'react-router-dom'], motion: ['motion'] } } } }
}));
