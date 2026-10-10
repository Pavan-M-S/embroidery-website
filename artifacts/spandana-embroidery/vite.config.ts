import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT || '5173';
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  envPrefix: ['VITE_', 'PROVIDER_', 'GEMINI_', 'OPENROUTER_', 'AI_'],
  define: {
    '__ENV_PROVIDER_API_KEY__': JSON.stringify(
      process.env.VITE_PROVIDER_API_KEY ||
      process.env.PROVIDER_API_KEY ||
      process.env.VITE_OPENROUTER_API_KEY ||
      process.env.OPENROUTER_API_KEY ||
      ''
    ),
    '__ENV_PROVIDER_BASE_URL__': JSON.stringify(
      process.env.VITE_PROVIDER_BASE_URL ||
      process.env.PROVIDER_BASE_URL ||
      ''
    ),
    '__ENV_PROVIDER_MODEL__': JSON.stringify(
      process.env.VITE_PROVIDER_MODEL ||
      process.env.PROVIDER_MODEL ||
      process.env.VITE_PROVIDER_MODELS ||
      process.env.PROVIDER_MODELS ||
      process.env.VITE_AI_MODELS ||
      process.env.AI_MODELS ||
      process.env.VITE_MODELS ||
      process.env.MODELS ||
      ''
    ),
    '__ENV_GEMINI_API_KEY__': JSON.stringify(
      process.env.VITE_GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY ||
      ''
    ),
    '__ENV_GEMINI_BASE_URL__': JSON.stringify(
      process.env.VITE_GEMINI_BASE_URL ||
      process.env.GEMINI_BASE_URL ||
      ''
    ),
    '__ENV_GEMINI_MODEL__': JSON.stringify(
      process.env.VITE_GEMINI_MODEL ||
      process.env.GEMINI_MODEL ||
      ''
    ),
  },
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET ?? 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
