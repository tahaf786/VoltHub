# VoltHub

A mobile-first **catalog + in-store-reservation** website for a mobile-accessory
shop. Browse-and-reserve — **no payment, no delivery**. Customers browse, reserve
an in-stock item for pickup, and can design their own modular phone skin.

> Demo project. Identity (shop name, address, hours, contact) is placeholder
> data in `src/lib/site-config.ts`, editable in one place.

## Features

- **Catalog** — cases, skins, tempered glass, chargers, cables, earbuds, power
  banks, etc., with search + filter (phone model / category / price) and honest
  live stock ("3 left in store").
- **Reservation** — reserve in-stock items → name + phone → pickup code +
  summary. Client-side only (localStorage); no backend.
- **Modular skin designer** — pick device → material/finish → panels/textures/
  decals → live preview + computed price → add to reservation.

## Stack

Next.js 16 (App Router) · TypeScript (strict) · React 19 · Tailwind CSS v4 ·
Vitest (pure logic) · Playwright (E2E, desktop + mobile) · GitHub Actions CI ·
Vercel-ready.

## Getting started

```bash
npm install
npm run dev            # http://localhost:3000
```

## Scripts

```bash
npm run verify            # typecheck + lint + unit tests + production build (pre-commit gate)
npm run test              # unit tests (Vitest)
npm run test:e2e          # E2E (Playwright, desktop + mobile Chromium)
npm run test:e2e:install  # one-time: install Chromium for Playwright
```

> Stop the dev server before `npm run build` / `npm run verify`.

## Docs

- **CLAUDE.md** — ground truth: architecture, design system, strict TDD rules,
  regression guards.
- **HANDOFF.md** — current status and what's next.

## Deployment

Vercel-ready (Next.js auto-detected; security headers in `next.config.mjs`).
Import at [vercel.com/new](https://vercel.com/new) — no config changes needed.
