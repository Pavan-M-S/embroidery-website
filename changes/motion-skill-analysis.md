# High‑Agency Polishing Plan – Integrated with Design Motion Principles

---

### 1. Project Baseline & Dependency Check  
| Skill | Purpose |
|-------|---------|
| `goal` / `goal_report` | Define sprint goal and verify completion. |
| `grep` | Scan for disallowed patterns (banned fonts, icons, etc.). |
| `search` | Locate config files, verify library presence. |
| `agent_manager_models` | Confirm available animation‑library versions. |

**Actions**  
1. Check `pnpm-lock.yaml`/`package.json` for: `framer-motion`, `@phosphor-icons/react`, `@radix-ui/react-icons`.  
2. If missing, run `pnpm add <library>` (or `npm i`).  
3. Ensure Tailwind is v3 (or v4 with proper PostCSS).  
4. Verify that no banned fonts (`Inter`, `Roboto`, `Arial`, `Open Sans`, `Helvetica`) appear in `tailwind.config.js` or JSX.  

---

### 2. Tailwind & PostCSS Configuration (Design‑Taste + High‑End Visual Design)  
| Skill | Purpose |
|-------|---------|
| `design-taste-frontend-v1` | Align Tailwind with high‑variance (8), motion‑intensity (6), visual‑density (4). |
| `high-end-visual-design` | Enforce banned‑item rules, premium font stack, ultra‑light icons, custom borders/shadows, variance engine. |
| `search` | Find `tailwind.config.js` & `postcss.config.js`. |
| `edit` | Rewrite to: <br>• Custom colors (emerald, zinc, slate). <br>• Utilities for `grid-ease`, `double-bezel`, `motion‑spring`. <br>• Font family: `Geist`, `Satoshi`, or `Cabinet Grotesk` (no banned fonts). <br>• Icon stroke width: `2`. <br>• Remove generic shadows/borders; use `ring-1 ring-black/5` or `border border-white/10` for outer shells. |

**Actions**  
- Set `fontFamily` to `['Geist', 'sans-serif']` (or `Satoshi`/`Cabinet Grotesk`).  
- Add `ring-outer`: `ring-1 ring-black/5 dark:ring-white/10`.  
- Add `shadow-inner`: `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`.  
- Ensure `backdrop-blur` utilities exist (`backdrop-blur-md`, `backdrop-blur-2xl`).  
- Keep PostCSS vanilla for Tailwind v3; add `@tailwindcss/postcss` only if v4 detected.  

---

### 3. Motion Layer – Core & Advanced  
| Skill | Purpose |
|-------|---------|
| `motion` | Core component API (`motion.div`, `variants`, `transitions`). |
| `motion-advanced` (English source from core motion “Advanced” section) | Advanced controls: `useAnimation`, `useAnimate`, `LazyMotion`, `MotionConfig`, `transformTemplate`, `addScaleCorrector`, scroll‑linked animations. |
| `high-end-visual-design` | Enforce fluid motion choreography: custom cubic‑bezier, scroll‑entry animations, magnetic button hover, fluid island nav, staggered reveals. |
| `search` | Locate animation‑related imports & usage. |
| `edit` | Replace ad‑hoc CSS transitions with Motion variants; integrate advanced hooks per high‑end choreography. |

**Actions**  
**Core**  
- Convert static `className="transition-[...]"` to `motion.div` with `initial`, `animate`, `whileHover`. Use spring physics: `type: "spring", stiffness: 100, damping: 20`.  

