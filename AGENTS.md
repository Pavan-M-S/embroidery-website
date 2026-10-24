# Experiment Branch Guide — `all-skill-testing`

> **Branch Context**: Motion, visual-polish, and agent-skill experimentation branch of the Spandana Embroidery pnpm monorepo. Treat this workspace as an experimental sandbox for interaction design rather than the release source of truth.

---

## 🧭 Branch Purpose & Mission

This branch is designated for testing:
1. **Lightweight Motion & Animation**: Native CSS and modern `motion` micro-interactions without heavy external animation bundles (`framer-motion` is intentionally excluded).
2. **Visual Polish & Styling**: Silk thread particle backgrounds, needle custom cursor, and dark/light mode balance.
3. **Agent Skill Evaluation**: Ensuring AI coding agents adhere to strict accessibility, monorepo boundaries, and contract-first API rules.

> [!WARNING]
> Keep experiments contained within this branch. Do not promote experimental configuration, generated files, or unvetted dependencies into production or preview branches without explicit approval.

---

## 🏛 Workspace Map

| Directory / Package | Package Name | Role & Contents |
| :--- | :--- | :--- |
| **`artifacts/spandana-embroidery/`** | `@workspace/spandana-embroidery` | Vite/React 19 customer-facing embroidery site. Main surface for UI and motion experiments. |
| **`artifacts/api-server/`** | `@workspace/api-server` | Express API service hosting Gemini proxy endpoints and Drizzle database integrations. |
| **`artifacts/mockup-sandbox/`** | `@workspace/mockup-sandbox` | Archived standalone UI sandbox for testing isolated components. |
| **`lib/api-spec/`** | `@workspace/api-spec` | Source of truth OpenAPI 3.1 specification (`openapi.yaml`). |
| **`lib/api-zod/`** | `@workspace/api-zod` | Auto-generated Zod validation schemas. |
| **`lib/api-client-react/`** | `@workspace/api-client-react` | Auto-generated React Query / Orval client hooks. |
| **`lib/db/`** | `@workspace/db` | Drizzle ORM PostgreSQL schema and migration scripts. |
| **`changes/`** | *N/A* | Motion analyses, phase planning, and branch research documents. |
| **`.kilo/plans/`** | *N/A* | Kilocode / agent plan records. |

---

## ⚡ Safe Workflow & Execution Commands

> [!IMPORTANT]
> **Use pnpm only.** The root `package.json` contains preinstall hooks that deliberately reject `npm` and `yarn`.

### Essential CLI Commands

```bash
# 1. Install all monorepo dependencies
pnpm install

# 2. Run TypeScript checks across all workspace packages
pnpm run typecheck

# 3. Build all workspace packages
pnpm run build

# 4. Start the frontend client dev server (port 18274 or $PORT)
pnpm -F @workspace/spandana-embroidery dev

# 5. Start the Express API server dev server (port 5000)
pnpm -F @workspace/api-server dev
```

---

## 🛡️ Core Guardrails & Security Policies

1. **API Key Isolation**:
   - `GEMINI_API_KEY` must **never** be imported, bundled, or exposed in client-side code (`artifacts/spandana-embroidery`).
   - Never inject keys into Vite defines, HTML templates, URL parameters, or client storage.
   - All external AI calls must route through the server-side proxy in `artifacts/api-server`.
2. **Graceful Offline Degradation**:
   - The application must remain fully functional even when `GEMINI_API_KEY` is missing or when network requests fail.
   - Verify that `offlineCraftAdvisor.ts` and `websiteKnowledge.ts` take over cleanly in the UI.
3. **Reduced-Motion Compliance**:
   - When `prefers-reduced-motion: reduce` is detected, all background canvas rendering, floating cursor trails, and transition latencies must pause or immediately resolve.
4. **Touch & Coarse Pointer Fallbacks**:
   - The custom cursor must strictly target fine pointers (`@media (hover: hover) and (pointer: fine)`). On mobile/touch devices, default system interaction applies.
5. **No `framer-motion`**:
   - Do not reintroduce `framer-motion`. All animation must utilize CSS keyframes, CSS transitions, or the lightweight `motion` package.

---

## 🔄 Contract-First API & Code Generation

All API modifications must follow the strict contract-first generation flow:

1. Edit the API definition:
   ```bash
   lib/api-spec/openapi.yaml
   ```
2. Run code generation:
   ```bash
   pnpm -F @workspace/api-spec codegen
   ```
3. Update server endpoint handlers in `artifacts/api-server/src/`.
4. Consume generated hooks from `@workspace/api-client-react` in the frontend.

> [!CAUTION]
> **DO NOT manually edit generated files:**
> - `lib/api-zod/src/generated/*`
> - `lib/api-client-react/src/generated/*`  
> Any manual edits will be overwritten during subsequent code generation runs.

---

## 🗄️ Database Operations

- Database schema is defined in `lib/db/`.
- All database operations require a valid `DATABASE_URL` environment variable.
- **Never use `db:push --force` or `push-force`** without explicit owner authorization.

---

## 🏁 Pre-Handoff Quality Checklist

Before submitting code changes or committing on this branch, complete this checklist:

- [ ] **Typecheck**: `pnpm run typecheck` passes with zero errors across all workspaces.
- [ ] **Build Validation**: `pnpm run build` completes successfully.
- [ ] **Reduced Motion**: Verified animations under system reduced-motion settings.
- [ ] **Keyboard Navigation**: All interactive elements are reachable with `Tab` and have visible focus rings.
- [ ] **Secret Hygiene**: Checked `git status` and `git diff` to ensure no `.env` files or API keys are staged.
- [ ] **Workspace Isolation**: Verified edits did not introduce cross-package circular dependencies.
