# Spandana Embroidery — Phase Tracking

## Overview
- **Repo**: `A:\PAVAN\Main\VS Code Projects\Websites\embroidery-website`
- **Main app**: `artifacts/spandana-embroidery/` (Vite + React 19 + Tailwind v4 + wouter)
- **API server**: `artifacts/api-server/` (Express + TypeScript)

---

## ✅ PHASE 0 — Fix My Regressions (COMPLETED)
**Commit**: `a154b3c`

| # | Task | Status |
|---|------|--------|
| 0.1 | Remove double `/api` prefix on inquiries router (`router.use("/api", inquiriesRouter)` → `router.use(inquiriesRouter)`) | ✅ Done |
| 0.2 | Add `x-goog-api-key` header to Gemini fallback fetch (user-pasted keys work, no URL leakage) | ✅ Done |

---

## ✅ PHASE 1 — Functional Correctness Bugs (COMPLETED)
**Commit**: `3359224` (all fixes already in HEAD)

| # | Task | Status |
|---|------|--------|
| 1.1 | `build.mjs`: remove `"@google/*"` from externals (was swallowing `@google/genai`) | ✅ Done |
| 1.2 | `gemini.ts:274`: TTS model → `gemini-2.5-flash-preview-tts` | ✅ Done |
| 1.3 | `App.tsx`: add `/track-order` to `pageMeta` (fixes "Page not found" title) | ✅ Done |
| 1.4 | `App.tsx`: inline `component={() => …}` → `element={…}` on all 8 routes (stops full-page remount) | ✅ Done |
| 1.5 | `App.tsx`: localStorage `Array.isArray` guard + try/catch write (prevents white-screen) | ✅ Done |
| 1.6 | `TrackOrderPage`: stop fabricating orders; fix dead `wa.me/+91` link; remove 8 unused lucide imports | ✅ Done |
| 1.7 | `index.css`: fill all `--shadow-*` tokens (light + dark, rose-hued) — shadows were invisible | ✅ Done |
| 1.8 | `index.css`: add `.animate-fade-in` utility class | ✅ Done |
| 1.9 | `business.ts`: real contact details (phone/WhatsApp/email/address) | ✅ Done |

---

## ✅ PHASE 2 — Design Improvements (COMPLETED)
**Commit**: `715b2ff`

| # | Task | Status |
|---|------|--------|
| 2.1 | `index.html`: remove unused Inter font; add DM Sans+Playfair preload; add `og:image`/`twitter:image`; drop `maximum-scale=1` | ✅ Done |
| 2.2 | `index.css`: dark-mode fixes for `.intro-band`, `.quote-strip`, `.closing-cta`, `.membership-card`, `.guide-card` (all use `hsl(var(--muted))`) | ✅ Done |
| 2.3 | z-index: systemic layer vars `--z-back-top: 200`, `--z-floating-ai: 300`, `--z-modal: 1000` | ✅ Done |
| 2.4 | Pricing: surface `includedFeatures`, `turnaroundNote`, `isPopular` badge/styles; fix `src/data.ts` → `src/data/pricing.ts` ref | ✅ Done |
| 2.5 | Designs: "Reset your view" button clears filters; humanize chips (`womens`→`Women's`); "Featured" sort uses `featured` flag | ✅ Done |
| 2.6 | Designs: `fallbackArt` SVGs wired as `onError` fallbacks; fix duplicate Unsplash photos (des-05/11, des-06/12) | ✅ Done |
| 2.7 | FAQ: structured `ol/li` answers; CSS styles `ol/li` with proper markers | ✅ Done |
| 2.8 | Footer: real `BUSINESS_CONFIG` (phone/email/address/social); privacy/terms links | ✅ Done |
| 2.9 | 404 page: theme-aware, `min-h-dvh`, "← Back to Home" link | ✅ Done |
| 2.10 | `index.css`: `price-note` dark-mode, popular badge/styles, `price-includes`/`turnaround`, FAQ `ol/li` styling | ✅ Done |

---

## ✅ PHASE 3 — Motion / Animations (COMPLETED)
**Commit**: `4fbb174`