**Advanced**  
- Create `src/hooks/useAnimateEnter.ts` returning variants for enter/exit (fluid island nav style).  
- Use `useAnimation` + `useAnimate` for sequenced animations (e.g., product‑card reveal).  
- Wrap large motion‑heavy lists in `LazyMotion` to code‑split.  
- Add `MotionConfig` at app root: set global `transitionEnd` to a custom cubic‑bezier (e.g., `cubic-bezier(0.32,0.72,0,1)`) and reduced‑motion fallback.  
- Implement scroll‑linked parallax: `useScroll` + `useTransform` to drive `translateY` on background images.  
- Use `transformTemplate` for custom strings (e.g., `filter: blur(${amount}px)`).  
- Apply `addScaleCorrector` on layout‑animated elements (e.g., `AnimatePresence` items) to prevent scale drift.  
- **Stagger**: Parent `motion.ul` with `variants`; child `motion.li` using `staggerChildren: 0.08`.  

**High‑End Motion Choreography**  
- **Fluid Island Nav**: Navbar as floating glass pill (`mt-6 mx-auto w-max rounded-full`). Hamburger morph: lines rotate to form X (`rotate-45` & `-rotate-45`). Expanded menu: overlay `backdrop-blur-3xl bg-black/80` with staggered mask reveal (`translate-y-12 opacity-0 → translate-y-0 opacity-100`, delays `delay-100`, `delay-150`, `delay-200`).  
- **Magnetic Button Hover**: Use `group` utility; on hover: `scale-[0.98]` (press), nested icon circle `translate-x-1 -translate-y-[1px] scale-105`.  
- **Scroll Entry Animations**: Elements enter viewport with `translate-y-16 blur-md opacity-0 → translate-y-0 blur-0 opacity-100` over 800ms+. Use `whileInView` (Framer Motion) or `IntersectionObserver`; **never** `window.addEventListener('scroll')`.  

---

### 4. Interaction Components – Client‑Only Isolation  
| Skill | Purpose |
|-------|---------|
| `design-taste-frontend-v1` | Ensure interactive pieces are `"use client"` leaves. |
| `motion` | Provide `useMotionValue` & `useTransform` for magnetic/follow effects. |
| `high-end-visual-design` | Enforce double‑bezel, nested CTA button‑in‑button, spatial rhythm, eyebrow tags. |
| `search` | Find components missing `"use client"` directive. |
| `edit` | Add `"use client"` and refactor as isolated leaf components; apply double‑bezel & CTA patterns. |

**Actions**  
- **CustomCursor**: `"use client"` + friction `useMotionValue` for smooth follow.  
- **FloatingAIButton**: Outer shell (`ring-outer rounded-[2rem] p-1.5 bg-black/5`), inner core (`bg-white/20 shadow-inner rounded-[calc(2rem-0.375rem)]`). Button‑in‑button: main button `rounded-full px-6 py-3`, trailing icon wrapped in `w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center`.  
- **GeminiCraftAdvisorModal**: Double‑bezel container, `AnimatePresence` with `layoutId` for shared‑element transition.  
- Add **eyebrow tags** before H1/H2: `<span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium">New Collection</span>`.  
- Ensure **macro‑whitespace**: sections use `py-24` to `py-40`.  

---

### 5. Layout & Design Variance (Design‑Taste + High‑End Visual Design)  
| Skill | Purpose |
|-------|---------|
| `design-taste-frontend-v1` | Implement asymmetric layouts, masonry grids, split‑screen heroes. |
| `high-end-visual-design` | Apply Variance Engine: pick one Vibe & Texture Archetype + one Layout Archetype; enforce mobile collapse rules; avoid banned layouts/motion. |
| `search` | Locate existing grid/flex usage. |
| `edit` | Replace flex‑percentage math with CSS Grid; remove `w-[calc(...)]`; apply chosen archetypes. |

