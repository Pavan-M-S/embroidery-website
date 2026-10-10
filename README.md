# Spandana Embroidery

> **“Quality embroidery at affordable prices”**

A refined, accessible, multi-page corporate website for **Spandana Embroidery**, a home-owned craft embroidery atelier in India specializing in Indian-style hand-embellished women’s clothing (kurtis, anarkalis, festive blouses, saree borders) and children’s traditional clothing (pattu pavadais, baby jhablas, festive kurtas).

---

## 1. Architecture & Technology Stack

- **Framework**: React 19 with TypeScript and modern functional components
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Tailwind CSS v4 with CSS Custom Properties and zero-pill typographic discipline
- **Icons**: `lucide-react` (semantic interface icons, strictly no emoji UI icons)
- **Typography**: Google Fonts — *Cormorant Garamond* (luxury craft display serif) and *Plus Jakarta Sans* (readable body sans-serif), paired with *JetBrains Mono* for tabular numbers
- **Backend & AI Proxy**: Node.js & Express server (`server.ts`) with Vite middleware, integrating the `@google/genai` TypeScript SDK for AI craft consultation, custom design analysis, and text-to-speech
- **Accessibility**: WCAG 2.2 AA targeting visible focus states (`:focus-visible`), skip-to-content anchor, semantic dialogs, aria-live regions, and complete `prefers-reduced-motion` compliance.

---

## 2. Brand Visual Identity

- **Primary Rose**: `#F43F5E`
- **Accent Coral**: `#FB923C`
- **Light Background**: `#FFF1F2`
- **Dark Canvas**: `#121013` / Card Surfaces `#1C161C`
- **Craft Motifs**: Organic silk thread canvas animation (`ThreadCanvas`), delicate running stitch borders, non-blocking custom cursor for mouse pointer devices.

---

## 3. Site Map & Included Pages (8 Distinct Pages)

1. **Home (`/`)**:
   - Hero banner with brand name, tagline, welcoming overview, animated silk thread canvas, and clear actions.
   - Verifiable craft foundation (home atelier, colourfast threads, gentle children’s linings, upfront estimates).
   - Featured designs showcase.
   - 4-step craft process overview.
   - Custom-design callout banner.
   - Accessible FAQ accordion.

2. **Designs / Portfolio (`/designs`)**:
   - Curated portfolio across women’s clothing, children’s wear, and festive bridal embellishments.
   - Category filtering (All, Women’s, Children’s, Festive, Saved Favourites).
   - Real-time search across titles, descriptions, fabrics, and stitch tags.
   - Sorting by curated order, price ascending/descending, and alphabetical.
   - Illustrative pricing disclaimer.
   - Resilient cards with instant SVG fallback pattern on any image load issue.

3. **Pricing & Tiers (`/pricing`)**:
   - Transparent starting tiers (Gentle Accent ₹350+, Artisan Yoke ₹750+, Heritage & Bridal ₹1,500+).
   - Mobile-responsive comparison table and breakdown of quote-determining factors (fabric sensitivity, stitch density, metallic zari, turnaround).

4. **Custom Design (`/custom-design`)**:
   - Step-by-step custom ordering guide.
   - Validated intake form (Name, contact method, garment type, idea description, preferred colors, reference link).
   - AI Craft Consultant analysis button to evaluate design ideas, suggest stitch types, and recommend color palettes.
   - Demo-mode transparency banner and direct owner contact fallback.

5. **Membership (`/membership`)**:
   - Repeat-patron loyalty concept ("Spandana Craft Circle").
   - Clearly labeled illustrative benefits (festival booking priority, complimentary repair stitching, color swatch previews).
   - Interactive demo sign-up using local state only.

6. **Free Resources (`/free-resources`)**:
   - Garment-preparation guidance (pre-washing, seam margins).
   - Design-planning checklist and fabric-care instructions.
   - Real, on-the-fly downloadable text guide (`Spandana_Embroidery_Care_Guide.txt`) with zero broken links.
   - Text-to-Speech audio narration feature.

7. **Track Order (`/track-order`)**:
   - Customer project tracking portal allowing visitors to look up any Quote ID (e.g., `SPN-1042`, `SPN-2048`, `SPN-3015`, `SPN-4091`).
   - 4-stage visual progress stepper: *Received*, *In Progress*, *Quality Check*, and *Ready for Shipping*.
   - Local state progression simulator to test live stage updates and milestone timestamp logs.
   - Detailed garment parameters: customer name, design title, fabric provided, thread materials, and workshop notes.

