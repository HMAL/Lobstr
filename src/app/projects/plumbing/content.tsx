'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Star, Shield, Wrench, Droplets } from 'lucide-react'
import BookingCalendar from '@/components/BookingCalendar'

// ── Data ──────────────────────────────────────────────────────────────────────
interface Review { name: string; role: string; img: string; text: string }
const reviews: Review[] = [
  { name: 'Sandra M.', role: 'Homeowner', img: 'https://randomuser.me/api/portraits/women/58.jpg', text: "Called at 11 PM for a burst pipe, someone answered immediately and was at my house within an hour. Incredible service." },
  { name: 'Phil B.', role: 'Property owner', img: 'https://randomuser.me/api/portraits/men/62.jpg', text: "Fixed what two other plumbers couldn't figure out in 30 minutes flat. Super honest about pricing. Exactly what you want." },
  { name: 'Carol H.', role: 'Homeowner', img: 'https://randomuser.me/api/portraits/women/72.jpg', text: "Water heater failed on a Sunday. They had a new one installed by Saturday morning. Unbelievable response time." },
  { name: 'Tom R.', role: 'Property manager', img: 'https://randomuser.me/api/portraits/men/29.jpg', text: "I use Albany Pro for all my rental properties. Honest pricing, no upselling, always on time. Trust them completely." },
  { name: 'Jessica L.', role: 'New homeowner', img: 'https://randomuser.me/api/portraits/women/17.jpg', text: "First major plumbing issue as a homeowner. They walked me through everything, no surprises on the bill. Perfect." },
  { name: 'Ray K.', role: 'Small business owner', img: 'https://randomuser.me/api/portraits/men/54.jpg', text: "Fixed a commercial drain issue that had been causing problems for months. Done in one visit. Outstanding." },
]

