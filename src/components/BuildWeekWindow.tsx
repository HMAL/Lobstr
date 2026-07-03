'use client'

/**
 * BuildWeekWindow — the hero's right-side story. A shop-window browser frame
 * (same chrome as the StorefrontStreet tiles) whose mini-site assembles itself
 * over the build week: Day 1 wireframe mockup → Day 3 pages & photos → Day 5
 * contact form → LIVE. Then the payoff: a search-result card slides in
 * underneath — the reason an owner wants any of this. The story LOOPS: it
 * holds the finished state a beat, fades out, and rebuilds, so the window is
 * never dead while the street drifts below. The window frame itself appears
 * once and stays. Reduced-motion users get the static finished state. Purely
 * illustrative — no links, and hidden from the a11y tree (the hero copy
 * already says all of this in words).
 */

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Search } from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const CORAL = '#c8442c'

// Miniature of the site-wide awning tile (see Awning.tsx), scaled to the mini-site.
const miniTile = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='14' viewBox='0 0 16 14'><path d='M0 0 H16 V5 A8 8 0 0 1 0 5 Z' fill='${CORAL}'/></svg>`

// Build-week timeline, in seconds after each cycle starts. The hero copy
// stagger owns the first ~0.8s of the page, so cycle one doubles as the tail
// of the "sign turns on" sequence.
const T = {
  frame: 0.5, // the empty window appears (first cycle only)
  day1: 1.0, // wireframe mockup
  day3: 2.2, // awning, nav, headline, photos fill in
  day5: 3.4, // contact form fills in
  day7: 4.4,
  live: 5.0, // LIVE badge snaps into the chrome bar
  result: 5.6, // search-result card slides up
}

// One full cycle: build (~6.1s) + hold on the finished state, then a short
// fade-out before everything resets and replays.
const CYCLE_MS = 9600
const CYCLE_S = CYCLE_MS / 1000

// Chrome-bar stage ticks: each fades in, holds, and hands off to the next.
const dayTicks = [
  { text: 'Day 1', from: T.day1, to: T.day3 },
  { text: 'Day 3', from: T.day3, to: T.day5 },
  { text: 'Day 5', from: T.day5, to: T.day7 },
  { text: 'Day 7', from: T.day7, to: T.live },
]

export default function BuildWeekWindow() {
  const reduce = useReducedMotion()

  // Incrementing the cycle remounts the animated layers, replaying the story.
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setCycle((c) => c + 1), CYCLE_MS)
    return () => clearInterval(t)
  }, [reduce])

  // Fade/rise-in that sticks around for the rest of the cycle. With reduced
  // motion we pass no motion props, so the element renders finished and still.
  const fade = (delay: number, y = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.5, ease: EASE },
        }

  // Fill-in "pop" for the pieces of the mini-site as their build day arrives.
  const fill = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay, duration: 0.45, ease: EASE },
        }

  // In, hold, out — for the wireframe layers and stage ticks that the build
  // replaces. These never render at all under reduced motion (finished state).
  const pass = (from: number, to: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: [0, 1, 1, 0] },
    transition: { delay: from, duration: to - from, times: [0, 0.12, 0.88, 1] as number[], ease: 'linear' as const },
  })

  // Applied to each cycle-keyed layer: visible for the whole cycle, then a
  // ~0.5s fade-out right before the remount, so the loop resets softly.
  const loopFade = reduce
    ? {}
    : {
        animate: { opacity: [1, 1, 0] },
        transition: { duration: CYCLE_S - 0.2, times: [0, 0.94, 1] as number[], ease: 'linear' as const },
      }

  return (
    <div aria-hidden="true" className="relative select-none">
      {/* ── The shop window (appears once, stays put across cycles) ── */}
      <motion.div
        {...fade(T.frame, 18)}
        className="overflow-hidden rounded-2xl border border-ink-wash bg-ink-2 shadow-xl shadow-black/30"
      >
        {/* chrome bar — same frame as the storefront-street tiles */}
        <div className="flex items-center gap-2 border-b border-ink-wash bg-white/[0.04] px-3 py-2">
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </span>
          <span className="mx-1 flex-1 truncate rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[0.62rem] text-paper/60">
            yourbusiness.com
          </span>
          {/* stage counter → LIVE badge (replays each cycle) */}
          <span className="relative h-[18px] w-16 shrink-0">
            <motion.span key={cycle} {...loopFade} className="absolute inset-0">
              {!reduce &&
                dayTicks.map((t) => (
                  <motion.span
                    key={t.text}
                    {...pass(t.from, t.to)}
                    className="absolute inset-0 inline-flex items-center justify-end font-mono text-[9px] font-bold uppercase tracking-wide text-paper/60"
                  >
                    {t.text}
                  </motion.span>
                ))}
              <motion.span
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, scale: 0.4 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { delay: T.live, type: 'spring' as const, stiffness: 300, damping: 18 },
                    })}
                className="absolute inset-y-0 right-0 inline-flex items-center gap-1 rounded-full bg-marigold/15 px-1.5 text-[9px] font-bold uppercase tracking-wide text-marigold"
              >
                <span className="h-1 w-1 rounded-full bg-marigold" /> Live
              </motion.span>
            </motion.span>
          </span>
        </div>

        {/* ── The mini-site being built (replays each cycle) ── */}
        <div className="bg-ink p-4">
          <motion.div key={cycle} {...loopFade}>
            {/* its own little awning — the site "opens shop" on day 3 */}
            <motion.div {...fill(T.day3)} className="-mx-4 -mt-4 mb-3">
              <div style={{ height: '2px', background: '#e7a427' }} />
              <div
                style={{
                  height: '9px',
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(miniTile)}")`,
                  backgroundRepeat: 'repeat-x',
                  backgroundSize: '15px 9px',
                }}
              />
            </motion.div>

            {/* nav row */}
            <motion.div {...fill(T.day3)} className="mb-3 flex items-center justify-between">
              <span className="h-2 w-8 rounded-full bg-coral" />
              <span className="flex gap-1.5">
                <span className="h-1 w-4 rounded-full bg-white/20" />
                <span className="h-1 w-4 rounded-full bg-white/20" />
                <span className="h-1 w-4 rounded-full bg-white/20" />
              </span>
            </motion.div>

            {/* headline — wireframe on day 1, set on day 3 */}
            <div className="relative mb-3 h-[42px]">
              {!reduce && (
                <motion.div {...pass(T.day1, T.day3)} className="absolute inset-0 rounded-md border border-dashed border-white/25">
                  <span className="absolute -top-1.5 right-2 rounded bg-ink px-1 font-mono text-[8px] uppercase tracking-[0.14em] text-marigold">
                    free mockup
                  </span>
                </motion.div>
              )}
              <motion.div {...fill(T.day3)} className="flex h-full flex-col justify-center gap-1.5 px-1">
                <div className="h-2.5 w-4/5 rounded-full bg-paper/80" />
                <div className="h-2.5 w-1/2 rounded-full bg-paper/35" />
              </motion.div>
            </div>

            {/* photos — wireframe on day 1, filled on day 3 */}
            <div className="mb-3 grid grid-cols-2 gap-2.5">
              {[0, 1].map((i) => (
                <div key={i} className="relative h-[68px]">
                  {!reduce && (
                    <motion.div
                      {...pass(T.day1, T.day3)}
                      className="absolute inset-0 rounded-md border border-dashed border-white/25"
                    />
                  )}
                  <motion.div
                    {...fill(T.day3)}
                    className={`relative h-full overflow-hidden rounded-md ${i === 0 ? 'bg-white/[0.08]' : 'bg-marigold/15'}`}
                  >
                    <span
                      className={`absolute bottom-2 left-2 h-3 w-3 rounded-full ${i === 0 ? 'bg-marigold/50' : 'bg-coral/60'}`}
                    />
                    <span className="absolute -bottom-4 -right-3 h-12 w-16 rotate-12 rounded-md bg-white/[0.06]" />
                  </motion.div>
                </div>
              ))}
            </div>

            {/* contact form — wireframe on day 1, wired up on day 5 */}
            <div className="relative h-[64px]">
              {!reduce && (
                <motion.div {...pass(T.day1, T.day5)} className="absolute inset-0 rounded-md border border-dashed border-white/25" />
              )}
              <motion.div {...fill(T.day5)} className="flex h-full flex-col justify-center gap-1.5 rounded-md bg-white/[0.05] px-2.5">
                <div className="h-2 w-3/5 rounded-full bg-white/15" />
                <div className="h-2 w-2/5 rounded-full bg-white/15" />
                <div className="mt-0.5 inline-flex h-[15px] w-14 items-center justify-center rounded bg-coral text-[8px] font-semibold text-white">
                  Send
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── The payoff: found in local search (replays each cycle) ── */}
      <motion.div key={cycle} {...loopFade} className="absolute -bottom-14 -left-5 w-[240px]">
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: T.result, duration: 0.5, ease: EASE },
              })}
          className="rounded-xl border border-ink-wash bg-ink p-3 shadow-xl shadow-black/40"
        >
          <div className="flex items-start gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.08]">
              <Search className="h-3.5 w-3.5 text-paper/70" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-paper">Your Business Name</p>
              <p className="text-xs text-paper/60">
                <span className="text-marigold">★★★★★</span> 4.9 · Albany, NY
              </p>
              <p className="font-mono text-[0.62rem] text-paper/50">yourbusiness.com ↗</p>
            </div>
          </div>
          <p className="mt-2 border-t border-ink-wash pt-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper/50">
            now showing up on Google
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
