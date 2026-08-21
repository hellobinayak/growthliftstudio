# Growth Lift Studio — Content Plan

_Data-driven from GSC (3-mo window ending 2026-07-08) + Semrush ranking best-practices. Baseline: 287 impressions, 12 clicks, 4.2% CTR, avg position 18.8 (page 2)._

## The three signals driving this plan

1. **Demand is real but stuck on page 2.** The kitchen post pulls 133 impressions (46% of the whole site) yet 1 click. Impressions exist; we're not winning them.
2. **A "PPC" wording cluster is untapped.** `ppc ads for kitchen remodel company`, `kitchen remodeling ppc ads`, `kitchen remodel ppc`. Every post says "Google Ads," never "PPC."
3. **A broad head term is surfacing with no owner.** `google ads home improvement`, `google ads for home renovation company` → a pillar/hub opportunity that also lifts the 4 niche posts via internal links (topic clusters).

Niches with 0 impressions (roofing, HVAC, siding) = expansion bets, ranked below the sure things.

---

## Priority queue

| # | Type | Working title | Target cluster | Effort | Rationale |
|---|------|---------------|----------------|--------|-----------|
| 1 | NEW pillar | Google Ads for Home Improvement Contractors: 2026 Guide | `google ads home improvement`, `...home renovation company` | Med | Owns broad term + hub linking all 4 niche posts |
| 2 | OPTIMIZE | (kitchen post) add PPC cluster + CTR + meta fix | the `...ppc...kitchen...` cluster | Low | Highest ROI on site — demand already there |
| 3 | META sweep | Rewrite meta descriptions on all existing posts | CTR across the board | Low | Several are >200 chars and truncate in SERP |
| 4 | NEW niche | Google Ads for Roofing Contractors | net-new | Med | Best expansion bet: high job value + national volume |
| 5 | NEW niche | Google Ads for HVAC Contractors | net-new | Med | Seasonal + high intent, mirrors the window angle |
| 6 | NEW comparison | Facebook Ads vs Google Ads for Contractors | commercial-investigation | Med | Comparison format ranks; links both ad-type posts |

**Recommended first drop: #1 + #2 + #3 together** — pillar builds the internal-link scaffolding, kitchen fix cashes existing impressions, meta sweep lifts CTR everywhere at near-zero cost.

---

## Meta plan (title tag ≤~58 chars, keyword first; description ~150–160 chars, benefit-led + CTA)

> SEO.tsx appends " | Growth Lift Studio" to every title — the raw title below excludes that.

### New posts
- **Pillar (#1)**
  - Title: `Google Ads for Home Improvement Contractors: 2026 Guide`
  - Slug: `google-ads-home-improvement-contractors`
  - Meta: "How home improvement contractors use Google Ads to book high-ticket jobs — budgets, campaign structure, and real cost-per-lead numbers by trade."
- **Roofing (#4)**
  - Title: `Google Ads for Roofing Contractors: The 2026 Guide`
  - Slug: `google-ads-roofing-contractors`
  - Meta: "How roofing contractors use Google Ads to land high-ticket replacements — storm-season timing, keywords that convert, and realistic 2026 budgets."
- **HVAC (#5)**
  - Title: `Google Ads for HVAC Contractors: How to Get Leads`
  - Slug: `google-ads-hvac-contractors`
  - Meta: "How HVAC contractors use Google Ads to book installs and service calls — seasonal demand, emergency-intent keywords, and real cost-per-lead numbers."
- **Comparison (#6)**
  - Title: `Facebook Ads vs Google Ads for Contractors (2026)`
  - Slug: `facebook-ads-vs-google-ads-contractors`
  - Meta: "Facebook Ads or Google Ads for your contracting business? A straight comparison of cost, intent, and speed — and when to run each."

### Existing posts — meta rewrites (#3)
- **kitchen** (current desc is ~230 chars, truncates):
  - New meta: "Kitchen remodeling Google Ads (PPC) done right — keyword strategy, negative keywords, and landing pages that book $30k+ renovation jobs. Real numbers."
  - Also work "PPC" into an H2/body naturally to catch the untapped cluster.
- **google-ads-bathroom** — audit length; keep if ~150–160, else trim.
- **facebook-ads-bathroom** — audit length; ensure benefit + CTA.
- **google-ads-window** — audit length; keep seasonal hook.

---

## Blog post spec — Pillar (#1), ready to write

**Intent:** informational/commercial — a contractor deciding whether/how to run Google Ads before narrowing to their trade. Answer the broad question, then route to the trade-specific deep-dive.

**H2 outline** (≥4 H2s so the auto mid-post CTA fires; answer-first / BLUF opening):
1. Why Google Ads works for home improvement contractors (hunting-not-fishing hook)
2. Google Ads vs Facebook Ads for contractors (links the Facebook post)
3. What it costs by trade — real 2026 numbers (table: kitchen/bathroom/window CPC, CPL, job value, ROAS; **each row links its niche post**)
4. The 5 pillars of a campaign that books jobs (negative keywords, phrase/exact match, dedicated landing page, conversion tracking, speed-to-lead)
5. How much should you budget? (worked ROI math)
6. The Growth Lift Studio advantage ($1,500 → first 5 appts free → 1.5% of closed job)
7. Where to start (CTA + "read the guide for your trade" internal links)

**Internal links (the point of a pillar):** inline absolute `https://growthliftstudio.in/blog/...` to all 4 existing posts, and add the new slug to `relatedPostsMap` in both directions.

**Images (IMAGE:: placeholders — generate PNGs into `public/images/` later):**
- `IMAGE::/images/home-improvement-hub-diagram.png::How Google Ads maps to each home improvement trade`
- `IMAGE::/images/home-improvement-cost-by-trade.png::Google Ads cost-per-lead and ROAS by trade — 2026`

---

## Wiring checklist (per new post — all three or it's invisible)
1. Object in `src/data/blogPosts.ts`
2. `<url>` in `public/sitemap.xml` (single source of truth for prerender)
3. Entry in `relatedPostsMap` in `src/pages/BlogPost.tsx` (both directions)

**Verify:** `npm run lint` → `npm run build` → check prerendered `dist/blog/<slug>/index.html` for title/meta/canonical + `"@type":"BlogPosting"` + H1; confirm no leaked `**` (renderer only supports full-line bold).

## Sequencing
- **Drop 1 (now):** #1 pillar + #2 kitchen optimize + #3 meta sweep
- **Drop 2:** #4 roofing
- **Drop 3:** #5 HVAC
- **Drop 4:** #6 comparison
- After each drop: re-pull GSC in 2–4 weeks; watch kitchen position/CTR and pillar impressions.
