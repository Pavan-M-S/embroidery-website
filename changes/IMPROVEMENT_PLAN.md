# Spandana Embroidery — Complete Improvement Plan

**Repo:** `A:\PAVAN\Main\VS Code Projects\Websites\embroidery-website`
**Main app:** `artifacts/spandana-embroidery/` (Vite + React 19 + Tailwind v4 + wouter)
**API server:** `artifacts/api-server/` (Express + TypeScript)
**Aux:** `artifacts/mockup-sandbox/`, `lib/*`, `scripts/`, root `src/` (dead), `temp_server.ts` (dead)

---

## Decisions Locked

| Item | Decision |
|---|---|
| Motion library | **Option A** — install `motion` (`pnpm add motion`), import from `motion/react`, remove `framer-motion` from `package.json` + pnpm catalog |
| Visible contact details | **Real details** on footer, contact page, WhatsApp/phone buttons (`+91 7207402157`, Tadipatri address) |
| Custom cursor | **Keep and fix** |
| Scope | **All phases 0 → 1 → 2 → 3 → 4**, committed per phase, no push |

---

## Phase 0 — Fix Regressions (My Bugs, ~10 min)

### 0.1 Double `/api` prefix on inquiries router
**File:** `artifacts/api-server/src/routes/index.ts:10`
```diff
- router.use("/api", inquiriesRouter);
+ router.use(inquiriesRouter);
```
**Why:** `app.ts:32` already does `app.use("/api", router)`. My edit created `/api/api/inquiries/*` — wrong URL vs spec + client.

### 0.2 Gemini fallback missing API key (user-pasted keys → 401)
**File:** `artifacts/spandana-embroidery/src/components/GeminiCraftAdvisorModal.tsx:458-462`
```diff
- const geminiUrl = `${geminiBase}/models/${gModel}:generateContent`;
- const gRes = await fetch(geminiUrl, {
-   method: "POST",
-   headers: { "Content-Type": "application/json" },
+ const geminiUrl = `${geminiBase}/models/${gModel}:generateContent`;
+ const gRes = await fetch(geminiUrl, {
+   method: "POST",
+   headers: {
+     "Content-Type": "application/json",
+     "x-goog-api-key": activeGeminiKey,
+   },
```
**Why:** Guard at line 399 only runs when `activeGeminiKey` exists (user pasted in Settings). Was sending keyless request → 401 × 3 models = ~36s dead wait. `x-goog-api-key` header is Google's supported header-based auth; keeps key out of URL (no log/Referer leak). Build-time keys remain impossible to leak (`""`).

---

## Phase 1 — Functional Correctness Bugs (Code is Wrong)

### 1.1 `build.mjs` externals swallows `@google/genai` → deploy crash
**File:** `artifacts/api-server/build.mjs:67`
```diff
- const external = ["@google/*", "@google-cloud/*", "pg", ...];
+ const external = ["@google-cloud/*", "pg", ...];
```
**Why:** Glob `"@google/*"` matches `@google/genai` (runtime dep). Bundle becomes non-self-contained.

### 1.2 TTS endpoint uses nonexistent model
**File:** `artifacts/api-server/src/routes/gemini.ts:274`
```diff
- model: "gemini-3.8-flash-lite-tts",
+ model: "gemini-2.5-flash-preview-tts",
```
**Why:** Current Gemini TTS models are `gemini-2.5-flash-preview-tts` / `gemini-2.5-pro-preview-tts`. Endpoint permanently 500s.

### 1.3 `/track-order` gets "Page not found" SEO title
**File:** `artifacts/spandana-embroidery/src/App.tsx:66-99`
Add to `pageMeta`:
```ts
"/track-order": {
  title: "Track Your Order | Spandana Embroidery",
  description: "Live needlework status for your custom embroidery order.",
},
```

### 1.4 Whole-page remount on every state change (resets accordions/counters)
**File:** `artifacts/spandana-embroidery/src/App.tsx:351-375`
```diff
- <Route path="/designs" component={() => <DesignsPage />} />
+ <Route path="/designs" element={<DesignsPage />} />
```
Replace all 8 inline `component={() => …}` with `element={…}` (or hoist components).

### 1.5 localStorage unguarded — white-screen risk
**File:** `artifacts/spandana-embroidery/src/App.tsx:101-115`
```ts
// read
try {
  const v = localStorage.getItem(key);
  if (v) {
    const parsed = JSON.parse(v);
    if (Array.isArray(parsed)) setValue(parsed);
  }
} catch { /* ignore */ }

// write
try {
  localStorage.setItem(key, JSON.stringify(value));
} catch { /* ignore */ }
```

