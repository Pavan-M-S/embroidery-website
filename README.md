# Spandana Embroidery — baseline monorepo

This is the baseline pnpm workspace for the Spandana Embroidery website. It contains the React customer site, Express API, shared OpenAPI-generated packages, and Drizzle database schema.

## Contributor instructions

Before editing, read the root [`AGENTS.md`](AGENTS.md). It is deliberately branch-specific: it identifies this branch’s architecture, safe commands, and validation expectations. Keep secrets in ignored environment files and do not copy operational guidance from another branch without verifying it applies here.

## Quick start

```bash
pnpm install
pnpm run typecheck
pnpm run build
```

Use pnpm only; the root preinstall hook intentionally rejects other package managers.
