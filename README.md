# Spandana Embroidery — Skill & Motion Experiments

[![Branch](https://img.shields.io/badge/branch-all--skill--testing-purple.svg)](https://github.com/Pavan-M-S/embroidery-website/tree/all-skill-testing)
[![Package Manager](https://img.shields.io/badge/package%20manager-pnpm-orange.svg)](https://pnpm.io/)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **“Quality embroidery at affordable prices”**  
> *A refined, accessible digital atelier showcase for Spandana Embroidery — home-crafted Indian artisan wear for women and children.*

---

## 📌 Branch Overview: `all-skill-testing`

This branch is the **motion, visual interaction, and agent-skill experimentation monorepo** for the Spandana Embroidery website. It serves as a sandbox for evaluating:
- **Motion & Visual Interaction**: Fluid canvas animations (`ThreadCanvas`), custom glow cursors, accessible micro-interactions using native CSS / `motion` (with `framer-motion` intentionally removed).
- **Agent Skill Testing**: Validating agent capabilities for autonomous maintenance, refactoring, and quality engineering.
- **Strict Accessibility Compliance**: Enforcing WCAG 2.2 AA standards, keyboard navigation, focus management, and responsive fallbacks for `prefers-reduced-motion`.

> [!NOTE]
> For an overview of all branches across the repository, see [**`git-branches.md`**](git-branches.md). For branch-specific contributor constraints, read [**`AGENTS.md`**](AGENTS.md).

---

## 📑 Table of Contents

- [Architecture & Monorepo Map](#-architecture--monorepo-map)
- [Prerequisites](#-prerequisites)
- [Environment Configuration](#-environment-configuration)
- [Quick Start & How to Run](#-quick-start--how-to-run)
  - [1. Install Dependencies](#1-install-dependencies)
  - [2. Start Development Servers](#2-start-development-servers)
  - [3. Typecheck & Build](#3-typecheck--build)
- [Available Scripts](#-available-scripts)
- [Website Pages & Features](#-website-pages--features)
- [Motion & Visual Design System](#-motion--visual-design-system)
- [Contract-First API Architecture](#-contract-first-api-architecture)
- [Manual Testing Checklist](#-manual-testing-checklist)
- [Contributing Guidelines](#-contributing-guidelines)

---

## 🏛 Architecture & Monorepo Map

This repository uses **pnpm workspaces** to orchestrate frontend applications, backend services, and shared contract packages:

```
embroidery-website/
├── artifacts/
│   ├── spandana-embroidery/     # Primary React 19 + Vite frontend application
│   │   ├── src/                 # Pages, UI components, data files, hooks, styles
│   │   ├── public/              # Care guide text and static assets
│   │   └── package.json         # Workspace package: @workspace/spandana-embroidery
│   ├── api-server/              # Express API service with Gemini proxy
│   │   ├── src/                 # API controllers, middleware, routes
│   │   └── package.json         # Workspace package: @workspace/api-server
│   └── mockup-sandbox/          # Isolated UI component playground (archived)
├── lib/
│   ├── api-spec/                # Source-of-truth OpenAPI 3.1 specifications
│   ├── api-zod/                 # Generated Zod validation schemas
│   ├── api-client-react/        # Generated React Query API hooks (Orval)
│   └── db/                      # Drizzle ORM schema & database configurations
├── .agents/                     # Agent instructions and memory files
├── AGENTS.md                    # Branch operational guardrails and guidelines
├── CLIXAD.md                    # Workspace reference and command guide
├── git-branches.md              # Repository-wide cross-branch architecture guide
├── pnpm-workspace.yaml          # Monorepo workspace configuration
└── package.json                 # Root script runner and workspace hooks
```

---

## ⚙️ Prerequisites

Before getting started, ensure you have the following installed on your machine:

| Requirement | Supported Version | Notes |
| :--- | :--- | :--- |
| **Node.js** | `>= 20.x` | LTS recommended (`node -v`) |
| **pnpm** | `>= 9.x` or `>= 10.x` | **Mandatory** (`npm` and `yarn` are blocked via preinstall hooks) |
| **Google Gemini API Key** | Optional for offline mode | Required for live AI craft consultation & TTS audio |

---

## 🔐 Environment Configuration

Create a `.env` file in the repository root by copying the template:

```bash
cp .env.example .env
```

Configure the following variables in `.env`:

```env
# Gemini API Key for AI craft consultant, design analysis, and text-to-speech
# Get your free key at: https://aistudio.google.com/
GEMINI_API_KEY="your-gemini-api-key-here"

# Application host URL (used for CORS and proxying)
APP_URL="http://localhost:5000"

# Port for the frontend Vite development server
PORT=18274

# Port for the Express API server (default is 5000)
# API_PORT=5000

# Database connection URL (only required when running database migrations)
# DATABASE_URL="postgresql://user:password@localhost:5432/spandana_embroidery"
```

> [!IMPORTANT]
> **API Key Safety**: The Gemini API key is strictly consumed by the server-side API proxy (`artifacts/api-server/`). Never inline or expose `GEMINI_API_KEY` in frontend client bundles, Vite defines, or URL parameters.

---

## 🚀 Quick Start & How to Run

### 1. Install Dependencies

Install all workspace packages using **pnpm**:

```bash
pnpm install
```

> [!WARNING]
> Do **not** run `npm install` or `yarn install`. Root preinstall guards will reject other package managers.

### 2. Start Development Servers

You can launch both the frontend client and the backend API server concurrently or in separate terminal tabs:

#### Option A: Run Full Stack Concurrently
Open two terminal tabs from the workspace root:

**Terminal 1 (Backend API Service):**
```bash
pnpm -F @workspace/api-server dev
```
*API server runs on [http://localhost:5000](http://localhost:5000)*

**Terminal 2 (Frontend Client Application):**
```bash
pnpm -F @workspace/spandana-embroidery dev
```
*Frontend runs on [http://localhost:18274](http://localhost:18274) (or port configured in `.env`)*

#### Option B: Run Frontend Only (Offline Mode)
The website includes an integrated offline knowledge base that functions seamlessly even without the backend API:

```bash
pnpm -F @workspace/spandana-embroidery dev
```

### 3. Typecheck & Build

Validate TypeScript types across all libraries and workspace packages:

```bash
# Typecheck all packages
pnpm run typecheck

# Full production build
pnpm run build
```

---

## 📜 Available Scripts

Run all commands from the **workspace root**:

| Command | Target | Description |
| :--- | :--- | :--- |
| `pnpm install` | Workspace | Installs dependencies across all workspace packages |
| `pnpm run typecheck` | Workspace | Validates TypeScript in `lib/` and `artifacts/` without emitting files |
| `pnpm run typecheck:libs` | `lib/*` | Runs `tsc --build` for shared contract libraries |
| `pnpm run build` | Workspace | Runs typechecks and produces production builds for all packages |
| `pnpm -F @workspace/spandana-embroidery dev` | Frontend | Starts Vite dev server with Hot Module Replacement (HMR) |
| `pnpm -F @workspace/spandana-embroidery build` | Frontend | Bundles production assets into `dist/public` |
| `pnpm -F @workspace/spandana-embroidery serve` | Frontend | Previews the production bundle locally |
| `pnpm -F @workspace/api-server dev` | API Server | Builds and starts Express API server with source maps |
| `pnpm -F @workspace/api-server build` | API Server | Bundles the backend using Node builder |
| `pnpm -F @workspace/api-spec codegen` | API Spec | Generates Zod schemas and React Query hooks from OpenAPI spec |

---

## 🌸 Website Pages & Features

The customer-facing application provides **8 distinct, fully responsive pages**:

| Page Route | Purpose & Key Features |
| :--- | :--- |
| **`/`** *(Home)* | Hero with silk thread particle animation, artisan atelier value propositions, featured work, 4-step craft process, FAQ accordion. |
| **`/designs`** *(Portfolio)* | Curated portfolio of Indian embroidery styles (Aari, Zardozi, Mirror, Threadwork), instant category filters, search bar, and favourites toggling. |
| **`/pricing`** *(Estimates)* | Transparent pricing guidelines by garment type, sample estimate breakdowns, and upfront craft consultation terms. |
| **`/custom-design`** *(Custom Brief)* | Interactive design customizer allowing customers to select fabric, embroidery style, placement, and attach design ideas. |
| **`/track-order`** *(Order Tracking)* | Real-time 4-stage visual progress stepper (*Received*, *In Progress*, *Quality Check*, *Ready for Dispatch*) with interactive stage simulator. |
| **`/resources`** *(Care Guide)* | Fabric care recommendations, maintenance tips for delicate metallic threads, and downloadable embroidery care manual. |
| **`/membership`** *(VIP Club)* | Atelier membership preview showcasing seasonal priority bookings and early collection previews. |
| **`/account`** *(Customer Demo)* | Client portal demo featuring saved favourite designs, quote basket summary, and order tracking links. |
| **`/contact`** *(Inquiries)* | Contact form, workshop consultation hours, and WhatsApp inquiry links. |

### Key Interactive Utilities
- **AI Craft Consultant Modal**: Real-time styling recommendations, fabric pairings, and thread analysis powered by Gemini with full offline fallback.
- **Quote Basket / Cart**: Slide-out tray allowing visitors to collect design ideas and request tailored estimates without checkout commitment.
- **Dark / Light Theme Engine**: Seamless theme switching with high-contrast palette tokens.
- **Needle & Thread Custom Cursor**: Subtle glowing indicator active strictly on fine pointer devices (`hover: hover`).

---

## 🎨 Motion & Visual Design System

This branch focuses on lightweight, high-performance interactions:

- **Typography**: Google Fonts — *Cormorant Garamond* (luxury craft display serif) and *Plus Jakarta Sans* (refined modern sans-serif).
- **Color Palette**:
  - Rose Primary: `#F43F5E`
  - Coral Accent: `#FB923C`
  - Light Silk Canvas: `#FFF1F2`
  - Dark Velvet Canvas: `#121013` (Surfaces: `#1C161C`)
- **Reduced Motion Support**: All animations strictly respect `prefers-reduced-motion: reduce`. Canvas animation pauses and CSS transition durations are minimized.
- **No Heavy Motion Dependencies**: Pure CSS transitions and modern lightweight `motion` utilities (no `framer-motion` overhead).

---

## 🔄 Contract-First API Architecture

This monorepo follows a strict **contract-first** workflow for all API endpoints:

```mermaid
graph LR
    A["OpenAPI Spec<br/>(lib/api-spec/openapi.yaml)"] -->|pnpm codegen| B["Zod Schemas<br/>(lib/api-zod)"]
    A -->|pnpm codegen| C["React Hooks<br/>(lib/api-client-react)"]
    B --> D["Express Server<br/>(artifacts/api-server)"]
    C --> E["Vite React Client<br/>(artifacts/spandana-embroidery)"]
```

> [!CAUTION]
> **Never hand-edit generated files**:
> - `lib/api-zod/src/generated/*`
> - `lib/api-client-react/src/generated/*`  
> Always edit [`lib/api-spec/openapi.yaml`](lib/api-spec/openapi.yaml) and run `pnpm -F @workspace/api-spec codegen`.

---

## ✅ Manual Testing Checklist

- [ ] **Navigation & Menus**: Header drawer opens, traps keyboard focus, closes on Escape or navigation.
- [ ] **Theme Switching**: Toggling between Light and Dark mode updates theme tokens and persists across reload.
- [ ] **AI Advisor Flow**: Test consultation both with `GEMINI_API_KEY` active and in offline mode.
- [ ] **Order Tracking**: Enter a sample tracking code (e.g., `SE-2025-8841`) to verify 4-stage stepper and details.
- [ ] **Quote Basket**: Add items from portfolio, verify count badge updates, test item removal.
- [ ] **Accessibility pass**: Ensure skip-link is operational, all inputs have associated labels, and focus rings are distinct.
- [ ] **Reduced Motion**: Enable `prefers-reduced-motion` in OS settings to verify canvas and cursor optimizations.

---

## 🤝 Contributing Guidelines

1. Always read [**`AGENTS.md`**](AGENTS.md) before writing code.
2. Run `pnpm run typecheck` before pushing any changes.
3. Keep all credentials inside untracked `.env` files.
4. Keep experimental motion changes scoped within this branch.

---

*Spandana Embroidery Atelier • Crafted with precision and pride.*
