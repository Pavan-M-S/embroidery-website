# Production branch guide — production

`production` is the release-oriented pnpm monorepo for Spandana Embroidery. Favor small, reviewable, backward-compatible fixes. Do not use this branch to trial unfinished UX or infrastructure changes; use a preview or debug branch first.

## Release layout

- `artifacts/spandana-embroidery/` is the deployed React/Vite customer site.
- `artifacts/api-server/` is the Express API service.
- `artifacts/spandana-embroidery/src/lib/offlineCraftAdvisor.ts` is the production offline craft-advisor fallback.
- `lib/api-spec/` is the API source of truth; Zod and React-client packages are generated from it.
- Root `pnpm run build` creates the client output and copies it to `dist/` for static deployment.

## Required workflow

```bash
pnpm install
pnpm run typecheck
pnpm run build
```

Use pnpm only. Before a release handoff, build from a clean worktree and inspect the generated root `dist/` content as well as the affected package output.

## Production safeguards

Preserve graceful behavior without `GEMINI_API_KEY`, including the offline craft advisor and error states. Keep all keys on the server; never add them to Vite config, generated static assets, browser storage, or client requests. Do not change deployment rewrites, build-copy behavior, or CORS without an explicit deployment requirement.

## Contracts, schema, and checks

Change OpenAPI at `lib/api-spec/openapi.yaml` and regenerate clients with `pnpm -F @workspace/api-spec codegen`; generated files are not manual edit targets. `DATABASE_URL` is required for database work; schema force-pushes require explicit authorization. Smoke-test the live-critical routes, advisor fallback, order tracking, keyboard dialogs, mobile navigation, and reduced-motion behavior for every relevant change.
