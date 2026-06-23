'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ReadyWhenYouAre() {
  return (
    <section className="py-24 lg:py-32 mesh-dark bg-dot-grid-dark overflow-hidden relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            Ready when you are
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            You don&apos;t need the perfect words for it.
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            You just need to feel like something could be clearer.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Maybe the homepage needs a stronger first impression, maybe the busy work needs steadier
            support, or maybe you just need a simple place to send people. That&apos;s enough to start.
            Reach out, and we&apos;ll tell you what we&apos;d do first.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl text-sm hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
          >
            Submit an inquiry <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-gray-500 mt-3">
            No pressure, no obligation — just an honest conversation about what comes first.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
