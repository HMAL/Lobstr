'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Star } from 'lucide-react'
import BookingCalendar from '@/components/BookingCalendar'

// ── Data ──────────────────────────────────────────────────────────────────────
interface Review { name: string; role: string; img: string; text: string }
const reviews: Review[] = [
  { name: 'Angela F.', role: 'Food blogger', img: 'https://randomuser.me/api/portraits/women/31.jpg', text: "The tagliatelle was the best pasta I've had outside of Italy. Marco's kitchen is the real deal." },
  { name: 'David C.', role: 'Date night regular', img: 'https://randomuser.me/api/portraits/men/19.jpg', text: "We come here for every anniversary. The ambiance, the food, the service — consistently perfect every single time." },
  { name: 'Rosa M.', role: 'Local foodie', img: 'https://randomuser.me/api/portraits/women/52.jpg', text: "Burrata that tastes like it shipped this morning. This is the Italian restaurant Albany has been waiting for." },
  { name: 'James W.', role: 'Business dinner host', img: 'https://randomuser.me/api/portraits/men/63.jpg', text: "Took clients here twice this month. Impressed every single time. The bistecca Fiorentina is extraordinary." },
  { name: 'Chen L.', role: 'Weekly diner', img: 'https://randomuser.me/api/portraits/women/44.jpg', text: "Reserved in 60 seconds online. Table was ready when we arrived. Genuinely seamless experience." },
  { name: 'Maria T.', role: 'Pasta enthusiast', img: 'https://randomuser.me/api/portraits/women/15.jpg', text: "Handmade cacio e pepe that puts every other version in Albany to shame. Worth every single cent." },
]

