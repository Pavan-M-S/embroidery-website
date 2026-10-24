# Spandana Embroidery — Repository Branch Navigation Guide

[![Repository Branches](https://img.shields.io/badge/git-6%20branches-blue.svg)](https://github.com/Pavan-M-S/embroidery-website/branches)
[![Monorepo](https://img.shields.io/badge/architecture-pnpm%20monorepo-orange.svg)](https://pnpm.io/)
[![Standalone](https://img.shields.io/badge/main%20branch-npm%20standalone-green.svg)](https://www.npmjs.com/)

This repository contains two primary architectural layouts:
1. **`main`**: The simplified standalone single-package application powered by **npm** (React 19, Vite, Express in `server.ts`).
2. **Monorepo Branches (`main2`, `preview1`, `production`, `debug1`, `all-skill-testing`)**: Multi-package workspaces powered by **pnpm** featuring separated frontend, backend, OpenAPI specs, and database packages.

> [!IMPORTANT]
> **Branch Context Notice**: Always read the root [`AGENTS.md`](AGENTS.md) immediately after switching branches. Each guide is intentionally tailored to its branch's unique operational constraints and workflows.

---

## 📊 Branch Comparison Matrix

| Branch | Role / Focus | Primary Architecture | Package Manager | Dev Command | Validation Command |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`main`** | Standalone Single-Package App | Root `src/` + `server.ts` | **npm** | `npm run dev` | `npm run lint && npm run build` |
| **`main2`** | Baseline Monorepo | `artifacts/spandana-embroidery/` | **pnpm** | `pnpm -F @workspace/spandana-embroidery dev` | `pnpm run typecheck && pnpm run build` |
| **`preview1`** | Feature Preview & AI Showcase | `artifacts/spandana-embroidery/` | **pnpm** | `pnpm -F @workspace/spandana-embroidery dev` | `pnpm run typecheck && pnpm run build` |
| **`production`** | Release-Oriented Monorepo | `artifacts/spandana-embroidery/` | **pnpm** | `pnpm -F @workspace/spandana-embroidery dev` | `pnpm run typecheck && pnpm run build` |
| **`debug1`** | Defect Isolation & Integration | `artifacts/spandana-embroidery/` | **pnpm** | `pnpm -F @workspace/spandana-embroidery dev` | `pnpm run typecheck && pnpm run build` |
| **`all-skill-testing`** | Motion, Animation & Skill Sandbox | `artifacts/spandana-embroidery/` | **pnpm** | `pnpm -F @workspace/spandana-embroidery dev` | `pnpm run typecheck && pnpm run build` |

---

## 🔍 Detailed Branch Breakdown

### 1. `main` — Standalone Single-Package Application
- **Role**: Simplified deployment layout for standard Node.js hosting environments (e.g., Google Cloud Run, Heroku, Render).
- **Structure**: All React client code resides in the root `src/` directory. The backend Express server lives in `server.ts` and handles API requests (Gemini proxy for craft advisory, design analysis, and TTS) and serves static Vite output.
- **Package Manager**: **npm** only (`package-lock.json`).
- **Running Locally**:
  ```bash
  npm install
  npm run dev      # Starts full-stack server on port 3000
  npm run build    # Bundles client into dist/ and compiles server.ts to server.js
  npm start        # Runs production Node server
  ```
- **Key Characteristic**: Does not use pnpm workspaces. Uses `@google/genai` directly in `server.ts`.

---

### 2. `main2` — Baseline pnpm Monorepo
- **Role**: The foundational multi-package workspace before preview-specific features were merged.
- **Structure**:
  - `artifacts/spandana-embroidery/`: Client React/Vite app.
  - `artifacts/api-server/`: Express API server.
  - `artifacts/mockup-sandbox/`: Isolated component sandbox.
  - `lib/api-spec/`, `lib/api-zod/`, `lib/api-client-react/`: OpenAPI specification and generated hooks.
  - `lib/db/`: Drizzle ORM PostgreSQL schema.
- **Package Manager**: **pnpm** only (`pnpm-workspace.yaml`).
- **Use Case**: Used for foundational architecture changes that should remain decoupled from preview experimentation.

---

### 3. `preview1` — Feature-Preview & AI Monorepo
- **Role**: The feature-preview workspace combining the advanced design system with rich interactive features.
- **Key Highlights**:
  - Gemini AI Craft Consultant modal with image analysis and voice narration.
  - Robust offline fallback knowledge base (`lib/offlineCraftAdvisor.ts`).
  - Interactive Order Tracking (`/track-order`) with 4-stage stepper.
  - Static preview build pipeline that automatically copies frontend assets to root `dist/` on build.
- **Running Locally**:
  ```bash
  pnpm install
  pnpm -F @workspace/api-server dev
  pnpm -F @workspace/spandana-embroidery dev
  ```

---

### 4. `production` — Release-Oriented Monorepo
- **Role**: The production-hardened release workspace.
- **Key Highlights**:
  - Strict backward compatibility requirements.
  - Verified offline craft advisor fallback in case of missing `GEMINI_API_KEY` or external outages.
  - Automated deployment build pipeline targeting root `dist/`.
  - Zero tolerance for experimental UI flags or untracked dependencies.
- **Release Validation**:
  ```bash
  pnpm install
  pnpm run typecheck
  pnpm run build
  # Inspect generated dist/ bundle before deployment handoff
  ```

---

### 5. `debug1` — Integration & Defect-Isolation Monorepo
- **Role**: Dedicated branch for isolating, reproducing, and fixing defects across the monorepo layers.
- **Key Highlights**:
  - Combines historical commits from `preview1` and `production`.
  - Contains reproduction notes in `CLIXAD.md`.
  - Focuses on regression testing, UI edge cases (dark/light themes, keyboard focus, mobile viewport), and API contract consistency.

---

### 6. `all-skill-testing` — Motion & Agent-Skill Sandbox
- **Role**: Active experimentation branch for visual interaction polish, lightweight animation evaluation, and agent skills.
- **Key Highlights**:
  - Replaced heavy `framer-motion` dependency with modern native CSS transitions and lightweight `motion`.
  - Needle-and-thread custom glow cursor with strict touch/reduced-motion fallbacks.
  - Interactive silk thread canvas (`ThreadCanvas`).
  - Contains planning and research docs in `.kilo/plans/` and `changes/`.

---

## 🛠️ Shared Monorepo Conventions (All pnpm Branches)

For every branch using the monorepo format (`main2`, `preview1`, `production`, `debug1`, `all-skill-testing`):

1. **Package Manager Enforcement**: Always use `pnpm`. Root preinstall hooks explicitly block `npm` and `yarn`.
2. **Contract-First Code Generation**:
   - Source of truth for all APIs is [`lib/api-spec/openapi.yaml`](lib/api-spec/openapi.yaml).
   - Never hand-edit files under `lib/api-zod/src/generated/` or `lib/api-client-react/src/generated/`.
   - Run `pnpm -F @workspace/api-spec codegen` after updating `openapi.yaml`.
3. **Secret Hygiene**:
   - `GEMINI_API_KEY` belongs **only** on the backend server (`artifacts/api-server/`).
   - Never inject API keys into client-side Vite bundles, URL queries, or browser storage.
4. **Database Operations**:
   - Requires `DATABASE_URL` environment variable.
   - Force-pushing schema changes (`db:push --force`) is strictly forbidden without authorization.
5. **Accessibility Standard**:
   - Every interactive element must satisfy WCAG 2.2 AA (visible focus, keyboard navigation, dialog trapping, and reduced motion).

---

## 🧭 Branch Switching Quick Reference

```bash
# Switch to main (standalone npm app)
git checkout main
npm install
npm run dev

# Switch to production (release monorepo)
git checkout production
pnpm install
pnpm run build

# Switch to all-skill-testing (motion & experimentation monorepo)
git checkout all-skill-testing
pnpm install
pnpm -F @workspace/spandana-embroidery dev
```