**Actions**  
- **Vibe & Texture Archetype (selected per prompt context)**: For an embroidery‑craft site, choose **Editorial Luxury** (warm creams `#FDFBF7`, muted sage/deep espresso, Variable Serif headings, subtle CSS noise/film‑grain `opacity-[0.03]`).  
- **Layout Archetype (selected per prompt context)**: Choose **The Asymmetrical Bento** (masonry‑like CSS Grid with varying `col-span`/`row-span`).  
- Implement:  
  - Hero on `/`: `md:flex-row-reverse` (`md:flex-2` content, `md:flex-1` image) + `layoutId` for shared‑element transition to inner page.  
  - Product list: `grid grid-cols-1 md:gap-6 md:grid-cols-3` with items using `col-span-2 row-span-1`, `col-span-1 row-span-2`, etc., to create bento asymmetry.  
  - Mobile collapse (`<768px`): force `grid-cols-1`, reset all `col-span`/`row-span` to `1`, use `w-full px-4 py-8`.  
- Ensure **no edge‑to‑edge sticky navbars**; use floating glass pill nav per fluid island nav.  
- Avoid **symmetrical 3‑column Bootstrap‑style grids**; rely on bento asymmetry.  

---

### 6. Performance Guardrails (Design‑Taste + High‑End Visual Design)  
| Skill | Purpose |
|-------|---------|
| `design-taste-frontend-v1` | Hardware‑accelerated only `transform`/`opacity`; controlled z‑index; DOM‑cost reduction. |
| `high-end-visual-design` | Enforce GPU‑safe animation, blur constraints, grain/noise only on fixed pseudo‑elements, z‑index discipline. |
| `search` | Find any animation of `width`, `height`, `top`, `left`. |
| `edit` | Convert to `transform: translate` + `opacity`. |
| `search` | Locate `backdrop‑blur` on scrolling containers; move to static overlays. |
| `edit` | Wrap parallax backgrounds in `pointer‑event‑none` fixed layer with `backdrop‑blur‑md`. |
| `design-taste-frontend-v1` | Memoize all `motion` components via `React.memo` + `useCallback`. |
| `high-end-visual-design` | Use `will-change: transform` sparingly, only on actively animating elements. |
| `search` | Verify no arbitrary `z-50` or `z-[9999]`; reserve z‑index for sticky nav, modals, overlays, tooltips. |

**Actions**  
- Animate only via `transform` and `opacity`.  
- Apply `backdrop-blur` only to fixed/sticky elements (navbars, overlays).  
- Apply grain/noise overlays exclusively to `fixed inset-0 z-50 pointer‑none` pseudo‑elements.  
- Set z‑index: sticky nav `z-10`, modal `z-40`, tooltip `z-50`.  

---

### 7. Accessibility & Reduced Motion  
| Skill | Purpose |
|-------|---------|
| `design-taste-frontend-v1` | Supply `useReducedMotion` hook; provide CSS fallback for prefers‑reduced‑motion. |
| `high-end-visual-design` | Ensure focus outlines are visible; maintain contrast; avoid motion that triggers vestibular issues. |
| `search` | Find hover/focus interactions lacking reduced‑motion guards. |
| `edit` | Wrap interactive elements with `motion.viewport={{once:true}}` and add `@media (prefers-reduced-motion: reduce)` CSS that disables non‑essential animations. |
| `design-taste-frontend-v1` | Ensure focus outlines are visible and contrast‑checked (≥ AA). |

**Actions**  
- If `useReducedMotion` returns true, replace button hover `scale` with simple `opacity` change.  
- Add `:focus-visible` outline (`outline: 2px solid emerald-500`).  
- Ensure all text meets AA contrast against backgrounds (use zinc/slate palettes).  

---

### 8. Iconography & Non‑Emoji Content  
| Skill | Purpose |
|-------|---------|
| `design-taste-frontend-v1` | Enforce `@phosphor-icons/react` only; global `strokeWidth: 2`. |
| `high-end-visual-design` | Ban standard thick‑stroked Lucide/FontAwesome/Material Icons; use ultra‑light precise lines (Phosphor Light, Remix Line). |
| `search` | Locate any `lucide-react` or other icon imports. |
| `edit` | Replace with Phosphor equivalents; remove emojis from alt‑text/text. |

