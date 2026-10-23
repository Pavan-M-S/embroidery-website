# Preview branch guide — preview1

`preview1` is the feature-preview monorepo for Spandana Embroidery. It contains the Gemini craft-advisor preview, order tracking, custom cursor, and an offline knowledge base intended for review before release.

## Architecture

- `artifacts/spandana-embroidery/` is the Vite/React preview app; its Gemini modal, `lib/offlineCraftAdvisor.ts`, `lib/websiteKnowledge.ts`, and tracking UI are key preview surfaces.
- `artifacts/api-server/` provides Express endpoints and Gemini proxy logic.
- `src/` and `temp_server.ts` are legacy/temporary top-level preview materials. Do not treat them as the primary production application without confirming the active import or deployment path.
- The OpenAPI contract and generated clients live in `lib/api-spec/`, `lib/api-zod/`, and `lib/api-client-react/`.

## Commands and preview output

```bash
pnpm install
pnpm run typecheck
pnpm run build
pnpm -F @workspace/spandana-embroidery dev
pnpm -F @workspace/api-server dev
```

Use pnpm only. Root build copies `artifacts/spandana-embroidery/dist/public` to root `dist/` for preview hosting; verify the copied output when changing build or deployment behavior.

## AI-preview safeguards

Keep Gemini keys server-side. The offline advisor must remain a useful no-key/failure fallback; test both online and offline paths, error states, and user-facing disclosures. Do not expose a key via a Vite define, request query string, or client storage.

## Data and validation

Regenerate API clients from `lib/api-spec/openapi.yaml` rather than editing generated modules. For UI work, verify mobile/desktop navigation, keyboard dialog behavior, reduced motion, error fallbacks, order tracking, and the advisor flow. `DATABASE_URL` is required for database operations; never force-push schema changes without explicit approval.
