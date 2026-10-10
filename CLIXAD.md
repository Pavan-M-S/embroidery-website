# CLIXAD — Guidance for working on embroidery-website

## What this project is

A pnpm-workspace monorepo for a small embroidery studio site. Contains:

- **artifacts/spandana-embroidery** — React/Vite frontend
- **artifacts/api-server** — Express API server (Gemini endpoints)
- **artifacts/mockup-sandbox** — UI component sandbox
- **lib/** — shared libraries (db, Zod schemas, API clients)

Internal packages are referenced as `@workspace/*` (e.g. `@workspace/api-zod`). Dependencies are catalogued in `pnpm-workspace.yaml` and pulled via `catalog:`.

## How to build, test, run

Run everything from the **workspace root**.

| Command                                                | What it does                              |
| ------------------------------------------------------ | ----------------------------------------- |
| `pnpm install`                                         | Install all workspace dependencies        |
| `pnpm run typecheck`                                   | Full TypeScript check across all packages |
| `pnpm run build`                                       | typecheck + build all packages            |
| `pnpm --filter @workspace/spandana-embroidery run dev` | Start frontend dev server                 |
| `pnpm --filter @workspace/api-server run dev`          | Start Express API server                  |
| `pnpm exec prettier --write .`                         | Format all files                          |

## Key conventions (read before changing anything)

1. **pnpm only.** The root `package.json` enforces this — npm/yarn will bail. Do not bypass.
2. **Do not disable `minimumReleaseAge`** in `pnpm-workspace.yaml` (1440 minutes). It is a supply-chain security guard.
3. **Don't commit `dist/`** or other generated output — it's in `.gitignore`.
4. **Internal deps use `workspace:*`** (or `workspace:` shorthand) in `package.json` — never a pinned version.
5. **TypeScript is strict** — run `typecheck` before submitting changes.
6. **Frontend uses Vite**; API uses Node ES modules (`"type": "module"`). Keep imports/exports consistent.
7. **Env vars matter** — see `replit.md` for the full list (`GEMINI_API_KEY`, `PORT`, `BASE_PATH`, `API_PORT`).
8. **One source of truth for data** — portfolio, FAQ, pricing and contact info live in `src/data.ts` in the frontend artifact. Edit there, not scattered across components.
9. **Forms are frontend-only demos** — no backend submission happens in the demo. Do not wire forms to live endpoints without consulting the owner.