| # | Task | Status |
|---|------|--------|
| 3.1 | Install `motion@v14.1.0`; remove `framer-motion` from spandana-embroidery + mockup-sandbox + pnpm catalog; add `motion` to catalog | ✅ Done |
| 3.2 | Modal enter/exit via `AnimatePresence` + springs (GeminiCraftAdvisorModal, TrackOrderPage); settings panel animated | ✅ Done |
| 3.3 | Staggered grid reveal for design tiles: `staggerChildren: 0.07` | ✅ Done |
| 3.4 | Spring `whileHover`/`whileTap` on: Advance Status, add-quote, heart-button, back-top, saved-filter, category chips | ✅ Done |
| 3.5 | Progress bar animated via `motion.div` | ✅ Done |
| 3.6 | `useReducedMotion` guards + `will-change` + memoized variants (partial) | ⚠️ Partial |
| 3.7 | CustomCursor fix: `[]` deps + `useCallback` (fixes listener-churn); live `prefers-reduced-motion` listener; auto-disable on touch/coarse | ✅ Done |

---

## ⏳ PHASE 4 — Cleanup / Dead Code Removal (PENDING)

| # | Task | Status |
|---|------|--------|
| 4.1 | Delete root `src/` (11 broken files, no entry point, not type-checked) | ⏳ Pending |
| 4.2 | Delete `temp_server.ts` (dead, unrunnable, wrong ports/models) | ⏳ Pending |
| 4.3 | Remove root `dist` copy step (`package.json:7` `fs.cpSync`) | ⏳ Pending |
| 4.4 | Remove unused deps from spandana: `@google/genai`, `date-fns`, `react-icons`, `@hookform/resolvers`, `zod` | ⏳ Pending |
| 4.5 | Remove unused deps from mockup-sandbox: 29 `@radix-ui/*`, `react-hook-form`, `recharts`, `sonner`, `next-themes`, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `vaul`, `tw-animate-css`, `tailwindcss-animate`, `@tailwindcss/typography`, `react-icons` | ⏳ Pending |
| 4.6 | Remove ~49 unused `ui/*` from spandana (keep only toaster, toast, tooltip, card + internal deps) | ⏳ Pending |
| 4.7 | Remove `mockup-sandbox` from build (`pnpm-workspace.yaml` packages list) | ⏳ Pending |
| 4.8 | Fix port matrix: remove `API_PORT` from `.env.example`/`replit.md`/`CLIXAD.md`; ensure Vite (18274) + API (5000) don't collide | ⏳ Pending |
| 4.9 | `.replit`: add `run`/`build` commands; fix `runButton` workflow (points to missing `.replit/workflows/`) | ⏳ Pending |
| 4.10 | `scripts/post-merge.sh`: fix `--filter @workspace/db` (current `--filter db` matches nothing) or delete script | ⏳ Pending |
| 4.11 | `pnpm-workspace.yaml`: remove `lib/integrations/*` (dir doesn't exist); remove invalid `allowBuilds` key | ⏳ Pending |
| 4.12 | `tsconfig.base.json:21` `noUnusedLocals: true` | ⏳ Pending |
| 4.13 | Trim `offlineCraftAdvisor.ts` (2,957 → ~900 lines; remove 2,000 lines of generated `(Ref: 101)`…`(Ref: 199)` filler) | ⏳ Pending |

---

## 📝 Additional Items Not Yet Scheduled

| Area | Item |
|---|---|
| Security | Add rate limiting to API server (`app.ts`) |
| Security | Restrict CORS to known origins (currently `cors()` = `*`) |
| Security | Add JSON 404/error middleware to Express (currently returns HTML) |
| API | Add Zod validation to all Gemini routes (`message`/`history`/`text`) |
| API | Fix `GoogleGenAI` init at module load (defer or guard) |
| Content | Replace published PII in `websiteKnowledge.ts`/`offlineCraftAdvisor.ts` with placeholders (if policy changes) |
| Motion | Add `useReducedMotion()` guards to all motion components |
| Motion | Add `will-change: transform` to animated elements |
| Motion | Perpetual micro-animations (thread-pulse) isolated in `React.memo` leaves |

---

## Summary

| Phase | Commits | Status |
|-------|---------|--------|
| Phase 0 | `a154b3c` | ✅ Done |
| Phase 1 | `3359224` | ✅ Done |
| Phase 2 | `715b2ff` | ✅ Done |
| Phase 3 | `4fbb174` | ✅ Done |
| Phase 4 | — | ⏳ Pending (13 tasks) |

**Next**: Execute Phase 4 tasks. Each will be committed separately with descriptive messages.