'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Clock, MessageCircle, Send, CheckCircle2, MapPin } from 'lucide-react'

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
    desc: 'We\'re local. We can meet for coffee — seriously, we love that.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', business: '', type: '', message: '' })

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
      if (!res.ok) throw new Error(data.debug || data.detail || data.error || 'Send failed')
      setSubmitted(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(`Something went wrong: ${msg} — or email us at info@mylobstr.com`)
    } finally {
      setLoading(false)
    }
  }

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

            {/* Emotional note */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white"
            >
              <p className="text-sm font-medium leading-relaxed">
                💙 <strong>No pressure, no sales pitch.</strong> If your project isn't a good fit,
                we'll tell you honestly and even point you in the right direction. Albany businesses
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
                  <h3 className="text-2xl font-black text-gray-900">You're all set! 🎉</h3>
                  <p className="text-gray-500">
                    We'll review your details and reach out within{' '}
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
                    <label className="text-sm font-semibold text-gray-700">Type of Business *</label>
                    <select
                      required
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none transition-colors text-sm bg-gray-50"
                    >
                      <option value="">Select your business type...</option>
                      <option value="restaurant">🍽️ Restaurant / Café / Food</option>
                      <option value="salon">✂️ Salon / Barbershop / Spa</option>
                      <option value="contractor">🔧 Contractor / Home Services</option>
                      <option value="pet">🐾 Pet Care / Vet</option>
                      <option value="fitness">💪 Gym / Fitness / Wellness</option>
                      <option value="education">🎓 Tutor / School / Education</option>
                      <option value="retail">🛍️ Retail / Shop</option>
                      <option value="other">🏪 Other Local Business</option>
                    </select>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
