'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const phases = [
  { val: '$100', label: 'Month 1', sub: 'Full site designed & launched' },
  { val: '$40', label: 'Months 2–3', sub: 'Per month — tuning & monitoring' },
  { val: '$10', label: 'Month 4 onward', sub: 'Per month, forever. No contracts.' },
]

const included = [
  'Custom design — no templates',
  'Mobile-first, fast load times',
  'Online booking widget',
  'SSL + hosting included',
  'Local SEO setup',
  '30-day money-back guarantee',
]

export default function PricingTeaser() {
  return (
    <section className="py-24 lg:py-32 bg-white bg-dot-grid relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            A freelancer charges $1,500+ for design alone. Your entire first year with us costs less than $300.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Phase breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="space-y-4"
          >
            {phases.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-5 p-5 rounded-2xl border-2 border-gray-100 bg-white hover:border-blue-100 hover:shadow-md transition-all"
              >
                <span className="text-4xl font-black text-gray-900 w-20 shrink-0">{p.val}</span>
                <div>
                  <p className="font-black text-gray-900 text-sm">{p.label}</p>
                  <p className="text-sm text-gray-500">{p.sub}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-2xl text-white">
              <span className="text-sm text-gray-400">Full year 1 total</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 line-through">$5,000+ agency</span>
                <span className="text-2xl font-black">~$270</span>
              </div>
            </div>
          </motion.div>

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-xl font-black text-gray-900">Everything included:</h3>
            <ul className="space-y-3">
              {included.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <div className="pt-2 space-y-3">
              <a
                href="/pricing"
                className="shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-bold rounded-full text-sm hover:bg-gray-700 transition-all hover:scale-105"
              >
                See full pricing breakdown <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-400">🔒 30-day guarantee · No contracts · Cancel anytime</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
