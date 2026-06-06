'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Heart, Zap, ArrowRight, Hammer, TrendingUp, Anchor } from 'lucide-react'
import { cn } from '@/lib/utils'

const PAGE_VALUES = Array.from({ length: 50 }, (_, i) => i + 1)

function getOngoingPrice(pages: number): { monthly: number; display: string; tier: 'starter' | 'growth' } {
  if (pages <= 10) return { monthly: 10, display: '$10', tier: 'starter' }
  const extra = pages - 10
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

export default function Pricing() {
  const [sliderIndex, setSliderIndex] = useState(4)
  const [activePhase, setActivePhase] = useState(0)

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

              {pages > 10 && (
                <p className="text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                  💡 First 10 pages: $10/mo · Each extra page: +$0.25/mo
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
                  <Zap className="w-4 h-4" /> Start building — $100 first month
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-center text-xs text-gray-400">Drops to $40/mo × 2, then {display}/mo forever</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-8"
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
