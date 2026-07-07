# Multi-session coordination log

Multiple Claude Code sessions work in this repo at the same time. Before editing a
file, check this log for an active claim on it; when you start or finish a chunk of
work, add/update your entry. Keep entries to one or two lines and delete them once
the work is committed.

## Active / recent work

- **2026-07-02 — Pricing migration (session: pricing-redesign) — DONE, uncommitted.**
  Rewrote `src/components/Pricing.tsx` and the hero in `src/app/pricing/page.tsx` to the
  storefront system: paper/ink/steam tokens (grays and `bg-white` removed), all gradients
  flattened, ShelfLabel + left-aligned editorial headers, Awning added under the pricing
  hero, "Everything included" icon-card grid collapsed to a checklist, "wins" cut 8 → 4,
  rotating-service line / emoji / hype copy removed, phases renamed (The build / After
  launch / Ongoing). `tsc --noEmit` and eslint clean. Please don't re-edit these two files
  without checking here first.

- **2026-07-02 — Contact function pricing sync (session: run-local) — DONE, uncommitted.**
  `functions/api/contact.ts`: updated stale `planData` ($75/$150/$250 + phase2 tiers) to the
  current pricing (Starter $300 one-time, Growing $150+$30/mo, Scale $250+$50/mo) and reworked
  the inquiry-email plan section (one-time special case, Build/Hosting rows, Year-1 total =
  build + 11×monthly, matching Contact.tsx).

- **2026-07-02 — Hero right-side visual (session: hero-build-week) — DONE, uncommitted.**
  New `src/components/BuildWeekWindow.tsx` + `src/components/Hero.tsx` copy block split into
  a two-column lg grid: animated "build week" shop window (Day 1 wireframe → built site →
  LIVE badge → search-result card) fills the formerly empty right side. The story LOOPS on a
  9.6s cycle (hold → soft fade → replay; window frame appears once and stays); reduced-motion
  gets the static finished state; hidden below lg. `tsc` + eslint clean, verified in browser
  at 1440/768/reduced-motion and across two loop cycles.

- **2026-07-02 — Unknown session adding `src/components/StorefrontStreet.tsx` and
  `src/lib/work.ts`** (appeared untracked mid-session; presumed our-work related).
  If that's you, replace this line with a description of what you're doing.

