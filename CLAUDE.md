# CLAUDE.md — VoltHub

> Ground truth for AI agents and developers working in this repository.
> Keep this file honest — update it as the project grows instead of letting it
> drift out of sync with what's actually here.
> See also **AGENTS.md** for Next 16 agent rules (read the relevant guide in
> `node_modules/next/dist/docs/` before relying on older Next behaviour).

---

## 1. Project Overview

**VoltHub** is a mobile-first catalog + in-store-reservation website for a
mobile-accessory shop. It is a **browse-and-reserve** business, **not** an
e-commerce/delivery store: there is **no payment, no shipping, no delivery**.
Customers browse, reserve an in-stock item, and pick it up in the shop.

Three core capabilities:

1. **Catalog browsing** — cases, skins, tempered glass, chargers, cables,
   earbuds, power banks, holders, etc., with search + filter (phone model /
   category / price) and **honest live stock** ("3 left in store").
2. **Reservation / in-store pickup** — reserve in-stock items → give name +
   phone → get a **pickup code** + reservation summary. State is client-side
   (localStorage) only; there is **no backend** unless one is explicitly asked
   for.
3. **"Design your own modular phone skin"** — an interactive configurator: pick
   device → base material/finish → add modular panels/textures/decals → live
   preview + **computed price** → add the custom skin to the reservation.

**Demo identity (all editable in `src/lib/site-config.ts`):**

- Shop: **VoltHub — Mobile Accessories**
- Pickup: 42 MG Road, Bengaluru 560001 · Mon–Sat 10:30–20:30, Sun closed
- Currency: **₹ INR** (source of truth: `src/lib/money.ts`)
- Contact: `algorithms4dev@gmail.com` (+ optional WhatsApp placeholder)

**Voice:** plain, honest, engineers-first. No hype, no fake urgency. Stock
numbers are real; nothing is oversold.

---

## 2. Tech Stack

| Layer          | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| Framework      | Next.js 16 (App Router)                                        |
| Language       | TypeScript (strict)                                            |
| UI runtime     | React 19                                                       |
| Styling        | Tailwind CSS v4 (CSS-first theme in `globals.css`)            |
| Components     | shadcn/ui-style primitives vendored in `src/components/ui`     |
| Icons          | lucide-react                                                   |
| Unit tests     | Vitest (`src/**/*.test.ts`, Node env, PURE logic)             |
| E2E tests      | Playwright (`e2e/*.spec.ts`, desktop + mobile Chromium)       |
| CI             | GitHub Actions — full `verify` gate + E2E on every push/PR     |
| Hosting target | Vercel (auto-detected Next.js; no vercel.json needed)         |

> **Note on version:** the prompt referenced Next 15; `create-next-app@latest`
> now ships **Next 16** (App-Router API surface is equivalent for our use).
> Downgrading to 15 is a one-line dependency change if ever required.

---

## 3. Architecture & File Map

The point of this section: **make bugs easy to locate.**

```
src/
├── app/
│   ├── layout.tsx        Root layout: fonts (Space Grotesk + Inter), SEO
│   │                     metadata, viewport (viewport-fit=cover, theme-color).
│   ├── page.tsx          Home page (assembles sections).
│   ├── globals.css       Brand theme tokens + base layer. If a fixed full-bleed
│   │                     background is added, body MUST keep `isolation:isolate`
│   │                     and sections stay transparent (see §7).
│   ├── icon.svg          Favicon (added in feat/shell).
│   ├── opengraph-image.* Dynamic OG image.
│   ├── robots.ts         SEO route handler.
│   └── sitemap.ts        SEO route handler.
│
├── components/
│   ├── ui/               shadcn-style primitives, restyled to brand.
│   ├── sections/         ONE component per page section (hero, catalog,
│   │                     reservation, skin-designer, store-info, contact, …).
│   ├── catalog/          Product grid, product card, product detail, filters UI.
│   ├── reservation/      Reservation list, reserve dialog, pickup-code summary.
│   └── skin/             Modular skin configurator + live preview.
│
├── hooks/
│   └── use-cart.ts       Reservation state (localStorage-backed).
│
└── lib/
    ├── site-config.ts    Central data: identity, hours, contact, currency.
    ├── money.ts          ₹ formatting (PURE, unit-tested).
    ├── catalog.ts        Product types + demo data.
    ├── filter.ts         Search/filter by model|category|price (PURE, unit-tested).
    ├── reservation.ts    Pickup-code gen + totals (PURE, unit-tested).
    ├── skin-config.ts    Skin options model + price calculator (PURE, unit-tested).
    └── utils.ts          cn() class-merge helper.
```

