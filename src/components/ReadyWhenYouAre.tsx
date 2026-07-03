'use client'

import { Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'
import { track, AnalyticsEvent } from '@/lib/analytics'
import ShelfLabel from '@/components/ShelfLabel'
import LobsterMark from '@/components/LobsterMark'
import { ContactForm } from '@/components/Contact'

export default function ReadyWhenYouAre() {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
      {/* the mark, once more — large and quiet, tucked low-left behind the copy */}
      <LobsterMark
        watermark
        size={460}
        className="absolute -bottom-20 -left-24 hidden lg:block"
      />

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 md:grid-cols-2 md:gap-14 lg:px-16"
      >
        {/* Left — the invitation */}
        <div className="md:pt-2">
          <ShelfLabel tone="ink" className="mb-10">Ready when you are</ShelfLabel>

          <h2 className="font-display text-3xl leading-[1.05] font-semibold tracking-[-0.02em] text-paper sm:text-4xl lg:text-[3rem]">
            You don&apos;t need it all figured out to start.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/75">
            You just need a sense that something could be clearer.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-paper/65">
            Maybe the homepage needs a stronger first impression. Maybe you want booking
            and forms that just work. Maybe you only need a simple place to send people.
            Tell us where you are on the right — we&apos;ll send back a free quote and a
            short plan, usually within a day.
          </p>

          {/* Prefer to talk first */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <a
              href="tel:+15186776688"
              onClick={() => track(AnalyticsEvent.ContactChannelClick, { channel: 'phone', location: 'ready_when_you_are' })}
              className="inline-flex items-center gap-2 text-sm font-medium text-paper/80 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Phone className="h-4 w-4 text-[#ef7d5a]" /> (518) 677-6688
            </a>
            <a
              href="mailto:info@mylobstr.com"
              onClick={() => track(AnalyticsEvent.ContactChannelClick, { channel: 'email', location: 'ready_when_you_are' })}
              className="inline-flex items-center gap-2 text-sm font-medium text-paper/80 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Mail className="h-4 w-4 text-[#ef7d5a]" /> info@mylobstr.com
            </a>
          </div>
          <p className="mt-6 text-xs text-paper/45">
            No pressure, no obligation — just an honest conversation about what comes first.
          </p>
        </div>

        {/* Right — the form (fills the previously empty space on desktop) */}
        <div className="relative">
          <Suspense fallback={null}>
            <ContactForm compact />
          </Suspense>
        </div>
      </motion.div>
    </section>
  )
}
