# On-Page SEO — mylobstr.com

Score: **65/100** · Audited 2026-07-02 · 11 pages sampled

## What works
- One H1 per page, descriptive and locally differentiated (Troy: "built for the Collar City"; Schenectady: "Electric City").
- 100% image alt-text coverage on every sampled page.
- Self-referencing canonicals everywhere; `index, follow` everywhere.
- Strong keyword targeting: every money page leads with "Website Design Albany NY" variants.

## Findings

### HIGH — Brand suffix duplicated in titles on 6 pages ("… | MyLobstr Designs | MyLobstr Designs")
[src/app/layout.tsx:38](../../src/app/layout.tsx#L38) sets `template: "%s | MyLobstr Designs"`, and these pages *also* hardcode the suffix in their own `title`:

| Page | File | Rendered length |
|---|---|---|
| /pricing | src/app/pricing/page.tsx:8 | 88 chars |
| /faq | src/app/faq/page.tsx:8 | 97 chars |
| /contact | src/app/contact/page.tsx:7 | 86 chars |
| /our-work | src/app/our-work/page.tsx:8 | 94 chars |
| /web-design/troy-ny | src/app/web-design/[city]/page.tsx | 93 chars |
| /web-design/schenectady-ny | (same template) | 100 chars |

/about and /careers already omit the suffix and render correctly — copy that pattern.
**Fix:** delete `| MyLobstr Designs` from the six page-level `title` strings (incl. the city-page template) and let the layout template append it once.
**Falsifiable check:** `curl -s https://mylobstr.com/pricing | grep -o '<title>[^<]*'` shows the suffix exactly once.

### MEDIUM — Titles exceed display limit even after de-duplication
Target ≤60 chars. Post-fix, /faq ("Website Design FAQ Albany NY | Small Business Web Questions") is still 60+, city pages ~75. Google truncates or rewrites long titles. Trim the middle clause, keep city + service + brand.

### MEDIUM — Meta descriptions over-length on key pages
Homepage 249 chars, blog cost-guide 211, city pages 209–220 (target ~150–160). Google truncates mid-sentence; the "$300 flat, no monthly fee" hook must appear in the first 150 chars.

### MEDIUM — og:image missing on /about and all /web-design/[city] pages
Sampled pages otherwise have og:image. City pages are the ones people will share in local Facebook groups — exactly where the preview image matters. Add `openGraph.images` to the city page template and about page (Next.js `opengraph-image.png` route convention or explicit metadata).

### LOW — Homepage word count 791
Adequate but lean for the head term "website design albany ny". The blog cost-guide (970 words) competing pages typically run 1,500+. Consider expanding with a process section and FAQ excerpt.
