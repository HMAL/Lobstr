'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { demoWork, type Project } from '@/lib/work'

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

function WorkCard({ s, isLive }: { s: Project; isLive: boolean }) {
  return (
    <motion.a
      key={s.slug}
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={card}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group block rounded-3xl overflow-hidden bg-ink-2 border border-ink-wash ${s.border} transition-colors duration-300`}
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
        <h3 className="font-bold text-white text-base mb-2">{s.business}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
        <p className={`text-sm font-semibold mt-4 group-hover:underline flex items-center gap-1 ${isLive ? 'text-green-400' : 'text-[#ef7d5a]'}`}>
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
          <WorkCard key={s.slug} s={s} isLive={s.href.startsWith('http')} />
        ))}
      </motion.div>
    </section>
  )
}
