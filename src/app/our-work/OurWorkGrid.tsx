'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

const liveWork = [
  {
    slug: 'couponcompanions',
    href: 'https://couponcompanions.com',
    business: 'Coupon Companions',
    category: 'E-Commerce · Live',
    emoji: '🏷️',
    desc: 'A live e-commerce platform connecting shoppers with deals and coupons — built for scale with real users transacting daily.',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
    accent: 'from-amber-500/30 to-orange-500/20',
    border: 'hover:border-amber-500/40',
    tag: 'E-Commerce',
  },
  {
    slug: 'happyhomeshub',
    href: 'https://happyhomeshub.com',
    business: 'Happy Homes Hub',
    category: 'Web Application · Live',
    emoji: '🏠',
    desc: 'A full web application connecting homeowners, inhabitants, and handymen — multi-role platform with real users across all three sides.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    accent: 'from-sky-500/30 to-blue-500/20',
    border: 'hover:border-sky-500/40',
    tag: 'Marketplace',
  },
]

const demoWork = [
  {
    slug: 'pet',
    href: '/projects/pet',
    business: 'Happy Paws Vet & Grooming',
    category: 'Pet Care · Albany, NY',
    emoji: '🐾',
    desc: 'A full vet clinic site with online booking, services, and team profiles — built to show what a modern pet care business looks like online.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    accent: 'from-emerald-500/30 to-teal-500/20',
    border: 'hover:border-emerald-500/40',
    tag: 'Pet Care',
  },
  {
    slug: 'restaurant',
    href: '/projects/restaurant',
    business: 'Trattoria Albany',
    category: 'Restaurant · Albany, NY',
    emoji: '🍽️',
    desc: 'A restaurant demo with an online menu, reservation system, and photo gallery — so customers decide before they even walk in.',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    accent: 'from-orange-500/30 to-red-500/20',
    border: 'hover:border-orange-500/40',
    tag: 'Restaurant',
  },
  {
    slug: 'salon',
    href: '/projects/salon',
    business: 'The Cut Collective',
    category: 'Hair Salon · Troy, NY',
    emoji: '✂️',
    desc: 'A salon site where clients book appointments online, browse stylists, and see pricing — no more back-and-forth phone calls.',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    accent: 'from-pink-500/30 to-rose-500/20',
    border: 'hover:border-pink-500/40',
    tag: 'Salon',
  },
  {
    slug: 'barbershop',
    href: '/projects/barbershop',
    business: 'Capital Cuts Barbershop',
    category: 'Barbershop · Schenectady, NY',
    emoji: '💈',
    desc: 'A sharp, minimal barbershop site built for local SEO — shows hours, services, and makes it dead simple to walk in or book.',
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
    accent: 'from-violet-500/30 to-purple-500/20',
    border: 'hover:border-violet-500/40',
    tag: 'Barbershop',
  },
  {
    slug: 'plumbing',
    href: '/projects/plumbing',
    business: 'Albany Pro Plumbing',
    category: 'Home Services · Latham, NY',
    emoji: '🔧',
    desc: 'A contractor site that builds trust before the first call — with services, emergency contact, and a clear call-to-action above the fold.',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    accent: 'from-blue-500/30 to-cyan-500/20',
    border: 'hover:border-blue-500/40',
    tag: 'Home Services',
  },
  {
    slug: 'fitness',
    href: '/projects/fitness',
    business: 'Albany Iron Fitness',
    category: 'Gym & Fitness · Albany, NY',
    emoji: '💪',
    desc: 'A gym site with class schedules, membership tiers, and trainer profiles — so new members can sign up without ever picking up the phone.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    accent: 'from-yellow-500/30 to-orange-500/20',
    border: 'hover:border-yellow-500/40',
    tag: 'Fitness',
  },
  {
    slug: 'tutoring',
    href: '/projects/tutoring',
    business: 'Bright Minds Tutoring',
    category: 'Tutoring & Education · Albany, NY',
    emoji: '🎓',
    desc: 'A tutoring center site with programs, tutor profiles, parent reviews, and free assessment booking — built to earn parents\' trust at first glance.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    accent: 'from-indigo-500/30 to-blue-500/20',
    border: 'hover:border-indigo-500/40',
    tag: 'Education',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

function SectionLabel({ label, live }: { label: string; live?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {live && <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />}
      <span className={`text-xs font-bold uppercase tracking-widest ${live ? 'text-green-400' : 'text-gray-500'}`}>
        {label}
      </span>
      <div className={`flex-1 h-px ${live ? 'bg-green-400/20' : 'bg-gray-800'}`} />
    </div>
  )
}

function WorkCard({ s, isLive }: { s: (typeof liveWork)[0] | (typeof demoWork)[0]; isLive: boolean }) {
  return (
    <motion.a
      key={s.slug}
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={card}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group block rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 ${s.border} transition-colors duration-300`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={s.img}
          alt={s.business}
          fill
          className="object-cover brightness-70 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${s.accent}`} />
        <div className="absolute top-4 left-4">
          <span className="text-2xl">{s.emoji}</span>
        </div>
        <div className="absolute top-4 right-4">
          {isLive ? (
            <span className="text-[10px] font-bold text-white bg-green-500/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
            </span>
          ) : (
            <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
              <ExternalLink className="w-2.5 h-2.5" /> Demo
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="text-[10px] font-bold text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {s.tag}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="p-5">
        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">{s.category}</p>
        <h3 className="font-black text-white text-base mb-2">{s.business}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
        <p className={`text-sm font-semibold mt-4 group-hover:underline flex items-center gap-1 ${isLive ? 'text-green-400' : 'text-blue-400'}`}>
          {isLive ? 'Visit live site' : 'Explore demo'} <ExternalLink className="w-3 h-3" />
        </p>
      </div>
    </motion.a>
  )
}

export default function OurWorkGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      {/* Demo Work */}
      <SectionLabel label="Demo Builds" />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {demoWork.map((s) => (
          <WorkCard key={s.slug} s={s} isLive={false} />
        ))}
      </motion.div>
    </section>
  )
}
