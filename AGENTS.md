# Spandana Embroidery Website: Agent Guide

## Architecture

This full-stack TypeScript application uses React 19, React Router, Vite, Tailwind CSS v4, Express, and Gemini through `@google/genai`.

- `src/main.tsx` is the client entry; `src/App.tsx` composes routes.
- `src/components/common/` holds reusable UI; `src/pages/` holds routes; `src/context/` holds shared UI state; `src/data/`, `src/types/`, and `src/utils/` contain fixtures, contracts, and helpers.
- `server.ts` runs Express, mounts Vite middleware in development, serves `dist/` in production, and exposes the API.

## API and secrets

`server.ts` supplies `GET /api/health` and `POST /api/gemini/chat`, `/api/gemini/analyze`, and `/api/gemini/tts`. Preserve their client contract with `src/utils/aiService.ts`. The no-key fallback responses are intentional and must keep local development usable.

Use an ignored `.env`, based on `.env.example`, for `GEMINI_API_KEY`, `APP_URL`, `PORT`, and optional `VITE_API_BASE_URL`. Never expose `GEMINI_API_KEY` in browser code or commit credentials. Validate requests and keep model failures non-fatal. Do not change permissive CORS behavior unless an explicit deployment/security requirement calls for it.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

`npm run lint` runs `tsc --noEmit`; build verifies both client and production server bundle.

## Conventions and validation

Use strict TypeScript, `.tsx` components, PascalCase component names/files, and adjacent import/style conventions. Preserve route/provider boundaries, quote basket behavior, accessible skip link/focus/modal handling, responsive navigation, and reduced-motion support. Smoke-test routes, dialogs, basket updates, theme behavior, API health, and Gemini no-key fallback. No dedicated test runner is configured.
