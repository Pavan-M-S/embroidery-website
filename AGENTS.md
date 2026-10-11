# AGENTS.md — Embroidery Website Monorepo

This is a pnpm monorepo for a Spandana Embroidery website with a React frontend, Express API server, shared TypeScript libraries, and codegen from OpenAPI.

## Monorepo Structure

```
artifacts/
  spandana-embroidery/   # React + Vite + Tailwind (client)
  api-server/            # Express + drizzle-orm (server)
lib/
  api-spec/              # OpenAPI spec + orval codegen
  api-zod/               # Zod schemas generated from OpenAPI
  api-client-react/      # TanStack Query hooks generated from OpenAPI
  db/                    # Drizzle ORM schema (PostgreSQL)
scripts/                 # Utility scripts
```

## Key Commands

### Install (requires pnpm)
```bash
pnpm install
```

### Build All
```bash
pnpm run build          # typecheck + build all packages
```

### Typecheck
```bash
pnpm run typecheck      # libs + artifacts + scripts
pnpm run typecheck:libs # libs only (tsc --build)
```

### Development
```bash
# Client (port 5173, proxies /api to localhost:5000)
pnpm -F @workspace/spandana-embroidery dev

# API server (port 5000)
pnpm -F @workspace/api-server dev

# Database push
pnpm -F @workspace/db push
pnpm -F @workspace/db push-force  # force schema changes

# Regenerate API clients from openapi.yaml
pnpm -F @workspace/api-spec codegen
```

## Critical Conventions

1. **Must use pnpm** — root `package.json` has a `preinstall` hook that errors on npm/yarn
2. **TypeScript project references** — libs use `tsc --build`; artifacts use standalone `tsc -p tsconfig.json --noEmit`
3. **API codegen** — Never edit `lib/api-zod/src/generated/*` or `lib/api-client-react/src/generated/*` manually; run `pnpm -F @workspace/api-spec codegen` after changing `lib/api-spec/openapi.yaml`
4. **API spec title must stay "Api"** — orval config hardcodes this; changing it breaks import paths
5. **Database requires DATABASE_URL** — `drizzle.config.ts` throws if unset; use `push`/`push-force` scripts
6. **React 19.1.0 pinned** — required by Expo; see `pnpm-workspace.yaml` catalog
7. **Minimum release age = 1 day** — supply-chain defense in `pnpm-workspace.yaml`; only `@replit/*` and `stripe-replit-sync` excluded
7. **Environment variables** — Client: `PORT`, `BASE_PATH`, `API_PROXY_TARGET`; Server: `PORT`, `DATABASE_URL`

## Build Output

- Client: `artifacts/spandana-embroidery/dist/public/` (served by Vercel)
- Server: `artifacts/api-server/dist/*.mjs` (esbuild bundle)
- Libs: `lib/*/dist/*.d.ts` (declaration files via tsc --build)

## Vercel Deployment

`vercel.json` points to `artifacts/spandana-embroidery/dist/public` with SPA rewrites. API server runs separately (not on Vercel).