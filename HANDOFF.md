# HANDOFF — VoltHub

Compact "where we are / what's next." Update this at the end of every work
session. For deep context read **CLAUDE.md**.

---

## Where we are

**Milestone: `feat/reservation` — COMPLETE (on branch, PR open, not merged).**

- Pure `reservation.ts`: cart totals/count, `generatePickupCode` (injectable RNG,
  unambiguous alphabet), name/phone validation; 12 unit tests.
- `useCart` — module store read via `useSyncExternalStore` (SSR-safe hydration,
  no provider, no setState-in-effect), localStorage-persisted, qty clamped to stock.
- Reservation section: cart list w/ steppers + remove, totals, name+phone form
  with inline validation, pickup-code confirmation. Header cart badge.
  Reserve buttons across catalog now add to the cart.
- E2E (4): add + badge, qty/remove, validation → pickup code, persists reload.

**Earlier milestone: `feat/search-filter` — COMPLETE (merged to master).**

- Pure `filter.ts` (query over name/brand/category, category, phone-model with
  Universal-always-matches, max-price) + `priceBounds`; 12 unit tests.
- Filter UI: search, category chips, model select, price slider, live result
  count, clear, and a no-results state. Wired into the catalog.
- E2E (4): category narrows grid, search + no-results, clear restores, count.

**Earlier milestone: `feat/product-photos` — COMPLETE (merged to master).**

- 20 real product photos from Pexels, self-hosted in `/public/products` (one
  per product), wired into the catalog via `next/image` (alt text, responsive
  `sizes`, first row `priority`). Neon gradient + icon remain as a graceful
  fallback. `public/products/CREDITS.md` records provenance.

**Earlier milestone: `feat/catalog` — COMPLETE (merged to master).**

**Earlier milestone: `feat/shell` — COMPLETE (merged to master).**

- Brand theme (dark near-black + neon cyan→violet) in `globals.css`;
  `isolation:isolate` + safe-area utilities baked in.
- `site-config.ts` (identity, hours, contact, currency, nav) + `utils.ts` (cn) —
  both pure + unit-tested.
- Header (sticky, mobile menu, safe-area), hero, footer, Section shell, Button
  primitive, placeholder sections for catalog/skin/reservation anchors.
- Full SEO: metadata (OG/Twitter/canonical), `icon.svg` favicon, dynamic
  `opengraph-image`, `robots.ts`, `sitemap.ts`.
- Tests: 21 unit + 16 E2E (sections/order, nav anchors, security headers,
  no-overflow @375/1440, viewport-fit, mobile menu) — all green.

**Earlier milestone: `chore/scaffold` — COMPLETE (pushed to master, CI green).**

- Next.js 16 (App Router) + React 19 + Tailwind v4, TypeScript strict.
- Two-tier test suite wired:
  - **Vitest** (pure logic, Node env) — seed: `src/lib/money.ts` + tests.
  - **Playwright** (desktop + mobile Chromium) — seed: `e2e/home.spec.ts`.
- `npm run verify` gate = typecheck + lint + unit + production build.
- GitHub Actions CI (`.github/workflows/ci.yml`) runs verify + E2E on push/PR.
- `next.config.mjs`: security headers; `upgrade-insecure-requests` + HSTS
  gated on `isDev` (prod-only). `x-powered-by` disabled.
- CLAUDE.md written with the six regression guards pre-seeded (§7).
- Home page is a **placeholder** (VoltHub title + sample price). Real UI comes
  next.

## Repo / infra

- GitHub: `github.com/tahaf786/VoltHub` (public). Remote `origin`, default `master`.
- Never push/merge to `master` without the owner's OK. One `feat/…` branch per feature.
- Vercel: **not yet connected** (owner will import; app is Vercel-ready).

## Commands

```
npm run dev            # dev server (http://localhost:3000)
npm run verify         # typecheck + lint + unit tests + build (pre-commit gate)
npm run test           # unit tests only (Vitest)
npm run test:e2e       # Playwright desktop + mobile
npm run test:e2e:install  # one-time: install Chromium for Playwright
```
> Stop the dev server before `npm run build`/`verify` (see CLAUDE.md §7.5).

---

## What's next (one branch per feature, strict TDD)

1. **`feat/shell`** — ✅ DONE (PR open).
2. **`feat/catalog`** — `catalog.ts` (product types + demo data), product grid,
   product card, product detail, honest stock status.
3. **`feat/search-filter`** — `filter.ts` (PURE: search + filter by
   model/category/price) + unit tests, then the filter UI.
4. **`feat/reservation`** — `use-cart.ts` hook, `reservation.ts` (PURE:
   totals + pickup-code gen) + unit tests, reserve dialog, reservation list,
   pickup-code summary.
5. **`feat/skin-designer`** — `skin-config.ts` (PURE: options model + price
   calculator) + unit tests, configurator UI, live preview, add-to-reservation.
6. **`feat/store-info`** — hours, map/pickup point, contact (email + optional
   WhatsApp), reviews/trust section, final polish pass.

## Open decisions for the owner

- Next 16 vs 15 (scaffold used 16 — latest). Say the word to pin to 15.
- Placeholder identity (shop name / address / hours / WhatsApp) — edit in
  `site-config.ts` once created, or tell me the real values.
- Whether to actually connect Vercel now or later.