8. **Account (`/account`)**:
   - Customer login and registration tabs with password visibility toggle.
   - Form validation with accessible error announcements.
   - Clearly labeled demo-only state (no sensitive passwords or personal data stored in `localStorage`).
   - Active demo session dashboard displaying saved favourites, quote basket counts, and direct link to track orders.

9. **Contact (`/contact`)**:
   - Validated online contact form.
   - Clearly labeled editable placeholders for phone, WhatsApp, email, operating hours, and city.
   - Graceful Google Maps placeholder state explaining where the owner embeds their map location.

---

## 4. Site-Wide Utilities & Accessibility

- **Hamburger Menu**: Sole primary navigation control in the header, fully responsive on mobile and desktop with keyboard Escape listener and focus trapping.
- **Quote Basket / Cart**: Dedicated slide-out modal where visitors collect and compare design shortlists before requesting an estimate (with explicit notice that items are not charged).
- **Favourites Feature**: Heart toggle on design cards persisting bookmarks in `localStorage`.
- **Search System**: Global search bar in header that navigates directly to matching portfolio designs.
- **Dark / Light Theme Toggle**: Seamless mode switching with accessible contrast in both themes.
- **Custom Cursor**: Needle & thread glow indicator strictly active on fine pointer devices (`hover: hover`), non-blocking (`pointer-events-none`), and disabled on touch and reduced motion.
- **Back-To-Top**: Floating smooth-scroll button appearing after 320px scroll.

---

## 5. Owner Customization Guide

All business details, contact channels, and portfolio items are centralized in one clean configuration file:

```typescript
// Edit this file: src/data/designsData.ts
export const BUSINESS_CONFIG = {
  businessName: 'Spandana Embroidery',
  tagline: 'Quality embroidery at affordable prices',
  
  // Replace these with genuine owner details:
  phonePlaceholder: '+91 [Owner Phone Number]',
  whatsappPlaceholder: '+91 [Owner WhatsApp Number]',
  emailPlaceholder: 'contact@[spandana-embroidery-placeholder].com',
  workingHours: 'Monday – Saturday: 10:00 AM – 6:30 PM IST',
  workshopCityPlaceholder: '[City / District, State, India]',
  
  socialLinks: {
    instagram: 'https://instagram.com/[your-handle-placeholder]',
    whatsapp: 'https://wa.me/[your-whatsapp-placeholder]',
    facebook: 'https://facebook.com/[your-page-placeholder]',
  },

  // Paste real Google Maps embed link here when ready:
  googleMapsEmbedUrl: '', 
};
```

---

## 6. Environment Variables

Create or update `.env` in the root directory:

```env
# GEMINI_API_KEY: Injected automatically by AI Studio secrets.
# Used for server-side AI craft advisory, design analysis, and text-to-speech.
GEMINI_API_KEY="your-gemini-api-key"

# PORT: Dev server runs on port 3000
PORT=3000
```

---

## 7. Setup & Run Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (runs full-stack Express + Vite on port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm start
```

---

## 8. Manual Testing Checklist

- [x] **Navigation**: Header hamburger menu opens drawer, tabs through all 8 pages, closes on Escape, closes on route navigation.
- [x] **Forms**: Custom design and contact forms validate required inputs, prevent submission on empty fields, and display accessible confirmation banners.
- [x] **Theme Toggle**: Switching between Light and Dark mode toggles classes, updates theme tokens, and persists choice across page reloads.
- [x] **Favourites**: Clicking heart saves design to local storage, increments header count badge, and filters view under `/designs?filter=favourites`.
- [x] **Quote Basket**: Adding designs increments cart badge, allows quantity adjustments, displays non-purchase notice, and submits estimate request demo.
- [x] **Responsive Layout**: Tested across mobile (375px), tablet (768px), and wide desktop (1440px) without horizontal overflow.
- [x] **Keyboard Accessibility**: Tab key reaches skip-to-content link, form fields, modal close buttons, and accordion controls with visible focus rings.
- [x] **Reduced Motion**: Disabling animations in system preferences pauses thread canvas movement and removes transition latency.
