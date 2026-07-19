# HANDOFF — VoltHub

Compact "where we are / what's next." Update this at the end of every work
session. For deep context read **CLAUDE.md**.

---

## Where we are

**Milestone: `chore/scaffold` — COMPLETE (pending push + owner sign-off).**

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

1. **`feat/shell`** — brand theme (dark/neon), `site-config.ts`, `utils.ts`
   (cn), header/nav (mobile menu, safe-area), home hero, footer, favicon,
   OG image, robots, sitemap, full SEO metadata.
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
