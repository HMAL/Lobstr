'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, AlertCircle } from 'lucide-react'

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
    <div className="relative w-full min-h-screen bg-white overflow-hidden grain">
      {/* Aurora animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora-1 absolute -top-40 -left-40 w-[300px] h-[300px] md:w-[700px] md:h-[700px] rounded-full bg-blue-300/20 blur-3xl" />
        <div className="aurora-2 absolute top-1/4 -right-32 w-[250px] h-[250px] md:w-[600px] md:h-[600px] rounded-full bg-indigo-400/15 blur-3xl" />
        <div className="aurora-3 absolute -bottom-20 left-1/3 w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full bg-violet-300/12 blur-3xl" />
        <div className="aurora-4 absolute top-1/2 left-1/4 w-[150px] h-[150px] md:w-[400px] md:h-[400px] rounded-full bg-sky-300/10 blur-3xl" />
      </div>
      <div className="flex min-h-screen">
        {/* ── Left: text ── */}
        <div className="flex flex-col justify-center px-5 sm:px-8 md:px-14 lg:px-20 relative z-10 w-full md:w-1/2 py-24 md:py-28">

          {/* Urgency pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-500 text-xs font-semibold mb-4 w-fit"
          >
            <MapPin className="w-3 h-3" /> Albany Metro, NY · For the community, by the community
          </motion.div>

          {/* Live activity badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 text-white text-xs font-semibold mb-6 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Now taking new Albany clients
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-gray-900 mb-6"
          >
            Someone in Albany<br />
            just searched<br />
            for you.<br />
            <span className="text-gray-400">Did they find you?</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-lg leading-relaxed mb-4 max-w-md"
          >
            <strong className="text-gray-800">81% of customers</strong> research online before
            visiting a local business. If your website is outdated, missing, or hard to find —
            they're already at your competitor's door.
          </motion.p>

          {/* Competitor fear line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex items-start gap-2 mb-8 p-3 rounded-xl bg-gray-50 border border-gray-100 max-w-md"
          >
            <AlertCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500">
              Every day without a proper website is a day you're handing customers to the business next door.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <a
              href="/pricing"
              className="shimmer inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-gray-700 transition-all hover:scale-105 shadow-lg shadow-black/10"
            >
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/our-work"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:border-gray-400 transition-all"
            >
              See Local Sites We Built
            </a>
          </motion.div>

          {/* Risk reversal line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-xs text-gray-400 mb-10"
          >
            Free mockup · No credit card · No obligation · We'll show you exactly what your site could look like.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex gap-5 md:gap-8 mb-10 pb-10 border-b border-gray-100"
          >
            {[
              { val: '30+', label: 'Sites Delivered', sub: 'and counting' },
              { val: '$10', label: 'Starting / mo', sub: 'less than Netflix' },
              { val: '48h', label: 'Avg Launch', sub: 'not months' },
            ].map(({ val, label, sub }) => (
              <div key={label}>
                <div className="text-2xl font-black text-gray-900">{val}</div>
                <div className="text-xs text-gray-600 font-semibold mt-0.5">{label}</div>
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
