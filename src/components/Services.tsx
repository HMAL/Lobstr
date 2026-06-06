'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Check, ArrowUpRight } from 'lucide-react'

const categories = [
  {
    emoji: '🍽️',
    title: 'Restaurants & Cafés',
    desc: 'Menus, online ordering, reservations. Let hungry Albany residents find you first.',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    color: 'from-orange-500 to-red-500',
    tags: ['Online Menu', 'Reservations', 'Google Reviews'],
    features: [
      'Digital menu with photos & prices',
      'Table reservation / waitlist',
      'Online ordering integration',
      'Photo gallery & ambiance shots',
      'Google Maps + hours widget',
      'Events & specials page',
      'Star rating showcase',
    ],
    demoHref: '/projects/restaurant',
    demoLabel: 'Demo',
    backBg: '#160800',
    accent: '#f97316',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    emoji: '✂️',
    title: 'Salons & Barbershops',
    desc: 'Appointment booking, service menus, and galleries that showcase your best work.',
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
    color: 'from-purple-500 to-pink-500',
    tags: ['Online Booking', 'Gallery', 'Staff Profiles'],
    features: [
      'Online appointment booking',
      'Stylist / barber profiles',
      'Service menu with pricing',
      'Before & after photo gallery',
      'Gift card sales page',
      'Instagram feed embed',
      'Google Reviews integration',
    ],
    demoHref: '/projects/salon',
    demoLabel: 'Demo',
    backBg: '#0f0212',
    accent: '#a855f7',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    emoji: '🔧',
    title: 'Contractors & Home Services',
    desc: 'Get more local calls. Plumbers, electricians, HVAC — we make you look trustworthy.',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    color: 'from-blue-500 to-cyan-500',
    tags: ['Service Areas', 'Lead Forms', 'Reviews'],
    features: [
      'Service area coverage map',
      'Instant quote request form',
      'License & insurance display',
      'Before / after project gallery',
      'Emergency contact button',
      'Google Reviews integration',
      'Detailed service descriptions',
    ],
    demoHref: '/projects/plumbing',
    demoLabel: 'Demo',
    backBg: '#010c18',
    accent: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    emoji: '🐾',
    title: 'Pet Care & Vets',
    desc: 'Vet clinics, groomers, and boarding — websites that pet owners trust.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    color: 'from-emerald-500 to-teal-500',
    tags: ['Appointments', 'Services', 'Location'],
    features: [
      'Online appointment booking',
      'Services & pricing list',
      'Meet the vet / staff profiles',
      'Boarding availability widget',
      'New patient intake form',
      'Emergency contacts section',
      'Pet care tips & blog',
    ],
    demoHref: '/projects/pet',
    demoLabel: 'Demo',
    backBg: '#011410',
    accent: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    emoji: '💪',
    title: 'Fitness & Wellness',
    desc: 'Gyms, yoga studios, personal trainers — class schedules, memberships, and more.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    color: 'from-yellow-500 to-orange-500',
    tags: ['Class Schedule', 'Memberships', 'Trainers'],
    features: [
      'Live class schedule',
      'Membership tier comparison',
      'Trainer / instructor profiles',
      'Free trial signup form',
      'Facility photo tour',
      'Virtual / online class links',
      'Nutrition & wellness blog',
    ],
    demoHref: '/projects/fitness',
    demoLabel: 'Demo',
    backBg: '#150900',
    accent: '#f59e0b',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    emoji: '🎓',
    title: 'Tutors & Schools',
    desc: 'Local tutors, daycares, and private schools — build trust with parents from day one.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    color: 'from-indigo-500 to-blue-500',
    tags: ['Programs', 'Enrollment', 'Contact'],
    features: [
      'Subject / program listings',
      'Online enrollment form',
      'Teacher / tutor profiles',
      'Parent testimonials section',
      'Schedule & availability',
      'Free consultation CTA',
      'FAQ for parents',
    ],
    demoHref: '/contact',
    demoLabel: 'Demo',
    backBg: '#02041a',
    accent: '#6366f1',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    emoji: '🏷️',
    title: 'E-Commerce & Deals',
    desc: 'Online stores, marketplaces, and deal platforms — we\'ve shipped a live one you can visit right now.',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
    color: 'from-amber-500 to-orange-500',
    tags: ['Shopping', 'Deals', 'Payments'],
    features: [
      'Product catalog & search',
      'Coupon & deals engine',
      'Checkout & payment flow',
      'User accounts & saved items',
      'Seller / vendor portal',
      'Mobile-first responsive design',
      'SEO-optimized category pages',
    ],
    demoHref: 'https://couponcompanions.com',
    demoLabel: 'Live Site',
    backBg: '#120800',
    accent: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    emoji: '🏠',
    title: 'Home Services Platforms',
    desc: 'Multi-role platforms for homeowners, renters, and pros — we built HappyHomesHub from scratch.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    color: 'from-sky-500 to-blue-500',
    tags: ['Multi-role', 'Marketplace', 'Web App'],
    features: [
      'Homeowner & renter dashboards',
      'Handyman / pro profiles',
      'Job posting & bidding system',
      'Booking & scheduling',
      'In-app messaging',
      'Reviews & ratings',
      'Geo-based search & matching',
    ],
    demoHref: 'https://happyhomeshub.com',
    demoLabel: 'Live Site',
    backBg: '#010d18',
    accent: '#0ea5e9',
    gradient: 'from-sky-500 to-blue-600',
  },
]

function FlipCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="cursor-pointer"
      style={{ perspective: '1200px', height: '360px' }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
          className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm group"
        >
          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <Image
              src={cat.img}
              alt={cat.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-40 group-hover:opacity-30 transition-opacity`} />
            <div className="absolute top-3 left-3 text-2xl">{cat.emoji}</div>
            {/* Flip hint */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-bold text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                Tap to see features
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-bold text-gray-900 text-base mb-1.5">{cat.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">{cat.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg border border-gray-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            inset: 0,
            backgroundColor: cat.backBg,
          }}
          className="rounded-2xl overflow-hidden p-5 flex flex-col"
        >
          {/* Accent glow */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ backgroundColor: cat.accent }}
          />

          {/* Header */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-sm font-black text-white leading-tight">{cat.title}</span>
            </div>
            <a
              href={cat.demoHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-full border transition-colors"
              style={{ borderColor: cat.accent + '60', color: cat.accent }}
            >
              {cat.demoLabel} <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Feature list */}
          <ul className="space-y-2 flex-1 relative z-10">
            {cat.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-white/90 leading-snug">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: cat.accent + '30' }}
                >
                  <Check className="w-2.5 h-2.5" style={{ color: cat.accent }} />
                </div>
                {f}
              </li>
            ))}
          </ul>

          {/* Flip back hint */}
          <p className="text-xs text-white/30 text-center mt-3 relative z-10">Tap to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            Who We Serve
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Every Albany Business
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Deserves a Great Website
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-3">
            From mom-and-pop shops to growing local businesses — if you're in the Albany metro,
            we're your neighbors and your web team.
          </p>
          <p className="text-sm text-gray-400">
            Tap any card to see what's included for your business type.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <FlipCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-10"
        >
          Don't see your business type?{' '}
          <a href="/contact" className="text-blue-600 font-semibold hover:underline">
            Ask us — we've built for dozens of industries.
          </a>
        </motion.p>
      </div>
    </section>
  )
}
