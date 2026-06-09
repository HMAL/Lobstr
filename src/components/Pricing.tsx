'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check, Heart, Zap, ArrowRight, Hammer, TrendingUp, Anchor, Sparkles,
  ShieldCheck, HelpCircle, Plus, Minus, ExternalLink, Clock,
  Globe, BarChart2, Search, Headphones, Layers,
  Code2, PenLine, Cloud, Lock, Smartphone, Mail, RotateCcw, MapPin,
} from 'lucide-react'
import { cn } from '@/lib/utils'


// ── 3-tier pricing ─────────────────────────────────────────────────────────────
const tiers = [
  {
    name: 'Starter',
    tagline: 'New businesses',
    price: 100,
    phase2: 25,
    monthly: 20,
    hasPhase3: false,
    rushAddon: true,
    visits: '10,000',
    pages: 5,
    delivery: '7 business days',
    desc: "Your first professional presence online — everything a new business needs, nothing it doesn't.",
    badge: null as string | null,
    badgeColor: '',
    icon: Anchor,
    color: 'from-slate-500 to-gray-600',
    border: 'border-gray-200',
    bg: 'bg-white',
    ring: '',
    features: [
      '5-page custom website',
      'Mobile-first responsive design',
      'SSL certificate',
      'Basic SEO (meta tags, sitemap)',
      'Contact form',
      'Google Analytics',
      'Social media links',
      'Click-to-call button',
      'Google Business Profile — claimed & set up',
      '1 domain (no additional custom domains)',
    ],
  },
  {
    name: 'Growing Business',
    tagline: 'Growing businesses',
    price: 150,
    phase2: 30,
    monthly: 30,
    hasPhase3: false,
    rushAddon: true,
    visits: '30,000',
    pages: 10,
    delivery: '7 business days',
    desc: 'The full package for an existing business ready to dominate Google Maps, local search, and convert more leads.',
    badge: 'Most Popular' as string | null,
    badgeColor: 'bg-blue-600',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-400',
    bg: 'bg-blue-50/40',
    ring: 'ring-2 ring-blue-400 ring-offset-2',
    features: [
      '10-page custom website',
      'Logo design included',
      'Domain name (if under $20/yr)',
      'Google Business Profile — fully built (photos, services, categories, Q&A)',
      'Listed on Google, Yelp, Bing & Apple Maps',
      'Google Search Console setup',
      'Full SEO suite',
      'Photo gallery',
      'Blog & news section',
      'Google Maps + click-to-call',
      'Online booking widget',
      'Newsletter signup',
      'WhatsApp chat button',
      '2 custom domains included',
    ],
  },
  {
    name: 'Scale',
    tagline: 'Multi-level businesses',
    price: 250,
    phase2: 50,
    monthly: 50,
    hasPhase3: true,
    rushAddon: false,
    visits: '50,000',
    pages: 20,
    delivery: '7 business days',
    desc: 'A full business platform — multiple locations, departments, and an admin panel you control.',
    badge: 'Enterprise' as string | null,
    badgeColor: 'bg-violet-600',
    icon: Layers,
    color: 'from-violet-500 to-purple-600',
    border: 'border-violet-300',
    bg: 'bg-violet-50/30',
    ring: '',
    features: [
      '20-page custom website',
      'Everything in Growing Business',
      'Multi-location Google Business Profiles',
      'Admin panel -  track and manage your content, customers, and inquiries without needing to call us',
      'Multi-location pages',
      'Team directory & staff profiles',
      'Service / product catalog',
      'Custom quote request forms',
      'Testimonials manager',
      'Blog publisher (from admin)',
      'Job postings section',
      'Announcement banner control',
      'Dedicated support line',
      '10 custom domains included',
    ],
  },
]