**Actions**  
- Global icon wrapper: `<Icon name={name} className="w-5 h-5 text-emerald-600" />` (ensure `strokeWidth: 2` via CSS or inline style).  
- Verify no emoji characters appear in JSX or CSS content.  

---

### 9. Redesign Audit & Fix (Redesign Existing Projects Skill)  
| Skill | Purpose |
|-------|---------|
| `redesign-existing-projects` | Scan the codebase, diagnose generic patterns, and apply targeted upgrades without rewriting from scratch. |
| `search` | Locate files to audit (TSX, CSS, TS, JS). |
| `grep` | Find specific anti‑patterns (e.g., `Inter`, `Lucide`, `box-shadow`, `height: 100vh`). |
| `edit` | Apply fixes per the audit categories (Typography, Color, Layout, Interactivity, Content, Component Patterns, Iconography, Code Quality, Strategic Omissions). |

**Actions**  
**Scan**  
- Run `search ""` to list all source files under `artifacts/spandana-embroidery/src` and `lib/`.  
- Identify framework: Next.js/React with Tailwind CSS.  

**Diagnose** – List every generic pattern found (examples):  
- **Typography**: Use of `Inter` or system fonts; headlines lacking tight tracking; body width >65ch; only 400/700 font weights; numbers in proportional font; missing letter‑spacing; all‑caps subheaders; orphaned words.  
- **Color**: Pure `#000000` backgrounds; oversaturated accents; multiple accent colors; mixing warm/cool grays; purple/blue AI gradients; generic `box-shadow`; flat design with zero texture; perfectly even gradients; inconsistent lighting; random dark sections; empty flat sections lacking depth.  
- **Layout**: Everything centered/symmetrical; three equal card columns; `height: 100vh` for full‑screen; complex flexbox percentage math; missing max‑width container; forced equal card heights via flexbox; uniform border‑radius; no overlap/depth; symmetrical vertical padding; left‑sidebar dashboard pattern; missing whitespace; misaligned button baselines; feature lists starting at different Y; inconsistent vertical rhythm; optical misalignment of icons/text.  
- **Interactivity**: Missing hover/active states; instant transitions; missing focus ring; missing loading/empty/error states; dead links (`#`); no current‑page indicator in nav; scroll jumping; animations using `top/left/width/height`.  
- **Content**: Generic names (`John Doe`); fake round numbers (`99.99%`, `50%`); placeholder company names (`Acme`, `Nexus`); AI copywriting cliches; exclamation marks in success; “Oops!” errors; passive voice; identical blog post dates; same avatar for multiple users; Lorem Ipsum; Title Case headers.  
- **Component Patterns**: Generic card (border+shadow+white); always one filled + one ghost button; pill‑shaped “New/Beta” badges; accordion FAQs; 3‑card carousel testimonials; pricing table with 3 towers; modals for simple actions; avatar circles only; sun/moon dark toggle; footer link farm.  
- **Iconography**: Lucide/Feather exclusivity; cliché metaphors (rocketship, shield); inconsistent stroke widths; missing favicon; stock “diverse team” photos.  
- **Code Quality**: Div soup; inline styles mixed with classes; hardcoded pixel widths; missing alt text; arbitrary z‑index; commented dead code; import hallucinations; missing meta tags.  
- **Strategic Omissions**: No legal links; no back navigation; no custom 404 page; no form validation; no skip‑to‑content link; no cookie consent.  

