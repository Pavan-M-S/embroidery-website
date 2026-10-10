# Spandana Embroidery — frontend demo

A responsive, presentation-first website for a home-owned Indian embroidery studio. The app is frontend-only: forms show a local demo success state and do not send information; account credentials are never persisted. Favourites, theme preference and the quote basket use local browser storage. The quote basket is a planning aid only, not checkout or purchase.

## Run the project

From the workspace root, run `pnpm install`, then start the site with `pnpm --filter @workspace/spandana-embroidery run dev`. Run `pnpm --filter @workspace/spandana-embroidery run typecheck` for TypeScript checks.

## Project structure

- `src/App.tsx` — shared navigation, reusable UI, page routes, and local demo interactions.
- `src/data.ts` — editable illustrative portfolio, FAQ, resource, and sample pricing data.
- `src/index.css` — responsive layout, theme tokens, and visual styles.
- `public/embroidery-care-guide.txt` — the included downloadable care guide.
- `README.md` — owner replacement notes and the manual testing checklist.

## Owner customization before publishing

1. **Images and portfolio copy:** edit `src/data.ts` (`designs`). Replace each inline illustrative SVG `imageSrc` with an approved, project-local image path and update its descriptive `alt`. Adjust names, category, garment and style to match real work. Do not present the included artwork as completed studio work.
2. **Prices and quote terms:** edit `priceExamples` in `src/data.ts` for sample ranges. Edit `PricingPage` in `src/App.tsx` to describe verified inclusions, exclusions, tax, payment, revision and quote validity terms. Current INR ranges are illustrative placeholders only.
3. **Contact and social details:** edit `ContactPage` and `Footer` in `src/App.tsx` to add only a verified email, phone number and actual social profile URLs. These are intentionally absent until the owner supplies them.
4. **Location and map:** no location or map has been invented. If a verified studio location is to be published, update the location edit-point text in `ContactPage` in `src/App.tsx` and add an appropriate map link/embed there. Otherwise keep it omitted.
5. **Membership terms and privacy:** edit the explanatory copy and consent checkbox in `MembershipPage` in `src/App.tsx` only after a real opt-in process, privacy notice and membership terms exist. No membership service is connected in this demo.
6. **Form delivery and accounts:** connect forms to a real, secure, consent-appropriate backend and provide clear delivery/error states before launch. Account UI is a non-persistent demo; never collect real passwords with it.
7. **Metadata:** edit the `pageMeta` map in `src/App.tsx` for page-specific title and description.

The portfolio illustrations are generated as editable inline SVG data in `src/data.ts`; replace them there with authorized images. The care guide is `public/embroidery-care-guide.txt` and can be edited as an owner-approved download.

## Manual test checklist

- [ ] Visit all eight routes: `/`, `/designs`, `/pricing`, `/custom-design`, `/membership`, `/resources`, `/account`, `/contact`.
- [ ] Hamburger navigation opens, closes on Escape, outside click and route change; verify `aria-expanded` and keyboard focus.
- [ ] Search portfolio terms, try a no-results search, filter categories, sort A–Z, and toggle saved-only.
- [ ] Save/remove favourites and check the header saved panel; refresh and confirm local persistence.
- [ ] Add/remove quote ideas, clear basket, open the custom brief from the basket; confirm this is not checkout.
- [ ] Switch light/dark themes and refresh to confirm preference persists.
- [ ] Submit invalid and valid custom, contact, and membership forms; confirm validation and the local-only success announcement.
- [ ] Preview login and registration states; confirm demo notices and no password persistence.
- [ ] Open and keyboard-operate the FAQ accordion; download and open the included care guide.
- [ ] Test at desktop, tablet and narrow mobile widths; check menus, panels, forms, grids and footer.
- [ ] Keyboard-only pass: skip link, links, buttons, inputs, visible focus, Escape handling and sensible reading order.
- [ ] Enable reduced motion in the operating system and confirm motion is minimized.
- [ ] Verify no placeholder address, phone, email, social handle, map, testimonial, credential, delivery or turnaround claim has been added.
