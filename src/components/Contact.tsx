'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { motion } from 'framer-motion'
import { Mail, Clock, Send, CheckCircle2, MapPin, Tag } from 'lucide-react'

// Turnstile site keys are public (rendered in the browser). Hardcoded fallback so
// the widget works even when NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't set in the build
// env (mirrors the GA_ID pattern). An env var still overrides it (e.g. a test key
// locally: 1x00000000000000000000AA).
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '0x4AAAAAADla0GvFMaRGvmE3'

interface TurnstileApi {
  render: (el: HTMLElement, opts: {
    sitekey: string
    callback: (token: string) => void
    'expired-callback'?: () => void
    'error-callback'?: () => void
    appearance?: 'always' | 'execute' | 'interaction-only'
  }) => string
  reset: (id?: string) => void
  remove: (id?: string) => void
}
declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const contactCards = [
  {
    icon: Clock,
    title: 'Real support, any time',
    desc: 'A real person answers every message — not a bot or a ticket queue. We aim to reply within a day.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Mail,
    title: 'Email us',
    desc: 'info@mylobstr.com — good for detailed questions or sending over what you already have.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: MapPin,
    title: 'Albany-based',
    desc: "We're local, so if it's easier to talk it through over coffee, we're glad to.",
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
]

const planData: Record<string, { price: number; phase2: number; monthly: number; oneTime?: boolean; tagline: string }> = {
  'Starter':          { price: 300, phase2: 0,  monthly: 0,  oneTime: true, tagline: 'New businesses' },
  'Growing Business': { price: 150, phase2: 30, monthly: 30, tagline: 'Growing businesses' },
  'Scale':            { price: 250, phase2: 50, monthly: 50, tagline: 'Multi-level businesses' },
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
  const yearTotal = planInfo
    ? planInfo.oneTime
      ? planInfo.price
      : planInfo.price + planInfo.phase2 * 2 + planInfo.monthly * 9
    : null

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', business: '', address: '', type: '', message: '',
    plan: planParam,
    company_website: '', // honeypot — must stay empty
  })
  const [error, setError] = useState('')
  const [token, setToken] = useState('')
  const widgetRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>('')

  // Render the Turnstile widget once its script has loaded (only if configured).
  const renderTurnstile = () => {
    if (!TURNSTILE_SITE_KEY || !widgetRef.current || !window.turnstile) return
    if (widgetIdRef.current) return
    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (t) => setToken(t),
      'expired-callback': () => setToken(''),
      'error-callback': () => setToken(''),
      // Stay invisible for real users; only show a challenge if Cloudflare needs one.
      appearance: 'interaction-only',
    })
  }
  useEffect(() => {
    renderTurnstile()
    // Clean up the widget on unmount so React remounts (e.g. Strict Mode) don't orphan it.
    return () => {
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current)
        widgetIdRef.current = ''
      }
    }
  }, [])

  const turnstileRequired = Boolean(TURNSTILE_SITE_KEY)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Send failed')
      setSubmitted(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(`${msg} — or email us at info@mylobstr.com`)
      // Tokens are single-use; reset so the user can retry.
      setToken('')
      window.turnstile?.reset(widgetIdRef.current)
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
            className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900">Thanks — we&apos;ve got it.</h3>
          <p className="text-gray-500">
            We&apos;ll look over your details and get back to you within about{' '}
            <strong className="text-gray-900">a day</strong> with a free quote and a quick
            plan. It&apos;s worth checking your spam folder just in case.
          </p>
          <p className="text-sm text-gray-400">
            Questions? Email us directly at{' '}
            <a href="mailto:info@mylobstr.com" className="text-blue-600 font-semibold">info@mylobstr.com</a>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 space-y-5">

          {/* Honeypot — hidden from real users, bots fill it. Not type="hidden" so
              browser autofill leaves it alone. */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
            <label>
              Company Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company_website}
                onChange={(e) => setForm({ ...form, company_website: e.target.value })}
              />
            </label>
          </div>

          {/* Selected plan quote */}
          {planInfo && yearTotal !== null && (
            <div className="rounded-2xl bg-blue-50 border-2 border-blue-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-blue-600" />
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Your selected plan</p>
              </div>
              <p className="font-bold text-gray-900 text-lg leading-none">{planParam}</p>
              <p className="text-xs text-gray-500 mb-3">{planInfo.tagline}</p>
              {planInfo.oneTime ? (
                <div className="bg-white rounded-xl p-4 border border-blue-100 text-center">
                  <p className="text-2xl font-bold text-gray-900">${planInfo.price}</p>
                  <p className="text-xs text-gray-500 mt-1">One-time price · no monthly fee</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-white rounded-xl p-2.5 border border-blue-100">
                      <p className="text-base font-bold text-gray-900">${planInfo.price}</p>
                      <p className="text-[10px] text-gray-400 leading-tight">Build<br />(Month 1)</p>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 border border-blue-100">
                      <p className="text-base font-bold text-gray-900">
                        ${planInfo.monthly}<span className="text-xs font-semibold text-gray-400">/mo</span>
                      </p>
                      <p className="text-[10px] text-gray-400 leading-tight">Hosting &amp; support<br />(Month 2+)</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-700">Estimated Year 1 Total</span>
                    <span className="text-xl font-bold text-gray-900">${yearTotal}</span>
                  </div>
                </>
              )}
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

          {/* Cloudflare Turnstile — bot verification */}
          {turnstileRequired && (
            <>
              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="afterInteractive"
                onLoad={renderTurnstile}
              />
              <div ref={widgetRef} className="flex justify-center" />
            </>
          )}

          <button
            type="submit"
            disabled={loading || (turnstileRequired && !token)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl py-4 text-sm shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending your request...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send my details — it&apos;s free
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Albany-based · We never share your details · We reply within about a day
          </p>

          {turnstileRequired && (
            <p className="text-center text-[10px] text-gray-300 leading-relaxed">
              Protected by Cloudflare Turnstile · its{' '}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-400"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href="https://www.cloudflare.com/website-terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-400"
              >
                Terms
              </a>{' '}
              apply.
            </p>
          )}
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
                className={`flex items-start gap-4 p-4 rounded-2xl bg-white border ${card.border} shadow-sm`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.bg} border ${card.border}`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-0.5">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl bg-blue-600 p-5 text-white"
            >
              <p className="text-sm font-medium leading-relaxed">
                <strong>No pressure, no sales pitch.</strong> If your project isn&apos;t the right fit
                for us, we&apos;ll say so honestly and point you somewhere that is. You&apos;ll always
                get a straight answer.
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