**Fix** – Apply targeted upgrades in priority order:  
1. **Font swap** – Replace `Inter`/`system` with `Geist` (headings) and `Satoshi` (body) or `Cabinet Grotesk`. Add Medium (500) and SemiBold (600) weights. Use `font-variant-numeric: tabular-nums` for numbers. Apply negative tracking for large headers, positive for small caps/labels. Use `text-wrap: balance` to avoid orphans. Switch to sentence case for subheaders.  
2. **Color palette cleanup** – Replace `#000000` with `#0a0a0a` or `#121212`; desaturate accent to `<80%` saturation (e.g., emerald `#10b981`); pick **one** accent color; stick to either cool or warm gray family (choose cool: `zinc`/`slate`); remove purple/blue gradients; tint shadows to background hue (e.g., `shadow-[0_2px_4px_-1px_rgba(16,185,129,0.2)]`); add subtle noise/grain overlay (`bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]`); break gradient uniformity with radial or mesh gradients; ensure consistent lighting direction; unify background tone; add high‑quality blurred/overlay images behind hero/feature sections using `<Image src="https://picsum.photos/seed/embroidery/1920/1080" blur/>`.  
3. **Hover and active states** – Add `whileHover={{scale:1.02}}` or `scale-[102]` on buttons; `whileTap={{scale:[0.98]}}` for press feedback; add `transition-all duration-200` to interactive elements; ensure visible focus ring (`outline-2 outline-offset-2 outline-emerald-600`).  
4. **Layout and spacing** – Replace three‑equal‑card rows with asymmetric grid (`grid-cols-1 md:grid-cols-3 gap-6` with varying `col-span`/`row-span`); replace `height: 100vh` with `min-h-[100dvh]`; move to CSS Grid (`grid grid-cols-1 lg:grid-cols-3`) and remove flexbox percentage math; add max‑width container (`max-w-7xl mx-auto px-4`); allow variable card heights (remove `h-full` on cards); vary border‑radius (tighter on inner elements, softer on containers); create overlap/depth via negative margins (`-mt-4`) and `z-index`; adjust optical spacing (bottom padding slightly larger than top); replace left sidebar with top nav or floating command menu; double whitespace (`py-24` to `py-40`); pin buttons to bottom of card groups (`absolute bottom-0 left-0 right-0`); align feature list start Y via consistent `space-y-4` above list; fix vertical rhythm by aligning titles/descriptions/prices/buttons across columns; apply 1‑2px optical adjustments where icons meet text.  
5. **Replace generic components** – Convert generic cards to Double‑Bezel (see high‑end visual design); replace filled+ghost button pattern with text links or tertiary styles; replace pill‑shaped badges with square flags or plain text; replace accordion FAQs with side‑by‑side searchable list; replace 3‑card carousel with masonry wall or embedded social posts; highlight recommended pricing tier via color and emphasis (not just height); replace modals for simple actions with inline editing or slide‑over panels; replace avatar circles with squircles or rounded squares; replace sun/moon toggle with dropdown or system‑preference detection; simplify footer to main navigational paths + legal links.  
6. **Add loading, empty, and error states** – Replace generic circular spinners with skeleton loaders matching layout dimensions; design composed empty state illustrations with copy guiding user to add data; add inline form error messages (red text under field).  
7. **Polish typography scale and spacing** – Final tweaks: increase heading size (`text-5xl md:text-7xl`), tighten letter‑spacing (`tracking-tighter`), set body leading (`leading-relaxed`) and max width (`max-w-[65ch]`); ensure consistent vertical rhythm (`space-y-6`).  

**Verification** – After each fix batch, run the app locally (`pnpm dev`) and visually inspect; run lint (`pnpm lint`) and typecheck (`pnpm typecheck`).  

---

### 10. Motion Design Audit (Design Motion Principles)  
| Skill | Purpose |
|-------|---------|
| `design-motion-principles` | Audit existing motion design, produce a per‑designer report (Emil, Jakub, Jhey) and implement fixes per the audit checklist and anti‑checklist. |
| `search` | Locate all motion‑related code (framer-motion, CSS transitions, JS animations). |
| `edit` | Apply the audit findings: follow the Frequency Gate, Duration Guidelines, Golden Rule, and accessibility (`prefers-reduced-motion`). Use the Motion Cookbook for recipes, fix Creation Gotchas, and adhere to Performance guidelines. |

