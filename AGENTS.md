# Experiment branch guide — all-skill-testing

This is the motion and agent-skill experimentation branch of the pnpm monorepo. Treat it as a sandbox for visual interaction work, not as the release source of truth. Keep experiments contained and avoid moving its generated or tool-specific configuration into a production branch without review.

## Workspace map

- `artifacts/spandana-embroidery/` is the Vite/React embroidery site.
- `artifacts/api-server/` is the Express and Drizzle API service.
- `artifacts/mockup-sandbox/` is a separate UI sandbox.
- `lib/api-spec/` owns OpenAPI; `lib/api-zod/` and `lib/api-client-react/` are generated from it; `lib/db/` owns database schema.
- `changes/` and `.kilo/plans/` record the motion analysis and planned work for this branch.

## Safe workflow

This root requires pnpm; npm and yarn intentionally fail at preinstall.

```bash
pnpm install
pnpm run typecheck
pnpm run build
pnpm -F @workspace/spandana-embroidery dev
pnpm -F @workspace/api-server dev
```

For motion changes, check reduced-motion behavior, keyboard interaction, focus, and touch/coarse-pointer fallback. Keep `motion` usage inside the React artifact and avoid reintroducing `framer-motion`, which this branch intentionally removed.

## API and generated code

Change `lib/api-spec/openapi.yaml` first, then run `pnpm -F @workspace/api-spec codegen`. Do not hand-edit generated files under `lib/api-zod/src/generated/` or `lib/api-client-react/src/generated/`. Database commands need `DATABASE_URL`; never use `push-force` without explicit approval.

## Handoff checks

Run root typecheck, build the affected artifact, and manually verify the changed motion at reduced-motion and normal settings. Keep secrets out of the client and use `.env.example` as the only committed environment template.
