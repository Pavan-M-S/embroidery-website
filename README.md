# Spandana Embroidery — production workspace

This pnpm monorepo is the release-oriented version of the Spandana Embroidery website. It contains the deployable React customer experience, Express API service, API-contract packages, and the offline craft-advisor fallback used when Gemini is unavailable.

## Contributor instructions

Before editing, read the root [`AGENTS.md`](AGENTS.md). It is deliberately branch-specific: it identifies this branch’s architecture, safe commands, and validation expectations. Keep secrets in ignored environment files and do not copy operational guidance from another branch without verifying it applies here.

## Release validation

```bash
pnpm install
pnpm run typecheck
pnpm run build
```

Use pnpm only. The root build copies the deployable client output to `dist/`; check that output before a production handoff.
