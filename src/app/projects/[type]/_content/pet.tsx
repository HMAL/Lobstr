'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Star, PawPrint, Heart, Bone } from 'lucide-react'
import BookingCalendar from '@/components/BookingCalendar'

// ── Data ──────────────────────────────────────────────────────────────────────
interface Review { name: string; role: string; img: string; text: string }
const reviews: Review[] = [
  { name: 'Rachel M.', role: 'Dog mom · 3 years a client', img: 'https://randomuser.me/api/portraits/women/22.jpg', text: "Dr. Park is the most caring vet I've ever met. My anxious rescue dog actually looks forward to visits now." },
  { name: 'Tom K.', role: 'Cat owner', img: 'https://randomuser.me/api/portraits/men/11.jpg', text: "Fast, friendly, affordable. Booked in 2 minutes. Biscuit looks amazing every single time." },
  { name: 'Diana S.', role: 'Cat owner', img: 'https://randomuser.me/api/portraits/women/61.jpg', text: "Called at 8 PM about my cat and they saw us next morning. That kind of care is rare. We'll never go anywhere else." },
  { name: 'Kevin M.', role: 'Golden Retriever dad', img: 'https://randomuser.me/api/portraits/men/47.jpg', text: "Sofia is incredible with nervous dogs. My Shepherd was actually calm for grooming for the first time ever." },
  { name: 'Priya S.', role: 'Cat owner', img: 'https://randomuser.me/api/portraits/women/38.jpg', text: "Dr. Osei diagnosed what three other vets missed. Quick, thorough, genuinely caring. Saved my cat's life." },
  { name: 'Jake T.', role: 'Rabbit owner', img: 'https://randomuser.me/api/portraits/men/72.jpg', text: "They treat every animal like it matters — even my rabbit got the VIP treatment. Highly recommend." },
]

const services = [
  { icon: '🩺', title: 'Wellness Exams', desc: 'Annual checkups and preventive care for dogs, cats, and small animals.' },
  { icon: '💉', title: 'Vaccinations', desc: 'Core and lifestyle vaccines for dogs and cats, customized to your pet.' },
  { icon: '✂️', title: 'Grooming', desc: 'Bath, haircut, nail trim, and de-shedding — for all breeds and sizes.' },
  { icon: '🦷', title: 'Dental Cleanings', desc: 'Professional dental care under anesthesia to keep smiles healthy.' },
  { icon: '🔬', title: 'Lab Work & Diagnostics', desc: 'In-house bloodwork, urinalysis, and X-rays for fast results.' },
  { icon: '🚨', title: 'Emergency Care', desc: 'Same-day urgent appointments available. Call us first.' },
]

