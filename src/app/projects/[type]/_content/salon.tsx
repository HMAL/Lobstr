'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Star, Scissors } from 'lucide-react'
import BookingCalendar from '@/components/BookingCalendar'

// ── Data ──────────────────────────────────────────────────────────────────────
interface Review { name: string; role: string; img: string; text: string }
const reviews: Review[] = [
  { name: 'Kira L.', role: 'Color client · 2 years', img: 'https://randomuser.me/api/portraits/women/22.jpg', text: "Jasmine is a miracle worker. I've been going everywhere for 5 years and finally found my person. Book her." },
  { name: 'Marcus T.', role: 'Family of 4', img: 'https://randomuser.me/api/portraits/men/44.jpg', text: "My whole family comes here now. The Cut Collective is the absolute best. Online booking is seamless." },
  { name: 'Brianna J.', role: 'Balayage client', img: 'https://randomuser.me/api/portraits/women/36.jpg', text: "Asked for a summer balayage and walked out looking like I live in Malibu. Jasmine is an absolute artist." },
  { name: 'Tyler S.', role: "Men's cut regular", img: 'https://randomuser.me/api/portraits/men/27.jpg', text: "Best men's cut in Troy. Clean fade, no fuss, super friendly. I've already recommended 4 friends." },
  { name: 'Priya K.', role: 'Keratin client', img: 'https://randomuser.me/api/portraits/women/48.jpg', text: "My hair has never looked this healthy. The keratin treatment completely transformed my frizz problem." },
  { name: 'Sofia R.', role: 'Color & cut', img: 'https://randomuser.me/api/portraits/women/61.jpg', text: "Good music, honest stylists, and my color came out exactly as I hoped. This place has real good energy." },
]

const services = [
  { name: "Women's Cut & Style", price: "From $55", emoji: "✂️" },
  { name: "Men's Cut", price: "From $30", emoji: "💈" },
  { name: "Full Color", price: "From $90", emoji: "🎨" },
  { name: "Highlights / Balayage", price: "From $120", emoji: "✨" },
  { name: "Blowout", price: "From $45", emoji: "💨" },
  { name: "Keratin Treatment", price: "From $150", emoji: "💫" },
]

const gallery = [
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80',
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=80',
  'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500&q=80',
  'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=500&q=80',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=500&q=80',
  'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&q=80',
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
    <a href={href} className={`inline-flex items-center gap-2 ${className}`}>
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





function ReviewCard({ review, index }: { review: Review; index: number }) {
  const tilt = index % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]'
  return (
    <div className={`w-[260px] rounded-2xl p-5 border shrink-0 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-xl cursor-default ${tilt} bg-white/[0.07] border-white/10 hover:bg-white/[0.12]`}>
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

function SalonScrollingReviews() {
  const col1 = reviews.slice(0, 2)
  const col2 = reviews.slice(2, 4)
  const col3 = reviews.slice(4, 6)
  return (
    <section className="py-20 overflow-hidden bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
          </div>
          <h2 className="text-3xl font-bold text-white mb-1">What Clients Say</h2>
          <p className="text-white/40">4.9 / 5 · 280+ reviews</p>
        </div>
        <div className="flex justify-center gap-5 max-h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <ReviewColumn items={col1} dir="up" dur={19} />
          <ReviewColumn items={col2} dir="down" dur={23} className="hidden md:block" />
          <ReviewColumn items={col3} dir="up" dur={15} className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────


export default function SalonPage() {
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
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: navHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <p className="font-bold text-gray-900 text-lg tracking-tight">The Cut Collective</p>
            <p className="text-xs text-rose-500 font-semibold">Troy, NY</p>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            {['Services', 'Gallery', 'Our Team', 'Book'].map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="hover:text-rose-500 transition-colors" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>{l}</motion.a>
            ))}
          </div>
          <motion.a href="#book" className="px-5 py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl text-sm transition-all" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>Book Now</motion.a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85" alt="Salon" fill className="object-cover brightness-60" priority sizes="100vw" />
        {/* 3D stylist — replace URL: spline.design → Community → search "hairstylist" or "salon" → Export → Copy public URL */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-white">
          <p className="demo-fade-up text-rose-300 font-bold tracking-widest text-sm uppercase mb-4">✦ Troy&apos;s Premier Hair Studio ✦</p>
          <h1 className="demo-fade-up demo-fade-up-1 text-3xl sm:text-5xl lg:text-8xl font-bold leading-[0.9] mb-6">
            Your hair.<br /><span className="text-rose-400">Your story.</span>
          </h1>
          <p className="demo-fade-up demo-fade-up-2 text-white/75 text-lg max-w-md mb-8">
            Expert cuts, color, and care for every hair type. Walk in looking good, walk out feeling unstoppable.
          </p>
          <div className="demo-fade-up demo-fade-up-3">
            <GlowBtn href="#book" className="inline-flex items-center gap-2 px-7 py-4 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-2xl text-base transition-all hover:scale-105">
              <Scissors className="w-4 h-4" /> Book Your Session
            </GlowBtn>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-[#0f0212]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-rose-400 mb-3">Services &amp; Pricing</span>
            <h2 className="text-4xl font-bold text-white mb-2">No surprises here.</h2>
            <p className="text-white/40">Transparent pricing. Just great hair.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(s => (
              <motion.div key={s.name} variants={fadeUp}>
                <SpotlightCard accent="#f43f5e" bg="#180210" className="p-5 h-full flex flex-col gap-3">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{s.emoji}</div>
                  <p className="font-bold text-white flex-1">{s.name}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-rose-400 font-bold">{s.price}</p>
                    <div className="h-px flex-1 bg-rose-400/20 group-hover:bg-rose-400/50 transition-colors duration-500 rounded-full" />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold text-center text-gray-900 mb-10">
            Our Work
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <motion.div key={i} variants={i % 2 === 0 ? fadeLeft : fadeRight} whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300 } }} className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <SalonScrollingReviews />

      {/* Booking */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-4xl mx-auto px-4">
          <BookingCalendar
            title="Book Your Appointment"
            subtitle="Pick a date and time that works for you. We'll confirm within 15 minutes."
            slots={['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM']}
            accent="bg-rose-500" accentText="text-rose-700" accentLight="bg-rose-50" accentBorder="border-rose-200"
            businessName="The Cut Collective"
          />
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="py-20 bg-rose-500 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl font-bold">
            Book Your Appointment
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: Phone, val: '(518) 888-0003' },
              { icon: Mail, val: 'book@cutcollective.com' },
              { icon: MapPin, val: '89 4th St, Troy, NY' },
            ].map(({ icon: Icon, val }) => (
              <motion.div key={val} variants={bounceIn} className="bg-white/20 rounded-xl py-3 px-3 text-sm font-semibold flex items-center gap-2">
                <Icon className="w-4 h-4 shrink-0" />{val}
              </motion.div>
            ))}
          </motion.div>
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <Clock className="w-4 h-4" /> Tue–Sat 9am–7pm · Sun 10am–5pm
          </div>
          <div className="flex justify-center">
            <GlowBtn href="tel:+15188880003" className="px-8 py-4 bg-white text-rose-600 font-bold rounded-2xl text-base hover:bg-rose-50 transition-colors">
              <Phone className="w-4 h-4" /> Call to Book
            </GlowBtn>
          </div>
          <p className="text-xs text-white/60">
            Website by <a href="https://mylobstr.com" target="_blank" rel="noopener noreferrer" className="font-bold underline">mylobstr.com</a>
          </p>
        </div>
      </section>
    </div>
  )
}
