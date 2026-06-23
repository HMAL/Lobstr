'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Star, Scissors } from 'lucide-react'
import BookingCalendar from '@/components/BookingCalendar'

// ── Data ──────────────────────────────────────────────────────────────────────
interface Review { name: string; role: string; img: string; text: string }
const reviews: Review[] = [
  { name: 'Jordan K.', role: 'Regular client', img: 'https://randomuser.me/api/portraits/men/55.jpg', text: "Chris is a legend. Drove 20 minutes to get a cut here and it was absolutely worth it. Best fade I've ever had, period." },
  { name: 'Anthony R.', role: '3-year regular', img: 'https://randomuser.me/api/portraits/men/33.jpg', text: "Been coming here 3 years. Never a bad cut. Book online now so no wait. That's a game-changer." },
  { name: 'Marcus D.', role: 'Weekly client', img: 'https://randomuser.me/api/portraits/men/18.jpg', text: "Darius never misses. My lineup looks sharp every single time, doesn't matter the style I ask for." },
  { name: 'Leon P.', role: 'First-time client', img: 'https://randomuser.me/api/portraits/men/67.jpg', text: "Booked online at midnight. Chair was ready when I walked in. Jalen gave me the cleanest cut in years." },
  { name: 'Derek W.', role: 'Father of two', img: 'https://randomuser.me/api/portraits/men/39.jpg', text: "Brought my sons in for kids' cuts. Fast, no fuss, both boys looked great. We're regulars now." },
  { name: 'Kenji A.', role: 'Beard trim regular', img: 'https://randomuser.me/api/portraits/men/84.jpg', text: "Chris reshaped my beard in a way that finally works for my face. Absolute master of his craft." },
]

const services = [
  { name: 'Classic Cut', price: '$28', time: '30 min', emoji: '✂️' },
  { name: 'Fade', price: '$32', time: '35 min', emoji: '💈' },
  { name: 'Beard Trim', price: '$18', time: '20 min', emoji: '🪒' },
  { name: 'Cut + Beard', price: '$45', time: '50 min', emoji: '⚡' },
  { name: "Kid's Cut (under 12)", price: '$22', time: '25 min', emoji: '🧒' },
  { name: 'Hot Towel Shave', price: '$35', time: '30 min', emoji: '🔥' },
]