const team = [
  { name: 'Dr. Lisa Park, DVM', role: 'Lead Veterinarian', img: 'https://randomuser.me/api/portraits/women/29.jpg', bio: '12+ years in small animal medicine. Dog mom x2.' },
  { name: 'Dr. James Osei, DVM', role: 'Veterinarian', img: 'https://randomuser.me/api/portraits/men/34.jpg', bio: 'Exotic animal specialist. Cat person, ironically.' },
  { name: 'Sofia Reyes', role: 'Head Groomer', img: 'https://randomuser.me/api/portraits/women/53.jpg', bio: '8 years grooming. Handles even the most nervous pups.' },
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
      <div className="demo-blob w-72 h-72 rounded-full bg-emerald-400/25 top-[5%] right-[8%]" />
      <div className="demo-blob w-56 h-56 rounded-full bg-teal-300/20 bottom-[10%] right-[20%]" style={{ animationDelay: '3s, 2s' }} />
      <div className="demo-blob w-40 h-40 rounded-full bg-green-500/15 top-[40%] left-[3%]" style={{ animationDelay: '6s, 4s' }} />
    </>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const tilt = index % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]'
  return (
    <div className={`w-[260px] rounded-2xl p-5 border shrink-0 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-xl cursor-default ${tilt} bg-white border-gray-100 shadow-sm hover:border-emerald-200`}>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
      </div>
      <p className="text-sm leading-relaxed text-gray-600 mb-4">"{review.text}"</p>
      <div className="flex items-center gap-2.5">
        <img src={review.img} alt={review.name} className="w-9 h-9 rounded-full object-cover" />
        <div>
          <p className="text-sm font-bold text-gray-900 leading-none mb-0.5">{review.name}</p>
          <p className="text-xs text-gray-400">{review.role}</p>
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

function PetScrollingReviews() {
  const col1 = reviews.slice(0, 2)
  const col2 = reviews.slice(2, 4)
  const col3 = reviews.slice(4, 6)
  return (
    <section id="reviews" className="py-20 overflow-hidden bg-emerald-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-1">What Pet Parents Say</h2>
          <p className="text-gray-400">4.9 / 5 · 340+ reviews</p>
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
function PetMascot() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <motion.div className="absolute w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="relative z-10"
        animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="w-52 h-52 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-emerald-400/30 shadow-[0_0_60px_rgba(52,211,153,0.15)] flex items-center justify-center">
          <PawPrint className="w-24 h-24 text-emerald-400" strokeWidth={1.5} />
        </div>
      </motion.div>
      <motion.div className="absolute w-72 h-72" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
          <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400" />
        </div>
      </motion.div>
      <motion.div className="absolute w-56 h-56" animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
          <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
        </div>
      </motion.div>
      <motion.div className="absolute w-96 h-96" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-teal-500/10 border border-teal-400/20 flex items-center justify-center">
          <Heart className="w-4 h-4 text-teal-400/60 fill-teal-400/40" />
        </div>
      </motion.div>
    </div>
  )
}

export default function PetPage() {
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
      <CustomCursor icon={Bone} color="#10b981" />
      {/* Nav */}
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: navHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-sm leading-none">Happy Paws</p>
              <p className="text-xs text-emerald-600 font-medium">Vet & Grooming</p>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {['Services', 'Our Team', 'Reviews', 'Contact'].map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="hover:text-emerald-600 transition-colors" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>{l}</motion.a>
            ))}
          </div>
          <motion.a href="/contact" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>Book Online</motion.a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1400&q=85" alt="Vet clinic" fill className="object-cover brightness-50" priority sizes="100vw" />
        <HeroBlobs />
        {/* 3D dog — replace URL: spline.design → Community → search "dog" or "pet" → Export → Copy public URL */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[80%] hidden lg:block" style={{ zIndex: 5 }}>
          <PetMascot />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-white space-y-6">
          <div className="demo-fade-up inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-200 text-sm font-medium">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Albany, NY · Open Now
          </div>
          <h1 className="demo-fade-up demo-fade-up-1 text-3xl sm:text-4xl lg:text-7xl font-black leading-[1.05]">
            Your Pet&apos;s<br /><span className="text-emerald-400">Second Home.</span>
          </h1>
          <p className="demo-fade-up demo-fade-up-2 text-lg text-white/80 max-w-xl">
            Full-service veterinary care and grooming in Albany, NY. Board-certified vets, gentle groomers, and online booking — because your pet deserves the best.
          </p>
          <div className="demo-fade-up demo-fade-up-3 flex flex-wrap gap-3 max-w-md">
            <GlowBtn href="/contact" className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl text-base transition-all hover:scale-105">
              Book an Appointment
            </GlowBtn>
            <a href="tel:+15188880001" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold rounded-2xl text-base border border-white/20 flex items-center gap-2 transition-all">
              <Phone className="w-4 h-4" /> (518) 888-0001
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-emerald-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
          {[['2,500+', 'Pets Cared For'], ['12yr', 'In Business'], ['4.9★', 'Google Rating'], ['Same-Day', 'Urgent Appts']].map(([val, label]) => (
            <motion.div key={label} variants={fadeUp}>
              <p className="text-2xl font-black">{val}</p>
              <p className="text-emerald-100 text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Services */}
      <section id="services" className="py-20 bg-[#011410]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Our Services</span>
            <h2 className="text-4xl font-black text-white mb-2">Everything Your Pet Needs</h2>
            <p className="text-white/40">Comprehensive care under one roof.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-4">
            {services.map(s => (
              <motion.div key={s.title} variants={fadeUp}>
                <SpotlightCard accent="#10b981" bg="#021f18" className="p-6 h-full flex flex-col">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                  <h3 className="font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-4 h-px w-8 bg-emerald-400/40 group-hover:w-full transition-all duration-500 rounded-full" />
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section id="our-team" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Meet the Team</h2>
            <p className="text-gray-500">People who genuinely love animals. No, really.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <motion.div key={m.name} variants={i % 2 === 0 ? fadeLeft : fadeRight} whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }} className="text-center cursor-pointer">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 ring-4 ring-emerald-100">
                  <Image src={m.img} alt={m.name} fill className="object-cover" sizes="96px" />
                </div>
                <h3 className="font-bold text-gray-900">{m.name}</h3>
                <p className="text-emerald-600 text-sm font-semibold">{m.role}</p>
                <p className="text-gray-400 text-sm mt-1 italic">&ldquo;{m.bio}&rdquo;</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <PetScrollingReviews />

      {/* Booking */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <BookingCalendar
            title="Book an Appointment"
            subtitle="Choose a date and time for your pet's visit. Same-day urgent care by phone."
            slots={['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM']}
            accent="bg-emerald-600" accentText="text-emerald-700" accentLight="bg-emerald-50" accentBorder="border-emerald-200"
            businessName="Happy Paws Vet & Grooming"
          />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-black text-gray-900">
            Get in Touch
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, label: '(518) 888-0001', sub: 'Call or text anytime' },
              { icon: Mail, label: 'info@happypaws.com', sub: 'Reply within 2 hours' },
              { icon: MapPin, label: '482 Western Ave, Albany', sub: 'Free parking available' },
            ].map(({ icon: Icon, label, sub }) => (
              <motion.div key={label} variants={bounceIn} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 transition-colors">
                <Icon className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-gray-900 text-sm">{label}</p>
                <p className="text-gray-400 text-xs">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 text-emerald-500" /> Mon–Fri 8am–6pm · Sat 9am–4pm · Urgent care available daily
          </div>
          <div className="flex justify-center">
            <GlowBtn href="tel:+15188880001" className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-2xl text-base hover:bg-emerald-400 transition-colors">
              <Phone className="w-4 h-4" /> Call Now
            </GlowBtn>
          </div>
          <div className="p-5 bg-gray-50 rounded-2xl text-sm text-gray-500 border border-gray-100">
            <Heart className="w-5 h-5 text-red-400 inline mr-1.5 fill-red-400" />
            Website built by <a href="https://mylobstr.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">Mylobstr.com</a> · Albany&apos;s neighborhood web studio
          </div>
        </div>
      </section>
    </div>
  )
}
