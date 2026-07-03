# SEO Audit — mylobstr.com
**Date:** 2026-07-02 · **Health Score: 75/100** · **Business type:** Agency + Local Service hybrid (SAB, Capital Region NY)

> Scope note: this was an inline single-pass audit (the parallel specialist agents were cut off by a session usage limit). No Google Search Console/CrUX field data (no API credentials), no backlink data (no Moz/Bing keys), no SERP-competitor (SXO) pass. Performance numbers are lab estimates.

## Scores by category

| Category | Weight | Score | Detail file |
|---|---|---|---|
| Technical SEO | 22% | 82 | findings/technical.md |
| Content Quality | 23% | 78 | findings/content-local.md |
| On-Page SEO | 20% | 65 | findings/onpage.md |
| Schema / Structured Data | 10% | 92 | findings/schema.md |
| Performance (CWV, lab) | 10% | 80 | findings/performance.md |
| AI Search Readiness | 10% | 55 | findings/geo.md |
| Images | 5% | 75 | (in onpage + performance) |
| **Weighted total** | | **75** | |

## Executive summary

This is a healthy, well-built site with no indexing-blocking issues. The foundations most small-business sites get wrong are already right: valid sitemap, self-referencing canonicals, one H1 per page, 100% alt-text coverage, security headers, CLS of zero, sub-100ms TTFB, and a genuinely excellent JSON-LD entity graph (Organization + ProfessionalService with geo/areaServed/GBP link).

**Top 5 issues:**
1. **Title tags duplicate "| MyLobstr Designs" twice** on 6 pages (template + hardcoded suffix) — sloppy in the SERP for a company selling web quality.
2. **AI-crawler policy contradicts AI strategy** — Cloudflare blocks GPTBot/ClaudeBot/CCBot/Google-Extended while the site ships a polished llms.txt aimed at exactly those systems.
3. **www.mylobstr.com serves 200** instead of 301-redirecting to the apex.
4. **Local authority is the growth bottleneck** — GBP exists but the review/citation engine hasn't started; that's what decides the map pack.
5. **Meta descriptions/titles over-length** on most money pages; the "$300 flat" hook risks truncation.

**Top 5 quick wins:** de-duplicate titles (one-line edits), add `Sitemap:` to robots.txt, www 301 (one Cloudflare rule), og:image on city pages, set up Search Console + Bing WMT.

**The strategic read:** MyLobstr's differentiator — published flat pricing — is also its best SEO asset. It's already machine-readable in llms.txt; the highest-leverage moves are (a) letting AI systems actually read it (crawler policy), (b) building the local review base, and (c) deepening the cost-guide content that owns the "how much does a website cost" query space.

See **ACTION-PLAN.md** for the sequenced plan with verification checks.

## Artifacts
- `findings/technical.md`, `findings/onpage.md`, `findings/schema.md`, `findings/geo.md`, `findings/performance.md`, `findings/content-local.md`
- `screenshots/home-desktop-fold.png`, `screenshots/home-mobile-fold.png`
- `audit-data.json` (structured envelope for PDF generation)
