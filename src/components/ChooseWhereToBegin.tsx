'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Layout, Workflow, MapPin } from 'lucide-react'
import { track, AnalyticsEvent } from '@/lib/analytics'
import ShelfLabel from '@/components/ShelfLabel'

const paths = [
  {
    icon: Layout,
    span: 'md:col-span-5',
    title: 'A better first impression',
    desc: 'A cleaner layout, a homepage that reads well on a phone, and buttons people actually understand.',
    cta: 'Start with a quick chat',
    href: '/contact',
  },
  {
    icon: Workflow,
    span: 'md:col-span-7',
    title: 'The busy work, handled',
    desc: 'Booking, contact forms, follow-up emails — the quiet parts behind the page that should just work.',
    cta: 'Start with a quick chat',
    href: '/contact',
  },
]

const wide = {
  icon: MapPin,
  title: 'Just a simple place to send people',
  desc: 'A clear starter site: who you are, what you do, and one easy way to get in touch.',
  cta: 'See the Starter plan',
  href: '/pricing',
}

export default function ChooseWhereToBegin() {
  const reduce = useReducedMotion()
  const reveal = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  }

  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={reveal}
        >
          <ShelfLabel className="mb-8">Where to start</ShelfLabel>

          {/* Editorial header — left heading, right blurb. Not centered. */}
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
            <h2 className="max-w-xl font-display text-3xl leading-[1.1] font-semibold tracking-[-0.02em] text-ink lg:text-[2.75rem]">
              Pick the spot that sounds most like you
            </h2>
            <p className="text-lg leading-relaxed text-steam">
              No need to read the whole page first. Choose whichever one fits where you
              are right now, get in touch, and we&apos;ll help you figure out the rest.
            </p>
          </div>
        </motion.div>

        {/* Asymmetric doors — different widths, no fake 01/02/03 sequence */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: reduce ? 0 : 0.1 }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12"
        >
          {paths.map((path) => {
            const Icon = path.icon
            return (
              <motion.a
                key={path.title}
                variants={reveal}
                href={path.href}
                onClick={() => track(AnalyticsEvent.CtaClick, { location: 'choose_where_to_begin', label: path.cta, destination: path.href })}
                className={`group flex flex-col rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${path.span}`}
              >
                <Icon className="h-7 w-7 text-coral-ink" strokeWidth={1.75} />
                <span className="mt-3 h-0.5 w-8 rounded-full bg-marigold/70" aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{path.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-steam">{path.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-ink">
                  {path.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            )
          })}

          {/* The wide, low "simple" banner — its shape matches its message */}
          <motion.a
            variants={reveal}
            href={wide.href}
            onClick={() => track(AnalyticsEvent.CtaClick, { location: 'choose_where_to_begin', label: wide.cta, destination: wide.href })}
            className="group flex flex-col gap-6 rounded-2xl border border-border bg-paper-2 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:col-span-12 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-5">
              <wide.icon className="mt-1 h-7 w-7 shrink-0 text-coral-ink" strokeWidth={1.75} />
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{wide.title}</h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-steam">{wide.desc}</p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl bg-coral px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-coral-ink md:self-center">
              {wide.cta}
              <ArrowRight className="h-4 w-4" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
