'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

const ComputerScene3D = dynamic(() => import('@/components/ComputerScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="w-10 h-10 rounded-full border-2 border-gray-200 border-t-gray-800 animate-spin" />
    </div>
  ),
})

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      <div className="flex min-h-screen">
        {/* ── Left: text ── */}
        <div className="flex flex-col justify-center px-5 sm:px-8 md:px-14 lg:px-20 relative z-10 w-full md:w-1/2 py-24 md:py-28">

          {/* Location pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600 text-xs font-semibold mb-4 w-fit"
          >
            <MapPin className="w-3 h-3" /> Albany, NY · Built for local businesses
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 text-white text-xs font-semibold mb-6 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Taking on new projects this month
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-gray-900 mb-6"
          >
            A website your<br />
            business will be<br />
            glad to share.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md"
          >
            We design and build the whole thing for you — pages, photos, contact form,
            Google setup — so the people who look you up find a business that looks
            the part. Most sites go live in about a week.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-4"
          >
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              Get a free quote <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/our-work"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              See work we&apos;ve done
            </a>
          </motion.div>

          {/* Reassurance line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-xs text-gray-500 mb-10"
          >
            We&apos;ll show you a free mockup first — no payment, no obligation. You decide once you see it.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex gap-6 md:gap-8 pb-10 border-b border-gray-100"
          >
            {[
              { val: '30+', label: 'Sites launched', sub: 'for local businesses' },
              { val: '~1 week', label: 'Kickoff to live', sub: 'not months of waiting' },
              { val: '$300', label: 'Flat to start', sub: 'no monthly on Starter' },
            ].map(({ val, label, sub }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-gray-900">{val}</div>
                <div className="text-xs text-gray-700 font-semibold mt-0.5">{label}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: 3D Computer ── */}
        <div className="hidden md:flex w-1/2 relative items-center justify-center">
          <ComputerScene3D />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100 pointer-events-none" />
    </div>
  )
}
