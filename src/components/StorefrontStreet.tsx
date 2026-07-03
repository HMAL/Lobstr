'use client'

/**
 * StorefrontStreet — the hero's proof. A slow-drifting row of shop-window tiles,
 * like walking a block of storefronts under the awning. Each tile is a live/demo
 * site framed in the same browser chrome as the rest of the brand. The drift is
 * the one bit of ambient motion; it pauses on hover and keyboard focus so the row
 * is never moving while someone is trying to read or click it. Reduced-motion
 * users get a static, horizontally-scrollable row instead.
 */

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { heroShowcase, displayUrl, type Project } from '@/lib/work'
import { track, AnalyticsEvent } from '@/lib/analytics'

function StorefrontTile({ p, aria, priority }: { p: Project; aria?: boolean; priority?: boolean }) {
  const src = p.screenshot ?? p.img
  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={aria || undefined}
      tabIndex={aria ? -1 : undefined}
      onClick={() =>
        track(AnalyticsEvent.CtaClick, { location: 'hero-street', label: p.business, destination: p.href })
      }
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group mr-4 block w-[260px] shrink-0 overflow-hidden rounded-2xl border border-ink-wash bg-ink-2 shadow-xl shadow-black/30 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:w-[300px]"
    >
      {/* chrome bar — same shop-window frame as the brand's browser chrome */}
      <div className="flex items-center gap-2 border-b border-ink-wash bg-white/[0.04] px-3 py-2">
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        <span className="mx-1 flex-1 truncate rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[0.62rem] text-paper/60">
          {displayUrl(p.href)}
        </span>
        {p.live ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-marigold/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-marigold">
            <span className="h-1 w-1 rounded-full bg-marigold" /> Live
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-paper/60">
            <ExternalLink className="h-2 w-2" /> Demo
          </span>
        )}
      </div>

      {/* the window */}
      <div className="relative h-[168px] bg-ink sm:h-[190px]">
        <Image
          src={src}
          alt={`${p.business} — ${p.category}`}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="300px"
        />
      </div>

      {/* shelf-edge caption */}
      <div className="flex items-baseline justify-between gap-2 px-3.5 py-3">
        <span className="truncate text-sm font-semibold text-paper">{p.business}</span>
        <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper/50">
          {p.tag}
        </span>
      </div>
    </motion.a>
  )
}

export default function StorefrontStreet() {
  const reduce = useReducedMotion()

  // Reduced motion: a plain, honest, horizontally-scrollable row. No drift, no
  // duplicated track — nothing moves on its own.
  if (reduce) {
    return (
      <div className="overflow-x-auto px-5 pb-1 sm:px-8 md:px-12 lg:px-16">
        <div className="flex w-max">
          {heroShowcase.map((p, i) => (
            <StorefrontTile key={p.slug} p={p} priority={i < 2} />
          ))}
        </div>
      </div>
    )
  }

  // The drift loops seamlessly by rendering the list twice and translating the
  // track by exactly one list-width (-50%). The CSS class handles the drift and
  // pauses it in place on hover / focus-within (see globals.css).
  return (
    <div className="hero-street relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
      <div className="hero-street-track flex w-max">
        {heroShowcase.map((p, i) => (
          <StorefrontTile key={p.slug} p={p} priority={i < 2} />
        ))}
        {heroShowcase.map((p) => (
          <StorefrontTile key={`dup-${p.slug}`} p={p} aria />
        ))}
      </div>
    </div>
  )
}