- **2026-07-07 — Industries niche landing pages, round 2: expand to 13 + Albany
  (session: industries-build) — DONE, uncommitted.** Reworked round 1 (4 industries,
  demo-link case studies) per owner feedback: dropped the case-study/demo-link section
  entirely; added 9 more industries (daycares, barbers, pet-care, auto-repair,
  primary-care, apartments, ice-cream-shops, coffee-shops, mexican-restaurants — 13
  total); added a "recommended package" section per industry (Starter/Growing/Scale +
  a reasoning sentence, highlighted like Pricing.tsx's "Most Popular"); rewrote FAQs as
  4–5 long-tail query-match questions per industry (feeds the existing `faqPageSchema`
  JSON-LD); added a full Albany entry to `src/lib/locations.ts` (new
  `/web-design/albany-ny` page, reusing the existing city route). `llms.txt` locations/
  industries lists are now derived from `cities`/`industries` data (was hardcoded —
  removes a drift risk). Touched: `src/lib/industries.ts`, `src/lib/locations.ts`,
  `src/lib/work.ts` (removed now-unused `getProjectsBySlugs`),
  `src/app/industries/[niche]/page.tsx`, `src/app/industries/page.tsx`,
  `src/app/llms.txt/route.ts`. `tsc --noEmit`, eslint, and `next build` all clean —
  all 13 industry pages + hub + `/web-design/albany-ny` prerender correctly; dev-server
  smoke-tested. Not touching Pricing/Hero/BuildWeekWindow.

- **2026-07-07 — Add Walworld to Our Work — DONE, uncommitted.** Added a new
  `walworld` entry to `src/lib/work.ts` `demoWork` (Walworld International
  Supermarket, `https://walworld.mylobstr.com/`, grocery/food-court in Albany NY,
  `live: false` per the mylobstr-subdomain-demo convention, no screenshot yet — uses
  an Unsplash stock fallback like the other unscreenshotted demo entries) and added
  its slug to `heroShowcase` (after `little-journeys`) so it appears in the homepage
  scrolling storefront street as well as the `/our-work` grid. `tsc --noEmit` clean.
  If someone captures a real screenshot for it, add a `screenshot: '/screenshots/walworld-1.webp'`
  field.

- **2026-07-07 — Industries pages: design pass to the "storefront" system —
  DONE, uncommitted.** `src/app/industries/page.tsx` and
  `src/app/industries/[niche]/page.tsx` had drifted onto the pre-refresh template
  (centered eyebrow pill, `bg-white`/`gray-900`/`gray-600`/`gray-50` literals,
  floating "Recommended" pill, boxed check-list cards, `rounded-full` CTAs) — the
  exact generic-SaaS pattern already killed on Home/Pricing. Rebuilt both to match
  Pricing.tsx/ChooseWhereToBegin.tsx: left-aligned `bg-ink` hero + `Awning`,
  `ShelfLabel` section openers, `font-display` headings, `ink`/`paper`/`paper-2`/
  `steam`/`coral`/`coral-ink`/`marigold`/`border` tokens throughout, asymmetric
  `md:grid-cols-[1.4fr_1fr]` header blocks, flat (unboxed) checklist, inline
  (non-floating) recommended-plan badge, `rounded-xl` focus-visible CTA buttons.
  Added `src/lib/industryIcons.tsx` (one Lucide icon per industry, a static map —
  not a lookup function, to satisfy `react-hooks/static-components`). `tsc --noEmit`
  and `eslint` clean; all 13 niche routes + hub verified 200 against the running
  dev server. Deliberately left motion/framer-motion off these pages (parity with
  `web-design/[city]`, the closest sibling page type, which also has none — keeps
  the many programmatic pages lean). Note for later: `web-design/[city]/page.tsx`,
  `contact/page.tsx`, and `About.tsx` still carry the same pre-refresh
  centered/gray-literal pattern and would benefit from the same treatment in a
  future pass — not touched here to stay in scope.

- **2026-07-07 — Site-wide metadata fix: doubled `<title>` suffix + missing og:image
  (session: run-local) — DONE, uncommitted.** SEO audit of the industries changes turned
  up two bugs confirmed against the actual `next build` output, present on every page that
  supplies its own branded `title` string: (1) root layout's `title.template: "%s |
  MyLobstr Designs"` was appending the suffix a second time onto page titles that already
  included it (e.g. `<title>...| MyLobstr Designs | MyLobstr Designs</title>`) — fixed by
  switching each page's `title` to `{ absolute: '...' }` (Next's documented escape hatch;
  no title *text* changed, so nothing SEO-cached should shift) in `about/page.tsx`,
  `careers/page.tsx`, `contact/page.tsx`, `faq/page.tsx`, `our-work/page.tsx`,
  `pricing/page.tsx` (title field only — did not touch the re-migrated hero/Pricing.tsx),
  `industries/page.tsx`, `industries/[niche]/page.tsx`, `web-design/[city]/page.tsx`.
  (2) Pages whose `generateMetadata`/`metadata` redefine `openGraph` were dropping the
  root layout's `og:image` entirely (Next only shallow-merges metadata per segment — a
  child `openGraph` object fully replaces the parent's, per
  `node_modules/next/dist/docs/.../generate-metadata.md`), so `/industries/*`,
  `/web-design/[city]`, and `/about` had **no** `og:image` at all — fixed by adding the
  same `images`/`siteName` back into each of those `openGraph` blocks (`about/page.tsx`,
  `industries/page.tsx` which previously had no `openGraph` at all and was silently
  inheriting the homepage's wrong title/url/description, `industries/[niche]/page.tsx`,
  `web-design/[city]/page.tsx`). Re-ran `next build` and diffed every generated `.html` in
  `out/` before and after — 0 pages left with a doubled title, 0 pages left missing
  `og:image` (previously 24 and 18 respectively). `tsc --noEmit` clean; eslint clean on
  every touched file except 4 pre-existing unescaped-apostrophe errors in
  `careers/page.tsx` unrelated to the one-line edit there. **Not fixed (flagged, not in
  scope of this pass):** `twitter` metadata is only ever defined once, in the root
  layout — no page overrides it, so every page's Twitter/X card shows the homepage's
  generic title/description regardless of which page is actually shared. This is
  site-wide (not industries-specific) and would mean adding a per-page `twitter` block
  everywhere; left for a separate pass since it's a different scope/size of change.

- **2026-07-07 — Industry page CTA: embed the lead form directly (session: run-local)
  — DONE, uncommitted.** The final CTA on `/industries/[niche]` was just a headline +
  "Get a free quote" button linking to `/contact`. Replaced it with a new
  `src/components/IndustryCTA.tsx` (client component, mirrors the existing
  `ReadyWhenYouAre.tsx` homepage pattern): keeps the industry-specific headline/copy,
  adds tracked phone/email quick-links, and embeds `<ContactForm compact />` right in
  the section so a visitor can submit a lead without leaving the page. Touched:
  `src/app/industries/[niche]/page.tsx` (swapped the old CTA `<section>` for
  `<IndustryCTA singular={industry.singular} />` — only that one section; left the rest
  of the file, incl. the storefront-system pass above, untouched), new
  `src/components/IndustryCTA.tsx`. `tsc --noEmit` and eslint clean on both files;
  dev-server smoke-tested (barbers, dentists, coffee-shops render the form; `/contact`
  unaffected). The same text-only CTA still exists on `/web-design/[city]` — not
  touched, out of scope for this request.
