# GEO Audit Report: Growth Lift Studio

**Audit Date:** July 5, 2026
**URL:** https://growthliftstudio.in
**Business Type:** Agency / Services (performance-based lead generation for US home-improvement contractors)
**Founder:** Binayak Dey
**Pages Analyzed:** 14 (full sitemap)

---

## Executive Summary

**Overall GEO Score: 41/100 (Poor)**

Growth Lift Studio has done the *hard* part of GEO well — genuinely excellent, experience-rich, quotable content (real Ads-Manager screenshots, specific CPL/CPC/ROI numbers, honest pricing, a full author block with Person schema) and near-perfect crawler *permissions* (robots.txt explicitly allows every major AI crawler, plus a rich hand-written `llms.txt`). Two structural failures cancel almost all of it out:

1. **The entire site is a client-side-rendered React SPA with no SSR or prerendering.** Non-JS AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot) receive an empty `<div id="root">` for the body of *every* page. All the great content, and all the per-page schema, is invisible to the crawlers that build AI models' baseline knowledge.
2. **The brand has almost no third-party footprint.** No Wikipedia/Wikidata entity, a thin LinkedIn page, undiscoverable YouTube/Instagram, zero Reddit or review-site presence. AI systems have no external anchor to recognize or trust the entity.

The single highest-leverage fix is **prerendering the 14 routes to static HTML** — this converts a large body of already-written, highly citable content (and well-built per-page schema) from an effective **0** into an **80**. The necessary second pillar is building off-domain corroboration.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 22/100 | 25% | 5.5 |
| Brand Authority | 14/100 | 20% | 2.8 |
| Content E-E-A-T | 80/100 | 20% | 16.0 |
| Technical GEO | 52/100 | 15% | 7.8 |
| Schema & Structured Data | 58/100 | 10% | 5.8 |
| Platform Optimization | 34/100 | 10% | 3.4 |
| **Overall GEO Score** | | | **41/100** |

**The paradox in one sentence:** everything is configured correctly except the one thing that matters most — the content is never delivered to the crawler in a form it can read.

---

## Critical Issues (Fix Immediately)

### C1 — Client-side rendering hides all body content from AI crawlers
**Affects:** every page (all 14 routes)
The site is a pure CSR React 19 + Vite SPA. `vercel.json` rewrites `"/(.*)" → "/index.html"`, so every URL serves the same shell whose `<body>` is just `<div id="root"></div>`. The deployed `dist/index.html` contains **no textual body content**; everything renders from a single ~623 KB JS bundle. Non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot) see: the static `<head>` + an empty body. Googlebot renders JS on a *deferred* queue, so Google may eventually see content — with delay and no guarantee for lower-priority pages.
**Fix:** Add build-time prerendering of the 14 sitemap routes. Fastest path (no rewrite): `react-snap` as a `postbuild` script (Puppeteer-renders each route to static HTML, zero code changes). Cleaner path: migrate rendering to `vite-react-ssg` / `vike`. Best long-term for this mostly-static marketing+blog site: **Astro** (near-zero JS) or Next.js SSG on Vercel. This one change lifts Technical, Schema, Citability, and Platform scores simultaneously.

### C2 — Per-page `<title>`, meta description, canonical, and schema are identical to the homepage on every route
**Affects:** every page; `src/components/SEO.tsx`
All per-page SEO is injected client-side via `useEffect`. To a non-JS crawler, `/blog/google-ads-bathroom-remodeling-contractors` serves the title *"Qualified Booked Appointments | Growth Lift Studio"*, the homepage description, a homepage canonical (`https://growthliftstudio.in/`), and only the 4 homepage JSON-LD blocks. All 14 pages look like near-duplicate homepage stubs.
**Fix:** Bake per-route title/description/canonical and per-page JSON-LD into static HTML during the prerender in C1. Until then, at minimum emit a self-referencing `<link rel="canonical">` per route.

### C3 — Wrong `datePublished` on 3 of 4 blog posts (data bug)
**Affects:** all blog posts; `src/pages/BlogPost.tsx:294`
The BlogPosting schema hardcodes `"datePublished": "2026-05-24"` for **every** post. Real dates are May 4, May 24, Jun 17, and Jun 24 2026 — so three posts broadcast a false publish date, and there is **no `dateModified`** at all. Freshness is a major GEO signal and this is actively wrong.
**Fix:** Add `datePublished`/`dateModified` ISO fields to each entry in `src/data/blogPosts.ts` and reference `post.datePublished` / `post.dateModified` in the schema. (~15-minute fix, do it regardless of the rendering work.)

