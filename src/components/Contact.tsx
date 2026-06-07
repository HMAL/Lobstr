'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Clock, Send, CheckCircle2, MapPin, Tag } from 'lucide-react'

const contactCards = [
  {
    icon: Clock,
    emoji: '🕐',
    title: '24/7 Real Support',
    desc: 'We never close. Real humans answer every message, any time. No bots, ever.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Mail,
    emoji: '📧',
    title: 'Email Us',
    desc: 'info@mylobstr.com — for project inquiries and detailed questions.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    icon: MapPin,
    emoji: '📍',
    title: 'Albany Based',
    desc: "We're local. We can meet for coffee — seriously, we love that.",
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
]

const planData: Record<string, { price: number; phase2: number; monthly: number; tagline: string }> = {
  'Starter':          { price: 75,  phase2: 30, monthly: 10, tagline: 'New businesses' },
  'Growing Business': { price: 150, phase2: 40, monthly: 15, tagline: 'Growing businesses' },
  'Scale':            { price: 250, phase2: 50, monthly: 20, tagline: 'Multi-level businesses' },
}

function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 10)
  if (d.length === 0) return ''
  if (d.length <= 3) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 3)})${d.slice(3)}`
  return `(${d.slice(0, 3)})${d.slice(3, 6)}-${d.slice(6)}`
}

function ContactForm() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan') ?? ''
  const planInfo = planData[planParam] ?? null
  const yearTotal = planInfo ? planInfo.price + planInfo.phase2 * 2 + planInfo.monthly * 9 : null

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', business: '', address: '', type: '', message: '',
    plan: planParam,
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || data.error || 'Send failed')
      setSubmitted(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(`Something went wrong: ${msg} — or email us at info@mylobstr.com`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl overflow-hidden">
      {submitted ? (
        <div className="p-12 text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-black text-gray-900">You&apos;re all set! 🎉</h3>
          <p className="text-gray-500">
            We&apos;ll review your details and reach out within{' '}
            <strong className="text-gray-900">24 hours</strong> with a free custom proposal.
            Check your inbox — and maybe your spam just in case.
          </p>
          <p className="text-sm text-gray-400">
            Questions? Email us directly at{' '}
            <a href="mailto:info@mylobstr.com" className="text-blue-600 font-semibold">info@mylobstr.com</a>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 space-y-5">

          {/* Selected plan quote */}
          {planInfo && yearTotal !== null && (
            <div className="rounded-2xl bg-blue-50 border-2 border-blue-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-blue-600" />
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Your selected plan</p>
              </div>
              <p className="font-black text-gray-900 text-lg leading-none">{planParam}</p>
              <p className="text-xs text-gray-500 mb-3">{planInfo.tagline}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded-xl p-2.5 border border-blue-100">
                  <p className="text-base font-black text-gray-900">${planInfo.price}</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Build<br />(Month 1)</p>
                </div>
                <div className="bg-white rounded-xl p-2.5 border border-blue-100">
                  <p className="text-base font-black text-gray-900">
                    ${planInfo.phase2}<span className="text-xs font-semibold text-gray-400">/mo</span>
                  </p>
                  <p className="text-[10px] text-gray-400 leading-tight">Optimize<br />(Months 2–3)</p>
                </div>
                <div className="bg-white rounded-xl p-2.5 border border-blue-100">
                  <p className="text-base font-black text-gray-900">
                    ${planInfo.monthly}<span className="text-xs font-semibold text-gray-400">/mo</span>
                  </p>
                  <p className="text-[10px] text-gray-400 leading-tight">Hosting<br />(Month 4+)</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-700">Estimated Year 1 Total</span>
                <span className="text-xl font-black text-gray-900">${yearTotal}</span>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Maria Johnson"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors text-sm bg-gray-50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="(518) 555-0123"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors text-sm bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email Address *</label>
            <input
              type="email"
              required
              placeholder="you@yourbusiness.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors text-sm bg-gray-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Business Name *</label>
            <input
              type="text"
              required
              placeholder="Capital Cuts Barbershop"
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors text-sm bg-gray-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Business Address</label>
            <input
              type="text"
              placeholder="123 Main St, Albany, NY 12203"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors text-sm bg-gray-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Type of Business *</label>
            <input
              type="text"
              required
              placeholder="e.g. Restaurant, Barbershop, Plumber..."
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors text-sm bg-gray-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Tell Us About Your Business</label>
            <textarea
              rows={4}
              placeholder="What does your business do? Do you have an existing website? What's your biggest challenge getting clients online? No wrong answers — we love details."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors text-sm bg-gray-50 resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded-2xl py-4 text-sm shadow-lg hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending your request...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Get My Free Proposal — No Obligation
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            📍 Albany-based team · 🔒 We never spam · ⚡ Reply within 24 hours
          </p>
        </form>
      )}
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left */}
          <div className="lg:col-span-2 space-y-4">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-start gap-4 p-4 rounded-2xl bg-white border-2 ${card.border} shadow-sm`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${card.bg} border ${card.border}`}>
                  {card.emoji}
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${card.color} mb-0.5`}>{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white"
            >
              <p className="text-sm font-medium leading-relaxed">
                💙 <strong>No pressure, no sales pitch.</strong> If your project isn&apos;t a good fit,
                we&apos;ll tell you honestly and even point you in the right direction. Albany businesses
                deserve straight talk.
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
