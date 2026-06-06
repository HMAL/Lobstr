'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const studies = [
  {
    slug: 'pet',
    business: 'Happy Paws Vet',
    emoji: '🐾',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
    tag: 'Pet Care',
  },
  {
    slug: 'restaurant',
    business: 'Trattoria Albany',
    emoji: '🍽️',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    tag: 'Restaurant',
  },
  {
    slug: 'salon',
    business: 'The Cut Collective',
    emoji: '✂️',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
    tag: 'Salon',
  },
  {
    slug: 'barbershop',
    business: 'Capital Cuts',
    emoji: '💈',
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
    tag: 'Barbershop',
  },
  {
    slug: 'plumbing',
    business: 'Albany Pro Plumbing',
    emoji: '🔧',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
    tag: 'Contractor',
  },
  {
    slug: 'fitness',
    business: 'Albany Iron Fitness',
    emoji: '💪',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    tag: 'Fitness',
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export default function PortfolioStrip() {
  return (
    <section className="py-24 lg:py-32 mesh-dark bg-dot-grid-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
              Real Work
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Sites we built for
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Albany businesses.
              </span>
            </h2>
          </div>
          <a
            href="/our-work"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold rounded-full transition-all shrink-0"
          >
            View all 6 demos <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {studies.map((s) => (
            <motion.a
              key={s.slug}
              href={`/projects/${s.slug}`}
              variants={card}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative rounded-2xl overflow-hidden block"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={s.img}
                alt={s.business}
                fill
                className="object-cover brightness-60 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 text-lg">{s.emoji}</div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-wide mb-0.5">{s.tag}</p>
                <p className="text-xs font-black text-white leading-tight">{s.business}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          These are interactive demos — click any card to explore the full site.
        </motion.p>
      </div>
    </section>
  )
}
