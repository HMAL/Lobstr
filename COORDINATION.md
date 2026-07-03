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