**Key architectural rules**

- **Extract every non-trivial pure function and unit-test it.** Filtering,
  price math, config→price, formatting, code generation — all live in
  `src/lib/*.ts` as pure modules with a matching `*.test.ts`. Keep components
  thin: they render and wire events; the logic they call is tested without a
  browser.
- **Test edge cases:** empty, boundary, clamped, malformed input.
- **Reservation state flows through one hook** (`use-cart.ts`), never scattered
  `useState` across components.

---

## 4. Design System Rules

- **Theme:** dark tech / neon. Near-black base (**not** pure `#000`), one
  confident neon accent (electric cyan → violet). Accent used deliberately
  (CTAs, highlights, active states), never as a dominant fill.
- **Contrast:** accent + text must meet WCAG AA on the dark base.
- **Typography:** Space Grotesk (display) + Inter (body). Confident, mobile-first.
- **Imagery:** real product photos, **self-hosted in `/public`** (Pexels-style
  approach — no hotlinking, no licensed/again-uploaded faces). Every image has
  meaningful `alt` text.
- **shadcn primitives are a starting point** — restyle to the brand.
- **Mobile is edge-to-edge:** `viewport-fit=cover` + `env(safe-area-inset-*)`.
  The `theme-color` meta blends the status bar with the top of the page.

---

## 5. Non-Negotiables

1. **No fake backend / no fake commerce.** No payment, no delivery. Reservation
   is client-side + a generated pickup code. Ask before adding persistence.
2. **Honest stock.** Stock counts are shown truthfully ("3 left in store");
   out-of-stock items cannot be reserved.
3. **SEO is not optional:** `<title>`, meta description, Open Graph, favicon,
   robots, sitemap — all via the Next metadata API.
4. **Accessibility basics required:** semantic HTML, alt text, visible focus,
   keyboard-navigable controls, `prefers-reduced-motion` respected.
5. **TypeScript strict throughout.** No `any` without a justifying comment.
6. **No personal/identifying info in a public repo:** no founder names, no team
   size, no real phone numbers (WhatsApp stays a placeholder). No secrets — the
   project has none by design.

---

## 6. Test-Driven Development — STRICT RULES

Build test-first where it makes sense and **never ship a change without a green
suite.**

**The TDD loop (every non-trivial change):**

1. **Write/adjust a test first.** Pure logic → a Vitest case in the matching
   `*.test.ts`. Behaviour/rendering → a Playwright case in `e2e/`.
2. **Run it and watch it fail** (red) — proves the test is meaningful.
3. **Implement.**
4. **Run the suite** until green.
5. **Refactor** with the tests guarding you.

**Hard gate before ANY commit:**

```
npm run verify      # = typecheck + lint + unit tests + production build
npm run test:e2e    # for any change touching the DOM / rendering / routing
```

Do not commit if either is red. If a test is wrong, fix it in the same change
and say why.

**What must have a test**

- New pure function/util → a Vitest unit test (empty, boundary, clamped,
  malformed).
- New interactive element (button, dialog, tab, form, menu) → a Playwright
  interaction test.
- New section/page → add it to the "renders all sections" test; add an
  anchor-resolves check if it's in the nav.
- Any bug fix → a regression test that fails before and passes after.

**When TDD doesn't fit** (pure visual polish): assert something observable in
Playwright (element present, no overflow, in front of body) and verify the rest
by eye. Never claim a visual is done without viewing it.

---

## 7. Regression Guards — scars pre-seeded from day one

These six bugs bit the prior project (AsUwish). Each is a **rule here from
commit #1** — do not re-earn them. Add a test guard the moment the relevant
feature exists.