### C4 — Near-zero third-party footprint → no AI entity recognition
**Affects:** brand-wide (off-domain)
Searches for "Growth Lift Studio" and founder "Binayak Dey" return no Wikipedia/Wikidata entity, only a thin LinkedIn company page (tagged "1 employee," contains a typo "appoinments"), undiscoverable YouTube/Instagram, and zero Reddit or review-site (Clutch/G2/Trustpilot) presence. Namesakes crowd the "Binayak Dey" query. AI models decide whether an entity is real and citable largely from third-party signals — here there are essentially none.
**Fix:** (1) Create a **Wikidata** item (instance of: business; founder: Binayak Dey; official site; social `sameAs`; founding date). (2) Get listed on **Clutch, G2, Trustpilot** and **Google Business Profile / Bing Places**. (3) Complete and regularly post from the LinkedIn company page; fix the typo. (4) Authentic founder participation in r/HomeImprovement, r/Contractor, r/PPC. This is slower than the code fixes but is the required second pillar.

---

## High Priority Issues

### H1 — IndexNow key file is a false positive
`/.well-known/indexnow-key.txt` returns HTTP 200 but the body is the SPA HTML shell, not a valid UUID key — so IndexNow submissions fail verification and Bing/Copilot get no instant-index benefit.
**Fix:** Serve a real static UUID key file with `Content-Type: text/plain`, excluded from the SPA catch-all rewrite; wire a publish-time IndexNow ping.

### H2 — Best-in-class blog content earns zero AI value while JS-gated
The 4 posts in `src/data/blogPosts.ts` are the strongest citable asset (data-rich, direct-answer, real screenshots) and are 100% invisible to non-JS crawlers. Prioritize these 4 routes in the prerender and ensure `BlogPosting` + `FAQPage` + author `Person` render into static HTML.

### H3 — Unsourced third-party statistics stated as fact
`blogPosts.ts` (kitchen post, line 268): "responding within one minute can boost conversion rates by up to 391%… waiting 30 minutes makes a lead 21× less likely to qualify." These are real findings (Lead Response Management / Harvard-InsideSales) but presented with zero attribution. AI engines and rater guidelines discount unsourced hard numbers.
**Fix:** Add inline attribution + outbound links for the 391% / 21× claims. This also creates the currently-missing outbound-citation signal.

### H4 — Founder `Person` node is thin and not linked into an entity graph
In the static schema, `ProfessionalService.founder` has `name` only — no `jobTitle`, `image`, `url`, `sameAs`, or `worksFor`, and the four static blocks share no `@id`, so AI sees four disconnected objects. The author photo elsewhere uses an unreliable Google Drive thumbnail URL.
**Fix:** Enrich the static founder Person (jobTitle, self-hosted image, `sameAs` → LinkedIn) and add stable `@id`s linking org ↔ founder ↔ services into one `@graph`. Add a `logo` (ImageObject) to the org node.

### H5 — Case-study / screenshot outcomes are unverifiable
"8 confirmed jobs in 30 days" (Columbus OH) and "21 leads in NYC @ $55" carry no client name, dated proof, or link. Anonymous outcome claims are the weakest form of authoritativeness.
**Fix:** Cross-link at least one case study to the matching named testimonial already on-site (e.g., Columbus OH ↔ James R. in `TestimonialSlider`), and add a redacted dashboard export.

---

## Medium Priority Issues

- **M1 — Social footprint undiscoverable.** LinkedIn thin; YouTube/Instagram don't surface in search. Complete profiles, publish consistent indexable content, keep NAP consistent.
- **M2 — All per-page schema (BlogPosting, FAQPage, BreadcrumbList, AboutPage) is JS-only.** Well-built but invisible; resolved by the C1 prerender.
- **M3 — No `AggregateRating`/`Review` schema** despite genuine testimonials. Add `Review`/`aggregateRating` to the org node (do not fabricate).
- **M4 — No `dateModified` / update cadence on time-sensitive benchmark content.** Ad CPC/CPL numbers date quickly; add `dateModified` + a quarterly refresh so "2026 numbers" stay defensible.
- **M5 — Author bio omits hard credentials.** Add "6 years; 16+ contractor clients across the US" to the blog author block for extractable expertise.
- **M6 — Schema/content consistency drift.** Static Service JSON-LD advertises roofing/HVAC/plumbing while `llms.txt` scopes the business to bathroom/kitchen/window. Align both for one coherent entity.
- **M7 — llms.txt lacks a markdown link section and `llms-full.txt`.** Add a `## Pages` list linking the 14 routes and an `## Optional` section to push it from ~85 to ~95.
- **M8 — No Reddit / community validation** (Perplexity draws heavily from Reddit). Founder participates authentically; publish the NYC case study as a methodology post.

---

## Low Priority Issues