const barbers = [
  { name: 'Chris Williams', title: 'Owner & Master Barber', specialty: 'Fades & Skin fades', img: 'https://randomuser.me/api/portraits/men/41.jpg', exp: '14 yrs' },
  { name: 'Darius Clarke', title: 'Senior Barber', specialty: 'Lineups & Designs', img: 'https://randomuser.me/api/portraits/men/25.jpg', exp: '9 yrs' },
  { name: 'Jalen Brooks', title: 'Barber', specialty: 'Textured hair & Twists', img: 'https://randomuser.me/api/portraits/men/72.jpg', exp: '5 yrs' },
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
      <div className="demo-blob w-64 h-64 rounded-full bg-white/8 top-[8%] right-[6%]" />
      <div className="demo-blob w-48 h-48 rounded-full bg-gray-400/10 bottom-[15%] right-[20%]" style={{ animationDelay: '4s, 2s' }} />
      <div className="demo-blob w-36 h-36 rounded-full bg-zinc-300/8 top-[42%] left-[3%]" style={{ animationDelay: '7s, 5s' }} />
    </>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const tilt = index % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]'
  return (
    <div className={`w-[260px] rounded-2xl p-5 border shrink-0 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-xl cursor-default ${tilt} bg-white/[0.06] border-white/10 hover:bg-white/[0.12]`}>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
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

function BarbershopScrollingReviews() {
  const col1 = reviews.slice(0, 2)
  const col2 = reviews.slice(2, 4)
  const col3 = reviews.slice(4, 6)
  return (
    <section id="reviews" className="py-20 overflow-hidden bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
          </div>
          <h2 className="text-3xl font-black text-white mb-1">What Clients Say</h2>
          <p className="text-white/30">4.9 / 5 · 190+ reviews</p>
        </div>
        <div className="flex justify-center gap-5 max-h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <ReviewColumn items={col1} dir="up" dur={17} />
          <ReviewColumn items={col2} dir="down" dur={21} className="hidden md:block" />
          <ReviewColumn items={col3} dir="up" dur={14} className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
function BarbershopMascot() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <motion.div className="absolute w-80 h-80 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="relative z-10"
        animate={{ y: [0, -18, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="w-52 h-52 rounded-full bg-gradient-to-br from-white/15 to-white/5 border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.08)] flex items-center justify-center">
          <Scissors className="w-24 h-24 text-white" strokeWidth={1.5} />
        </div>
      </motion.div>
      <motion.div className="absolute w-72 h-72" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <Star className="w-5 h-5 text-white fill-white" />
        </div>
      </motion.div>
      <motion.div className="absolute w-56 h-56" animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
          <Star className="w-4 h-4 text-white/60 fill-white/60" />
        </div>
      </motion.div>
      <motion.div className="absolute w-96 h-96" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <Scissors className="w-4 h-4 text-white/40" strokeWidth={1.5} />
        </div>
      </motion.div>
    </div>
  )
}

export default function BarbershopPage() {
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
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans cursor-none">
      <CustomCursor icon={Scissors} color="#facc15" />
      {/* Nav */}
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: navHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 w-full z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-black font-black text-sm">CC</div>
            <div>
              <p className="font-black text-white leading-none">Capital Cuts</p>
              <p className="text-xs text-white/40">Schenectady, NY</p>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
            {['Services', 'Barbers', 'Reviews', 'Book'].map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>{l}</motion.a>
            ))}
          </div>
          <motion.a href="#book" className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 font-black rounded-xl text-sm transition-all" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>Book Now</motion.a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&q=85" alt="Barbershop" fill className="object-cover brightness-30" priority sizes="100vw" />
        <HeroBlobs />
        {/* 3D barber — replace URL: spline.design → Community → search "barber" → Export → Copy public URL */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[80%] hidden lg:block" style={{ zIndex: 5 }}>
          <BarbershopMascot />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <p className="demo-fade-up text-white/40 font-bold tracking-widest text-xs uppercase mb-4">Est. 2018 · Schenectady, NY</p>
          <h1 className="demo-fade-up demo-fade-up-1 text-4xl sm:text-5xl lg:text-9xl font-black leading-[0.85] mb-6">
            CAPITAL<br /><span className="text-white/20">CUTS</span>
          </h1>
          <p className="demo-fade-up demo-fade-up-2 text-white/60 text-lg max-w-md mb-8">
            Precision fades. Clean lineups. Good vibes. Schenectady&apos;s most respected barbershop — now with online booking.
          </p>
          <div className="demo-fade-up demo-fade-up-3 flex flex-wrap gap-3">
            <GlowBtn href="#book" className="px-7 py-4 bg-white text-black font-black rounded-2xl text-base hover:bg-gray-100 transition-all hover:scale-105">
              Book Your Cut
            </GlowBtn>
            <a href="tel:+15188880004" className="px-7 py-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded-2xl text-base transition-all">
              (518) 888-0004
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-white text-black py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[['#1', 'Google ranking — Albany barber'], ['500+', 'Happy clients / month'], ['4.9★', '190+ reviews'], ['0 wait', 'When you book online']].map(([v, l]) => (
            <motion.div key={l} variants={fadeUp}>
              <p className="text-2xl font-black">{v}</p>
              <p className="text-gray-400 text-xs">{l}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-yellow-400 mb-3">The Menu</span>
            <h2 className="text-4xl font-black text-white mb-2">Services</h2>
            <p className="text-white/40">Precision cuts. Transparent pricing.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(s => (
              <motion.div key={s.name} variants={fadeUp}>
                <SpotlightCard accent="#facc15" bg="#111111" className="p-5 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{s.emoji}</span>
                    <span className="text-white/30 text-xs font-mono">{s.time}</span>
                  </div>
                  <p className="font-bold text-white flex-1">{s.name}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <p className="text-yellow-400 font-black text-2xl">{s.price}</p>
                    <div className="h-px flex-1 bg-yellow-400/20 group-hover:bg-yellow-400/40 transition-colors duration-500 rounded-full" />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Barbers */}
      <section id="barbers" className="py-20 bg-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl font-black text-center mb-10">
            Your Barbers
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {barbers.map((b, i) => (
              <motion.div key={b.name} variants={i % 2 === 0 ? fadeLeft : fadeRight} whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }} className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center cursor-pointer">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4">
                  <Image src={b.img} alt={b.name} fill className="object-cover" sizes="80px" />
                </div>
                <p className="font-black text-white">{b.name}</p>
                <p className="text-white/50 text-sm">{b.title}</p>
                <p className="text-xs text-white/30 mt-1">Specialty: {b.specialty}</p>
                <div className="mt-3 inline-block bg-white/10 rounded-full px-3 py-1 text-xs text-white/60 font-semibold">{b.exp} experience</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <BarbershopScrollingReviews />

      {/* Booking */}
      <section className="py-20 bg-[#161616]">
        <div className="max-w-4xl mx-auto px-4">
          <BookingCalendar
            title="Book Your Cut"
            subtitle="Skip the wait — lock in your slot online. We'll have your chair ready."
            slots={['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM']}
            accent="bg-white" accentText="text-gray-900" accentLight="bg-white/10" accentBorder="border-white/20"
            businessName="Capital Cuts Barbershop"
          />
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="py-20 bg-white text-black">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-5">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl font-black">
            Book Your Cut
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: Phone, v: '(518) 888-0004' },
              { icon: MapPin, v: '500 State St, Schenectady' },
              { icon: Clock, v: 'Mon–Sat 9am–7pm' },
            ].map(({ icon: Icon, v }) => (
              <motion.div key={v} variants={bounceIn} className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Icon className="w-4 h-4 text-gray-400 shrink-0" />{v}
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center pt-2">
            <GlowBtn href="tel:+15188880004" className="px-8 py-4 bg-black text-white font-black rounded-2xl text-base hover:bg-gray-800 transition-colors">
              <Phone className="w-4 h-4" /> Call Now
            </GlowBtn>
          </div>
          <p className="text-xs text-gray-400">
            Website by <a href="https://mylobstr.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold">mylobstr.com</a> · Albany&apos;s neighborhood web studio
          </p>
        </div>
      </section>
    </div>
  )
}