// ── Where mylobstr wins — no competitor names, just our advantages ─────────────
const wins = [
  {
    icon: Zap,
    title: 'Live in 7 days — not weeks',
    desc: 'You do nothing. We design, build, and launch your site while you run your business.',
  },
  {
    icon: Heart,
    title: 'From $20/mo after launch',
    desc: "Website builders charge $27–$119/mo just for hosting. We start at $20/mo — all-in, no hidden fees.",
  },
  {
    icon: Sparkles,
    title: 'Custom — not a template',
    desc: 'Every site is designed from scratch around your brand. No drag-and-drop starter themes.',
  },
  {
    icon: Globe,
    title: 'Domain handled',
    desc: "We register your domain if it's under $20/yr — one less thing to figure out.",
  },
  {
    icon: BarChart2,
    title: 'Analytics from day one',
    desc: 'Google Analytics and Search Console wired up on launch — you see traffic immediately.',
  },
  {
    icon: MapPin,
    title: 'Google Business Profile',
    desc: 'We build out your entire GBP — categories, photos, services, Q&A. You show up on Google Maps from day one.',
  },
  {
    icon: ShieldCheck,
    title: '14-day guarantee',
    desc: "Don't love it? Full refund and you keep the design files. Zero risk, ever.",
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
    label: 'We Build It',
    duration: 'Month 1',
    color: 'from-violet-500 to-indigo-600',
    textColor: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    icon: Hammer,
    tagline: 'Your full website, designed and live.',
    bullets: [
      'Custom design tailored to your brand',
      'Built & launched per your tier timeline',
      'Hosting, SSL, domain setup',
      'Mobile-optimized from day one',
    ],
    sub: 'Not a fee — this is the cost of us building your site. A freelancer charges $1,500+ for design alone.',
  },
  {
    num: 2,
    label: 'Watch It Work',
    duration: 'Months 2–3',
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: TrendingUp,
    tagline: 'Your site is live. Leads are coming in.',
    bullets: [
      'Unlimited content edits',
      'Performance monitoring',
      'SEO tuning as rankings improve',
      'We stay on-call for anything',
    ],
    sub: 'By month 2, most clients have already recouped this cost from one new customer.',
  },
  {
    num: 3,
    label: 'Cruise Mode',
    duration: 'Month 4 onward',
    color: 'from-emerald-500 to-teal-500',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    icon: Anchor,
    tagline: 'Runs itself. You just collect leads.',
    bullets: [
      'Full hosting & uptime monitoring',
      'Security updates included',
      'Cancel anytime — no contracts',
      'Less than a Netflix subscription',
    ],
    sub: '$50/month. Forever. No surprises.',
  },
]

const realBuilds = [
  { name: 'Coupon Companions', href: 'https://couponcompanions.com', desc: 'Live e-commerce platform', emoji: '🏷️' },
  { name: 'Happy Homes Hub', href: 'https://happyhomeshub.com', desc: 'Multi-role web app, live users', emoji: '🏠' },
]

