'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Star, Heart, Zap, Dumbbell, Flame } from 'lucide-react'
import BookingCalendar from '@/components/BookingCalendar'

// ── Data ──────────────────────────────────────────────────────────────────────
interface Review { name: string; role: string; img: string; text: string }
const reviews: Review[] = [
  { name: 'Tamara H.', role: 'Member since 2023', img: 'https://randomuser.me/api/portraits/women/26.jpg', text: "Down 30 lbs in 8 months. The trainers actually know your name and push you just enough. Life-changing gym." },
  { name: 'Derek N.', role: 'HIIT regular', img: 'https://randomuser.me/api/portraits/men/38.jpg', text: "The bootcamp class is brutal in the best way. Coach never lets you coast, and the community here is incredible." },
  { name: 'Nina S.', role: 'Yoga Flow devotee', img: 'https://randomuser.me/api/portraits/women/55.jpg', text: "Found my peace here. The yoga classes are calm, the instructors are world-class, and the price is unbeatable." },
  { name: 'Paul R.', role: 'Annual member', img: 'https://randomuser.me/api/portraits/men/22.jpg', text: "Switched from a chain gym and never looked back. Better equipment, better people, and the app for booking is great." },
  { name: 'Aisha B.', role: 'Spin class devotee', img: 'https://randomuser.me/api/portraits/women/40.jpg', text: "I've tried 5 gyms in Albany. Albany Iron wins for energy, cleanliness, and community — it's not even close." },
  { name: 'Chris M.', role: 'Boxing student', img: 'https://randomuser.me/api/portraits/men/77.jpg', text: "Boxing Fundamentals turned into my favorite hour of the week. Coach breaks everything down perfectly for beginners." },
]

const classes = [
  { name: 'HIIT Bootcamp', time: 'Mon/Wed/Fri 6:30am', spots: '12 spots', emoji: '🔥', intensity: 'High' },
  { name: 'Yoga Flow', time: 'Tue/Thu 7:00am + 6:00pm', spots: '20 spots', emoji: '🧘', intensity: 'Low' },
  { name: 'Spin', time: 'Mon/Wed/Sat 7:00am', spots: '15 spots', emoji: '🚴', intensity: 'High' },
  { name: 'Strength Training', time: 'Tue/Thu 5:30pm', spots: '10 spots', emoji: '💪', intensity: 'Medium' },
  { name: 'Pilates', time: 'Sat/Sun 9:00am', spots: '12 spots', emoji: '🤸', intensity: 'Medium' },
  { name: 'Boxing Fundamentals', time: 'Mon/Thu 6:00pm', spots: '8 spots', emoji: '🥊', intensity: 'High' },
]

const plans = [
  { name: 'Drop-In', price: '$15', period: 'per class', perks: ['Any single class', 'Equipment access', 'No commitment'] },
  { name: 'Monthly', price: '$49', period: '/month', perks: ['Unlimited classes', 'Equipment access', 'Guest pass / month', 'App access'], popular: true },
  { name: 'Annual', price: '$399', period: '/year', perks: ['Everything in Monthly', '2 months free', '1 free PT session', 'Priority booking'] },
]

// ── Animation variants ────────────────────────────────────────────────────────
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }
const fadeLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }
const fadeRight = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }
const bounceIn = { hidden: { opacity: 0, scale: 0.75 }, show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 18 } } }

