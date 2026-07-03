# Schema / Structured Data — mylobstr.com

Score: **92/100** · Audited 2026-07-02

## What works (this is a strong implementation)
- Sitewide `@graph` with `Organization` (#organization), `WebSite` (#website), and `ProfessionalService` (#business) — correct entity linking via `@id`/`publisher`/`parentOrganization`.
- `ProfessionalService` carries NAP-for-SAB correctly: locality-only PostalAddress (Albany, NY), `geo` coordinates, `telephone +1-518-677-6688`, `email`, `areaServed` city list.
- `sameAs` → Google Maps link (GBP exists and is connected — important local signal).
- `alternateName` ("Mylobstr", "MyLobstr Web Design") disambiguates the brand from "lobster" — deliberate and smart.
- City pages add `Service` + `FAQPage` + `BreadcrumbList`; blog posts add `Article` + `BreadcrumbList`; /faq has `FAQPage` + `BreadcrumbList`. All JSON-LD parses cleanly (no syntax errors in any sampled block).

## Findings

### MEDIUM — `contactPoint.areaServed` is `"US"` while the business serves the Capital Region
Inconsistent with the `ProfessionalService.areaServed` city list. Set it to the same city/region values (or drop it and let the business entity carry areaServed).

### LOW — `Organization.logo` points to `https://mylobstr.com/logo.png`
Verify the file exists and is ≥112×112px (Google logo guidelines). If the real logo lives elsewhere (e.g. an optimized asset path), update the reference.

### LOW — No `aggregateRating` / `review` markup
Only add once real client reviews exist on-page (never synthesize). When the GBP has reviews, quoting 2–3 on /our-work with `Review` markup is a legitimate rich-result play for a local service business.

### INFO — FAQPage markup (on /faq and city pages)
Google retired FAQ rich results for all sites (May 7, 2026), so expect no SERP feature from this markup. Keep it — it still aids AI/LLM answer extraction. Do not add more FAQPage expecting SERP benefit.

## Opportunities (not errors)
- `Service` schema exists on city pages; consider adding `Offer` with the flat `price: 300, priceCurrency: USD` on /pricing under the Service — transparent pricing is this brand's differentiator and it's machine-readable nowhere yet.
- Blog `Article`: confirm `author` is a `Person` with a name that matches a visible byline (E-E-A-T tie-in; see content.md).
