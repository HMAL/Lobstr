'use client'

import { useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import {
  Check, Zap, Heart, Sparkles, Headphones, ShieldCheck, Plus, Minus,
  ExternalLink, ArrowRight, Hammer, TrendingUp, Anchor,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { track, AnalyticsEvent } from '@/lib/analytics'
import ShelfLabel from '@/components/ShelfLabel'

// ── 3-tier pricing ─────────────────────────────────────────────────────────────
const tiers = [
  {
    name: 'Starter',
    price: 300,
    phase2: 0,
    monthly: 0,
    hasPhase3: false,
    oneTime: true,
    visits: '10,000',
    delivery: '7 business days',
    badge: 'One-time price',
    featured: false,
  },
  {
    name: 'Growing Business',
    price: 150,
    phase2: 30,
    monthly: 30,
    hasPhase3: false,
    oneTime: false,
    visits: '30,000',
    delivery: '7 business days',
    badge: 'Most popular',
    featured: true,
  },
  {
    name: 'Scale',
    price: 250,
    phase2: 50,
    monthly: 50,
    hasPhase3: true,
    oneTime: false,
    visits: '50,000',
    delivery: '7 business days',
    badge: 'Enterprise',
    featured: false,
  },
]

// ── Why owners choose us — the four that matter ────────────────────────────────
const wins = [
  {
    icon: Zap,
    title: 'Live in about a week',
    desc: 'You do nothing. We design, build, and launch your site while you run your business.',
  },
  {
    icon: Heart,
    title: 'Starter has no monthly fee',
    desc: 'A flat $300, one time. Growing and Scale add $30 or $50 a month for hosting and support.',
  },
  {
    icon: Sparkles,
    title: 'Custom, not a template',
    desc: 'Every site is designed from scratch around your business. No drag-and-drop starter themes.',
  },
  {
    icon: Headphones,
    title: 'Real humans, always',
    desc: 'A real person answers every message. No bots, no ticket queues, no waiting.',
  },
]

// ── Payment phases (how billing works) ────────────────────────────────────────
const phases = [
  {
    num: 1,
    label: 'The build',
    duration: 'Month 1',
    icon: Hammer,
    tagline: 'Your full website, designed and live.',
    bullets: [
      'Custom design tailored to your brand',
      'Built and launched within your tier timeline',
      'Hosting, SSL, and domain setup',
      'Mobile-optimized from day one',
    ],
    sub: 'This is the cost of building your site — a freelancer typically charges $1,500+ for design alone.',
  },
  {
    num: 2,
    label: 'After launch',
    duration: 'Months 2–3',
    icon: TrendingUp,
    tagline: 'Your site is live and working.',
    bullets: [
      'Unlimited content edits',
      'Performance monitoring',
      'SEO tuning as rankings improve',
      'We stay on call for anything',
    ],
    sub: 'Most clients cover this from a single new customer.',
  },
  {
    num: 3,
    label: 'Ongoing',
    duration: 'Month 4 onward',
    icon: Anchor,
    tagline: 'The same rate, for as long as you want us.',
    bullets: [
      'Full hosting and uptime monitoring',
      'Security updates included',
      'Cancel anytime — no contracts',
    ],
    sub: 'The monthly never changes without a heads-up from us.',
  },
]

const realBuilds = [
  { name: 'Coupon Companions', href: 'https://couponcompanions.com', desc: 'Live e-commerce platform' },
  { name: 'Happy Homes Hub', href: 'https://happyhomeshub.com', desc: 'Multi-role web app, live users' },
]

const faqs = [
  {
    q: 'Why is this so much cheaper than everyone else?',
    a: "We're a lean Albany team, not a big agency with offices and account managers to pay for. We'd rather have 100 happy local businesses at a fair price than 5 paying agency rates. No catch — just lower overhead passed to you.",
  },
  {
    q: "What's the catch with the monthly rate?",
    a: "There isn't one. Starter has no monthly fee at all — it's a flat one-time $300. On Growing ($30/mo) and Scale ($50/mo), that monthly covers hosting, security, uptime monitoring, and us being on call. No setup fees, no per-edit charges, no surprise invoices.",
  },
  {
    q: 'Do I actually own my website?',
    a: 'Yes. The design and content are yours. If you ever leave, you keep your domain and we hand over your files — no hostage situations.',
  },
  {
    q: 'What happens if I want to cancel?',
    a: 'Cancel anytime, no contracts and no cancellation fees. And within the first 14 days, it\'s a full money-back guarantee.',
  },
  {
    q: 'Why a build price up front?',
    a: "That covers the real work of designing and launching your custom site — a freelancer charges $1,500+ for design alone. It's the only larger payment you'll ever make, and it's backed by the 14-day guarantee.",
  },
  {
    q: 'Are there any hidden fees?',
    a: 'None. Hosting, SSL, domain setup, and support are all included in your plan. The only thing that changes your ongoing monthly is adding more pages (+$0.25/mo each after the first 4).',
  },
  {
    q: 'What is the hosting limit and what happens if I exceed it?',
    a: 'Each plan includes a monthly visit limit: Starter (10K), Growing Business (30K), Scale (50K). If you grow beyond your plan, we help you upgrade — Cloudflare\'s paid tier starts at $5/mo and handles millions of visits. We\'ll always give you a heads-up before any cost changes.',
  },
]

// ── Everything covered — one honest checklist, not a wall of icon cards ────────
const includedItems = [
  { title: 'Custom development',      desc: 'Built from scratch — no templates, no drag-and-drop' },
  { title: 'Google Business Profile', desc: 'Claimed, verified, and built out — you show up on Google Maps' },
  { title: 'Logo design',             desc: 'A clean, professional logo at no extra cost (Growing & Scale)' },
  { title: 'Cloudflare hosting',      desc: 'Global CDN with room to grow' },
  { title: 'SSL certificate',         desc: 'https:// security on day one, always included' },
  { title: 'Mobile-first design',     desc: 'Looks right on every phone, tablet, and desktop' },
  { title: 'Contact form',            desc: 'Customers reach you directly — no third-party fees' },
  { title: 'SEO setup',               desc: 'Sitemap, meta tags, and Search Console from launch' },
  { title: 'Analytics',               desc: "Google Analytics wired up so you see who's visiting" },
  { title: 'Security updates',        desc: 'We keep everything patched and maintained' },
  { title: 'Real human support',      desc: 'A real person answers every message' },
  { title: '14-day guarantee',        desc: "Don't love it? Full refund, and you keep the design files" },
]

const comparisonSections: Array<{ category: string; rows: Array<{ label: string; values: (string | boolean)[] }> }> = [
  {
    category: 'Pages & Speed',
    rows: [
      { label: 'Number of pages',          values: ['5 pages',        '10 pages',        '20 pages'] },
      { label: 'Launch time',              values: ['7 business days','7 business days',  '7 business days'] },
      { label: 'Monthly visitors included',values: ['10,000/mo',      '30,000/mo',       '50,000/mo'] },
    ],
  },
  {
    category: 'Foundation — every plan',
    rows: [
      { label: 'Mobile-first responsive design', values: [true,  true,  true] },
      { label: 'SSL certificate',                values: [true,  true,  true] },
      { label: 'Contact form',                   values: [true,  true,  true] },
      { label: 'Google Analytics',               values: [true,  true,  true] },
      { label: 'Click-to-call + social links',   values: [true,  true,  true] },
    ],
  },
  {
    category: 'Identity',
    rows: [
      { label: 'Logo design',                          values: [false, true,  true] },
      { label: 'Domain name covered (under $20/yr)',   values: [false, true,  true] },
    ],
  },
  {
    category: 'Local Search & SEO',
    rows: [
      { label: 'Google Business Profile',                   values: ['Claimed & set up', 'Fully built', 'Multi-location'] },
      { label: 'Google Search Console setup',               values: [true,  true,  true] },
      { label: 'Google Merchant Center setup',              values: [true,  true,  true] },
      { label: 'Listed on Yelp, Bing & Apple Maps',         values: [false, true,  true] },
      { label: 'Full SEO — schema markup & local keywords', values: [false, true,  true] },
    ],
  },
  {
    category: 'Content & Growth',
    rows: [
      { label: 'Photo gallery',          values: [false, true, true] },
      { label: 'Blog & news section',    values: [false, true, true] },
      { label: 'Online booking widget',  values: [false, true, true] },
      { label: 'Newsletter signup',      values: [false, true, true] },
      { label: 'WhatsApp chat button',   values: [false, true, true] },
    ],
  },
  {
    category: 'Admin & Scale',
    rows: [
      { label: 'Admin panel — edit content yourself', values: [true, true, true] },
      { label: 'Multi-location pages',                values: [false, false, true] },
      { label: 'Team directory & staff profiles',     values: [false, false, true] },
      { label: 'Service / product catalog',           values: [false, false, true] },
      { label: 'Testimonials manager',                values: [false, false, true] },
      { label: 'Job postings section',                values: [false, false, true] },
      { label: 'Dedicated support line',              values: [false, false, true] },
    ],
  },
  {
    category: 'Custom Domains',
    rows: [
      { label: 'Custom domains included', values: ['1 domain', '2 domains', '10 domains'] },
    ],
  },
]

// Shared cell content for a comparison value.
function CellValue({ val }: { val: string | boolean }) {
  if (typeof val === 'boolean') {
    return val ? (
      <Check className="h-4 w-4 text-coral-ink" strokeWidth={2.5} />
    ) : (
      <Minus className="h-4 w-4 text-border" />
    )
  }
  return <span className="text-xs font-semibold text-ink text-center leading-tight">{val}</span>
}

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeTier, setActiveTier] = useState(1)
  const reduce = useReducedMotion()

  const reveal: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  const selectedTier = tiers[activeTier]
  const journeyPhases = selectedTier.oneTime
    ? phases.filter((_, index) => index < 1)
    : phases.filter((_, index) => index < 2 || selectedTier.hasPhase3)
  const tierYearTotal = selectedTier.oneTime
    ? selectedTier.price
    : selectedTier.hasPhase3
      ? selectedTier.price + selectedTier.phase2 * 2 + selectedTier.monthly * 9
      : selectedTier.price + selectedTier.phase2 * 11

  return (
    <section id="pricing" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">

        {/* ── THE PLANS ── */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={reveal}>
          <ShelfLabel className="mb-8">The plans</ShelfLabel>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
            <h2 className="max-w-xl font-display text-3xl leading-[1.1] font-semibold tracking-[-0.02em] text-ink lg:text-[2.75rem]">
              Choose your plan
            </h2>
            <p className="text-lg leading-relaxed text-steam">
              Starter is a flat one-time price. Growing and Scale add a low monthly rate for
              hosting and support. All three include the 14-day money-back guarantee.
            </p>
          </div>

          {/* Year-total anchor */}
          <div className="mt-10 flex">
            <div className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl bg-ink px-6 py-3 text-paper">
              <span className="text-sm text-paper/60">
                {selectedTier.name} — {selectedTier.oneTime ? 'one-time total' : 'first year, all in'}:
              </span>
              <span className="text-2xl font-bold">${tierYearTotal}</span>
              <span className="text-sm text-paper/60">where an agency often starts around $5,000</span>
            </div>
          </div>
        </motion.div>

        {/* ── PLAN COMPARISON GRID ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
          className="mt-8 mb-16 overflow-hidden rounded-2xl border border-border bg-white"
        >

          {/* ── MOBILE VIEW ── */}
          <div className="md:hidden">

            {/* Plan tabs */}
            <div className="flex gap-2 border-b border-border bg-paper-2 p-3">
              {tiers.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTier(i)}
                  className={cn(
                    'flex-1 rounded-xl px-1 py-2.5 text-xs font-semibold leading-tight transition-colors',
                    activeTier === i ? 'bg-ink text-paper' : 'border border-border bg-white text-steam'
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {/* Selected plan summary */}
            <div className={cn('border-b border-border px-4 py-4', selectedTier.featured ? 'bg-coral/5' : 'bg-white')}>
              <span className={cn(
                'mb-2 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white',
                selectedTier.featured ? 'bg-coral' : 'bg-ink'
              )}>
                {selectedTier.badge}
              </span>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-bold text-ink">${selectedTier.price}</span>
                <span className="text-sm text-steam">{selectedTier.oneTime ? 'one-time' : 'build'}</span>
                <span className="text-border">·</span>
                {selectedTier.oneTime ? (
                  <span className="font-semibold text-coral-ink">no monthly fee</span>
                ) : (
                  <>
                    <span className="font-semibold text-ink">${selectedTier.hasPhase3 ? selectedTier.monthly : selectedTier.phase2}/mo</span>
                    <span className="text-xs text-steam">after launch</span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-steam">{selectedTier.delivery} · {selectedTier.visits} visits/mo</p>
            </div>

            {/* Feature list for selected plan */}
            {comparisonSections.map((section) => (
              <div key={section.category}>
                <div className="bg-ink px-4 py-1.5">
                  <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-paper/60">{section.category}</span>
                </div>
                {section.rows.map((row, ri) => (
                  <div
                    key={row.label}
                    className={cn('flex items-center justify-between gap-3 border-t border-border px-4 py-3', ri % 2 === 0 ? 'bg-white' : 'bg-paper/60')}
                  >
                    <span className="text-sm font-medium text-ink">{row.label}</span>
                    <span className="flex shrink-0 justify-end">
                      <CellValue val={row.values[activeTier]} />
                    </span>
                  </div>
                ))}
              </div>
            ))}

            {/* Mobile payment journey */}
            <div className="border-t border-border">
              <div className="flex items-center gap-3 bg-ink px-4 py-2.5">
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-paper/60">Payment journey</span>
                <span className="rounded-full bg-coral px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                  {selectedTier.name}
                </span>
              </div>
              <div className="divide-y divide-border">
                {journeyPhases.map((phase) => {
                  const Icon = phase.icon
                  return (
                    <div key={phase.num} className="w-full px-4 py-4 text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 shrink-0 text-coral-ink" strokeWidth={1.75} />
                          <div>
                            <p className="text-sm font-semibold text-ink">{phase.label}</p>
                            <p className="text-xs text-steam">
                              {phase.num === 2 && !selectedTier.hasPhase3 ? 'Month 2 onward' : phase.duration}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-ink">
                            {phase.num === 1 ? `$${selectedTier.price}` : phase.num === 2 ? `$${selectedTier.phase2}` : `$${selectedTier.monthly}`}
                          </p>
                          <p className="text-[10px] text-steam">
                            {phase.num === 1 ? 'one time' : phase.num === 2 ? (selectedTier.hasPhase3 ? '/mo × 2' : '/mo ongoing') : '/mo ongoing'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1.5 border-t border-border pt-3">
                        {phase.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-1.5 text-xs text-steam">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-coral-ink" strokeWidth={2.5} />
                            {b}
                          </div>
                        ))}
                        <p className="border-t border-border pt-1.5 text-[11px] italic text-steam/80">{phase.sub}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── DESKTOP VIEW ── */}
          <div className="hidden overflow-x-auto md:block">
            <div className="min-w-[600px]">

              {/* Plan header row */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-border bg-paper-2">
                <div className="flex items-end px-5 py-5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-steam">Features</div>
                {tiers.map((t, i) => {
                  const isSelected = activeTier === i
                  return (
                    <button
                      key={t.name}
                      onClick={() => setActiveTier(i)}
                      className={cn(
                        'cursor-pointer border-l border-border px-4 py-5 text-center transition-colors duration-200',
                        isSelected ? 'border-t-4 border-t-coral bg-white' : 'hover:bg-white/60'
                      )}
                    >
                      <span className={cn(
                        'mx-auto mb-2 block w-fit rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white',
                        t.featured ? 'bg-coral' : 'bg-ink'
                      )}>
                        {t.badge}
                      </span>
                      <p className="mb-1 text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-2xl font-bold text-ink">${t.price}</p>
                      <p className="text-xs text-steam">{t.oneTime ? 'one-time · no monthly' : `build · $${t.hasPhase3 ? t.monthly : t.phase2}/mo after`}</p>
                      {isSelected && (
                        <span className="mt-2 inline-block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral-ink">
                          Selected
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Feature rows grouped by category */}
              {comparisonSections.map((section) => (
                <div key={section.category}>
                  <div className="bg-ink px-5 py-2">
                    <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-paper/60">{section.category}</span>
                  </div>
                  {section.rows.map((row, ri) => (
                    <div
                      key={row.label}
                      className={cn('grid grid-cols-[2fr_1fr_1fr_1fr] border-t border-border', ri % 2 === 0 ? 'bg-white' : 'bg-paper/60')}
                    >
                      <div className="flex items-center px-5 py-3.5 text-sm font-medium text-ink">{row.label}</div>
                      {row.values.map((val, vi) => (
                        <div
                          key={vi}
                          onClick={() => setActiveTier(vi)}
                          className={cn(
                            'flex cursor-pointer items-center justify-center border-l border-border px-3 py-3.5 transition-colors',
                            activeTier === vi ? 'bg-coral/5' : 'hover:bg-paper-2/60'
                          )}
                        >
                          <CellValue val={val} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}

              {/* Payment journey */}
              <div className="border-t border-border">
                <div className="flex items-center gap-3 bg-ink px-5 py-2.5">
                  <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-paper/60">Payment journey</span>
                  <span className="rounded-full bg-coral px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                    {selectedTier.name}
                  </span>
                </div>
                <div className={cn('grid divide-x divide-border', selectedTier.hasPhase3 ? 'grid-cols-3' : 'grid-cols-2')}>
                  {journeyPhases.map((phase) => {
                    const Icon = phase.icon
                    return (
                      <div key={phase.num} className="h-full w-full p-5 text-left">
                        <div className="mb-2 flex items-center gap-2">
                          <Icon className="h-5 w-5 shrink-0 text-coral-ink" strokeWidth={1.75} />
                          <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-steam">
                            Phase {phase.num} · {phase.num === 2 && !selectedTier.hasPhase3 ? 'Month 2 onward' : phase.duration}
                          </span>
                        </div>
                        <div className="mb-1">
                          {phase.num === 1 ? (
                            <><span className="text-2xl font-bold text-ink">${selectedTier.price}</span><span className="text-xs text-steam"> one time</span></>
                          ) : phase.num === 2 ? (
                            <><span className="text-2xl font-bold text-ink">${selectedTier.phase2}</span><span className="text-xs text-steam">{selectedTier.hasPhase3 ? '/mo × 2' : '/mo ongoing'}</span></>
                          ) : (
                            <><span className="text-2xl font-bold text-ink">${selectedTier.monthly}</span><span className="text-xs text-steam">/mo ongoing</span></>
                          )}
                        </div>
                        <p className="mb-0.5 text-sm font-semibold text-ink">{phase.label}</p>
                        <p className="text-xs text-steam">{phase.tagline}</p>
                        <div className="mt-3 space-y-1.5 border-t border-border pt-3">
                          {phase.bullets.map((b) => (
                            <div key={b} className="flex items-start gap-1.5 text-xs text-steam">
                              <Check className="mt-0.5 h-3 w-3 shrink-0 text-coral-ink" strokeWidth={2.5} />
                              {b}
                            </div>
                          ))}
                          <p className="border-t border-border pt-1.5 text-[11px] italic text-steam/80">{phase.sub}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Selected plan CTA — shared */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border bg-paper-2 px-6 py-5 sm:flex-row">
            <div>
              <p className="font-semibold text-ink">{selectedTier.name}</p>
              <p className="text-sm text-steam">
                {selectedTier.oneTime
                  ? `$${selectedTier.price} one-time · no monthly fee · ${selectedTier.delivery}`
                  : `$${selectedTier.price} build · $${selectedTier.monthly}/mo after launch · ${selectedTier.delivery}`}
              </p>
            </div>
            <a
              href={`/contact?plan=${encodeURIComponent(selectedTier.name)}`}
              onClick={() => track(AnalyticsEvent.CtaClick, { location: 'pricing', label: 'Send message', plan: selectedTier.name, destination: '/contact' })}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-coral px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-paper-2 sm:w-auto"
            >
              Send message <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* The honest aside */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
          className="mx-auto mb-20 max-w-2xl border-l-2 border-coral pl-6"
        >
          <p className="font-display text-xl font-semibold leading-snug text-ink">
            For most local businesses, a customer or two from the site covers what it cost.
          </p>
          <p className="mt-2 text-base leading-relaxed text-steam">
            That&apos;s the whole idea. We kept the price low so getting online is an easy yes,
            not a big decision you have to sleep on.
          </p>
        </motion.div>

        {/* ── EVERYTHING COVERED ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
          className="mb-20"
        >
          <ShelfLabel className="mb-8">What&apos;s covered</ShelfLabel>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
            <h2 className="max-w-xl font-display text-3xl leading-[1.1] font-semibold tracking-[-0.02em] text-ink">
              We handle everything, end to end
            </h2>
            <p className="text-lg leading-relaxed text-steam">
              No hunting for vendors, no surprise bills. Here&apos;s what&apos;s part of every build.
            </p>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-coral-ink" strokeWidth={2.5} />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-steam">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── WHY OWNERS CHOOSE US ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
          className="mb-16"
        >
          <ShelfLabel className="mb-8">Why owners choose us</ShelfLabel>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {wins.map((w) => {
              const Icon = w.icon
              return (
                <div key={w.title} className="rounded-2xl border border-border bg-white p-6">
                  <Icon className="h-6 w-6 text-coral-ink" strokeWidth={1.75} />
                  <span className="mt-3 block h-0.5 w-8 rounded-full bg-marigold/70" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steam">{w.desc}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Risk reversal */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
          className="mx-auto mb-16 max-w-3xl"
        >
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-paper-2 p-7 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-coral">
              <ShieldCheck className="h-7 w-7 text-white" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="mb-1 font-display text-lg font-semibold text-ink">Try it. Love it, or your money back.</h3>
              <p className="text-sm leading-relaxed text-steam">
                If you don&apos;t love your new site within 14 days, we refund every cent — and you keep the design files.
                No contracts, cancel anytime, and you always own your website.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real proof */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
          className="mb-24"
        >
          <ShelfLabel className="mb-6">Real sites we&apos;ve shipped</ShelfLabel>
          <div className="flex flex-wrap gap-4">
            {realBuilds.map((b) => (
              <a
                key={b.name}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <div className="text-left">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    {b.name}
                    <ExternalLink className="h-3 w-3 text-steam transition-colors group-hover:text-coral-ink" />
                  </p>
                  <p className="text-xs text-steam">{b.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
          className="mx-auto max-w-3xl"
        >
          <ShelfLabel className="mb-8">Questions</ShelfLabel>
          <h2 className="mb-2 font-display text-3xl leading-[1.1] font-semibold tracking-[-0.02em] text-ink">
            Why so affordable? (and other honest questions)
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-steam">The stuff every smart business owner asks before saying yes.</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i
              return (
                <div key={faq.q} className="overflow-hidden rounded-2xl border border-border bg-white">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-inset"
                  >
                    <span className="text-sm font-semibold text-ink">{faq.q}</span>
                    {open ? (
                      <Minus className="h-4 w-4 shrink-0 text-steam" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-steam" />
                    )}
                  </button>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: reduce ? 0 : 0.2 }}
                      className="px-5 pb-4 text-sm leading-relaxed text-steam"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Footer guarantee */}
        <p className="mt-12 text-center text-sm text-steam">
          14-day money-back guarantee · No contracts · Cancel anytime ·{' '}
          <a href="mailto:info@mylobstr.com" className="font-semibold text-coral-ink hover:underline">
            info@mylobstr.com
          </a>
        </p>
      </div>
    </section>
  )
}
