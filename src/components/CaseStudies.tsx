'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

const studies = [
  {
    slug: 'couponcompanions',
    href: 'https://couponcompanions.com',
    business: 'Coupon Companions',
    category: 'E-Commerce · Live',
    emoji: '🏷️',
    desc: 'A live e-commerce platform connecting shoppers with deals and coupons — built for scale with real users transacting daily.',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80',
    color: 'from-amber-500/20 to-orange-500/20',
    isLive: true,
  },
  {
    slug: 'happyhomeshub',
    href: 'https://happyhomeshub.com',
    business: 'Happy Homes Hub',
    category: 'Web Application · Live',
    emoji: '🏠',
    desc: 'A full web application connecting homeowners, inhabitants, and handymen — multi-role platform with real users across all three sides.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80',
    color: 'from-sky-500/20 to-blue-500/20',
    isLive: true,
  },
  {
    slug: 'pet',
    href: '/projects/pet',
    business: 'Happy Paws Vet & Grooming',
    category: 'Pet Care · Albany, NY',
    emoji: '🐾',
    desc: 'A full vet clinic site with online booking, services, and team profiles — built to show what a modern pet care business looks like online.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80',
    color: 'from-emerald-500/20 to-teal-500/20',
    isLive: false,
  },
  {
    slug: 'restaurant',
    href: '/projects/restaurant',
    business: 'Trattoria Albany',
    category: 'Restaurant · Albany, NY',
    emoji: '🍽️',
    desc: 'A restaurant demo with an online menu, reservation system, and photo gallery — so customers decide before they even walk in.',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80',
    color: 'from-orange-500/20 to-red-500/20',
    isLive: false,
  },
  {
    slug: 'salon',
    href: '/projects/salon',
    business: 'The Cut Collective',
    category: 'Hair Salon · Troy, NY',
    emoji: '✂️',
    desc: 'A salon site where clients book appointments online, browse stylists, and see pricing — no more back-and-forth phone calls.',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80',
    color: 'from-pink-500/20 to-rose-500/20',
    isLive: false,
  },
  {
    slug: 'barbershop',
    href: '/projects/barbershop',
    business: 'Capital Cuts Barbershop',
    category: 'Barbershop · Schenectady, NY',
    emoji: '💈',
    desc: 'A sharp, minimal barbershop site built for local SEO — shows hours, services, and makes it dead simple to walk in or book.',
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80',
    color: 'from-violet-500/20 to-purple-500/20',
    isLive: false,
  },
  {
    slug: 'plumbing',
    href: '/projects/plumbing',
    business: 'Albany Pro Plumbing',
    category: 'Home Services · Latham, NY',
    emoji: '🔧',
    desc: 'A contractor site that builds trust before the first call — with services, emergency contact, and a clear call-to-action above the fold.',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80',
    color: 'from-blue-500/20 to-cyan-500/20',
    isLive: false,
  },
  {
    slug: 'fitness',
    href: '/projects/fitness',
    business: 'Albany Iron Fitness',
    category: 'Gym & Fitness · Albany, NY',
    emoji: '💪',
    desc: 'A gym site with class schedules, membership tiers, and trainer profiles — so new members can sign up without ever picking up the phone.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80',
    color: 'from-yellow-500/20 to-orange-500/20',
    isLive: false,
  },
]

function DemoColumn({
  items,
  duration = 18,
  className = '',
}: {
  items: typeof studies
  duration?: number
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...Array(2)].map((_, repeat) => (
          <React.Fragment key={repeat}>
            {items.map((s) => (
              <a
                key={`${s.slug}-${repeat}`}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-gray-600 transition-all duration-300 w-72 shrink-0"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.business}
                    fill
                    className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
                    sizes="288px"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color}`} />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-lg">{s.emoji}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    {s.isLive ? (
                      <span className="text-[10px] font-bold text-white bg-green-500/80 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5" /> Demo
                      </span>
                    )}
                  </div>
                </div>

                {/* Text */}
                <div className="p-4">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">{s.category}</p>
                  <h3 className="font-bold text-white text-sm mb-2">{s.business}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                  <p className="text-xs text-blue-400 font-semibold mt-3 group-hover:underline">
                    Explore site →
                  </p>
                </div>
              </a>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

export default function CaseStudies() {
  const col1 = studies.slice(0, 3)
  const col2 = studies.slice(3, 6)
  const col3 = studies.slice(6, 8)

  return (
    <section id="case-studies" className="py-24 lg:py-32 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            Our Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Real work. Real sites.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Real results.
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Two live platforms already in market — plus 6 full demo sites across Albany business types
            to show exactly what we build. Click any card to explore.
          </p>
        </motion.div>

        {/* Scrolling columns */}
        <div className="flex justify-center gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[600px] overflow-hidden">
          <DemoColumn items={col1} duration={16} />
          <DemoColumn items={col2} duration={20} className="hidden md:block" />
          <DemoColumn items={col3} duration={14} className="hidden lg:block" />
        </div>

      </div>
    </section>
  )
}
