# Spandana Embroidery — feature preview

This pnpm monorepo branch packages the preview experience for the Spandana Embroidery site, including the Gemini craft advisor, local advisor fallback, order tracking, and deployable static output.

## Contributor instructions

Before editing, read the root [`AGENTS.md`](AGENTS.md). It is deliberately branch-specific: it identifies this branch’s architecture, safe commands, and validation expectations. Keep secrets in ignored environment files and do not copy operational guidance from another branch without verifying it applies here.

## Quick start

```bash
pnpm install
pnpm run typecheck
pnpm run build
```

Use pnpm only. The root build places the static preview in `dist/` after building the client artifact.
