'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Star, GraduationCap, BookOpen, Sparkles, TrendingUp, Users, Award } from 'lucide-react'
import BookingCalendar from '@/components/BookingCalendar'

// ── Data ──────────────────────────────────────────────────────────────────────
interface Review { name: string; role: string; img: string; text: string }
const reviews: Review[] = [
  { name: 'Melissa R.', role: 'Parent of 7th grader', img: 'https://randomuser.me/api/portraits/women/33.jpg', text: "My son went from dreading math to asking for extra practice problems. His grade went from a C- to an A- in one semester. We're beyond grateful." },
  { name: 'David K.', role: 'Parent of high school junior', img: 'https://randomuser.me/api/portraits/men/52.jpg', text: 'The SAT prep program was a game changer. 210-point improvement and my daughter walked into test day actually confident.' },
  { name: 'Angela P.', role: 'Parent of twins, 4th grade', img: 'https://randomuser.me/api/portraits/women/55.jpg', text: 'Both my kids look forward to their sessions. The tutors make learning feel like a privilege, not a punishment. Scheduling online is so easy.' },
  { name: 'James W.', role: 'Parent of 10th grader', img: 'https://randomuser.me/api/portraits/men/36.jpg', text: 'Chemistry was sinking my son\'s GPA. Three months with Ms. Chen and he finished the year with a B+. Worth every penny.' },
  { name: 'Priya S.', role: 'Parent of college applicant', img: 'https://randomuser.me/api/portraits/women/68.jpg', text: 'The college essay coaching helped my daughter find her voice. She got into her top choice with a merit scholarship.' },
  { name: 'Tom B.', role: 'Parent of 2nd grader', img: 'https://randomuser.me/api/portraits/men/61.jpg', text: 'Reading was a nightly battle in our house. Six weeks in, my daughter reads to ME at bedtime. I almost cried the first time.' },
]

const programs = [
  { name: 'Math (K–12)', desc: 'From counting to calculus — patient, step-by-step mastery.', price: 'From $45/hr', emoji: '🔢' },
  { name: 'Reading & Writing', desc: 'Phonics, comprehension, and essays kids are proud of.', price: 'From $45/hr', emoji: '📚' },
  { name: 'SAT / ACT Prep', desc: 'Proven strategies. Average improvement: 180+ points.', price: 'From $60/hr', emoji: '🎯' },
  { name: 'Science', desc: 'Biology, chemistry, and physics — finally made clear.', price: 'From $50/hr', emoji: '🔬' },
  { name: 'Homework Help', desc: 'Drop-in support that turns frustration into momentum.', price: 'From $35/hr', emoji: '✏️' },
  { name: 'College Essays', desc: 'One-on-one coaching to tell their story with confidence.', price: 'From $65/hr', emoji: '🎓' },
]

const tutors = [
  { name: 'Sarah Mitchell', subject: 'Math & SAT Prep', cred: 'M.Ed. · 12 years teaching', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Marcus Chen', subject: 'Science', cred: 'M.S. Chemistry · ex-high school dept. head', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Emily Torres', subject: 'Reading & Writing', cred: 'Literacy specialist · K–8 certified', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Daniel Okafor', subject: 'College Essays & ACT', cred: 'Ivy League admissions mentor', img: 'https://randomuser.me/api/portraits/men/75.jpg' },
]

const stats = [
  { icon: TrendingUp, val: '1.5', label: 'Avg. letter-grade improvement' },
  { icon: Users, val: '400+', label: 'Capital Region students' },
  { icon: Award, val: '180+', label: 'Avg. SAT point gain' },
  { icon: Star, val: '4.9/5', label: 'Parent rating' },
]

// ── Animation variants ────────────────────────────────────────────────────────
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }
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
      <div className="demo-blob w-72 h-72 rounded-full bg-indigo-400/20 top-[8%] right-[6%]" />
      <div className="demo-blob w-56 h-56 rounded-full bg-blue-300/15 bottom-[12%] right-[18%]" style={{ animationDelay: '3s, 2.5s' }} />
      <div className="demo-blob w-44 h-44 rounded-full bg-violet-400/10 top-[42%] left-[2%]" style={{ animationDelay: '6s, 4s' }} />
    </>
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

