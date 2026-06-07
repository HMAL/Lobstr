'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const sites = [
  {
    name: 'Coupon Companions',
    url: 'https://couponcompanions.com',
    desc: 'Amazon deal discovery platform — real shoppers saving money daily.',
    tag: 'E-Commerce · Live',
    emoji: '🏷️',
    accent: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
    label: 'text-amber-400',
    dot: 'bg-amber-400',
    slides: [
      { src: '/screenshots/cc-1.png', caption: 'Homepage — deal discovery feed' },
      { src: '/screenshots/cc-2.png', caption: 'Submit a Deal & Earn Commissions' },
      { src: '/screenshots/cc-3.png', caption: 'Contact page' },
    ],
  },
  {
    name: 'Happy Homes Hub',
    url: 'https://happyhomeshub.com',
    desc: 'Multi-role property management platform for landlords, tenants, and handymen.',
    tag: 'Web Application · Live',
    emoji: '🏠',
    accent: 'from-sky-500/20 to-blue-500/10',
    border: 'border-sky-500/30',
    label: 'text-sky-400',
    dot: 'bg-sky-400',
    slides: [
      { src: '/screenshots/hhh-1.png', caption: 'Landing — your property, simplified' },
      { src: '/screenshots/hhh-2.png', caption: 'Landlord dashboard — properties, rent & repairs' },
      { src: '/screenshots/hhh-3.png', caption: 'Built for everyone — landlords, tenants & handymen' },
    ],
  },
]

function SiteSlider({ site }: { site: (typeof sites)[0] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % site.slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [site.slides.length])

  function go(idx: number) {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  function prev() {
    setDirection(-1)
    setCurrent((c) => (c - 1 + site.slides.length) % site.slides.length)
  }

  function next() {
    setDirection(1)
    setCurrent((c) => (c + 1) % site.slides.length)
  }

  const slide = site.slides[current]

  return (
    <div>
      {/* Site header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{site.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-white text-lg leading-none">{site.name}</h3>
              <span className={`text-[10px] font-bold text-white bg-green-500/80 px-2 py-0.5 rounded-full flex items-center gap-1`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{site.tag}</p>
          </div>
        </div>
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          Visit site <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Browser frame */}
      <div className={`rounded-2xl overflow-hidden border ${site.border} shadow-2xl shadow-black/50 bg-gray-900`}>
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 font-mono truncate">
              {site.url}
            </div>
          </div>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Screenshot */}
        <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden bg-gray-950">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slide.src}
                alt={slide.caption}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${site.accent}`} />
            </motion.div>
          </AnimatePresence>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />

          {/* Caption */}
          <div className="absolute bottom-4 left-4">
            <span className="text-[11px] text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {slide.caption}
            </span>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dot nav + description */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-400">{site.desc}</p>
        <div className="flex gap-2 shrink-0 ml-4">
          {site.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-white' : 'w-2 bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LiveSiteSlider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
        <span className="text-xs font-bold uppercase tracking-widest text-green-400">Live Sites</span>
        <div className="flex-1 h-px bg-green-400/20" />
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {sites.map((site) => (
          <SiteSlider key={site.name} site={site} />
        ))}
      </div>
    </div>
  )
}
