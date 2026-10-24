# Spandana Embroidery — Frontend Client Application

[![Package](https://img.shields.io/badge/package-%40workspace%2Fspandana--embroidery-orange.svg)](package.json)
[![React](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](../../LICENSE)

> A high-performance, presentation-first web application for **Spandana Embroidery**, a home-owned Indian artisan atelier specializing in custom-crafted Indian ethnic wear for women and children (kurtis, anarkalis, festive blouses, saree borders, pattu pavadais, and baby jhablas).

---

## 📑 Table of Contents

- [Overview & Capabilities](#-overview--capabilities)
- [How to Run](#-how-to-run)
  - [From Workspace Root (Recommended)](#from-workspace-root-recommended)
  - [From Package Directory](#from-package-directory)
- [Project Architecture & File Layout](#-project-architecture--file-layout)
- [Interactive Features Deep Dive](#-interactive-features-deep-dive)
- [Owner Customization Guide](#-owner-customization-guide)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Manual Testing Checklist](#-manual-testing-checklist)

---

## 🌟 Overview & Capabilities

This client package delivers a luxury craft showcase combining traditional artisan motifs with cutting-edge web performance:

- **Artisan Silk Aesthetics**: Custom typography pairing (*Cormorant Garamond* display serif and *Plus Jakarta Sans* body sans), silk thread canvas animation, running stitch decorative borders, and dark/light mode tokens.
- **Gemini AI Craft Consultant**: Interactive modal powered by Google Gemini (via server-side proxy) providing personalized thread recommendations, fabric pairing advice, custom idea analysis, and optional text-to-speech audio narration.
- **Robust Offline Advisor Fallback**: Integrated knowledge base (`offlineCraftAdvisor.ts` & `websiteKnowledge.ts`) that guarantees instant craft consultations even when offline or without an active API key.
- **Interactive Order Tracking (`/track-order`)**: 4-stage visual progress stepper (*Received*, *In Progress*, *Quality Check*, *Ready for Dispatch*) with simulated stage updates and garment parameter breakdowns.
- **Client Favourites & Quote Basket**: Client-side bookmarking and planning aid stored in `localStorage` without collecting payment or sensitive data.
- **Accessible & Responsive**: Strict WCAG 2.2 AA compliance, visible `:focus-visible` indicators, complete keyboard navigation, and full `prefers-reduced-motion` compliance.

---

## 🚀 How to Run

### From Workspace Root (Recommended)

From the repository root directory:

```bash
# 1. Install dependencies across workspace
pnpm install

# 2. Run the frontend development server
pnpm -F @workspace/spandana-embroidery dev

# 3. Typecheck the frontend application
pnpm -F @workspace/spandana-embroidery typecheck

# 4. Build frontend for production
pnpm -F @workspace/spandana-embroidery build
```

The frontend development server starts on **[http://localhost:18274](http://localhost:18274)** (or the port specified by `$PORT`).

### From Package Directory

```bash
# From artifacts/spandana-embroidery/
pnpm dev         # Starts Vite dev server
pnpm build       # Bundles production assets into dist/public
pnpm serve       # Previews production bundle
pnpm typecheck   # Runs TypeScript check
```

---

## 🏛 Project Architecture & File Layout

```
artifacts/spandana-embroidery/
├── src/
│   ├── components/              # Modular UI components
│   │   ├── ui/                  # Accessible primitives (dialogs, accordions, tabs, buttons)
│   │   ├── CustomCursor.tsx     # Needle & thread glowing cursor (fine pointers only)
│   │   ├── FloatingAIButton.tsx # Sticky trigger for Gemini craft consultant modal
│   │   ├── GeminiCraftAdvisorModal.tsx # AI consultation dialog with voice narration
│   │   └── error-boundary.tsx   # React error boundary component
│   ├── data/                    # Centralized business & portfolio data
│   │   ├── business.ts          # Studio name, hours, contact placeholders, location
│   │   ├── designs.ts           # Curated portfolio items with categories and tags
│   │   ├── faqs.tsx             # Categorized client FAQ accordions
│   │   ├── pricing.ts           # Garment estimate guidelines and sample ranges
│   │   ├── tracking.ts          # Mock order tracking orders and timeline stages
│   │   └── types.ts             # TypeScript definitions for portfolio & store
│   ├── hooks/                   # Custom React hooks (e.g., useStoredList, use-mobile)
│   ├── lib/                     # Utilities and offline intelligence
│   │   ├── offlineCraftAdvisor.ts # Rule-based craft advisor for zero-key/offline mode
│   │   ├── websiteKnowledge.ts  # Static atelier domain knowledge repository
│   │   └── utils.ts             # Tailwind class merging (cn utility)
│   ├── pages/                   # Distinct route views
│   │   ├── TrackOrderPage.tsx   # Real-time order status tracking with timeline
│   │   └── not-found.tsx        # Accessible 404 error page
│   ├── App.tsx                  # Master router, header navigation, routes, modals
│   ├── InteractiveBackground.tsx# Organic silk thread canvas animation
│   ├── index.css                # Tailwind CSS v4 styling, custom fonts, theme variables
│   └── main.tsx                 # React DOM root entrypoint
├── public/
│   ├── embroidery-care-guide.txt # Downloadable artisan garment care manual
│   └── favicon.svg              # Studio needle-and-thread favicon
├── vite.config.ts               # Vite configuration with proxy to backend
├── tsconfig.json                # TypeScript compiler configuration
└── package.json                 # Package manifest
```

---

## 🎨 Interactive Features Deep Dive

### 1. Silk Thread Canvas (`InteractiveBackground.tsx`)
Renders gentle, drifting silk strands representing golden Zari and dyed silk threads. Pauses rendering automatically when the tab is hidden or when the user has enabled `prefers-reduced-motion`.

### 2. Needle & Thread Custom Cursor (`CustomCursor.tsx`)
A bespoke glowing embroidery needle indicator that tracks pointer coordinates on desktop devices. Automatically disabled on touch screens (`pointer: coarse`) and reduced-motion environments.

### 3. Gemini Craft Advisor (`GeminiCraftAdvisorModal.tsx`)
Offers instant bespoke styling advice:
- **Thread & Fabric Pairing**: Match silk, cotton, velvet, or georgette with Kasab, Zari, or Resham threads.
- **Design Idea Analysis**: Generates creative suggestions based on customer design prompts.
- **Voice Narration**: Text-to-speech audio playback of recommendations.
- **Offline Fallback**: Seamlessly queries `offlineCraftAdvisor.ts` if the API server or Gemini key is unavailable.

### 4. Interactive Order Tracking (`TrackOrderPage.tsx`)
Customers can enter tracking IDs (e.g., `SE-2025-8841`, `SE-2025-9012`, `SE-2025-9450`) to view live multi-stage milestones, turnaround estimations, thread specifications, and an interactive state simulator.

---

## ✏️ Owner Customization Guide

All studio information is centralized in `src/data/` for easy updates without modifying component code:

### 1. Business Profile & Contact Details (`src/data/business.ts`)
```typescript
export const BUSINESS_CONFIG = {
  businessName: 'Spandana Embroidery',
  tagline: 'Quality embroidery at affordable prices',
  phone: '+91 [Owner Phone Number]',
  whatsapp: '+91 [Owner WhatsApp Number]',
  email: 'contact@[spandana-embroidery].com',
  workingHours: 'Monday – Saturday: 10:00 AM – 6:30 PM IST',
  location: '[City / District, State, India]',
};
```

### 2. Portfolio Items & Images (`src/data/designs.ts`)
Replace sample image URLs with project-local photos or approved studio photography:
```typescript
{
  id: 'aari-bridal-blouse-01',
  title: 'Peacock Motif Bridal Blouse',
  category: 'Bridal',
  technique: 'Aari & Zardozi',
  fabric: 'Pure Silk',
  imageSrc: '/assets/images/bridal-blouse.webp', // Add real photo
  altText: 'Intricate peacock motif hand-embroidered with golden zari thread',
}
```

### 3. Sample Pricing Ranges (`src/data/pricing.ts`)
Adjust standard estimate brackets and turnaround times according to actual workshop rates.

---

## ⚙️ Environment Variables

The frontend application accepts the following variables (passed via root `.env` or system environment):

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `PORT` | `18274` | Local port for the Vite development server |
| `BASE_PATH` | `/` | Base URL path for assets and routing |
| `API_PROXY_TARGET` | `http://localhost:5000` | Target URL for `/api` requests proxied to Express |

> [!NOTE]
> Vite does not inline any `GEMINI_API_KEY` into client bundles. All requests to Gemini route through `/api` proxy.

---

## 📜 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `pnpm dev` | `vite --config vite.config.ts --host 0.0.0.0` | Launch local HMR dev server |
| `pnpm build` | `vite build --config vite.config.ts` | Compile production bundle into `dist/public` |
| `pnpm serve` | `vite preview --config vite.config.ts --host 0.0.0.0` | Preview production build locally |
| `pnpm typecheck` | `tsc -p tsconfig.json --noEmit` | Check TypeScript compilation |

---

## ✅ Manual Testing Checklist

- [ ] **All Routes Load**: Verify `/`, `/designs`, `/pricing`, `/custom-design`, `/track-order`, `/membership`, `/resources`, `/account`, and `/contact`.
- [ ] **Hamburger Navigation**: Operates smoothly, traps keyboard focus, closes on `Escape` key and outside click.
- [ ] **Theme Persistence**: Light and Dark mode toggle changes variables and retains selection upon browser refresh.
- [ ] **Search & Filter**: Search bar filters portfolio cards in real time; category chips update visible designs.
- [ ] **Favourites**: Heart toggles persist in `localStorage` and filterable on the portfolio page.
- [ ] **Quote Basket**: Adding items increments the badge count; quote brief builder captures shortlisted items.
- [ ] **AI Advisor**: Modal opens, handles text input, and falls back gracefully to local knowledge when API is disconnected.
- [ ] **Order Tracking**: Submitting tracking code displays 4-stage stepper, estimated delivery dates, and material specs.
- [ ] **Responsive Design**: Tested at 375px (mobile), 768px (tablet), and 1440px (desktop) without layout clipping.
- [ ] **Reduced Motion**: Disabling motion in OS preferences pauses thread canvas and disables custom cursor trail.