- **L1 — Repeated structural template** across the three Google Ads posts risks near-duplicate perception; vary section order and de-duplicate the shared pricing/closer boilerplate into one linked page.
- **L2 — Thin corpus / no pillar page.** Add a "Lead Generation for Home-Improvement Contractors" pillar linking all posts; publish the missing roofing/HVAC/plumbing articles.
- **L3 — `priceRange` is free-text** ("$1,500 setup + 1.5%…"); standardize to `"$$"` or `"$1500+"`.
- **L4 — Sitemap homepage `lastmod` stale** (2026-05-24 vs recent commits); refresh on deploy.
- **L5 — No `Content-Signal:` directive** in robots.txt (forward-looking AI-preference signaling).
- **L6 — CSP uses `script-src 'unsafe-inline'`;** consider nonces/hashes if feasible.
- **L7 — Large PNGs (300–750 KB) in `public/images/`;** convert to WebP/AVIF and add explicit `width`/`height` to protect LCP/CLS.

---

## Category Deep Dives

### AI Citability (22/100)
The "CSR citability paradox": high-quality, quotable content exists but crawlers physically cannot see it. The effective citable surface for non-JS AI is just the homepage shell (title + meta) plus `llms.txt`. `llms.txt` alone is excellent (self-contained facts, a 12-question FAQ, pricing, the "21 leads in 30 days at $55/lead NYC" result) and carries nearly all current citable weight — but llms.txt has low real-world crawler adoption and cannot substitute for readable page content. Top latent passages (pricing model, NYC case study, FAQ answers) would score 80-88 if server-rendered; as delivered they score ~0.

### Brand Authority (14/100)
| Platform | Status |
|---|---|
| Wikipedia / Wikidata | Absent — no entity |
| LinkedIn | Minimal — thin company page, "1 employee," typo |
| Instagram / YouTube | Present in `sameAs` but undiscoverable in search |
| Reddit | Absent |
| Clutch / G2 / Trustpilot | Absent |
| Third-party mentions | None; founder name collides with unrelated namesakes |
No independent corroboration off the domain. Even with fully visible on-site content, models would have no external anchor to trust or disambiguate the entity.

### Content E-E-A-T (80/100)
The clear strength. **Experience:** real Ads-Manager screenshots with exact figures ($486 spend, 9 leads, $54.05 avg), authentic first-person voice. **Expertise:** full author block (photo, name, title, bio, LinkedIn) on every post; genuinely expert tactical depth. **Trust:** real email/phone, privacy/terms, honest performance-based pricing stated inline. **Assessed highly likely human-authored** — no AI red flags. Held back only by unsourced statistics (H3) and unverifiable outcome claims (H5). This content is well ahead of typical agency blogs — the tragedy is purely delivery.

### Technical GEO (52/100)
Strong everywhere except rendering. **Security: 100** (HSTS preload, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, scoped CSP). **URLs: excellent** (clean, hyphenated, shallow, www→apex 308). **robots/sitemap: clean**, AI crawlers allowed. **SSR/JS dependency: 10/100** — the pure-CSR gap dominates and drags the composite down. Canonical is JS-injected only. Core Web Vitals at risk from the 623 KB single bundle (no route code-splitting) + large PNGs.

### Schema & Structured Data (58/100)
Above-average *content*, crippled *delivery*. Four valid static blocks in `index.html` (WebSite, ProfessionalService with `sameAs`/`hasOfferCatalog`/`knowsAbout`, 2× Service) are crawler-visible and decent. But every per-page schema (BlogPosting with author Person + publisher, FAQPage with 8 Q&As, BreadcrumbList, AboutPage) is client-injected and invisible to non-JS AI. Plus the hardcoded-date bug (C3). No `Organization`/`@id` graph linking, no `logo`, thin founder node, no `AggregateRating`. Fix delivery + the date bug and this jumps to ~80 with no new schema types needed.

### Platform Optimization (34/100)
| Platform | Score | Why |
|---|---|---|
| Google AI Overviews | 48 | Googlebot renders JS (deferred) — partially survives |
| Google Gemini | 42 | Same render path + Knowledge Graph gap |
| Bing Copilot | 30 | Bingbot JS rendering unreliable; IndexNow key broken |
| ChatGPT Web Search | 28 | GPTBot does not render JS → near-blind |
| Perplexity AI | 24 | PerplexityBot minimal JS; heavy Reddit reliance (none exists) |
The CSR-without-prerender architecture silently discards content for the three non-rendering platforms and delays/degrades the two Google surfaces.

---

## Quick Wins (Implement This Week)

1. **Fix the hardcoded `datePublished` bug** (C3) — add real ISO `datePublished`/`dateModified` per post in `blogPosts.ts`. ~15 min, corrects a factual error AI can currently read.
2. **Ship a `react-snap` postbuild prerender** of the 14 routes (C1/C2) — the single biggest lever; no framework migration required to start.
3. **Attribute the 391% / 21× statistics** (H3) with named sources + outbound links — improves trust and adds outbound-citation signals.
4. **Enrich the static founder `Person` + add `@id` graph + `logo`** (H4) directly in `index.html` — visible to crawlers immediately, no build change needed.
5. **Create Wikidata item + claim Clutch/Google Business Profile** (C4 starter) — begins the off-domain entity anchor.

