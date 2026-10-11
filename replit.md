# Spandana Embroidery (preview1)

This project represents the smart-merge of the `main` and `main2` branches for the Spandana Embroidery website. It brings together the superior UI/UX design of `main2` with the rich features (AI, rich data, order tracking) of `main`.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the Express API server (port driven by `PORT`).
- `pnpm --filter @workspace/spandana-embroidery run dev` — run the frontend Vite dev server (requires `PORT` and `BASE_PATH` env vars, proxies `/api` to the backend).
- `pnpm run typecheck` — full typecheck across all packages.
- `pnpm run build` — typecheck + build all packages.

**Required env vars:**

- `GEMINI_API_KEY`: Needed for the AI consultant and analysis features.
- `PORT` & `BASE_PATH`: Needed by the services and frontend dev server.

## Where things live (Repo map)

- `artifacts/spandana-embroidery/` - The React frontend application (winner for UI/routing).
- `artifacts/api-server/` - The Express backend application (houses the Gemini endpoints).
- `artifacts/mockup-sandbox/` - UI component sandbox (archived).
- `lib/` - Shared libraries (DB, Zod schemas, API clients).

## Merge decisions (preview1)

- **UI & Design System**: The UI design, shadcn components, HSL color tokens, typography, and `InteractiveBackground` particle canvas came from `main2`.
- **State & Routing**: Wouter router, local state handling (`useStoredList`), and meta manager came from `main2`.
- **AI & Features**: The AI Craft Consultant, AI Idea Analysis, TTS narration, rich datasets (12 designs with live Unsplash images), FAQ data, order tracking (`/track-order`), and the custom mouse cursor came from `main` and were ported into `main2`'s design system.