// ── Inline components ─────────────────────────────────────────────────────────
function GlowBtn({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  return (
    <a href={href} className={`relative group inline-flex items-center gap-2 ${className}`}>
      <span className="absolute -inset-1 -z-10 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md glow-hue-bg" />
      {children}
    </a>
  )
}

function SpotlightCard({ children, accent, bg, className = '' }: { children: React.ReactNode; accent: string; bg: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-shadow duration-300 ${className}`}
      style={{
        background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, ${accent}28 0%, transparent 60%), ${bg}`,
        border: `1px solid ${hovered ? accent + '55' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? `0 8px 40px -12px ${accent}50` : 'none',
      }}
    >
      {children}
    </div>
  )
}

function CustomCursor({ icon: Icon, color }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>, color: string }) {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = '* { cursor: none !important; }'
    document.head.appendChild(style)
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => {
      document.head.removeChild(style)
      window.removeEventListener('mousemove', move)
    }
  }, [])
  return (
    <div className="fixed pointer-events-none z-[9999]" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}>
      <Icon className="w-7 h-7 drop-shadow-lg" style={{ color }} strokeWidth={1.8} />
    </div>
  )
}

function HeroBlobs() {
  return (
    <>
      <div className="demo-blob w-72 h-72 rounded-full bg-orange-500/20 top-[6%] right-[5%]" />
      <div className="demo-blob w-56 h-56 rounded-full bg-red-400/15 bottom-[12%] right-[16%]" style={{ animationDelay: '3s, 2s' }} />
      <div className="demo-blob w-44 h-44 rounded-full bg-amber-400/10 top-[42%] left-[2%]" style={{ animationDelay: '6s, 4s' }} />
    </>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const tilt = index % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]'
  return (
    <div className={`w-[260px] rounded-2xl p-5 border shrink-0 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-xl cursor-default ${tilt} bg-white/[0.06] border-white/10 hover:bg-white/[0.12]`}>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />)}
      </div>
      <p className="text-sm leading-relaxed text-white/70 mb-4">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center gap-2.5">
        <img src={review.img} alt={review.name} className="w-9 h-9 rounded-full object-cover" />
        <div>
          <p className="text-sm font-bold text-white leading-none mb-0.5">{review.name}</p>
          <p className="text-xs text-white/40">{review.role}</p>
        </div>
      </div>
    </div>
  )
}

function ReviewColumn({ items, dir, dur, className = '' }: { items: Review[]; dir: 'up' | 'down'; dur: number; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: dir === 'down' ? '-50%' : '0%' }}
        animate={{ y: dir === 'down' ? '0%' : '-50%' }}
        transition={{ duration: dur, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-4 pb-4"
      >
        {[0, 1].map(r => items.map((rv, i) => (
          <ReviewCard key={`${rv.name}-${r}-${i}`} review={rv} index={r * items.length + i} />
        )))}
      </motion.div>
    </div>
  )
}

function FitnessScrollingReviews() {
  const col1 = reviews.slice(0, 2)
  const col2 = reviews.slice(2, 4)
  const col3 = reviews.slice(4, 6)
  return (
    <section className="py-20 overflow-hidden bg-gray-950">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />)}
          </div>
          <h2 className="text-3xl font-black text-white mb-1">Member Results</h2>
          <p className="text-white/30">4.8 / 5 · 800+ members</p>
        </div>
        <div className="flex justify-center gap-5 max-h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <ReviewColumn items={col1} dir="up" dur={19} />
          <ReviewColumn items={col2} dir="down" dur={23} className="hidden md:block" />
          <ReviewColumn items={col3} dir="up" dur={16} className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
function FitnessMascot() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <motion.div className="absolute w-80 h-80 rounded-full bg-orange-500/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="relative z-10"
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="w-52 h-52 rounded-full bg-gradient-to-br from-orange-500/25 to-orange-700/10 border border-orange-400/30 shadow-[0_0_60px_rgba(249,115,22,0.2)] flex items-center justify-center">
          <Dumbbell className="w-24 h-24 text-orange-400" strokeWidth={1.5} />
        </div>
      </motion.div>
      <motion.div className="absolute w-72 h-72" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-orange-500/20 border border-orange-400/40 flex items-center justify-center">
          <Zap className="w-5 h-5 text-orange-400 fill-orange-400" />
        </div>
      </motion.div>
      <motion.div className="absolute w-56 h-56" animate={{ rotate: -360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-red-500/15 border border-red-400/30 flex items-center justify-center">
          <Flame className="w-4 h-4 text-red-400" />
        </div>
      </motion.div>
      <motion.div className="absolute w-96 h-96" animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute bottom-2 right-0 w-8 h-8 rounded-full bg-orange-500/10 border border-orange-400/20 flex items-center justify-center">
          <Heart className="w-4 h-4 text-orange-300 fill-orange-300/50" />
        </div>
      </motion.div>
    </div>
  )
}

export default function FitnessPage() {
  const [navHidden, setNavHidden] = useState(false)
  const lastScrollY = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 60) setNavHidden(false)
      else if (y > lastScrollY.current) setNavHidden(true)
      else setNavHidden(false)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans cursor-none">
      <CustomCursor icon={Dumbbell} color="#f97316" />
      {/* Nav */}
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: navHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 w-full z-50 bg-gray-950/95 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div className="flex items-center gap-2.5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center font-black text-sm">AI</div>
            <div>
              <p className="font-black text-white leading-none text-sm">Albany Iron</p>
              <p className="text-xs text-orange-400 font-semibold">Fitness · Albany, NY</p>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/50">
            {['Classes', 'Memberships', 'About', 'Join'].map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>{l}</motion.a>
            ))}
          </div>
          <motion.a href="#join" className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-xl text-sm transition-all" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>Join Now</motion.a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=85" alt="Gym" fill className="object-cover brightness-30" priority sizes="100vw" />
        <HeroBlobs />
        {/* 3D fitness trainer — replace URL: spline.design → Community → search "fitness" or "gym" → Export → Copy public URL */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[80%] hidden lg:block" style={{ zIndex: 5 }}>
          <FitnessMascot />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <p className="demo-fade-up text-orange-400 font-bold tracking-widest text-xs uppercase mb-4">Albany, NY — No Judgment Zone</p>
          <h1 className="demo-fade-up demo-fade-up-1 text-4xl sm:text-6xl lg:text-9xl font-black leading-[0.85] mb-6 uppercase">
            SHOW<br /><span className="text-orange-400">UP.</span>
          </h1>
          <p className="demo-fade-up demo-fade-up-2 text-white/60 text-lg max-w-md mb-8">
            Albany&apos;s community-first gym. Flexible classes, no contracts, real results. Whether you&apos;re a beginner or a seasoned athlete — you belong here.
          </p>
          <div className="demo-fade-up demo-fade-up-3 flex flex-wrap gap-3">
            <GlowBtn href="#join" className="px-7 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-2xl text-base transition-all hover:scale-105">
              <Zap className="w-4 h-4" /> Join for $49/mo
            </GlowBtn>
            <a href="#classes" className="px-7 py-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded-2xl text-base transition-all">
              See Classes
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-orange-500 py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          {[['800+', 'Active members'], ['25+', 'Classes / week'], ['10+', 'Expert trainers'], ['4.8★', 'Google rating']].map(([v, l]) => (
            <motion.div key={l} variants={fadeUp}>
              <p className="text-2xl font-black">{v}</p>
              <p className="text-orange-100 text-xs">{l}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Classes */}
      <section id="classes" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Schedule</span>
            <h2 className="text-4xl font-black text-white mb-2">Weekly Classes</h2>
            <p className="text-white/40">Find your fit. Book your spot.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map(c => (
              <motion.div key={c.name} variants={fadeUp}>
                <SpotlightCard accent="#f97316" bg="#120801" className="p-5 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{c.emoji}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.intensity === 'High' ? 'bg-red-500/20 text-red-400' : c.intensity === 'Low' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {c.intensity}
                    </span>
                  </div>
                  <h3 className="font-black text-white text-base mb-1 flex-1">{c.name}</h3>
                  <p className="text-sm text-white/50 mb-1">{c.time}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-orange-400/70 font-semibold">{c.spots}</p>
                    <div className="h-px flex-1 bg-orange-400/20 group-hover:bg-orange-400/40 transition-colors duration-500 rounded-full" />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Memberships */}
      <section id="memberships" className="py-20 bg-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl font-black text-center mb-10">
            Memberships
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-5">
            {plans.map((p, i) => (
              <motion.div key={p.name} variants={i % 2 === 0 ? fadeLeft : fadeRight} whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300 } }} className={`rounded-3xl p-6 cursor-pointer ${p.popular ? 'bg-orange-500 text-white ring-2 ring-orange-400' : 'bg-white/5 border border-white/10 text-white'}`}>
                {p.popular && <p className="text-xs font-black uppercase tracking-widest mb-4 text-orange-100">Most Popular</p>}
                <p className="text-4xl font-black">{p.price}</p>
                <p className={`text-sm mb-1 ${p.popular ? 'text-orange-100' : 'text-white/50'}`}>{p.period}</p>
                <p className="font-black text-lg mb-4">{p.name}</p>
                <ul className="space-y-2">
                  {p.perks.map(perk => (
                    <li key={perk} className={`flex items-center gap-2 text-sm ${p.popular ? 'text-orange-50' : 'text-white/60'}`}>
                      <span>✓</span> {perk}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <GlowBtn href="#join" className={`flex items-center justify-center w-full py-3 rounded-2xl font-bold text-sm transition-all ${p.popular ? 'bg-white text-orange-600 hover:bg-orange-50' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                    Get Started
                  </GlowBtn>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <FitnessScrollingReviews />

      {/* Booking */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <BookingCalendar
            title="Book a Class or Free Tour"
            subtitle="Reserve a class spot or schedule a free gym tour with a trainer. First class is on us."
            slots={['5:30 AM','6:00 AM','6:30 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM']}
            accent="bg-orange-500" accentText="text-orange-700" accentLight="bg-orange-50" accentBorder="border-orange-200"
            businessName="Albany Iron Fitness"
          />
        </div>
      </section>

      {/* Join */}
      <section id="join" className="py-20 bg-orange-500 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-5">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl font-black">
            Ready to Start?
          </motion.h2>
          <p className="text-orange-100">First class is on us. Walk in or book online.</p>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: Phone, v: '(518) 888-0006' },
              { icon: Mail, v: 'hello@albanyjron.com' },
              { icon: MapPin, v: '1200 Central Ave, Albany' },
            ].map(({ icon: Icon, v }) => (
              <motion.div key={v} variants={bounceIn} className="bg-white/20 rounded-xl p-3 flex items-center gap-2 text-sm font-semibold">
                <Icon className="w-4 h-4 shrink-0" />{v}
              </motion.div>
            ))}
          </motion.div>
          <div className="flex items-center justify-center gap-2 text-orange-100 text-sm">
            <Clock className="w-4 h-4" /> Mon–Fri 5am–10pm · Sat–Sun 7am–8pm
          </div>
          <div className="flex justify-center">
            <GlowBtn href="tel:+15188880006" className="px-8 py-4 bg-black text-orange-400 font-black rounded-2xl text-base hover:bg-gray-900 transition-colors">
              <Dumbbell className="w-4 h-4" /> Call to Join
            </GlowBtn>
          </div>
          <p className="text-xs text-orange-200">
            Website by <a href="https://mylobstr.com" target="_blank" rel="noopener noreferrer" className="font-bold underline">mylobstr.com</a>
          </p>
        </div>
      </section>
    </div>
  )
}
