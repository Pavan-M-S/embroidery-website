# Debug branch guide — debug1

`debug1` is the integration and defect-isolation branch for the pnpm Spandana Embroidery monorepo. It combines the preview and production history, and is the right place to make narrowly scoped fixes with clear verification rather than broad feature rewrites.

## Where to look first

- `artifacts/spandana-embroidery/`: the React/Vite site; inspect its error boundary, custom cursor, design cards, and route-level UI here.
- `artifacts/api-server/`: Express API and Gemini routes.
- `lib/api-spec/`, `lib/api-zod/`, and `lib/api-client-react/`: API contract and generated clients.
- `lib/db/`: Drizzle schema and database commands.

## Commands

The root guards against npm/yarn; use pnpm only.

```bash
pnpm install
pnpm run typecheck
pnpm run build
pnpm -F @workspace/spandana-embroidery dev
pnpm -F @workspace/api-server dev
```

Run the smallest affected package while diagnosing, then run root typecheck before handoff. Capture the reproduction, expected result, and environment assumptions in the PR or commit message.

## Debugging rules

Preserve error-boundary fallbacks and test failures with no Gemini key, failed requests, and broken image inputs where applicable. Check keyboard focus, reduced motion, and both light/dark themes after UI fixes. Do not put provider keys in Vite configuration or browser requests.

## Contracts and data

Edit `lib/api-spec/openapi.yaml` before generated consumers; regenerate with `pnpm -F @workspace/api-spec codegen`. Never manually modify generated API/Zod files. `DATABASE_URL` is required for schema operations; do not use `push-force` without explicit approval.