1. **Pure-black background.** An opaque `body` background painting over a fixed
   `-z-10` full-bleed background turned the whole page black. Fix/rule:
   `body { isolation: isolate }` in `globals.css`, and sections stay
   transparent. Guard with an E2E "background paints in front of `<body>`" test
   if/when a fixed background is added.
2. **Unstyled site on a phone over LAN.** CSP `upgrade-insecure-requests` forced
   assets to HTTPS, which the plain-HTTP dev server can't serve. Fix/rule: that
   directive (and HSTS) is **production-only**, gated on `isDev` in
   `next.config.mjs`. Already implemented.
3. **Hydration mismatch from unrounded trig/random.** SVG/canvas coordinates
   computed with `Math.sin/cos/random` differed between server and client in the
   last float bit. Rule: **round** any generated coordinate before emitting it
   in SSR'd markup. Never emit unrounded `Math.*`-derived attributes server-side.
4. **Hero FPS / lag.** Per-frame canvas `shadowBlur` + two `requestAnimationFrame`
   loops tanked frame rate. Rule: **one rAF loop**, no per-frame `shadowBlur`
   (use a cheap radial-gradient glow), cap DPR at ~1.5, respect
   `prefers-reduced-motion` (gentle, never frozen).
5. **`.next` corruption from concurrent build+dev.** Running `next build` while
   `next dev` uses the same `.next` corrupts it (`PageNotFoundError`). Rule:
   **stop the dev server before `npm run build`** (and before `npm run verify`,
   which builds).
6. **Nested interactive elements.** A clickable control inside a clickable card
   as a nested `<button>` is invalid HTML → hydration error. Rule: the inner
   control is `<span role="button" tabIndex={0}>` with key handlers, never a
   nested `<button>`/`<a>` inside another.
7. **CI `npm ci` fails on missing `@emnapi/*` (lockfile drift).** An incremental
   `npm install <pkg>` on Windows prunes the Linux-only optional deps (`@emnapi`,
   pulled in transitively by native tooling) from `package-lock.json`, so CI's
   strict `npm ci` on Linux rejects the lock ("Missing @emnapi/runtime … from
   lock file"). Rule: after changing dependencies, **regenerate the lock cleanly**
   — `rm -rf node_modules package-lock.json && npm install` — then commit it.
   A clean lock has the full set of `@emnapi` entries (grep to confirm).

---

## 8. Git Workflow

- Repo: `github.com/tahaf786/VoltHub` (public, remote `origin`, default branch
  `master`).
- **One feature per branch** (`feat/…`), PR into `master`. Do **not** push or
  merge to `master` without the owner's explicit OK.
- Conventional commits (`feat|fix|perf|refactor|docs|style|chore: …`).
- **Run the §6 gate before every commit.**
- End agent-authored commit messages with a `Co-Authored-By` trailer.

---

## 9. Deployment (Vercel)

Static-first Next.js app; Vercel-ready.

1. Import the repo at vercel.com/new (sign in with GitHub). Next.js is
   auto-detected — no config changes.
2. Deploy. Security headers in `next.config.mjs` are applied by Vercel;
   `upgrade-insecure-requests` + HSTS activate in production over HTTPS.
3. Before/after launch, set real values in `site-config.ts`: canonical `url`
   (drives OG + sitemap), contact, WhatsApp.

---

## 10. What NOT to Do

- Do not add payment, delivery, or a real reservation backend without being asked.
- Do not fake stock, reviews, or client names.
- Do not put personal/identifying info or secrets in the public repo.
- Do not give `html`/`body`/sections opaque backgrounds that cover a fixed
  background (see §7.1).
- Do not run `next build` while the dev server is running (§7.5).
- Do not commit with a red `npm run verify`.
- Do not push to a remote other than the confirmed `origin`, or to `master`
  without the owner's OK.

---

## 11. Status

Scaffold complete (Next 16 + React 19 + Tailwind v4, TS strict), two-tier test
suite wired (Vitest + Playwright desktop/mobile), `npm run verify` gate, GitHub
Actions CI, security headers (prod-gated directives), and the six regression
guards documented. Home page is a placeholder. Features next, one branch each:
shell → catalog → search/filter → reservation → skin designer → store-info.
See **HANDOFF.md** for the live "where we are / what's next".
