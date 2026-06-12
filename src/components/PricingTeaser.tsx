'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles, Crown, ShieldCheck } from 'lucide-react'

// Tiers are cumulative: each plan includes everything in the one before it.
const tiers = [
  {
    name: 'Starter',
    price: '$100',
    monthly: '$25/mo after',
    tagline: 'Loaded from day one',
    inherits: null as string | null,
    badge: null as string | null,
    icon: Check,
    iconWrap: 'bg-emerald-100 border-emerald-200',
    iconColor: 'text-emerald-600',
    cardBorder: 'border-gray-200',
    headerBg: 'bg-gray-50',
    features: [
      '5-page custom website — no templates',
      'Mobile-first, fast load times',
      'SSL + Cloudflare hosting',
      'SEO setup — meta tags + sitemap',
      'Google Business Profile claimed & set up',
      'Google Analytics',
      'Google Search Console',
      'Google Merchant Center',
      'Contact form + click-to-call',
      'Social media links',
      '14-day money-back guarantee',
    ],
  },
  {
    name: 'Growing Business',
    price: '$150',
    monthly: '$30/mo after',
    tagline: 'Dominate local search',
    inherits: 'Everything in Starter',
    badge: 'Most Popular',
    icon: Sparkles,
    iconWrap: 'bg-violet-100 border-violet-200',
    iconColor: 'text-violet-600',
    cardBorder: 'border-blue-400 ring-2 ring-blue-400 ring-offset-2',
    headerBg: 'bg-blue-50',
    features: [
      '10-page custom website',
      'Logo design included',
      'Domain name covered',
      'Online booking widget',
      'Full SEO suite & schema markup',
      'Listed on Google, Yelp, Bing & Apple Maps',
      'Photo gallery + blog section',
      'WhatsApp chat + newsletter signup',
    ],
  },
  {
    name: 'Scale',
    price: '$250',
    monthly: '$50/mo after',
    tagline: 'A full business platform',
    inherits: 'Everything in Growing Business',
    badge: 'Enterprise',
    icon: Crown,
    iconWrap: 'bg-amber-100 border-amber-200',
    iconColor: 'text-amber-600',
    cardBorder: 'border-violet-300',
    headerBg: 'bg-violet-50',
    features: [
      '20-page custom website',
      'Admin panel — edit content yourself',
      'Multi-location pages & profiles',
      'Team directory & staff profiles',
      'Custom quote request forms',
      'Testimonials manager',
      'Job postings section',
      'Dedicated support line',
    ],
  },
]

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function PricingTeaser() {
  return (
    <section className="py-24 lg:py-32 bg-white bg-dot-grid relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
            No agency sticker shock.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Just honest numbers.
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Even Starter ships fully loaded — and every step up stacks more on top.
            A freelancer charges $1,500+ for design alone.
          </p>
        </motion.div>

        {/* Tier cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="grid md:grid-cols-3 gap-6 items-start"
        >
          {tiers.map((t) => {
            const Icon = t.icon
            return (
              <motion.div
                key={t.name}
                variants={card}
                className={`rounded-3xl border-2 ${t.cardBorder} bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow`}
              >
                {/* Header */}
                <div className={`px-6 pt-6 pb-5 ${t.headerBg}`}>
                  {t.badge && (
                    <span className={`inline-block text-[10px] font-black text-white px-2.5 py-0.5 rounded-full uppercase tracking-wide mb-2 ${t.badge === 'Most Popular' ? 'bg-blue-600' : 'bg-violet-600'}`}>
                      {t.badge}
                    </span>
                  )}
                  <p className="font-black text-gray-900 text-lg">{t.name}</p>
                  <p className="text-xs text-gray-500 font-semibold mb-3">{t.tagline}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900">{t.price}</span>
                    <span className="text-sm font-bold text-gray-500">build · {t.monthly}</span>
                  </div>
                </div>

                {/* Inheritance pill */}
                {t.inherits && (
                  <div className="px-6 pt-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {t.inherits}
                      <span className="ml-auto text-gray-400 font-semibold normal-case">+ all of this:</span>
                    </div>
                  </div>
                )}

                {/* Features */}
                <ul className="px-6 py-5 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${t.iconWrap}`}>
                        <Icon className={`w-3 h-3 ${t.iconColor}`} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>

        {/* No-surprises strip + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600 font-semibold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 14-day money-back guarantee</span>
            <span>·</span>
            <span>No contracts</span>
            <span>·</span>
            <span>No hidden fees</span>
            <span>·</span>
            <span>
              Starter year 1: <span className="font-black text-gray-900">$375</span>{' '}
              <span className="text-gray-400 line-through">$5,000+ agency</span>
            </span>
          </div>
          <a
            href="/pricing"
            className="shimmer inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white font-bold rounded-full text-sm hover:bg-gray-700 transition-all hover:scale-105"
          >
            See full pricing breakdown <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