**Actions**  
- Run the design‑motion‑principles skill in **Audit** mode on the codebase.  
- Review the generated report (HTML or terminal) and note any violations:  
  - Animations that are too frequent without justification.  
  - Durations outside context‑dependent guidelines.  
  - Missing `prefers-reduced-motion` handling.  
  - Use of banned easing (`linear`, `ease-in-out`).  
  - Layout‑thrashing animations (animating `top/left/width/height`).  
  - Missing accessibility fallbacks.  
- For each finding, apply the fix:  
  - Remove or replace unnecessary animations with instant transitions where frequency is high.  
  - Adjust durations per context (e.g., productivity UI <300ms, production polish 200‑500ms, creative >500ms if delight is goal).  
  - Replace linear/ease‑in‑out with spring physics or custom cubic‑bezier (e.g., `cubic-bezier(0.32,0.72,0,1)`).  
  - Convert any `top/left/width/height` animations to `transform`/`opacity`.  
  - Add `prefers-reduced-motion` media query to disable non‑essential animations or reduce them to subtle fades.  
  - Ensure all motion follows the Golden Rule – if users notice every animation, tone it down.  
- After applying fixes, re‑run the audit to confirm all issues are resolved.  

---

### 11. Testing & Continuous Integration  
| Skill | Purpose |
|-------|---------|
| `design-taste-frontend-v1` | Provide reusable test utils for snapshot‑testing motion components. |
| `high-end-visual-design` | Ensure tests cover double‑bezel, CTA button‑in‑button, variance‑engine layouts, motion choreography. |
| `redesign-existing-projects` | Verify that all diagnosed generic patterns have been addressed. |
| `design-motion-principles` | Verify that motion audit passes with zero violations. |
| `search` | Find missing test files for interactive components. |
| `edit` | Add Jest + React‑Testing‑Library tests for `CustomCursor`, `FloatingAIButton`, lazy‑motion lists, scroll‑linked parallax, double‑bezel containers, CTA buttons, and any new components from the redesign fix. |
| `goal` | Define success criteria: ≥95 Lighthouse, all tests pass, zero lint errors, zero banned patterns per high‑end visual design, zero generic patterns per redesign audit, zero motion‑principles violations. |

**Actions**  
- Run `pnpm test:watch` during development.  
- Configure CI (GitHub Actions) to run lint, test, and build on each push.  

---

### 12. Final Deployment Checks (Vercel)  
| Skill | Purpose |
|-------|---------|
| `design-taste-frontend-v1` | Validate built output matches design spec. |
| `high-end-visual-design` | Confirm no banned patterns, proper variance engine applied, fluid motion choreography present. |
| `redesign-existing-projects` | Confirm the redesign audit has been cleared – no generic patterns remain. |
| `design-motion-principles` | Confirm motion design audit passes (no violations). |
| `webfetch` *(optional)* | Pull placeholder images from a reliable CDN if local assets are missing (used in redesign fix). |
| `goal` | Confirm deployment passes Lighthouse ≥95, Core Web Vitals good, zero accessibility violations, and the site feels like a “k‑agency build”. |

**Actions**  
- Deploy: `vercel --prod`.  
- Run `vercel env pull` to ensure env vars are set.  
- Monitor with Vercel Analytics; alert on performance regressions or Lighthouse drops.  

---

## List of Skills Used in This Plan  