const menu = [
  { cat: 'Antipasti', items: [{ name: 'Bruschetta al Pomodoro', price: '$9', desc: 'Grilled bread, heirloom tomato, fresh basil, EVOO' }, { name: 'Burrata', price: '$14', desc: 'Imported burrata, prosciutto, roasted peppers' }] },
  { cat: 'Pasta', items: [{ name: 'Tagliatelle al Ragù', price: '$22', desc: 'Hand-rolled pasta, slow-braised beef & pork ragu' }, { name: 'Cacio e Pepe', price: '$19', desc: 'Tonnarelli, Pecorino Romano, cracked black pepper' }] },
  { cat: 'Secondi', items: [{ name: "Branzino all'Acqua Pazza", price: '$32', desc: 'Mediterranean sea bass, cherry tomato, olives, capers' }, { name: 'Bistecca alla Fiorentina', price: '$48', desc: '16oz T-bone, rosemary, garlic butter, arugula' }] },
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

function RestaurantScrollingReviews() {
  const col1 = reviews.slice(0, 2)
  const col2 = reviews.slice(2, 4)
  const col3 = reviews.slice(4, 6)
  return (
    <section className="py-20 overflow-hidden bg-[#120a04]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
          </div>
          <h2 className="text-3xl font-bold text-amber-400 mb-1">What Our Guests Say</h2>
          <p className="text-amber-200/40">4.9 / 5 · 420+ reviews</p>
        </div>
        <div className="flex justify-center gap-5 max-h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <ReviewColumn items={col1} dir="up" dur={20} />
          <ReviewColumn items={col2} dir="down" dur={24} className="hidden md:block" />
          <ReviewColumn items={col3} dir="up" dur={16} className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RestaurantPage() {
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
    <div className="min-h-screen bg-[#1a0e08] font-sans text-white">
      {/* Nav */}
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: navHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 w-full z-50 bg-[#1a0e08]/90 backdrop-blur-md border-b border-amber-900/30"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <p className="font-bold text-xl text-amber-400 tracking-wider">TRATTORIA</p>
            <p className="text-xs text-amber-200/60 tracking-widest uppercase">Albany</p>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-200/70">
            {['Menu', 'About', 'Reserve', 'Find Us'].map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="hover:text-amber-400 transition-colors" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>{l}</motion.a>
            ))}
          </div>
          <motion.a href="#reserve" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-sm transition-all" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>Reserve Table</motion.a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative h-screen flex items-end pb-24 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85" alt="Trattoria Albany" fill className="object-cover brightness-40" priority sizes="100vw" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <p className="demo-fade-up text-amber-400 text-sm font-bold tracking-widest uppercase mb-3">Ristorante Italiano · Albany, NY</p>
          <h1 className="demo-fade-up demo-fade-up-1 text-3xl sm:text-5xl lg:text-8xl font-bold leading-[0.95] mb-6">
            Cucina Italiana<br /><span className="text-amber-400">Autentica.</span>
          </h1>
          <p className="demo-fade-up demo-fade-up-2 text-white/70 text-lg max-w-lg mb-8">
            Handmade pasta, wood-fired flavors, and recipes passed down through three generations — right here in downtown Albany.
          </p>
          <div className="demo-fade-up demo-fade-up-3 flex flex-wrap gap-3">
            <GlowBtn href="#reserve" className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-2xl text-base transition-all hover:scale-105">
              Reserve Online
            </GlowBtn>
            <a href="tel:+15188880002" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold rounded-2xl text-base border border-white/20 transition-all">
              (518) 888-0002
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-[#120a04]">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative h-80 rounded-3xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700&q=85" alt="Chef cooking" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-amber-400">La Nostra Storia</motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 leading-relaxed">
              Marco DiSalvo opened Trattoria Albany in 2012 after spending five years cooking in Bologna. The menu reflects his childhood — simple, honest ingredients treated with respect.
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/70 leading-relaxed">
              Every pasta is hand-rolled each morning. Every sauce simmers for hours. We don&apos;t rush good food. Neither should you.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-3 gap-4 pt-4">
              {[['2012', 'Est.'], ['4.9★', '420+ reviews'], ['100%', 'Handmade pasta']].map(([val, lbl]) => (
                <motion.div key={lbl} variants={bounceIn} className="text-center bg-amber-900/20 border border-amber-800/30 rounded-2xl p-3">
                  <p className="text-2xl font-bold text-amber-400">{val}</p>
                  <p className="text-xs text-white/50">{lbl}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 bg-[#1a0e08]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">La Cucina</span>
            <h2 className="text-4xl font-bold text-amber-400">Il Menù</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
            {menu.map((cat, ci) => (
              <motion.div key={cat.cat} variants={ci % 2 === 0 ? fadeLeft : fadeRight}>
                <SpotlightCard accent="#f59e0b" bg="#1f1006" className="p-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-5">{cat.cat}</h3>
                  <div className="space-y-5">
                    {cat.items.map(item => (
                      <motion.div key={item.name} whileHover={{ x: 6, transition: { type: 'spring', stiffness: 400 } }} className="flex items-baseline justify-between gap-4 cursor-pointer group/item">
                        <div>
                          <p className="font-bold text-white group-hover/item:text-amber-200 transition-colors">{item.name}</p>
                          <p className="text-sm text-white/50 italic">{item.desc}</p>
                        </div>
                        <p className="text-amber-400 font-bold shrink-0">{item.price}</p>
                      </motion.div>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <RestaurantScrollingReviews />

      {/* Booking */}
      <section className="py-20 bg-[#120a04]">
        <div className="max-w-4xl mx-auto px-4">
          <BookingCalendar
            title="Reserve Your Table"
            subtitle="Pick an evening and time — we'll hold your spot. Walk-ins welcome when available."
            slots={['5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM']}
            accent="bg-amber-500" accentText="text-amber-700" accentLight="bg-amber-50" accentBorder="border-amber-200"
            businessName="Trattoria Albany"
          />
        </div>
      </section>

      {/* Reserve CTA */}
      <section id="reserve" className="py-20 bg-amber-500">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl font-bold text-black">
            Reserve Your Table
          </motion.h2>
          <p className="text-black/70">Book online in under a minute, or call us directly.</p>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: Phone, label: '(518) 888-0002' },
              { icon: Mail, label: 'ciao@trattoriaalbany.com' },
              { icon: MapPin, label: '214 Central Ave, Albany' },
            ].map(({ icon: Icon, label }) => (
              <motion.div key={label} variants={bounceIn} className="bg-black/10 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold text-black/80">
                <Icon className="w-4 h-4 shrink-0" /> {label}
              </motion.div>
            ))}
          </motion.div>
          <div className="flex items-center justify-center gap-2 text-sm text-black/60">
            <Clock className="w-4 h-4" /> Tue–Sun 5pm–10pm · Closed Mondays
          </div>
          <div className="flex justify-center">
            <GlowBtn href="tel:+15188880002" className="px-8 py-4 bg-black text-amber-400 font-bold rounded-2xl text-base hover:bg-gray-900 transition-colors">
              <Phone className="w-4 h-4" /> Call for Reservation
            </GlowBtn>
          </div>
          <p className="text-xs text-black/50">
            Website by <a href="https://mylobstr.com" target="_blank" rel="noopener noreferrer" className="font-bold underline">mylobstr.com</a> · Albany&apos;s neighborhood web studio
          </p>
        </div>
      </section>
    </div>
  )
}
