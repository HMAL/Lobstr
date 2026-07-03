'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, Globe, MessageCircle, DollarSign, Clock, Palette,
  Settings, Server, Headphones, ArrowRight, Phone, Mail, MapPin,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { faqCategories, type Faq as FAQ } from './faq-data'

interface Category { icon: React.ReactNode; color: string; bg: string; title: string; faqs: FAQ[] }

// Presentation only — Q&A content lives in faq-data.ts (shared with the FAQPage schema)
// One accent across all categories — the icon distinguishes them, not a rainbow of colors.
const BLUE = { color: 'text-coral-ink', bg: 'bg-coral/10 border-coral/30' }
const styles: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Who We Work With': { icon: <MapPin className="w-5 h-5" />, ...BLUE },
  'Cost & Pricing': { icon: <DollarSign className="w-5 h-5" />, ...BLUE },
  'Timeline & Process': { icon: <Clock className="w-5 h-5" />, ...BLUE },
  'Design & Branding': { icon: <Palette className="w-5 h-5" />, ...BLUE },
  'Features & Functionality': { icon: <Settings className="w-5 h-5" />, ...BLUE },
  'Hosting, Domains & Tech': { icon: <Server className="w-5 h-5" />, ...BLUE },
  'After Launch & Support': { icon: <Headphones className="w-5 h-5" />, ...BLUE },
}

const categories: Category[] = faqCategories.map((cat) => ({
  title: cat.title,
  faqs: cat.faqs,
  ...styles[cat.title],
}))


function AccordionItem({ faq, id, open, onToggle }: { faq: FAQ; id: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? 'border-coral/30 shadow-sm shadow-coral/10' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 cursor-pointer"
      >
        <span className={`font-semibold text-base leading-snug transition-colors ${open ? 'text-coral-ink' : 'text-gray-900'}`}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${open ? 'text-coral-ink' : 'text-gray-400'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const expandAll = () => {
    const all = new Set<string>()
    categories.forEach((cat, ci) => cat.faqs.forEach((_, fi) => all.add(`${ci}-${fi}`)))
    setOpenItems(all)
  }

  const collapseAll = () => setOpenItems(new Set())

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-20">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-coral/15 border border-coral/30 rounded-full text-marigold text-sm font-semibold mb-6"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Frequently asked questions
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
          >
            The questions owners ask<br />
            <span className="text-[#ef7d5a]">before getting a website</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-white/60 text-lg max-w-xl mx-auto mb-8"
          >
            {categories.reduce((acc, c) => acc + c.faqs.length, 0)} straight answers on cost, timeline, hosting, SEO, and support — no jargon, no asterisks.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {categories.map((cat) => (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(/\s+&?\s*/g, '-')}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white transition-all"
              >
                {cat.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between border-b border-gray-100">
        <p className="text-sm text-gray-400">
          {categories.reduce((acc, c) => acc + c.faqs.length, 0)} questions across {categories.length} topics
        </p>
        <div className="flex gap-3">
          <button onClick={expandAll} className="text-xs font-semibold text-coral-ink hover:text-coral-ink transition-colors">
            Expand all
          </button>
          <span className="text-gray-200">·</span>
          <button onClick={collapseAll} className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">
            Collapse all
          </button>
        </div>
      </div>

      {/* FAQ sections */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {categories.map((cat, ci) => (
          <motion.section
            key={cat.title}
            id={cat.title.toLowerCase().replace(/\s+&?\s*/g, '-')}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cat.bg} ${cat.color}`}>
                {cat.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                <p className="text-xs text-gray-400">{cat.faqs.length} questions</p>
              </div>
            </div>

            {/* Accordion items */}
            <div className="space-y-3">
              {cat.faqs.map((faq, fi) => {
                const id = `${ci}-${fi}`
                return (
                  <AccordionItem
                    key={id}
                    faq={faq}
                    id={id}
                    open={openItems.has(id)}
                    onToggle={() => toggle(id)}
                  />
                )
              })}
            </div>
          </motion.section>
        ))}

        {/* Still have questions CTA */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-coral p-10 text-center text-white"
        >
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Globe className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Still have a question?</h2>
          <p className="text-white/80 text-base max-w-md mx-auto mb-8">
            We&apos;re real people in Albany, NY. Call, text, or email — we usually get back to you within a few hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-coral-ink font-semibold rounded-2xl hover:bg-coral/10 transition-colors"
            >
              Send us a message <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+15186776688"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold rounded-2xl transition-all"
            >
              <Phone className="w-4 h-4" /> Call us
            </a>
            <a
              href="mailto:info@mylobstr.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold rounded-2xl transition-all"
            >
              <Mail className="w-4 h-4" /> Email us
            </a>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
