'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ShelfLabel from '@/components/ShelfLabel'

export default function TheWorkIsTheProof() {
  const reduce = useReducedMotion()
  return (
    <section className="bg-paper py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16"
      >
        <ShelfLabel className="mb-10">How we work</ShelfLabel>

        {/* Editorial two-column: statement left, argument right */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="font-display text-3xl leading-[1.05] font-semibold tracking-[-0.02em] text-ink sm:text-4xl lg:text-[3.25rem]">
            We&apos;d rather show you than{' '}
            <span className="italic font-medium text-coral-ink">tell you.</span>
          </h2>

          <div className="flex flex-col">
            <p className="text-lg leading-relaxed text-steam">
              We don&apos;t send a slide deck and ask you to picture the result. We build a
              real mockup of your site first, so you can see exactly what you&apos;re getting
              before you decide anything.
            </p>
            <p className="mt-5 text-lg leading-relaxed font-medium text-ink">
              Every page starts with the same question: what would make this clearer and
              easier for your customers? Take a look at what that&apos;s produced so far.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/our-work"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                See our work <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
