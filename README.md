# Spandana Embroidery — debug integration branch

This pnpm monorepo branch is used to isolate and repair integration issues across the embroidery website, API service, OpenAPI-generated clients, and database layer. The customer-facing app is in `artifacts/spandana-embroidery/`.

## Contributor instructions

Before editing, read the root [`AGENTS.md`](AGENTS.md). It is deliberately branch-specific: it identifies this branch’s architecture, safe commands, and validation expectations. Keep secrets in ignored environment files and do not copy operational guidance from another branch without verifying it applies here.

## Verify a fix

```bash
pnpm install
pnpm run typecheck
pnpm run build
```

Use pnpm only. Test the original failure path and its user-facing fallback in addition to the successful path.
