'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const IDLE_SECONDS = 10
const COUNTDOWN_SECONDS = 10

type PageConfig = {
  headline: string
  body: string
  highlight: string
  cta: string
  ctaHref: string
  storageKey: string
}

const PAGE_CONFIGS: Record<string, PageConfig> = {
  '/': {
    headline: 'Did you know?',
    body: 'people visit a business\'s website before ever walking through the door.',
    highlight: '8 out of 10',
    cta: 'Get Your Website Today →',
    ctaHref: '/contact',
    storageKey: 'mlobstr_idle_home',
  },
  '/pricing': {
    headline: 'Here\'s some food for thought.',
    body: 'Most clients make it back with just one new customer.',
    highlight: 'A whole website for the price of a coffee a week.',
    cta: 'See Full Pricing →',
    ctaHref: '/pricing',
    storageKey: 'mlobstr_idle_pricing',
  },
  '/our-work': {
    headline: 'Fun fact.',
    body: 'Every site you\'re looking at was built in under a week.',
    highlight: 'Yours could be live by Thursday.',
    cta: 'Start Building →',
    ctaHref: '/contact',
    storageKey: 'mlobstr_idle_our_work',
  },
  '/about': {
    headline: 'We\'re not a big agency.',
    body: 'We\'re your Albany neighbors — and we answer our phones.',
    highlight: 'Local business deserves local attention.',
    cta: 'Meet the Team →',
    ctaHref: '/about',
    storageKey: 'mlobstr_idle_about',
  },
  '/contact': {
    headline: 'You\'re this close.',
    body: 'One message could change your business.',
    highlight: 'Most clients hear back within 2 hours.',
    cta: 'Send a Message →',
    ctaHref: '/contact',
    storageKey: 'mlobstr_idle_contact',
  },
  '/faq': {
    headline: 'Still on the fence?',
    body: 'Most clients say the hardest part was just sending the first message.',
    highlight: 'We\'ll answer every question — no pressure.',
    cta: 'Talk to Us →',
    ctaHref: '/contact',
    storageKey: 'mlobstr_idle_faq',
  },
  '/blog': {
    headline: 'Free tips, no strings.',
    body: 'Every article here is a tip to grow your business online.',
    highlight: 'Knowledge is free. A website that uses it is priceless.',
    cta: 'Get a Website →',
    ctaHref: '/contact',
    storageKey: 'mlobstr_idle_blog',
  },
  '/careers': {
    headline: 'We\'re building something.',
    body: 'Albany\'s best local web studio — and we\'re just getting started.',
    highlight: 'Could be your next move.',
    cta: 'See Open Roles →',
    ctaHref: '/careers',
    storageKey: 'mlobstr_idle_careers',
  },
}

export default function IdleModal() {
  const pathname = usePathname()
  const config = PAGE_CONFIGS[pathname] ?? null

  const [visible, setVisible] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const closeModal = useCallback(() => {
    setVisible(false)
    if (countdownTimer.current) clearInterval(countdownTimer.current)
  }, [])

  const startCountdown = useCallback(() => {
    setCountdown(COUNTDOWN_SECONDS)
    countdownTimer.current = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) {
          closeModal()
          return 0
        }
        return n - 1
      })
    }, 1000)
  }, [closeModal])

  const resetIdle = useCallback(() => {
    if (!config) return
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      sessionStorage.setItem(config.storageKey, '1')
      setVisible(true)
      startCountdown()
    }, IDLE_SECONDS * 1000)
  }, [config, startCountdown])

  useEffect(() => {
    // No config for this page, or user already saw this page's modal
    if (!config || sessionStorage.getItem(config.storageKey)) return

    // Close any lingering modal from previous page
    setVisible(false)
    if (countdownTimer.current) clearInterval(countdownTimer.current)

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll']
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }))
    resetIdle()

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle))
      if (idleTimer.current) clearTimeout(idleTimer.current)
      if (countdownTimer.current) clearInterval(countdownTimer.current)
    }
  }, [pathname, config, resetIdle])

  const radius = 26
  const circumference = 2 * Math.PI * radius
  const progress = (countdown / COUNTDOWN_SECONDS) * circumference

  if (!config) return null

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative w-full max-w-sm bg-[#0f1117] border border-white/10 rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-auto">

              {/* Subtle ambient glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 text-white/50" />
              </button>

              <div className="relative px-8 pt-10 pb-9 text-center">

                {/* Countdown ring */}
                <div className="relative flex items-center justify-center mb-8">
                  <svg width="64" height="64" className="-rotate-90">
                    <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
                    <circle
                      cx="32"
                      cy="32"
                      r={radius}
                      fill="none"
                      stroke="url(#idleGrad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - progress}
                      style={{ transition: 'stroke-dashoffset 0.9s linear' }}
                    />
                    <defs>
                      <linearGradient id="idleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute text-lg font-semibold text-white/70 tabular-nums">{countdown}</span>
                </div>

                {/* Headline */}
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-400 mb-3">
                  {config.headline}
                </p>
                <h2 className="text-[22px] font-bold text-white leading-snug mb-3">
                  {config.highlight}
                </h2>
                <p className="text-sm text-white/40 leading-relaxed mb-8">
                  {config.body}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-white/8 mb-6" />

                {/* CTA */}
                <a
                  href={config.ctaHref}
                  onClick={closeModal}
                  className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide transition-colors"
                >
                  {config.cta}
                </a>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
