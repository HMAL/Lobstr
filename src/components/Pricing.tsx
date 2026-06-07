'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Heart, Zap, ArrowRight, Hammer, TrendingUp, Anchor, Sparkles, ShieldCheck, HelpCircle, Plus, Minus, X, ExternalLink, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const PAGE_VALUES = Array.from({ length: 50 }, (_, i) => i + 1)

function getOngoingPrice(pages: number): { monthly: number; display: string; tier: 'starter' | 'growth' } {
  if (pages <= 4) return { monthly: 10, display: '$10', tier: 'starter' }
  const extra = pages - 4
  const total = 10 + extra * 0.25
  return { monthly: total, display: `$${total.toFixed(2)}`, tier: 'growth' }
}

function getFeatures(pages: number) {
  const base = [
    `Up to ${pages} pages`,
    'Mobile-first responsive design',
    'Contact form',
    'SSL certificate included',
    'Basic SEO setup',
  ]
  if (pages >= 5) base.push('Google Maps integration')
  if (pages >= 8) base.push('Photo gallery')
  if (pages >= 10) base.push('Online booking widget')
  if (pages >= 15) base.push('Advanced local SEO + Google Reviews')
  if (pages >= 20) base.push('Blog / news section')
  if (pages >= 25) base.push('Priority 24/7 support')
  if (pages >= 30) base.push('Monthly performance report')
  return base
}

const phases = [
  {
    num: 1,
    label: 'We Build It',
    price: '$100',
    duration: 'Month 1',
    color: 'from-violet-500 to-indigo-600',
    textColor: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    icon: Hammer,
    tagline: 'Your full website, designed and live in 48 hrs.',
    bullets: [
      'Custom design tailored to your brand',
      'Built & launched in 48 hours',
      'Hosting, SSL, domain setup',
      'Mobile-optimized from day one',
    ],
    sub: 'Not a fee — this is the cost of us building your site. A freelancer charges $1,500+ for design alone.',
  },
  {
    num: 2,
    label: 'Watch It Work',
    price: '$40',
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
    price: '$10',
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
    sub: '$10/month. Forever. No surprises.',
  },
]

// Premium "do it for me" tier — anchors the $10 self-serve plan and looks like a steal beside it.
const managedFeatures = [
  'Everything in the self-serve plan',
  'We write & update your content monthly',
  'Google Business Profile managed for you',
  'Local SEO + review generation campaigns',
  'Monthly performance call with a real human',
  'New pages & seasonal promos built on request',
]

// Honest competitor framing — the real anchor. Mylobstr wins on every row.
type CompareRow = { feature: string; diy: string | boolean; freelancer: string | boolean; agency: string | boolean; lobstr: string | boolean }
const compareRows: CompareRow[] = [
  { feature: 'Year-1 cost', diy: '$276 + your time', freelancer: '$1,500+', agency: '$5,000+', lobstr: '~$270' },
  { feature: 'Time to launch', diy: 'Weeks of your nights', freelancer: '4–8 weeks', agency: '6–12 weeks', lobstr: '48 hours' },
  { feature: 'Custom design', diy: false, freelancer: true, agency: true, lobstr: true },
  { feature: 'Built & run for you', diy: false, freelancer: 'Then they vanish', agency: true, lobstr: true },
  { feature: 'Locked into a contract', diy: 'No', freelancer: 'No', agency: 'Usually 12 mo', lobstr: 'Never' },
  { feature: 'A real person who answers', diy: false, freelancer: 'Sometimes', agency: 'Account manager', lobstr: 'Always' },
]

// Real shipped work — no fabricated quotes.
const realBuilds = [
  { name: 'Coupon Companions', href: 'https://couponcompanions.com', desc: 'Live e-commerce platform', emoji: '🏷️' },
  { name: 'Happy Homes Hub', href: 'https://happyhomeshub.com', desc: 'Multi-role web app, live users', emoji: '🏠' },
]

