# Baseline monorepo guide — main2

`main2` is the earlier baseline of the Spandana Embroidery pnpm monorepo. Use it for compatible, foundational changes; it predates the preview-specific Gemini and deployment additions, so do not assume those files or routes exist here.

## Structure

- `artifacts/spandana-embroidery/` is the Vite/React website.
- `artifacts/api-server/` is the Express service.
- `artifacts/mockup-sandbox/` is a standalone design sandbox.
- `lib/api-spec/`, `lib/api-zod/`, and `lib/api-client-react/` define and generate API contracts.
- `lib/db/` owns Drizzle schema; `scripts/` holds workspace utilities.

## Commands

Use pnpm only:

```bash
pnpm install
pnpm run typecheck
pnpm run build
pnpm -F @workspace/spandana-embroidery dev
pnpm -F @workspace/api-server dev
```

This branch’s preinstall hook removes npm/yarn lockfiles before enforcing pnpm. Do not run npm or yarn here, and do not casually alter the workspace lockfile strategy.

## Contract-first changes

For API work, update `lib/api-spec/openapi.yaml`, regenerate through `pnpm -F @workspace/api-spec codegen`, and then update server implementation. Generated modules under `lib/api-zod/src/generated/` and `lib/api-client-react/src/generated/` are outputs, not edit targets. Database operations require `DATABASE_URL`; avoid `push-force` unless explicitly authorized.

## Validation

Run root typecheck and the relevant package build. For UI changes, test responsive layout, keyboard navigation, dialogs, and reduced-motion behavior. Keep credentials in ignored environment files and maintain a usable local fallback when an optional external service is unavailable.