const services = [
  { icon: '🚿', title: 'Drain Cleaning', desc: 'Clogged drains cleared fast — same day service available.' },
  { icon: '🚽', title: 'Toilet Repair & Install', desc: 'Running toilets, replacements, and new installations.' },
  { icon: '🔧', title: 'Pipe Repair & Replacement', desc: 'Leaking, burst, or corroded pipes fixed right the first time.' },
  { icon: '🌡️', title: 'Water Heater Service', desc: 'Repair, flush, or full replacement. Tankless options available.' },
  { icon: '🏠', title: 'Bathroom Remodeling', desc: 'Full bathroom plumbing for renovations and new builds.' },
  { icon: '🚨', title: '24/7 Emergency', desc: 'Burst pipe at 2 AM? We pick up. Always.' },
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
      <div className="demo-blob w-72 h-72 rounded-full bg-blue-400/20 top-[6%] right-[6%]" />
      <div className="demo-blob w-56 h-56 rounded-full bg-cyan-400/15 bottom-[12%] right-[18%]" style={{ animationDelay: '3s, 2s' }} />
      <div className="demo-blob w-44 h-44 rounded-full bg-yellow-400/10 top-[42%] left-[2%]" style={{ animationDelay: '6s, 4s' }} />
    </>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const tilt = index % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]'
  return (
    <div className={`w-[260px] rounded-2xl p-5 border shrink-0 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-xl cursor-default ${tilt} bg-white/[0.07] border-white/10 hover:bg-white/[0.12]`}>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
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

function PlumbingScrollingReviews() {
  const col1 = reviews.slice(0, 2)
  const col2 = reviews.slice(2, 4)
  const col3 = reviews.slice(4, 6)
  return (
    <section className="py-20 overflow-hidden bg-blue-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
          </div>
          <h2 className="text-3xl font-black text-white mb-1">What Customers Say</h2>
          <p className="text-blue-300">5.0 / 5 · 210+ Google reviews</p>
        </div>
        <div className="flex justify-center gap-5 max-h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <ReviewColumn items={col1} dir="up" dur={18} />
          <ReviewColumn items={col2} dir="down" dur={22} className="hidden md:block" />
          <ReviewColumn items={col3} dir="up" dur={15} className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
function PlumbingMascot() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <motion.div className="absolute w-80 h-80 rounded-full bg-yellow-400/10 blur-3xl"
        animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="relative z-10"
        animate={{ y: [0, -18, 0], rotate: [0, 15, 0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="w-52 h-52 rounded-full bg-gradient-to-br from-yellow-400/25 to-blue-600/15 border border-yellow-400/30 shadow-[0_0_60px_rgba(250,204,21,0.15)] flex items-center justify-center">
          <Wrench className="w-24 h-24 text-yellow-400" strokeWidth={1.5} />
        </div>
      </motion.div>
      <motion.div className="absolute w-72 h-72" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center">
          <Shield className="w-5 h-5 text-yellow-400" />
        </div>
      </motion.div>
      <motion.div className="absolute w-56 h-56" animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-blue-400/15 border border-blue-300/20 flex items-center justify-center">
          <Droplets className="w-4 h-4 text-blue-300" />
        </div>
      </motion.div>
      <motion.div className="absolute w-96 h-96" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
          <Wrench className="w-4 h-4 text-yellow-300" strokeWidth={1.5} />
        </div>
      </motion.div>
    </div>
  )
}

export default function PlumbingPage() {
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
    <div className="min-h-screen bg-white font-sans cursor-none">
      <CustomCursor icon={Wrench} color="#3b82f6" />
      {/* Nav */}
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: navHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 w-full z-50 bg-blue-900 text-white shadow-md"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-blue-900" />
            </div>
            <div>
              <p className="font-black text-sm leading-none">Albany Pro Plumbing</p>
              <p className="text-xs text-blue-200">Licensed &amp; Insured · Latham, NY</p>
            </div>
          </motion.div>
          <motion.a href="tel:+15188880005" className="px-5 py-2.5 bg-yellow-400 text-blue-900 font-black rounded-xl text-sm hover:bg-yellow-300 transition-all flex items-center gap-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <Phone className="w-4 h-4" /> Emergency? Call Now
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1400&q=70" alt="bg" fill className="object-cover" sizes="100vw" />
        </div>
        <HeroBlobs />
        <div className="relative max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="demo-fade-up inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-semibold">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" /> 24/7 Emergency Service Available
            </div>
            <h1 className="demo-fade-up demo-fade-up-1 text-5xl lg:text-6xl font-black leading-tight">
              Albany&apos;s Most<br /><span className="text-yellow-400">Trusted Plumber.</span>
            </h1>
            <p className="demo-fade-up demo-fade-up-2 text-blue-200 text-lg">
              Licensed, insured, and serving the Capital Region for 15+ years. We fix it right the first time — or it&apos;s free.
            </p>
            <div className="demo-fade-up demo-fade-up-3 flex flex-wrap gap-3">
              <GlowBtn href="tel:+15188880005" className="px-7 py-4 bg-yellow-400 text-blue-900 font-black rounded-2xl text-base hover:bg-yellow-300 transition-all hover:scale-105 flex items-center gap-2">
                <Phone className="w-4 h-4" /> (518) 888-0005
              </GlowBtn>
              <a href="/contact" className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-base border border-white/20 transition-all">
                Get Free Estimate
              </a>
            </div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-4 pt-2">
              {[{ emoji: '🛡️', text: 'Licensed & Insured' }, { emoji: '⭐', text: '5-Star Rated' }, { emoji: '🔧', text: 'Fixed Right or Free' }, { emoji: '⚡', text: 'Same-Day Available' }].map(({ emoji, text }) => (
                <motion.div key={text} variants={bounceIn} className="flex items-center gap-1.5 text-sm text-blue-200 font-medium">
                  <span>{emoji}</span> {text}
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* 3D plumber — replace URL: spline.design → Community → search "plumber" → Export → Copy public URL */}
            <PlumbingMascot />
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-blue-800">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2">Our Licensed Team</h2>
            <p className="text-blue-200">Background-checked, licensed, and insured — every one of us.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Dave Kowalski', role: 'Master Plumber · 20 yrs', img: 'https://randomuser.me/api/portraits/men/46.jpg', cert: 'NY State Master License #48291', variant: fadeLeft },
              { name: 'Ray Torres', role: 'Journeyman Plumber · 11 yrs', img: 'https://randomuser.me/api/portraits/men/67.jpg', cert: 'Capital Region Certified', variant: fadeUp },
              { name: 'Linda Chen', role: 'Service Technician · 7 yrs', img: 'https://randomuser.me/api/portraits/women/34.jpg', cert: 'NASSCO Certified Inspector', variant: fadeRight },
            ].map((m) => (
              <motion.div key={m.name} variants={m.variant} whileHover={{ scale: 1.04, y: -6, transition: { type: 'spring', stiffness: 300 } }} className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/15 transition-colors">
                <img src={m.img} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-2 ring-yellow-400/60" />
                <p className="font-black text-white text-base mb-0.5">{m.name}</p>
                <p className="text-blue-200 text-sm mb-3">{m.role}</p>
                <p className="text-xs text-yellow-400/70 bg-yellow-400/10 rounded-lg px-3 py-1.5 border border-yellow-400/20">{m.cert}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-[#010c18]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">What We Do</span>
            <h2 className="text-4xl font-black text-white mb-2">What We Fix</h2>
            <p className="text-white/40">Residential and light commercial plumbing.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-4">
            {services.map(s => (
              <motion.div key={s.title} variants={fadeUp}>
                <SpotlightCard accent="#3b82f6" bg="#020e1c" className="p-6 h-full flex flex-col">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                  <h3 className="font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-4 h-px w-8 bg-blue-400/40 group-hover:w-full transition-all duration-500 rounded-full" />
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <PlumbingScrollingReviews />

      {/* Booking */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <BookingCalendar
            title="Schedule a Service Call"
            subtitle="Pick a date and arrival window. We confirm same day. Emergency? Call us directly."
            slots={['7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']}
            accent="bg-blue-700" accentText="text-blue-800" accentLight="bg-blue-50" accentBorder="border-blue-200"
            businessName="Albany Pro Plumbing"
          />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-black text-gray-900">
            Get a Free Estimate
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, label: '(518) 888-0005', sub: '24/7 emergency line' },
              { icon: Mail, label: 'info@albanypro.com', sub: 'Replies within 1 hour' },
              { icon: MapPin, label: '55 Route 9, Latham, NY', sub: 'Capital Region service area' },
            ].map(({ icon: Icon, label, sub }) => (
              <motion.div key={label} variants={bounceIn} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-blue-200 transition-colors">
                <Icon className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                <p className="font-bold text-gray-900 text-sm">{label}</p>
                <p className="text-gray-400 text-xs">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center pt-2">
            <GlowBtn href="tel:+15188880005" className="px-8 py-4 bg-blue-700 text-white font-black rounded-2xl text-base hover:bg-blue-600 transition-colors">
              <Phone className="w-4 h-4" /> Call 24/7
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