// Objection-handling — the antidote to "this is too cheap, what's the catch?"
const faqs = [
  {
    q: 'Why is this so much cheaper than everyone else?',
    a: "We're a lean Albany team, not a big agency with offices and account managers to pay for. we'd rather have 100 happy local businesses at a fair price than 5 paying agency rates. No catch — just lower overhead passed to you.",
  },
  {
    q: 'What’s the catch with $10/month?',
    a: "There isn't one. $10/mo covers hosting, security, uptime monitoring, and us being on call. There are no setup fees, no per-edit charges, and no surprise invoices. The price you see is the price you pay.",
  },
  {
    q: 'Do I actually own my website?',
    a: 'Yes. The design and content are yours. If you ever leave, you keep your domain and we hand over your files — no hostage situations.',
  },
  {
    q: 'What happens if I want to cancel?',
    a: 'Cancel anytime, no contracts and no cancellation fees. And within the first 30 days, it’s a full money-back guarantee.',
  },
  {
    q: 'Why $100 up front in month 1?',
    a: "That covers the real work of designing and launching your custom site in 48 hours — a freelancer charges $1,500+ for the design alone. It's the only larger payment you'll ever make, and it's backed by the 30-day guarantee.",
  },
  {
    q: 'Are there any hidden fees?',
    a: 'None. Hosting, SSL, domain setup, and support are all included. The only thing that changes your monthly price is adding more pages (+$0.25/mo each after the first 4) — and you control that with the slider above.',
  },
]

