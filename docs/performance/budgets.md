# Performance budgets

Set 2026-11-08 (plans/01-visibility-and-analytics.md Phase 10), after fixing
the homepage's broken code-splitting. Check these monthly, and whenever a
new below-the-fold section or heavy dependency is added to the homepage.

## Targets

| Metric | Target (mobile, p75) | How to check |
|---|---|---|
| LCP | ≤ 2.5 s | Search Console → Core Web Vitals report, or GA4 (`components/analytics/WebVitals.tsx` sends real-user data once traffic exists) |
| INP | ≤ 200 ms | Same |
| CLS | ≤ 0.1 | Same |
| Homepage initial JS (gzip) | ≤ 250 KB | `npm run analyze`, sum the chunks loaded on first paint of `/` |

## Baseline (this phase, local build, gzip estimated)

- **Before:** ~1.8 MB raw / ~564 KB gzip. `app/page.tsx` (a Server
  Component) called `next/dynamic` directly for 8 below-the-fold sections,
  which Next's own docs say does **not** code-split ("When a Server
  Component dynamically imports a Client Component, automatic code
  splitting is currently not supported" —
  `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`). Every
  one of those 8 components, plus their dependencies — firebase (via
  EligibilityForm/ContactForm), gsap (via LoanStage), d3-geo and effectively
  all of three.js's import graph (via an unused `import * as THREE` in
  `components/hero/utils.ts` that pulled in the whole package for nothing)
  — were bundled into the initial page load regardless of the `dynamic()`
  wrapper around them.
- **After:** ~835 KB raw in the initial chunks (confirmed via a local
  build: no `firebase`, `gsap`/`ScrollTrigger`, or `geoMercator`/`d3-geo`
  signature in any initial-load chunk). The fix:
  `components/home/LazyHomeSections.tsx`, a `"use client"` module that
  calls `next/dynamic` itself (matching the lazy-loading doc's own
  example, which puts the `dynamic()` calls inside a `'use client'` file,
  not a Server Component) and is imported by `app/page.tsx`.
  `components/LoanStage.tsx`'s `AnimatedPhoneMockup` (gsap) is similarly
  moved to its own `dynamic(..., { ssr: false })`, and the unused
  `import * as THREE` was simply deleted.
- Not yet re-measured against the ≤250 KB gzip target with a real gzip
  tool — the 835 KB figure above is raw bytes. Run `npm run analyze` for
  an accurate, per-chunk gzip breakdown before treating this as "done".

## Known remaining items (not done this phase)

- **framer-motion loads on every page**, via `components/Navbar.tsx`
  (imported from the root layout). Converting to `LazyMotion` +
  `m.*` components (Framer's own lighter-weight API) would help, but it
  isn't a Navbar-only change: `motion.*` is used directly across many
  files (EligibilityForm, LoanStage, HeroGridBlock, ContactForm's success
  view, and others), all importing the full `framer-motion` package the
  same way. A real fix means migrating every one of those call sites to
  `m.*` under one shared `<LazyMotion features={domAnimation}>` — a
  cross-cutting, mechanical change with real regression risk if rushed,
  deliberately left for its own pass rather than attempted inside this
  phase's time budget.
- **`eligibility.png` (410 KB) and `contact.png` (243 KB)**: full-bleed
  ProductHero background images, large but not absurdly oversized for
  their render size the way `logos/ICICI.png` was (3840px wide for a
  ~40px-tall logo — fixed this phase, now 600px/23 KB). Converting these
  two to WebP/AVIF source files would still help; not done here since it
  needs a visual check after re-encoding that wasn't done in this pass.
- Re-run `npm run analyze` on a few other heavy routes (the calculator
  page, a city page) — this phase only measured the homepage.