## 30-Day Action Plan

### Week 1: Stop the bleeding (code fixes)
- [ ] Add `datePublished`/`dateModified` fields to `blogPosts.ts`; wire into BlogPost schema (fix C3)
- [ ] Enrich static founder `Person`, add `@graph` `@id`s, add org `logo` in `index.html` (H4)
- [ ] Add self-referencing canonical fallback awareness; audit `SEO.tsx`
- [ ] Attribute the 391% / 21× stats with sources (H3)

### Week 2: Rendering (the big one)
- [ ] Implement prerendering (start with `react-snap` postbuild; evaluate Astro/vite-react-ssg for the durable fix) so all 14 routes ship static HTML with per-page title/description/canonical/schema (C1/C2)
- [ ] Verify with `curl` (no JS) that blog bodies + BlogPosting/FAQPage schema appear in raw HTML
- [ ] Fix the IndexNow key file (H1) and add a publish-time ping

### Week 3: Entity & authority
- [ ] Create Wikidata item for Growth Lift Studio + Binayak Dey (C4)
- [ ] Claim/complete Clutch, G2, Trustpilot, Google Business Profile, Bing Places (C4)
- [ ] Rebuild LinkedIn company page (fix typo, real about, regular posts) (M1)
- [ ] Cross-link case studies to named testimonials + add a dashboard artifact (H5)

### Week 4: Content depth & polish
- [ ] Add quantified credentials to the blog author bio (M5)
- [ ] Publish a pillar page; plan roofing/HVAC/plumbing posts (L2); reconcile schema/llms.txt trade scope (M6)
- [ ] Add `## Pages` links + generate `llms-full.txt` (M7)
- [ ] Convert large PNGs to WebP/AVIF with explicit dimensions; add route code-splitting (L7 / CWV)
- [ ] Founder begins authentic Reddit participation; publish NYC case study as a methodology post (M8)

---

## Appendix: Pages Analyzed

All 14 pages share the same critical issue (CSR — empty body + homepage-only metadata/schema to non-JS crawlers), so per-page issue counts below reflect *additional* page-specific findings on top of that shared baseline.

| URL | Title (intended) | Notable GEO Issues |
|---|---|---|
| `/` | Growth Lift Studio \| Lead Generation for Home Improvement Contractors | CSR baseline; homepage schema OK but thin founder node |
| `/services` | Services | CSR baseline; BreadcrumbList JS-only |
| `/results` | Case Studies / Results | CSR baseline; unverifiable outcome claims (H5) |
| `/faq` | FAQ | CSR baseline; FAQPage (8 Q&A) JS-only |
| `/testimonials` | Testimonials | CSR baseline; no Review/AggregateRating schema (M3) |
| `/about` | About | CSR baseline; AboutPage JS-only; strong trust content trapped |
| `/contact` | Contact | CSR baseline; real NAP present but JS-gated |
| `/blog` | Blog index | CSR baseline; no ItemList schema |
| `/blog/facebook-ads-bathroom-remodeling-contractors` | FB Ads for Bathroom Remodeling | CSR baseline; BlogPosting JS-only; strong content invisible |
| `/blog/google-ads-kitchen-remodeling-contractors` | Google Ads for Kitchen Remodeling | CSR baseline; unsourced 391%/21× stats (H3); wrong datePublished (C3) |
| `/blog/google-ads-bathroom-remodeling-contractors` | Google Ads for Bathroom Remodeling | CSR baseline; wrong datePublished (C3) |
| `/blog/google-ads-window-replacement-contractors` | Google Ads for Window Replacement | CSR baseline; wrong datePublished (C3) |
| `/privacy-policy` | Privacy Policy | CSR baseline; low GEO priority |
| `/terms-conditions` | Terms & Conditions | CSR baseline; low GEO priority |

*No fetch failures. Crawl respected robots.txt (all paths allowed). Analysis combined live fetches with direct inspection of the local source repository for ground truth.*

---

### Methodology note
This audit combined live fetches (homepage, robots.txt, llms.txt, sitemap, sample routes) with **direct source-code inspection** of the repository (`index.html`, `vercel.json`, `vite.config.ts`, `src/components/SEO.tsx`, `src/pages/*`, `src/data/blogPosts.ts`, `dist/index.html`), which is why findings cite specific files and line numbers. Category scores were produced by five specialized GEO subagents (AI visibility, platform, technical, content, schema) and aggregated with the standard GEO weighting (Citability 25%, Brand 20%, E-E-A-T 20%, Technical 15%, Schema 10%, Platform 10%).