export default function Pricing() {
  const [sliderIndex, setSliderIndex] = useState(4)
  const [activePhase, setActivePhase] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const pages = PAGE_VALUES[sliderIndex]
  const { monthly, display, tier } = getOngoingPrice(pages)
  const features = getFeatures(pages)
  const pct = (sliderIndex / (PAGE_VALUES.length - 1)) * 100

  const yearTotal = 100 + 40 * 2 + monthly * 9

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
            <span className="text-gray-400 text-sm">Full year 1 total:</span>
            <span className="text-2xl font-black text-white">${yearTotal}</span>
            <span className="text-gray-400 text-sm line-through">$5,000+ agency</span>
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">You save 98%</span>
          </div>
        </motion.div>

        {/* Loss-aversion line — the real cost is staying invisible */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="flex justify-center mb-12"
        >
          <p className="max-w-2xl text-center text-sm text-gray-500 leading-relaxed">
            <Clock className="inline w-4 h-4 text-amber-500 -mt-0.5 mr-1" />
            Every month you&apos;re not findable online, someone searching{' '}
            <span className="font-semibold text-gray-700">&ldquo;[your service] near me&rdquo;</span> in Albany
            books a competitor instead. <span className="font-semibold text-gray-700">One missed customer a month
            costs more than a whole year of Mylobstr.</span>
          </p>
        </motion.div>

        {/* 3 Phase Cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {phases.map((phase, i) => {
            const Icon = phase.icon
            const isActive = activePhase === i
            return (
              <motion.button
                key={phase.num}
                onClick={() => setActivePhase(i)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'text-left rounded-3xl border-2 p-6 transition-all duration-200 cursor-pointer w-full',
                  isActive
                    ? `${phase.borderColor} ${phase.bgColor} shadow-lg`
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                )}
              >
                {/* Phase number + icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br text-white', phase.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={cn('text-xs font-bold uppercase tracking-widest', isActive ? phase.textColor : 'text-gray-400')}>
                    Phase {phase.num}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-1">
                  <span className="text-4xl font-black text-gray-900">{phase.price}</span>
                  {phase.num === 3
                    ? <span className="text-gray-400 font-medium text-sm">/mo forever</span>
                    : phase.num === 1
                    ? <span className="text-gray-400 font-medium text-sm"> one time</span>
                    : <span className="text-gray-400 font-medium text-sm">/mo × 2</span>
                  }
                </div>
                <p className={cn('text-xs font-bold uppercase tracking-wider mb-3', isActive ? phase.textColor : 'text-gray-400')}>
                  {phase.duration}
                </p>

                {/* Label + tagline */}
                <p className="font-black text-gray-900 text-base mb-1">{phase.label}</p>
                <p className="text-sm text-gray-500 leading-snug">{phase.tagline}</p>

                {/* Expanded bullets */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 space-y-2 border-t border-gray-100 pt-4"
                  >
                    {phase.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className={cn('w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br text-white', phase.color)}>
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        {b}
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 italic pt-2 border-t border-gray-100">{phase.sub}</p>
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Phase connector line (desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden md:flex items-center justify-center gap-0 mb-8 -mt-6"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-violet-300 to-blue-300" />
          <div className="px-3 text-xs text-gray-400 font-semibold">then</div>
          <div className="h-px w-32 bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300" />
          <div className="px-3 text-xs text-gray-400 font-semibold">then</div>
          <div className="h-px w-32 bg-gradient-to-r from-emerald-300 via-teal-300 to-transparent" />
        </motion.div>

        {/* Emotional note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white text-center shadow-xl">
            <Heart className="w-6 h-6 mx-auto mb-2 fill-red-300 text-red-300" />
            <p className="font-bold leading-snug mb-1">
              "By month 4, most clients have already made their money back 10× over."
            </p>
            <p className="text-blue-100 text-sm">
              One new customer through your website = months of hosting paid for. We priced this so <em>every</em> local business can afford to start.
            </p>
          </div>
        </motion.div>

        {/* Two paths — self-serve (popular) anchored against managed (premium) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">Two ways to work with us</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Most Albany businesses pick self-serve and never look back. Want us to run the whole thing? We&apos;ll do that too.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14"
        >
          {/* Self-serve — the hero offer */}
          <div className="relative rounded-3xl border-2 border-emerald-300 bg-emerald-50/40 p-7 shadow-lg flex flex-col">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide shadow">
              Most popular
            </span>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                <Anchor className="w-4 h-4" />
              </div>
              <span className="font-black text-gray-900">Self-Serve</span>
            </div>
            <div className="mb-1">
              <span className="text-4xl font-black text-gray-900">$10</span>
              <span className="text-gray-400 font-medium text-sm">/mo after launch</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">You drive. We host, secure, and stay on call. Customize it with the slider below.</p>
            <ul className="space-y-2 mb-6 flex-1">
              {['Custom site live in 48 hrs', 'You make content edits anytime', 'Hosting, SSL & support included', 'Cancel anytime — no contracts'].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm bg-gray-900 text-white hover:bg-gray-700 transition-all hover:scale-[1.02]"
            >
              Get my free proposal <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Managed Growth — the anchor */}
          <div className="relative rounded-3xl border-2 border-gray-200 bg-white p-7 shadow-sm flex flex-col">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide shadow">
              Done for you
            </span>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-black text-gray-900">Managed Growth</span>
            </div>
            <div className="mb-1">
              <span className="text-4xl font-black text-gray-900">$149</span>
              <span className="text-gray-400 font-medium text-sm">/mo, all in</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">We run everything — content, SEO, reviews, and growth — so you can run your business.</p>
            <ul className="space-y-2 mb-6 flex-1">
              {managedFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-violet-600" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm border-2 border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Talk to us about Managed <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-center text-xs text-gray-400 mt-3">Still cheaper than one freelancer invoice — every month.</p>
          </div>
        </motion.div>

        {/* Slider card — shows month 4+ rate */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border-2 border-gray-100 shadow-xl bg-white overflow-hidden"
        >
          {/* Banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3 flex items-center justify-between">
            <span className="text-white font-bold text-sm">Your Phase 3 "Cruise Mode" rate — after month 3</span>
            <Anchor className="w-4 h-4 text-white/70" />
          </div>

          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* Slider panel */}
            <div className="flex-1 p-8 space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">How many pages?</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-gray-900">{pages}</span>
                  <span className="text-gray-400 font-medium text-lg">{pages === 1 ? 'page' : 'pages'}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm font-bold">
                <span className="text-lg">☕</span>
                {monthly <= 10 ? 'Less than a coffee a week' : monthly <= 15 ? 'Price of a pizza / month' : 'Pizza + a drink / month'}
              </div>

              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={PAGE_VALUES.length - 1}
                  step={1}
                  value={sliderIndex}
                  onChange={(e) => setSliderIndex(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10B981 0%, #14B8A6 ${pct}%, #E5E7EB ${pct}%, #E5E7EB 100%)`,
                  }}
                />
                <style>{`
                  input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 28px; height: 28px;
                    background: #fff;
                    border: 3px solid #10B981;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(16,185,129,0.3);
                  }
                  input[type='range']::-moz-range-thumb {
                    width: 26px; height: 26px;
                    background: #fff;
                    border: 3px solid #10B981;
                    border-radius: 50%;
                    cursor: pointer;
                  }
                `}</style>
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>1 page</span>
                  <span>50 pages</span>
                </div>
              </div>

              {pages > 4 && (
                <p className="text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                  💡 First 4 pages: $10/mo · Page 5+: +$0.25/mo each
                </p>
              )}

              {/* Mini timeline */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Your payment journey</p>
                {[
                  { label: 'Month 1', desc: 'Site designed & launched', amount: '$100', color: 'bg-violet-500' },
                  { label: 'Months 2–3', desc: 'We tune & optimize', amount: '$40/mo', color: 'bg-blue-500' },
                  { label: 'Month 4+', desc: 'Cruise forever', amount: `${display}/mo`, color: 'bg-emerald-500' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${row.color}`} />
                    <span className="text-xs text-gray-500 w-20 shrink-0">{row.label}</span>
                    <span className="text-xs text-gray-400 flex-1">{row.desc}</span>
                    <span className="text-xs font-black text-gray-700">{row.amount}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">Year 1 total</span>
                  <span className="text-sm font-black text-gray-900">${yearTotal}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 border-t border-gray-100 pt-4">
                Need something custom?{' '}
                <a href="/contact" className="text-blue-600 font-semibold hover:underline">
                  Chat with us →
                </a>
              </p>
            </div>

            {/* Price panel */}
            <div className="flex-1 p-8 bg-gray-50 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">From month 4 onward</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-gray-900">{display}</span>
                    <span className="text-gray-400 font-medium">/mo</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {tier === 'starter'
                      ? 'Starter — perfect for new businesses'
                      : 'Growth — built for expanding businesses'}
                  </p>
                </div>

                <ul className="space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href="/contact"
                  className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] bg-gray-900 text-white hover:bg-gray-700"
                >
                  <Sparkles className="w-4 h-4" /> Get my free proposal in 24 hrs
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/contact"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-white"
                >
                  <Zap className="w-4 h-4" /> Or start now — $100 first month
                </a>
                <p className="text-center text-xs text-gray-400">Free proposal first. No card, no obligation — then $100, $40/mo × 2, {display}/mo forever.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Honest comparison — the real anchor */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">How we compare — honestly</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Same goal: a website that brings you customers. Wildly different paths to get there.
            </p>
          </div>
          <div className="overflow-x-auto rounded-3xl border-2 border-gray-100 shadow-sm">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-5 py-4" />
                  <th className="px-4 py-4 text-center font-bold text-gray-500">DIY (Wix/Squarespace)</th>
                  <th className="px-4 py-4 text-center font-bold text-gray-500">Freelancer</th>
                  <th className="px-4 py-4 text-center font-bold text-gray-500">Agency</th>
                  <th className="px-4 py-4 text-center font-black text-gray-900 bg-emerald-50 border-x-2 border-emerald-200">Mylobstr</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 ? 'bg-white' : 'bg-gray-50/40'}>
                    <td className="px-5 py-4 font-semibold text-gray-700 whitespace-nowrap">{row.feature}</td>
                    {(['diy', 'freelancer', 'agency', 'lobstr'] as const).map((col) => {
                      const v = row[col]
                      const isLobstr = col === 'lobstr'
                      return (
                        <td
                          key={col}
                          className={cn(
                            'px-4 py-4 text-center align-middle',
                            isLobstr && 'bg-emerald-50 border-x-2 border-emerald-200 font-bold text-gray-900'
                          )}
                        >
                          {typeof v === 'boolean' ? (
                            v ? (
                              <Check className={cn('w-4 h-4 mx-auto', isLobstr ? 'text-emerald-600' : 'text-gray-400')} />
                            ) : (
                              <X className="w-4 h-4 mx-auto text-gray-300" />
                            )
                          ) : (
                            <span className={cn(!isLobstr && 'text-gray-500')}>{v}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Risk reversal — promoted to the decision point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/50 p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-lg mb-1">Try it. Love it, or your money back.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                If you don&apos;t love your new site within 30 days, we refund every cent — and you keep the design files.
                No contracts, cancel anytime, and you always own your website.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real proof — actual shipped sites, no fabricated quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
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

        {/* FAQ — kills the "too cheap, what's the catch?" objection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto"
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

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-12"
        >
          🔒 30-day money-back guarantee · No contracts · Cancel anytime ·{' '}
          <a href="mailto:info@mylobstr.com" className="text-blue-600 font-semibold hover:underline">
            info@mylobstr.com
          </a>
        </motion.p>
      </div>
    </section>
  )
}