### 1.6 Track Order fabricates orders + dead WhatsApp link
**File:** `artifacts/spandana-embroidery/src/pages/TrackOrderPage.tsx`
- Remove auto-fabrication at lines 73-104 (or at least don't persist fabricated orders)
- Fix line 478: `BUSINESS_CONFIG.whatsapp` now real → `wa.me/917207402157` works
- Remove 8 unused lucide imports (lines 2-18)

### 1.7 All shadows invisible (tokens alpha `/ 0`)
**File:** `artifacts/spandana-embroidery/src/index.css:120-137, 240-257`
Replace every `--shadow-*` definition with real values (e.g., `--shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.1), 0 4px 6px -2px hsl(0 0% 0% / 0.05);` — tint to rose hue).

### 1.8 `animate-fade-in` class doesn't exist
**File:** `artifacts/spandana-embroidery/tailwind.config.js` (if exists) or CSS
Add:
```css
@theme {
  --animate-fade-in: fade-in 0.3s ease-out;
}
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
```
Used at: `GeminiCraftAdvisorModal.tsx:557,622`, `TrackOrderPage.tsx:256`.

---

## Phase 2 — Design Improvements (Visual Polish)

### 2.1 Remove unused Inter font link
**File:** `artifacts/spandana-embroidery/index.html:31-34` — delete `<link rel="preconnect" href="https://fonts.googleapis.com">` + Inter preload. Keep DM Sans + Playfair Display `@import` in `index.css:1` but convert to `<link rel="preload">` for performance.

### 2.2 Add social share images
**File:** `artifacts/spandana-embroidery/index.html` — add `og:image`, `twitter:image`. Remove `maximum-scale=1` from viewport (WCAG 1.4.4).

### 2.3 Dark mode: fix hardcoded pastel blocks
**File:** `artifacts/spandana-embroidery/src/index.css`
Convert these to use color-mix tokens / dark variants:
- `.intro-band` (868-872) — `background: #ffe3df`
- `.quote-strip` (984-994) — hardcoded light pastel
- `.closing-cta` (1057-1061)
- `.membership-card` (1792-1799)
- `.guide-card` (1888-1893)

### 2.4 Fill `--shadow-*` tokens (see 1.7) — tint to rose hue

### 2.5 FloatingAIButton / back-top z-index collision
**Files:** `FloatingAIButton.tsx:13` (z-40), `index.css:1155` (z-12)
Use systemic layer scale: `--z-back-top: 200`, `--z-floating-ai: 300`, `--z-modal: 1000`.

### 2.6 Pricing: surface collected but unused data
**File:** `artifacts/spandana-embroidery/src/App.tsx:1033-1069`
Show `includedFeatures`, `turnaroundNote`, highlight `isPopular` with color (not height), align feature lists to same Y baseline across 3 columns.

### 2.7 Fix "Reset your view" dead link
**File:** `App.tsx:981-987` — change to a button that clears `query` + `category` + `onlySaved` state.

### 2.8 Humanize category chips
**File:** `App.tsx:848-851` — `womens` → `Women's`, `childrens` → `Children's`, `festive` → `Festive`.

### 2.9 Make "Featured" sort real
**File:** `App.tsx:863` — use `design.filter(d => d.featured)` for that sort option.

### 2.10 Wire `fallbackArt` SVGs as image fallbacks
**File:** `App.tsx:119-141` (`ImageTile`) — on `<img onError={…}>` use `item.fallbackArt` instead of generic text box.

### 2.11 Fix duplicate Unsplash photos
**File:** `artifacts/spandana-embroidery/src/data/designs.ts`
- des-05 & des-11 share `photo-1617627143750-d86bc21e42bb`
- des-06 & des-12 share `photo-1609357605129-26f69add5d6e`
Replace with distinct images or local artwork.

### 2.12 FAQ: structured markup
**File:** `App.tsx:1523-1534` — replace inline `1) 2) 3)` with `<ol>` or accordion.

### 2.13 Footer: privacy/terms links
**File:** `App.tsx:560-587` — add `<a href="/privacy">Privacy</a> | <a href="/terms">Terms</a>`.

### 2.14 404 page: theme-aware + link home
**File:** `artifacts/spandana-embroidery/src/pages/not-found.tsx` — dark-mode colors, add `<Link to="/">← Back to Home</Link>`.

### 2.15 Visible site uses real contact details
**Files:**
- `artifacts/spandana-embroidery/src/data/business.ts:6-8` — real phone/WhatsApp/email/address
- `artifacts/spandana-embroidery/src/App.tsx` footer/contact page — read from `BUSINESS_CONFIG`
- `TrackOrderPage.tsx:478` — WhatsApp button now works

---

## Phase 3 — Motion / Animations (Using `motion/react`)

### 3.1 Install & migrate
```bash
pnpm add motion
# remove framer-motion from package.json + pnpm-workspace.yaml catalog
```
Update any imports (currently zero in `src/`).

### 3.2 Modal enter/exit transitions
**File:** `GeminiCraftAdvisorModal.tsx`
Wrap with `AnimatePresence mode="wait"`:
```tsx
<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
```

### 3.3 Staggered grid reveal (Designs page)
**File:** `App.tsx` — `DesignsPage` grid
```tsx
const containerVariants = useMemo(() => ({
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.07 } }
}), []);

const itemVariants = useMemo(() => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
}), []);
```
Wrap grid in `<motion.div variants={containerVariants} initial="hidden" animate="visible">` with `<motion.article variants={itemVariants}>` per tile.

### 3.4 Spring hover/tap on buttons & chips
Replace CSS `transition` on `.button`, `.chip`, `.round-arrow`, `.add-quote-button`, `.back-top` with `whileHover`/`whileTap`:
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
/>
```

### 3.5 Progress bar — animate `scaleX`
**File:** `TrackOrderPage.tsx` — replace width % with `transform: scaleX(progress)`.

### 3.6 Reduced motion respect everywhere
```tsx
import { useReducedMotion } from "motion/react";
const shouldReduceMotion = useReducedMotion();
const transition = shouldReduceMotion ? { duration: 0 } : { type: "spring", ... };
```

### 3.7 Perpetual micro-animations (isolated)
- Thread-pulse status dot (memoized leaf component)
- `useReducedMotion` guard
- `will-change: "transform"` on animated elements
- Variants in `useMemo`, no inline style objects

---

## Phase 4 — Cleanup / Dead Code Removal

### 4.1 Delete root `src/` (11 broken files, no entry point, not type-checked)
**Files:**
- `src/pages/HomePage.tsx`
- `src/pages/TrackOrderPage.tsx`
- `src/pages/FreeResourcesPage.tsx`
- `src/components/common/CustomCursor.tsx` (duplicate of `artifacts/.../components/CustomCursor.tsx`)
- `src/components/common/DesignCard.tsx`
- `src/components/common/DesignDetailModal.tsx`
- `src/components/common/FloatingAIButton.tsx`
- `src/components/common/GeminiCraftAdvisorModal.tsx` (604 lines behind live version)
- `src/data/designsData.ts`
- `src/data/trackingData.ts`
- `src/types/index.ts`

### 4.2 Delete `temp_server.ts` (dead, unrunnable, wrong ports/models)

### 4.3 Remove root `dist` copy step
**File:** `package.json:7` — delete `fs.cpSync('artifacts/spandana-embroidery/dist/public', 'dist', {recursive:true})`. Root `dist/` never served; leaves ~1.93 MB orphans.

### 4.4 Remove unused deps from `artifacts/spandana-embroidery/package.json`
- `@google/genai` (line 78) — only in api-server & temp_server
- `date-fns` (55) — never imported
- `react-icons` (65) — never imported
- `framer-motion` (57) — **replaced by `motion`**
- `@hookform/resolvers` (13) — never imported
- `zod` (75) — used only by `lib/db`/`lib/api-zod`, not this app

### 4.5 Remove unused deps from `artifacts/mockup-sandbox/package.json`
- `framer-motion` — replace with `motion` or remove
- All 29 `@radix-ui/*` — 55 UI components never reachable from `App.tsx`
- `react-hook-form`, `@hookform/resolvers`, `recharts`, `sonner`, `next-themes`, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `vaul`, `tw-animate-css`, `tailwindcss-animate`, `@tailwindcss/typography`, `react-icons`

### 4.6 Remove ~49 unused `ui/*` components from spandana-embroidery
Keep only: `toaster`, `toast`, `tooltip`, `card` (used by `not-found.tsx`), plus their internal deps (`button` etc.).

### 4.7 Remove `mockup-sandbox` from build
**File:** `pnpm-workspace.yaml:38` — remove `artifacts/*` or add exclusion. Its `dist/` consumed by nothing.

### 4.8 Fix port matrix + `API_PORT` confusion
- `.env.example` — remove `API_PORT` (nothing reads it)
- `replit.md`, `CLIXAD.md` — fix docs
- `artifacts/api-server/src/index.ts` reads `PORT` (default 5000)
- `vite.config.ts:97` proxy → `http://localhost:5000`
- Ensure Vite + API don't both claim 18274

### 4.9 `.replit` — add `run`/`build` commands, fix `runButton` workflow

### 4.10 `scripts/post-merge.sh` — fix `--filter @workspace/db` or delete (never installed)

### 4.11 `pnpm-workspace.yaml` — remove `lib/integrations/*` (folder doesn't exist), remove invalid `allowBuilds` key

### 4.12 `tsconfig.base.json:21` — `noUnusedLocals: true`

### 4.13 Trim `offlineCraftAdvisor.ts` (2,957 lines → ~900)
Remove ~2,000 lines of generated `(Ref: 101)`…`(Ref: 199)` filler. Keep curated intents only.

---

## Execution Order

```
Phase 0  →  verify  →  commit
Phase 1  →  verify  →  commit
Phase 2  →  verify  →  commit
Phase 3  →  verify  →  commit
Phase 4  →  verify  →  commit
```

Each phase = one commit with descriptive message. No pushes. All edits verified by re-reading files before commit.