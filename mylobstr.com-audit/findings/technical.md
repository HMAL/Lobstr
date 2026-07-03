# Technical SEO — mylobstr.com

Score: **82/100** · Audited 2026-07-02 (inline pass; lab data only, no GSC/CrUX API)

## What works
- HTTPS enforced: `http://` → 301 → `https://mylobstr.com`. HSTS `max-age=63072000; includeSubDomains; preload`.
- Security headers: X-Content-Type-Options, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy all present.
- Valid XML sitemap at `/sitemap.xml` with plausible lastmod dates (homepage, core pages, 8 blog posts, 3 city pages).
- Clean URL structure, no parameters, consistent lowercase kebab-case.
- Every sampled page: exactly one H1, `<link rel="canonical">` self-referencing, `meta robots: index, follow`.
- Unknown URLs correctly return 404.
- Static export on Cloudflare Pages: TTFB 19–103ms.

## Findings

### HIGH — www subdomain serves 200 instead of redirecting
`https://www.mylobstr.com` returns 200 with the full site — a duplicate host. Self-referencing canonicals on the apex mitigate the risk, but a 301 is the correct fix.
**Fix:** Cloudflare Dashboard → Rules → Redirect Rules: `www.mylobstr.com/*` → `https://mylobstr.com/$1` (301). 
**Falsifiable check:** `curl -sI https://www.mylobstr.com` returns `301` with `location: https://mylobstr.com/`.

### MEDIUM — robots.txt has no `Sitemap:` directive
The Cloudflare-managed robots.txt never declares the sitemap. Bing/others discover sitemaps primarily via robots.txt.
**Fix:** Append `Sitemap: https://mylobstr.com/sitemap.xml` to the robots.txt (in the app's `public/robots.txt` or Cloudflare setting — verify which layer currently generates it, since the content-signals block is Cloudflare-managed).

### MEDIUM — No Content-Security-Policy header
All other hardening headers exist; CSP is absent. Not a ranking factor, but closes the gap on a security audit and matters for a web-design studio selling trust.

### LOW — No IndexNow
Static site on Cloudflare; IndexNow submission on deploy would speed Bing/Copilot indexing of new blog posts. Cloudflare has a built-in "Crawler Hints" toggle that implements this for free.

### INFO — robots.txt blocks AI crawlers (see geo.md)
GPTBot, ClaudeBot, CCBot, Google-Extended, Amazonbot, Applebot-Extended, Bytespider, meta-externalagent all `Disallow: /` via the Cloudflare-managed block. This is a strategy decision, covered in the AI-readiness findings.
