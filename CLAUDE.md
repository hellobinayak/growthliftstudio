# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/lead-gen site for **Growth Lift Studio** (agency for home-improvement contractors). React 19 SPA built with Vite, prerendered to static HTML per route so non-JS AI crawlers get real content. Deployed on Vercel; production domain `growthliftstudio.in`.

## Commands

```bash
npm run dev        # Vite dev server on :3000, host 0.0.0.0
npm run build      # vite build → dist/  (see prerender gotcha below)
npm run preview    # serve the built dist/
npm run lint       # tsc --noEmit — this is the ONLY check; there is no test suite or ESLint
node scripts/prerender.mjs   # snapshot every route to dist/<route>/index.html (run after build)
```

There are **no automated tests**. "Passing" means `npm run lint` (type-check) is clean plus visual verification. `DISABLE_HMR=true` turns off HMR for the dev server when needed (used during prerendering).

### Prerender gotcha (important)

`package.json` still has `"postbuild": "react-snap"`, but **react-snap is uninstalled** and replaced by `scripts/prerender.mjs` (Puppeteer-based). So `npm run build` currently fails at the postbuild step. The working static-build flow is `vite build` **then** `node scripts/prerender.mjs` separately. If you touch build tooling, reconcile this — either repoint `postbuild` at the prerender script or remove it.

`prerender.mjs` derives its route list from `public/sitemap.xml` (single source of truth), spins up a tiny static server over `dist/`, lets the SPA render each route, and writes the snapshotted DOM. `vite.config.ts` targets `es2019` — a leftover constraint from react-snap's old Chromium; Puppeteer bundles current Chrome and doesn't need it.

## Architecture

**Routing** — `src/App.tsx` is the whole route table (`react-router-dom` v7, `BrowserRouter`). Every page is one file in `src/pages/`. Note the URL/name mismatches: `/results` renders `CaseStudies.tsx`; blog posts are `/blog/:slug`. `ScrollToTop` in App handles scroll restoration and in-page `#hash` smooth-scroll. When adding a route, update **both** `App.tsx` and `public/sitemap.xml` (the latter drives prerendering) — a route missing from the sitemap ships as a client-only page with no static HTML.

**SSG hydration** — `src/main.tsx` checks whether `#root` already has prerendered markup: if so it `hydrateRoot`, otherwise `createRoot`. Don't break this branch; markup that differs between server snapshot and first client render causes hydration mismatches.

**Per-page SEO** — every page renders `<SEO title description schema />` (`src/components/SEO.tsx`), which imperatively updates `document.title`, meta/OG tags, canonical, and injects JSON-LD into `<head>` on route change. This is what the prerenderer captures into each static file. Structured data and canonical URLs live in the page's `SEO` props, not in `index.html`.

**Survey modal** — global lead-capture modal driven by `SurveyContext` (`src/context/SurveyContext.tsx`). Trigger from anywhere via `const { openSurvey } = useSurvey()`; the provider wraps the app in `App.tsx` and renders the modal with an `AnimatePresence` exit animation. CTAs across pages call `openSurvey` rather than navigating. Form submission uses Formspree (`@formspree/react`).

**Shared UI** — `src/components/UI.tsx` exports `Button` (variants `primary|secondary|outline`, sizes `sm|md|lg|xl`) and `InteractiveCard`. `Button` wraps children in a `group` + relative span, so icon hover tricks like `group-hover:translate-x-0.5` work on nested icons; `InteractiveCard` stretches to equal height in a grid. `BackgroundEffects.tsx` holds the decorative layers (`DotGrid`, `LightBeam`, `BeamPattern`, `FloatingDots`, `Particles`). Animations are `motion/react` (Framer Motion v12).

**Content** — blog posts are data, not files: `src/data/blogPosts.ts`. `BlogPost.tsx` looks up the `:slug`. Add a post there **and** to `sitemap.xml`.

## Styling

Tailwind **v4** via `@tailwindcss/vite` — config is CSS-based in `src/index.css` under `@theme`, there is no `tailwind.config.js`. Brand tokens:

- `brand-navy` `#0D1B2A`, `brand-cyan` `#00C2E0`, `brand-cloud` `#F4F6F8`
- `brand-cyan-ink` `#0A7A8E` — the **accessible** cyan for text on light backgrounds (~4.8:1, WCAG AA). Use bright `brand-cyan` only for icons/accents or text on navy; use `brand-cyan-ink` for cyan text on white.
- Fonts: `font-sans` = Plus Jakarta Sans (headings), `font-body` = Inter (body).
- Custom utilities in `index.css`: `elev-soft`/`elev-cyan` (colored diffused shadows — defined as `@utility` so `hover:` variants work), `shimmer-text`, `text-balance`, `glass-card`, `border-beam`. Prefer these over ad-hoc shadows. Merge classes with `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge).

The `@` import alias resolves to the **project root** (not `src/`) — see `vite.config.ts`.

## Deployment (Vercel)

`vercel.json` handles: SPA rewrite of all paths to `/index.html`, `www.` → apex redirect, a legacy blog-slug 308, long-cache headers on `/assets/*`, and a strict security header set including a **Content-Security-Policy**. If you add a third-party script, image host, or API endpoint, its origin must be whitelisted in the CSP `connect-src`/`script-src`/`img-src`/`frame-src` or it will be blocked in production (currently allows GTM, Google Analytics, Formspree, Google embeds).

## Conventions

- Commit messages end with a `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` trailer. Work happens on feature branches (e.g. `geo-audit-fixes`) → PR to `main`.
- `scripts/*.mjs` are Node ESM utilities (`prerender.mjs`, `indexnow-ping.mjs` for IndexNow search-engine pings). The `scripts/*.png` and root `*-comparison.html` files are throwaway visual-review artifacts, not part of the app.
