# Spandana Embroidery — skill and motion experiments

This branch is a pnpm monorepo used to evaluate motion, visual-polish, and agent-skill changes for the Spandana Embroidery product. The primary client lives in `artifacts/spandana-embroidery/`; the API, shared OpenAPI contracts, and database packages are separate workspace packages.

## Contributor instructions

Before editing, read the root [`AGENTS.md`](AGENTS.md). It is deliberately branch-specific: it identifies this branch’s architecture, safe commands, and validation expectations. Keep secrets in ignored environment files and do not copy operational guidance from another branch without verifying it applies here.

## Quick start

```bash
pnpm install
pnpm run typecheck
pnpm -F @workspace/spandana-embroidery dev
```

Use pnpm only. See `changes/` and `.kilo/plans/` for the experiment context.
