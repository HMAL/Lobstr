'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function TheWorkIsTheProof() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            How we work
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            We&apos;d rather show you than tell you
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            We don&apos;t send a slide deck and ask you to picture the result. We build a real
            mockup of your site first, so you can see exactly what you&apos;re getting before
            you decide anything.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Every page starts with the same question: what would make this clearer and easier
            for your customers? Take a look at what that&apos;s produced so far.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="/our-work"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            See our work <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
