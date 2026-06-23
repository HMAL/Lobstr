'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function TheWorkIsTheProof() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            The approach
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
            The work is the proof.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            I do not send polished decks and ask you to imagine the result. I refresh the page,
            steady the workflow, and let the work speak for itself.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            Every refresh, every support fix, and every system cleanup starts with one question:
            what would make this feel clearer and easier to trust?
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-semibold">
            That is not a tactic. That is the whole approach.
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-gray-700 transition-all hover:scale-105 shadow-lg"
          >
            See the Work <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl text-sm border-2 border-gray-200 hover:border-gray-300 transition-all hover:scale-105"
          >
            Submit an Inquiry
          </a>
        </motion.div>
      </div>
    </section>
  )
}