const faqs = [
  {
    q: 'Why is this so much cheaper than everyone else?',
    a: "We're a lean Albany team, not a big agency with offices and account managers to pay for. We'd rather have 100 happy local businesses at a fair price than 5 paying agency rates. No catch — just lower overhead passed to you.",
  },
  {
    q: "What's the catch with $10/month?",
    a: "There isn't one. $10/mo covers hosting, security, uptime monitoring, and us being on call. There are no setup fees, no per-edit charges, and no surprise invoices. The price you see is the price you pay.",
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

const includedItems = [
  { icon: Code2,      title: 'Custom Development',   desc: 'Built from scratch — no templates, no drag-and-drop' },
  { icon: MapPin,     title: 'Google Business Profile', desc: 'Claimed, verified & fully built — you show up on Google Maps from day one' },
  { icon: PenLine,    title: 'Logo Design',           desc: 'A clean, professional logo at no extra cost' },
  { icon: Cloud,      title: 'Cloudflare Hosting',    desc: 'Global CDN — handles up to 50,000 visits/day free' },
  { icon: Lock,       title: 'SSL Certificate',       desc: 'https:// security on day one, always included' },
  { icon: Smartphone, title: 'Mobile-First Design',   desc: 'Looks perfect on every phone, tablet, and desktop' },
  { icon: Mail,       title: 'Contact Form',          desc: 'Customers reach you directly — no third-party fees' },
  { icon: Search,     title: 'SEO Setup',             desc: 'Google-ready from launch — sitemap, meta tags, Search Console' },
  { icon: BarChart2,  title: 'Analytics',             desc: 'Google Analytics wired up so you see who\'s visiting' },
  { icon: ShieldCheck,title: 'Security Updates',      desc: 'We keep everything patched and maintained' },
  { icon: Headphones, title: 'Real Human Support',    desc: 'A real person answers every message — no bots' },
  { icon: RotateCcw,  title: '14-Day Guarantee',      desc: 'Don\'t love it? Full refund, you keep the design files' },
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
      { label: 'Listed on Yelp, Bing & Apple Maps',         values: [false, true,  true] },
      { label: 'Full SEO — schema markup & local keywords', values: [false, true,  true] },
      { label: 'Google Search Console setup',               values: [false, true,  true] },
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
      { label: 'Admin panel — edit content yourself', values: [false, false, true] },
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

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeTier, setActiveTier] = useState(1)
  const [rushDelivery, setRushDelivery] = useState(false)

  const selectedTier = tiers[activeTier]
  const journeyPhases = phases.filter((_, index) => index < 2 || selectedTier.hasPhase3)
  const tierYearTotal = selectedTier.hasPhase3
    ? selectedTier.price + selectedTier.phase2 * 2 + selectedTier.monthly * 9
    : selectedTier.price + selectedTier.phase2 * 11

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Year total anchor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-3 bg-gray-900 text-white rounded-2xl px-6 py-3 shadow-lg">
            <span className="text-gray-400 text-sm">{selectedTier.name} — year 1 total:</span>
            <span className="text-2xl font-black text-white">${tierYearTotal}</span>
            <span className="text-gray-400 text-sm line-through">$5,000+ agency</span>
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">You save 98%</span>
          </div>
        </motion.div>

        {/* Loss-aversion */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="flex justify-center mb-14"
        >
          <p className="max-w-2xl text-center text-sm text-gray-500 leading-relaxed">
            <Clock className="inline w-4 h-4 text-amber-500 -mt-0.5 mr-1" />
            Every month you&apos;re not findable online, someone searching{' '}
            <span className="font-semibold text-gray-700">&ldquo;[your service] near me&rdquo;</span> in Albany
            books a competitor instead.{' '}
            <span className="font-semibold text-gray-700">One missed customer a month costs more than a whole year of Mylobstr.</span>
          </p>
        </motion.div>

        {/* ── EVERYTHING INCLUDED ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">We handle everything — end to end</h2>
            <p className="text-base text-gray-500">No hunting for vendors, no surprise bills. Here&apos;s what&apos;s covered in your build.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {includedItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* ── PLAN COMPARISON GRID ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">Choose your plan</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            One build price, then a low monthly rate. All three include a 14-day money-back guarantee.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-16 rounded-3xl border border-gray-100 overflow-hidden shadow-sm"
        >

          {/* ── MOBILE VIEW ── */}
          <div className="md:hidden">

            {/* Plan tabs */}
            <div className="flex gap-2 p-3 bg-gray-50 border-b border-gray-100">
              {tiers.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTier(i)}
                  className={cn(
                    'flex-1 py-2.5 px-1 rounded-xl text-xs font-bold transition-all leading-tight',
                    activeTier === i ? `text-white bg-gradient-to-r ${t.color} shadow-sm` : 'bg-white text-gray-500 border border-gray-200'
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {/* Selected plan summary */}
            <div className={cn('px-4 py-4 border-b border-gray-100', selectedTier.bg)}>
              {selectedTier.badge && (
                <span className={cn('text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide inline-block mb-2', selectedTier.badgeColor)}>
                  {selectedTier.badge}
                </span>
              )}
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl font-black text-gray-900">${selectedTier.price}</span>
                <span className="text-gray-400 text-sm">build</span>
                <span className="text-gray-300">·</span>
                <span className="font-bold text-gray-700">${selectedTier.hasPhase3 ? selectedTier.monthly : selectedTier.phase2}/mo</span>
                <span className="text-gray-400 text-xs">after launch</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{selectedTier.delivery} · {selectedTier.visits} visits/mo</p>
            </div>

            {/* Feature list for selected plan */}
            {comparisonSections.map((section) => (
              <div key={section.category}>
                <div className="bg-gray-900 px-4 py-1.5">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">{section.category}</span>
                </div>
                {section.rows.map((row, ri) => {
                  const val = row.values[activeTier]
                  return (
                    <div
                      key={row.label}
                      className={cn('flex items-center justify-between px-4 py-3 gap-3 border-t border-gray-100', ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50')}
                    >
                      <span className="text-sm text-gray-700 font-medium">{row.label}</span>
                      <span className="shrink-0">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <div className={cn('w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br text-white', selectedTier.color)}>
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <Minus className="w-5 h-5 text-gray-200" />
                          )
                        ) : (
                          <span className="text-xs font-semibold text-gray-700 text-right">{val}</span>
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>
            ))}

            {/* Mobile payment journey */}
            <div className="border-t-2 border-gray-100">
              <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Payment journey</span>
                <span className={cn('text-xs font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r', selectedTier.color)}>
                  {selectedTier.name}
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {journeyPhases.map((phase) => {
                  const Icon = phase.icon
                  return (
                    <div
                      key={phase.num}
                      className={cn('w-full px-4 py-4 text-left', phase.bgColor)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br text-white shrink-0', phase.color)}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900">{phase.label}</p>
                            <p className="text-xs text-gray-400">
                              {phase.num === 2 && !selectedTier.hasPhase3 ? 'Month 2 onward' : phase.duration}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-gray-900 text-lg">
                            {phase.num === 1 ? `$${selectedTier.price}` : phase.num === 2 ? `$${selectedTier.phase2}` : `$${selectedTier.monthly}`}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {phase.num === 1 ? 'one time' : phase.num === 2 ? (selectedTier.hasPhase3 ? '/mo × 2' : '/mo forever') : '/mo forever'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
                        {phase.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <div className={cn('w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br text-white', phase.color)}>
                              <Check className="w-2 h-2" />
                            </div>
                            {b}
                          </div>
                        ))}
                        <p className="text-[11px] text-gray-400 italic pt-1.5 border-t border-gray-100">{phase.sub}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── DESKTOP VIEW ── */}
          <div className="hidden md:block overflow-x-auto">
            <div className="min-w-[600px]">

              {/* Plan header row */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-gray-50 border-b-2 border-gray-100">
                <div className="px-5 py-5 text-xs font-bold uppercase tracking-widest text-gray-400 flex items-end">Features</div>
                {tiers.map((t, i) => {
                  const isSelected = activeTier === i
                  return (
                    <button
                      key={t.name}
                      onClick={() => setActiveTier(i)}
                      className={cn(
                        'px-4 py-5 text-center border-l border-gray-100 transition-all duration-200 cursor-pointer',
                        isSelected ? `${t.bg} border-t-4 ${t.border}` : 'hover:bg-white'
                      )}
                    >
                      {t.badge && (
                        <span className={cn('text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide block mb-2 w-fit mx-auto', t.badgeColor)}>
                          {t.badge}
                        </span>
                      )}
                      <p className="font-black text-gray-900 text-sm mb-1">{t.name}</p>
                      <p className="text-2xl font-black text-gray-900">${t.price}</p>
                      <p className="text-xs text-gray-400">build · ${t.hasPhase3 ? t.monthly : t.phase2}/mo after</p>
                      {isSelected && (
                        <span className={cn('mt-2 inline-block text-[10px] font-black uppercase tracking-wide text-white px-2 py-0.5 rounded-full bg-gradient-to-r', t.color)}>
                          Selected ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Feature rows grouped by category */}
              {comparisonSections.map((section) => (
                <div key={section.category}>
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-gray-900">
                    <div className="col-span-4 px-5 py-2">
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">{section.category}</span>
                    </div>
                  </div>
                  {section.rows.map((row, ri) => (
                    <div
                      key={row.label}
                      className={cn('grid grid-cols-[2fr_1fr_1fr_1fr] border-t border-gray-100', ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50')}
                    >
                      <div className="px-5 py-3.5 text-sm text-gray-700 font-medium flex items-center">{row.label}</div>
                      {row.values.map((val, vi) => (
                        <div key={vi} onClick={() => setActiveTier(vi)} className={cn('px-3 py-3.5 border-l border-gray-100 flex items-center justify-center cursor-pointer transition-colors', activeTier === vi ? 'bg-blue-50/40' : 'hover:bg-gray-50')}>
                          {typeof val === 'boolean' ? (
                            val ? (
                              <div className={cn('w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br text-white shrink-0', tiers[vi].color)}>
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <Minus className="w-5 h-5 text-gray-200" />
                            )
                          ) : (
                            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{val}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}

              {/* Payment journey */}
              <div className="border-t-2 border-gray-100">
                <div className="bg-gray-900 px-5 py-2.5 flex items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Payment journey</span>
                  <span className={cn('text-xs font-black px-2.5 py-0.5 rounded-full text-white bg-gradient-to-r', selectedTier.color)}>
                    {selectedTier.name}
                  </span>
                </div>
                <div className={cn('grid divide-x divide-gray-100', selectedTier.hasPhase3 ? 'grid-cols-3' : 'grid-cols-2')}>
                  {journeyPhases.map((phase) => {
                    const Icon = phase.icon
                    return (
                      <div
                        key={phase.num}
                        className={cn('p-5 text-left w-full h-full', phase.bgColor)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br text-white shrink-0', phase.color)}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className={cn('text-xs font-bold uppercase tracking-wider', phase.textColor)}>
                            Phase {phase.num} · {phase.num === 2 && !selectedTier.hasPhase3 ? 'Month 2 onward' : phase.duration}
                          </span>
                        </div>
                        <div className="mb-1">
                          {phase.num === 1 ? (
                            <><span className="text-2xl font-black text-gray-900">${selectedTier.price}</span><span className="text-gray-400 text-xs"> one time</span></>
                          ) : phase.num === 2 ? (
                            <><span className="text-2xl font-black text-gray-900">${selectedTier.phase2}</span><span className="text-gray-400 text-xs">{selectedTier.hasPhase3 ? '/mo × 2' : '/mo forever'}</span></>
                          ) : (
                            <><span className="text-2xl font-black text-gray-900">${selectedTier.monthly}</span><span className="text-gray-400 text-xs">/mo forever</span></>
                          )}
                        </div>
                        <p className="font-bold text-gray-900 text-sm mb-0.5">{phase.label}</p>
                        <p className="text-xs text-gray-500">{phase.tagline}</p>
                        <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
                          {phase.bullets.map((b) => (
                            <div key={b} className="flex items-start gap-1.5 text-xs text-gray-600">
                              <div className={cn('w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br text-white', phase.color)}>
                                <Check className="w-2 h-2" />
                              </div>
                              {b}
                            </div>
                          ))}
                          <p className="text-[11px] text-gray-400 italic pt-1.5 border-t border-gray-100">{phase.sub}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Selected plan CTA — shared */}
          <div className="px-6 py-5 bg-gray-50 border-t-2 border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-black text-gray-900">{selectedTier.name}</p>
              <p className="text-sm text-gray-500">${selectedTier.price} build · ${selectedTier.monthly}/mo after launch · {selectedTier.delivery}</p>
            </div>
            <a
              href={`/contact?plan=${encodeURIComponent(selectedTier.name)}`}
              className={cn(
                'flex items-center gap-2 px-7 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r shrink-0 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center',
                selectedTier.color
              )}
            >
              Send message <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Emotional note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-14"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white text-center shadow-xl">
            <Heart className="w-6 h-6 mx-auto mb-2 fill-red-300 text-red-300" />
            <p className="font-bold leading-snug mb-1">
              &ldquo;By month 4, most clients have already made their money back 10× over.&rdquo;
            </p>
            <p className="text-blue-100 text-sm">
              One new customer through your website = months of hosting paid for. We priced this so <em>every</em> local business can afford to start.
            </p>
          </div>
        </motion.div>

        {/* ── WHERE MYLOBSTR WINS ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">Where Mylobstr wins — outright</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Not just cheaper. Faster, more personal, and built to actually get you customers.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {wins.map((w) => {
              const Icon = w.icon
              return (
                <div
                  key={w.title}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{w.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Risk reversal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/50 p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-lg mb-1">Try it. Love it, or your money back.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                If you don&apos;t love your new site within 14 days, we refund every cent — and you keep the design files.
                No contracts, cancel anytime, and you always own your website.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Real sites we&apos;ve shipped</p>
          <div className="flex flex-wrap justify-center gap-4">
            {realBuilds.map((b) => (
              <a
                key={b.name}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all"
              >
                <span className="text-2xl">{b.emoji}</span>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-sm flex items-center gap-1">
                    {b.name}
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-500" />
                  </p>
                  <p className="text-xs text-gray-500">{b.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">Why so affordable? (and other honest questions)</h2>
            <p className="text-gray-500 text-sm">The stuff every smart business owner asks before saying yes.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i
              return (
                <div key={faq.q} className="rounded-2xl border-2 border-gray-100 bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                      {faq.q}
                    </span>
                    {open ? (
                      <Minus className="w-4 h-4 text-gray-400 shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-4 pl-11 text-sm text-gray-600 leading-relaxed"
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
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-12"
        >
          🔒 14-day money-back guarantee · No contracts · Cancel anytime ·{' '}
          <a href="mailto:info@mylobstr.com" className="text-blue-600 font-semibold hover:underline">
            info@mylobstr.com
          </a>
        </motion.p>
      </div>
    </section>
  )
}
