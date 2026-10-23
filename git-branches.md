# Spandana Embroidery branch guide

This repository has two codebase shapes. `main` is the current standalone npm application; the other branches are pnpm monorepo variants. Read the root `AGENTS.md` after switching branches—each guide is intentionally tailored to its branch.

| Branch | Role | Primary application | Package manager | Primary validation |
| --- | --- | --- | --- | --- |
| `main` | Current standalone application | Root `src/` + `server.ts` | npm | `npm run lint && npm run build` |
| `main2` | Baseline monorepo | `artifacts/spandana-embroidery/` | pnpm | `pnpm run typecheck && pnpm run build` |
| `preview1` | Feature-preview monorepo | `artifacts/spandana-embroidery/` | pnpm | `pnpm run typecheck && pnpm run build` |
| `production` | Release-oriented monorepo | `artifacts/spandana-embroidery/` | pnpm | `pnpm run typecheck && pnpm run build` |
| `debug1` | Integration and defect-isolation monorepo | `artifacts/spandana-embroidery/` | pnpm | `pnpm run typecheck && pnpm run build` |
| `all-skill-testing` | Motion and agent-skill experiment monorepo | `artifacts/spandana-embroidery/` | pnpm | `pnpm run typecheck && pnpm run build` |

## Branch details

### `main`

The current simplified deployment path: React 19/Vite client code is in root `src/`, and `server.ts` hosts Express plus the Gemini proxy. Preserve the contract used by `src/utils/aiService.ts`, including no-key fallbacks. This branch uses npm, not the pnpm workspace commands listed for the other branches.

### `main2`

The baseline pnpm workspace before preview-specific additions. It contains the website, API server, mockup sandbox, OpenAPI source/generation packages, and Drizzle database package. Use it for foundational changes that should not rely on the preview advisor or deployment-specific behavior.

### `preview1`

The review branch for the Gemini craft-advisor experience, local/offline advisor behavior, order tracking, and the static-preview build. Its root build copies the client artifact into `dist/`. Test both the Gemini-enabled and no-key/failure paths.

### `production`

The release-oriented pnpm workspace. Make narrow, backward-compatible changes and inspect root `dist/` after builds. The offline craft advisor is a required fallback, and provider keys must remain server-side. This document lives at the repository root of this branch.

### `debug1`

The integration branch for isolating defects across UI, API, generated clients, and database packages. Reproduce the issue first, verify user-facing fallbacks after the fix, and avoid broad feature work while debugging.

### `all-skill-testing`

The sandbox for motion, visual-polish, and agent-skill experiments. Keep changes scoped, honor reduced-motion and input-device fallbacks, and do not promote experiment-specific configuration without separate review.

## Shared monorepo rules

For every pnpm branch:

- Use pnpm only; root preinstall rules reject npm/yarn.
- Change `lib/api-spec/openapi.yaml` before generated API consumers, then run `pnpm -F @workspace/api-spec codegen`.
- Do not edit generated files in `lib/api-zod/src/generated/` or `lib/api-client-react/src/generated/` directly.
- Keep secrets in ignored environment files. Gemini keys never belong in browser code, Vite defines, URLs, or client storage.
- Database actions require `DATABASE_URL`; `push-force` needs explicit authorization.

## Documentation convention

Every branch now has a root `AGENTS.md` and `README.md`. The README files share the same contributor instruction: read the branch-specific `AGENTS.md` before changing code and verify that guidance applies to the checked-out branch. This file is the cross-branch index for the `production` branch.
