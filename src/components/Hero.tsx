'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { track, AnalyticsEvent } from '@/lib/analytics'
import Awning from '@/components/Awning'
import BuildWeekWindow from '@/components/BuildWeekWindow'
import StorefrontStreet from '@/components/StorefrontStreet'

const specimen = [
  { k: 'Sites launched', v: '30+' },
  { k: 'Kickoff → live', v: '~1 wk' },
  { k: 'Flat to start', v: '$300' },
]

export default function Hero() {
  const reduce = useReducedMotion()

  // One orchestrated page-load sequence — the sign "turns on" in order.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative w-full overflow-hidden bg-ink text-paper">
      {/* ── The sign: copy block ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-5 pt-28 pb-12 sm:px-8 md:px-12 md:pt-32 md:pb-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16 lg:px-16"
      >
        <div className="max-w-2xl">
          {/* Open sign */}
          <motion.div
            variants={item}
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-paper"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-marigold" />
            Taking on new projects this month
          </motion.div>

          {/* Location — set as a small stamp */}
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-paper/65"
          >
            <MapPin className="h-3 w-3" /> Albany, NY · built for local businesses
          </motion.p>

          {/* Headline — Fraunces, one accented flourish */}
          <motion.h1
            variants={item}
            className="mb-6 font-display text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.02em] text-paper sm:text-6xl lg:text-[4.4rem]"
          >
            A website your business will be{' '}
            <span className="italic font-medium text-[#ef7d5a]">glad to share.</span>
          </motion.h1>

          <motion.p variants={item} className="mb-7 max-w-md text-lg leading-relaxed text-paper/70">
            We design and build the whole thing for you — pages, photos, contact form,
            Google setup — so the people who look you up find a business that looks the
            part. Most sites go live in about a week.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mb-4 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              onClick={() => track(AnalyticsEvent.CtaClick, { location: 'hero', label: 'Get a free quote', destination: '/contact' })}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-coral px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Get a free quote <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/our-work"
              onClick={() => track(AnalyticsEvent.CtaClick, { location: 'hero', label: "See work we've done", destination: '/our-work' })}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              See work we&apos;ve done
            </a>
          </motion.div>

          <motion.p variants={item} className="mb-9 text-xs text-paper/65">
            We&apos;ll show you a free mockup first — no payment, no obligation. You decide once you see it.
          </motion.p>

          {/* Specimen strip — honest catalog spec, not a big-number flex */}
          <motion.dl
            variants={item}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink-wash pt-6 font-mono text-xs"
          >
            {specimen.map(({ k, v }, i) => (
              <div key={k} className="flex items-center gap-2">
                {i > 0 && <span className="mr-4 text-coral" aria-hidden="true">·</span>}
                <dt className="uppercase tracking-[0.16em] text-paper/60">{k}</dt>
                <dd className="font-semibold text-paper">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* The build week — a shop window assembling itself, then getting found */}
        <div className="hidden lg:block">
          <BuildWeekWindow />
        </div>
      </motion.div>

      {/* ── The proof: a street of storefronts drifting under the awning canopy ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.p
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.8, duration: 0.5 }}
          className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/60"
        >
          Our work · live client sites &amp; demo builds
        </motion.p>
      </div>

      {/* Awning canopy — unrolls once, then the street runs beneath it */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
      >
        <Awning />
      </motion.div>

      <motion.div
        initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 1.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pt-8 pb-20 md:pt-10 md:pb-24"
      >
        <StorefrontStreet />
      </motion.div>
    </section>
  )
}
