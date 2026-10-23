# Main branch agent guide — Spandana Embroidery

`main` is the standalone, deployable application. It is not the pnpm monorepo found on the legacy and preview branches: work from this repository root with npm.

## Layout

- `src/main.tsx` boots the React 19 client and `src/App.tsx` owns routing.
- `src/pages/`, `src/components/common/`, `src/context/`, `src/data/`, `src/types/`, and `src/utils/` contain the UI and its supporting contracts.
- `server.ts` runs Express, provides the Gemini proxy, and hosts Vite in development or `dist/` in production.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

`npm run lint` is `tsc --noEmit`; `npm run build` verifies both the browser bundle and production server bundle.

## API and secrets

Keep `src/utils/aiService.ts` compatible with `GET /api/health` and the three routes in `server.ts`: `/api/gemini/chat`, `/api/gemini/analyze`, and `/api/gemini/tts`. The no-key fallbacks are deliberate and must remain useful in local development. Put `GEMINI_API_KEY`, `APP_URL`, `PORT`, and optional `VITE_API_BASE_URL` in ignored `.env` files based on `.env.example`; never expose keys in browser code.

## Change checklist

Use strict TypeScript and PascalCase `.tsx` components. Preserve route/provider boundaries, the quote basket, accessible skip-link/dialog/focus handling, responsive navigation, and reduced-motion behavior. Before handing work off, run lint and build, then smoke-test a route, dialogs, basket changes, theme changes, API health, and Gemini fallback behavior relevant to the edit.