function ScrollingReviews() {
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
          <h2 className="text-3xl font-black text-white mb-1">What Parents Say</h2>
          <p className="text-white/40">4.9 / 5 · 190+ reviews</p>
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

// ── Mascot ────────────────────────────────────────────────────────────────────
function TutorMascot() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <motion.div className="absolute w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl"
        animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="relative z-10"
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="w-52 h-52 rounded-full bg-gradient-to-br from-indigo-500/20 to-indigo-700/10 border border-indigo-400/30 shadow-[0_0_60px_rgba(99,102,241,0.15)] flex items-center justify-center">
          <GraduationCap className="w-24 h-24 text-indigo-400" strokeWidth={1.5} />
        </div>
      </motion.div>
      <motion.div className="absolute w-72 h-72" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-indigo-400" />
        </div>
      </motion.div>
      <motion.div className="absolute w-56 h-56" animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute top-0 right-0 w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center">
          <Star className="w-4 h-4 text-indigo-400 fill-indigo-400" />
        </div>
      </motion.div>
      <motion.div className="absolute w-96 h-96" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute bottom-0 left-2 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-blue-400/70" />
        </div>
      </motion.div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TutoringPage() {
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
      <CustomCursor icon={GraduationCap} color="#6366f1" />
      {/* Nav */}
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: navHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <p className="font-black text-gray-900 text-lg tracking-tight">Bright Minds Tutoring</p>
            <p className="text-xs text-indigo-500 font-semibold">Albany, NY</p>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            {['Programs', 'Tutors', 'Results', 'Book'].map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`} className="hover:text-indigo-500 transition-colors" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}>{l}</motion.a>
            ))}
          </div>
          <motion.a href="#book" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl text-sm transition-all" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>Free Assessment</motion.a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=85" alt="Students learning together" fill className="object-cover brightness-50" priority sizes="100vw" />
        <HeroBlobs />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[80%] hidden lg:block" style={{ zIndex: 5 }}>
          <TutorMascot />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-white">
          <p className="demo-fade-up text-indigo-300 font-bold tracking-widest text-sm uppercase mb-4">✦ Albany&apos;s Trusted Tutoring Center ✦</p>
          <h1 className="demo-fade-up demo-fade-up-1 text-3xl sm:text-5xl lg:text-8xl font-black leading-[0.9] mb-6">
            Confidence,<br /><span className="text-indigo-400">one lesson at a time.</span>
          </h1>
          <p className="demo-fade-up demo-fade-up-2 text-white/75 text-lg max-w-md mb-8">
            One-on-one tutoring for K–12 and test prep — matched to your child, backed by real results.
          </p>
          <div className="demo-fade-up demo-fade-up-3">
            <GlowBtn href="#book" className="inline-flex items-center gap-2 px-7 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-2xl text-base transition-all hover:scale-105">
              <GraduationCap className="w-4 h-4" /> Book a Free Assessment
            </GlowBtn>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 bg-[#02041a]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Programs &amp; Pricing</span>
            <h2 className="text-4xl font-black text-white mb-2">Every subject. Every grade.</h2>
            <p className="text-white/40">Transparent hourly rates. No long-term contracts.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map(p => (
              <motion.div key={p.name} variants={fadeUp}>
                <SpotlightCard accent="#6366f1" bg="#060924" className="p-5 h-full flex flex-col gap-3">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</div>
                  <p className="font-bold text-white">{p.name}</p>
                  <p className="text-sm text-white/50 flex-1">{p.desc}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-indigo-400 font-black">{p.price}</p>
                    <div className="h-px flex-1 bg-indigo-400/20 group-hover:bg-indigo-400/50 transition-colors duration-500 rounded-full" />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tutors */}
      <section id="tutors" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">Meet the Tutors</span>
            <h2 className="text-4xl font-black text-gray-900 mb-2">Real educators. Not gig workers.</h2>
            <p className="text-gray-400">Certified teachers and subject specialists, background-checked and parent-approved.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {tutors.map(t => (
              <motion.div key={t.name} variants={fadeUp} whileHover={{ y: -6 }} className="text-center p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-white shadow" />
                <p className="font-black text-gray-900 text-sm mb-0.5">{t.name}</p>
                <p className="text-xs font-bold text-indigo-500 mb-1">{t.subject}</p>
                <p className="text-xs text-gray-400">{t.cred}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-16 bg-indigo-600">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
            {stats.map(({ icon: Icon, val, label }) => (
              <motion.div key={label} variants={bounceIn}>
                <Icon className="w-6 h-6 mx-auto mb-2 text-indigo-200" />
                <p className="text-3xl font-black mb-1">{val}</p>
                <p className="text-xs text-indigo-200 font-semibold">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <ScrollingReviews />

      {/* Booking */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4">
          <BookingCalendar
            title="Book a Free Assessment"
            subtitle="30 minutes, no obligation. We'll meet your child, identify gaps, and recommend a plan."
            slots={['3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM']}
            accent="bg-indigo-500" accentText="text-indigo-700" accentLight="bg-indigo-50" accentBorder="border-indigo-200"
            businessName="Bright Minds Tutoring"
          />
        </div>
      </section>

      {/* Contact CTA */}
      <section id="book" className="py-20 bg-indigo-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl font-black">
            Give Them the Head Start
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: Phone, val: '(518) 888-0007' },
              { icon: Mail, val: 'hello@brightmindsalbany.com' },
              { icon: MapPin, val: '214 Western Ave, Albany, NY' },
            ].map(({ icon: Icon, val }) => (
              <motion.div key={val} variants={bounceIn} className="bg-white/20 rounded-xl py-3 px-3 text-sm font-semibold flex items-center gap-2">
                <Icon className="w-4 h-4 shrink-0" />{val}
              </motion.div>
            ))}
          </motion.div>
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <Clock className="w-4 h-4" /> Mon–Fri 3pm–8pm · Sat 9am–2pm
          </div>
          <div className="flex justify-center">
            <GlowBtn href="tel:+15188880007" className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl text-base hover:bg-indigo-50 transition-colors">
              <Phone className="w-4 h-4" /> Call to Enroll
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
