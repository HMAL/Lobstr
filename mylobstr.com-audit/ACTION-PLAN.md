# SEO Action Plan — mylobstr.com (2026-07-02)

Health score: **75/100**. No Critical (indexing-blocking) issues found. Order matters: Phase-1 items are code/config fixes that everything else builds on.

## Phase 1 — This week (config + code, ~2 hours total)
1. **[HIGH] Fix duplicated title suffix** on /pricing, /faq, /contact, /our-work, and the /web-design/[city] template — remove hardcoded `| MyLobstr Designs`; the layout template ([src/app/layout.tsx:38](../src/app/layout.tsx#L38)) appends it. While in there, trim all titles toward ≤60 chars and meta descriptions toward ≤160 with the "$300 flat, no monthly" hook in the first 150.
   *Verify:* `curl -s <page> | grep -o '<title>[^<]*'` → suffix appears once.
2. **[HIGH] Decide the AI-crawler policy** (this contradicts your llms.txt investment): Cloudflare currently blocks GPTBot/ClaudeBot/CCBot/Google-Extended. Recommendation for a marketing site: disable Cloudflare's AI-bot block (Security → Bots). Live AI search (AI Overviews, ChatGPT search, Perplexity) works either way; this is about long-term model knowledge of the brand.
3. **[HIGH] 301 www → apex** (Cloudflare Redirect Rule). *Verify:* `curl -sI https://www.mylobstr.com` → 301.
4. **[MEDIUM] Add `Sitemap: https://mylobstr.com/sitemap.xml` to robots.txt.**
5. **[MEDIUM] Set up Google Search Console + Bing Webmaster Tools**, submit the sitemap. This unlocks real query/indexation/CWV data for every future audit (then `/seo google` works with an API key).

## Phase 2 — Weeks 2–3 (on-page + local)
6. **[HIGH] Start the review engine:** ask every past/current client for a Google review naming service + city. Target 10 text reviews. This is the single biggest map-pack lever available.
7. **[MEDIUM] og:image for /about and city pages** (they're what gets shared in local Facebook groups).
8. **[MEDIUM] Tier-1 citations with exact NAP:** Bing Places, Apple Business Connect, Yelp, Nextdoor, Alignable, Clutch/UpCity.
9. **[MEDIUM] Font/LCP tune-up:** `display: 'swap'` on the hero font, audit whether all 3 font families are needed above the fold; responsive image sizes for /our-work (mobile currently downloads 1.6MB).
10. **[MEDIUM] Fix `contactPoint.areaServed`** from "US" to the Capital Region city list (match ProfessionalService.areaServed).

## Phase 3 — Month 2 (content & authority)
11. **[MEDIUM] Expand the cost-guide post** (~970 → 1,800+ words: comparison price table, FAQs, worked example). It targets your most valuable informational query.
12. **[MEDIUM] Author bylines** on blog posts, linked to /about; mirror in Article schema `author`.
13. **[MEDIUM] Local proof on city pages:** one client screenshot + named testimonial per city; confirm saratoga-springs-ny page is live + in sitemap.
14. **[LOW] `Offer` schema with `price: 300`** on /pricing; Review markup once real reviews are quotable on-page.

## Phase 4 — Ongoing monitoring
- Monthly: GBP review count; map-pack spot-check for "web designer albany ny"; ChatGPT/Perplexity brand-mention spot-check.
- After GSC has data: re-run this audit with Google APIs configured; capture a drift baseline (`/seo drift baseline https://mylobstr.com`) so future changes are diffable.
- Keep llms.txt/llms-full.txt in sync with pricing at every deploy.
