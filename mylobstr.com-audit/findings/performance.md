# Performance (Core Web Vitals) — mylobstr.com

Score: **80/100** · Audited 2026-07-02 · **Lab estimates via Playwright Chromium** (no CrUX field data — no Google API key configured; INP not measurable without real interaction)

## Measurements

| Run | TTFB | FCP | LCP | CLS | LCP element |
|---|---|---|---|---|---|
| Desktop / (cold) | 80ms | 2,976ms | **4,952ms** | 0 | H1 (hero headline) |
| Mobile / (warm) | 19ms | 380ms | 1,624ms | 0 | Hero paragraph |
| Desktop /our-work | 103ms | 272ms | 1,864ms | 0 | Portfolio IMG |
| Mobile /our-work | 24ms | 200ms | 1,656ms | 0 | Portfolio IMG |

Payload (homepage): HTML 40KB compressed · JS 219KB · fonts 92KB (4 preloaded woff2) · images 222KB · 20 requests. CSS is inlined (0 external CSS requests).

## Reading
- **CLS 0 on every run** — excellent; no layout shift at all.
- **TTFB 19–103ms** — Cloudflare edge doing its job.
- The cold-run desktop LCP (4.9s) is partly headless-browser cold-start artifact, but it exposes a real dependency: **the LCP element is the H1, which waits on webfont load** (~92KB across Bricolage Grotesque + Plus Jakarta Sans + Geist Mono). Repeat views are fine; first views on slow connections will feel it.

## Findings

### MEDIUM — LCP (H1) gated on webfonts
**Fix options, in order of impact:** (1) ensure `font-display: swap`/`optional` on the display font so the H1 paints in fallback immediately (next/font `display: 'swap'`); (2) subset — three font families on a brochure site is a lot; Geist Mono especially, check if it's actually visible above the fold anywhere; (3) keep preloads only for fonts used above the fold.
**Falsifiable check:** lab FCP→LCP gap on cold desktop run shrinks from ~2s to <500ms.

### MEDIUM — /our-work ships 1.6MB of images to mobile
13 portfolio screenshots; mobile received 1,611KB (desktop lazy-loaded less due to fold). WebP is already used — the issue is dimensions. Serve responsive sizes (`sizes`/`srcset` — with `next/image` unoptimized static export this needs care, or pre-generate 2 widths with sharp, which is already in the toolchain from the marketing pipeline).
**Falsifiable check:** mobile transfer for /our-work images < 500KB.

### LOW — 219KB JS on a static brochure page
Normal for Next.js; not worth restructuring. Revisit only if INP field data (once CrUX is wired) shows issues.

### INFO — No field data
Site is likely below CrUX traffic threshold anyway. When Search Console is set up (see action plan), its CWV report becomes the source of truth; re-run `/seo google` after credentials exist.