1. **`goal` / `goal_report`** – Define and verify the sprint objective.  
2. **`search`** – Locate files, configs, and code patterns across the repo.  
3. **`grep`** – Detailed scanning for stray CSS/JS, banned patterns, and redesign audit diagnostics.  
4. **`edit`** – Direct modifications of existing source files.  
5. **`design-taste-frontend-v1`** – Core design rules (typography, color, layout, variance, density, motion intensity, performance, accessibility).  
6. **`motion`** – Core Motion API (components, variants, transitions, spring physics).  
7. **`motion-advanced`** – Advanced Motion concepts (useAnimation, useAnimate, LazyMotion, MotionConfig, scroll‑linked, transformTemplate, addScaleCorrector). *Current English source is taken from the “Advanced” section of the core motion skill; will be replaced when the official English version of motion‑advance is available.*  
8. **`high-end-visual-design`** – Principal UI/UX Architect & Motion Choreographer (Awwwards‑Tier) directives: banned fonts/icons/borders/shadows/layouts/motion, variance engine, double‑bezel, nested CTA, spatial rhythm, motion choreography, performance guardrails.  
9. **`redesign-existing-projects`** – Scan, diagnose, and fix generic AI design patterns without rewriting from scratch.  
10. **`design-motion-principles`** – Audit and improve motion design per Emil, Jakub, Jhey lenses, Frequency Gate, Duration Guidelines, Golden Rule, and accessibility.  
11. **`webfetch`** – Optional, for fetching external placeholder assets if needed.  
12. **`agent_manager_models`** – Verify available animation‑library versions before installation.  

---

### Final Checklist Before Release  

- [ ] All 3rd‑party libraries verified & installed (`framer-motion`, `@phosphor-icons/react`, `@radix-ui/react-icons`).  
- [ ] Tailwind config updated (custom colors, utilities, correct PostCSS plugin, premium font stack, no banned fonts).  
- [ ] Every interactive component has `"use client"` at the top.  
- [ ] Motion animations use spring physics (`stiffness:100, damping:20`) wherever applicable.  
- [ ] Advanced motion features (`useAnimation`, `LazyMotion`, `MotionConfig`, etc.) are integrated.  
- [ ] High‑end motion choreography present: fluid island nav, magnetic button hover, scroll entry animations, staggered reveals.  
- [ ] Reduced‑motion fallbacks are in place via `useReducedMotion` and CSS media query.  
- [ ] No emojis or generic icons; only Phosphor/Remix Line icons with `strokeWidth: 2`.  
- [ ] Layout uses CSS Grid; no `w-[calc(...)]` or flex‑percentage math; variance engine archetypes applied.  
- [ ] Mobile collapse (`<768px`) forces single‑column `w-full px-4 py-8`, removes overlaps/rotations.  
- [ ] No edge‑to‑edge sticky navbars; use floating glass pill per fluid island nav.  
- [ ] No symmetrical 3‑column Bootstrap‑style grids; rely on bento/masonry asymmetry.  
- [ ] Double‑bezel architecture applied to all major cards/containers (outer shell + inner core).  
- [ ] CTA buttons use button‑in‑button trailing icon pattern where applicable.  
- [ ] Section padding at minimum `py-24` (macro‑whitespace).  
- [ ] Eyebrow tags preceding H1/H2 as prescribed.  
- [ ] All transitions use custom cubic‑bezier curves — no `linear` or `ease‑in‑out`.  
- [ ] Scroll entry animations present — no element appears statically.  
- [ ] Layout collapses gracefully below `768px` to single‑column with `w-full` and `px‑4`.  
- [ ] All animations use only `transform` and `opacity` — no layout‑triggering properties.  
- [ ] `backdrop-blur` is only applied to fixed/sticky elements, never to scrolling content.  
- [ ] The overall impression reads as a “k‑agency build”, not a template with nice fonts.  
- [ ] Redesign audit has been cleared: zero generic patterns remain per the categories in the redesign skill.  
- [ ] Motion design audit (Design Motion Principles) has zero violations: frequency, duration, accessibility, easing, and golden‑rule compliance confirmed.  

Executing this plan will raise the embroidery‑website to a premium, high‑agency front‑end experience—visually striking, performant, accessible, and fully aligned with Motion‑advanced capabilities while eliminating all generic AI design fingerprints and ensuring motion follows the principles of Emil Kowalski, Jakub Krehel, and Jhey Tompkins.