'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, Globe, MessageCircle, DollarSign, Clock, Palette,
  Settings, Server, Headphones, ArrowRight, Phone, Mail,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface FAQ { q: string; a: string }
interface Category { icon: React.ReactNode; color: string; bg: string; title: string; faqs: FAQ[] }

const categories: Category[] = [
  {
    icon: <DollarSign className="w-5 h-5" />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    title: 'Cost & Pricing',
    faqs: [
      {
        q: 'How much does a website cost?',
        a: 'Simple, transparent pricing: $100 for month 1 (we design and build everything), $40/mo for months 2–3 (monitoring and fine-tuning), then just $10/mo forever after. No surprise invoices, no hidden fees.',
      },
      {
        q: 'Are there any hidden fees I should know about?',
        a: 'None from us. The only outside cost is a domain name (~$12/year through Namecheap or Google Domains), paid directly to them. Hosting, SSL, updates, and support are all included in your monthly fee.',
      },
      {
        q: 'Is there a long-term contract?',
        a: 'No contracts, no lock-in. Cancel any time with 30 days notice. We believe in earning your business every month — not trapping you.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'All major credit and debit cards, ACH bank transfer, and PayPal. Billing is monthly and fully automatic — set it and forget it.',
      },
      {
        q: 'What happens to my site if I cancel?',
        a: 'You keep your domain name. We\'ll export all your content (text, images, pages) in a portable format so you\'re never stranded. We can also help you migrate to another provider if needed.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Yes — 14-day satisfaction guarantee. If you\'re not happy within the first 14 days, we refund your first payment in full, no questions asked.',
      },
    ],
  },
  {
    icon: <Clock className="w-5 h-5" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    title: 'Timeline & Process',
    faqs: [
      {
        q: 'How long does it take to build my website?',
        a: 'Most sites go live within 48–72 hours of receiving your content. Complex builds with custom features or ecommerce may take 5–7 business days. We\'ll give you a firm timeline before we start.',
      },
      {
        q: 'What\'s the process from start to launch?',
        a: 'Four steps: (1) Fill out our 10-minute brief online. (2) We design and build. (3) You review on a private preview link and give feedback. (4) We go live. Most clients are live before the weekend.',
      },
      {
        q: 'What do I need to provide to get started?',
        a: 'Just the basics: your business name, logo (or we\'ll create one), a few photos, your services or menu, hours, and contact info. If you have an existing site, share the link and we\'ll improve on it.',
      },
      {
        q: 'Can I see a preview before the site goes live?',
        a: 'Always. We share a private preview link before publishing anything. You get two rounds of revisions included, and we won\'t go live until you say the word.',
      },
      {
        q: 'What if I don\'t have photos or a logo?',
        a: 'Not a problem. We source professional stock photos that fit your business and can create a clean starter logo. Many clients launch with stock photos and swap in real ones after their first photoshoot.',
      },
      {
        q: 'Can I be involved in the design process?',
        a: 'As much or as little as you want. Some clients say "surprise me" and love what we build. Others want to approve every color and font. We work both ways — just tell us your preference upfront.',
      },
    ],
  },
  {
    icon: <Palette className="w-5 h-5" />,
    color: 'text-violet-600',
    bg: 'bg-violet-50 border-violet-200',
    title: 'Design & Branding',
    faqs: [
      {
        q: 'Can I choose my own colors and style?',
        a: 'Yes. We\'ll ask about your brand colors, preferred style (modern, warm, bold, minimal), and any websites you admire. If you have no preferences, we design something great and you approve or adjust.',
      },
      {
        q: 'How many pages will my website have?',
        a: 'A standard site includes Home, Services/Menu, About, and Contact — four pages that cover 95% of small businesses. Additional pages (Gallery, Blog, Team, Testimonials) are included at no extra charge.',
      },
      {
        q: 'Can you match my existing branding?',
        a: 'Absolutely. Send us your logo, brand colors (hex codes if you have them), and any print materials. We\'ll make the website feel like a seamless extension of what you\'ve already built.',
      },
      {
        q: 'What if I want to change the design later?',
        a: 'Design refreshes are included in your monthly subscription. Want a seasonal look for the holidays? New color scheme after a rebrand? Just ask — we\'ll handle it.',
      },
      {
        q: 'Will my website look unique or like a template?',
        a: 'Every site is custom-built for your business. We don\'t use page builders or WordPress themes. Your site is coded from scratch, so it looks and performs exactly how it should.',
      },
    ],
  },
  {
    icon: <Settings className="w-5 h-5" />,
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-200',
    title: 'Features & Functionality',
    faqs: [
      {
        q: 'Can customers book appointments through my website?',
        a: 'Yes — online booking is included by default. Customers book directly from your site, you receive email confirmations, and it syncs with Google Calendar so you\'re never double-booked.',
      },
      {
        q: 'Will my website work on phones and tablets?',
        a: '100%. Every site is mobile-first by design — built for phones before anything else. Over 70% of local business traffic comes from mobile, so this isn\'t optional for us.',
      },
      {
        q: 'Can I take payments on my website?',
        a: 'Yes. We integrate Stripe or Square for deposits, prepayments, or product sales. We don\'t add any markup — you pay only the standard processing fee (2.9% + 30¢ per transaction).',
      },
      {
        q: 'Will my website show up on Google?',
        a: 'We set up all SEO basics: page titles, meta descriptions, sitemap, and Google Search Console submission. Results typically appear within 2–8 weeks. We can\'t guarantee rankings, but we give Google everything it needs.',
      },
      {
        q: 'Can I have a contact form on my site?',
        a: 'Every site includes a contact form with direct email delivery. We also add click-to-call on mobile and your full address with a Google Maps embed so customers can find you instantly.',
      },
      {
        q: 'Can I sell products online?',
        a: 'Basic product pages with Stripe checkout are included. For full ecommerce (inventory, shipping labels, variants, product catalog), we build on Shopify — same pricing, more power.',
      },
      {
        q: 'Can you connect my social media to my website?',
        a: 'Yes. We add links to your Instagram, Facebook, Google Business Profile, and any other platforms you use. We can also embed your Instagram feed directly on the site if you want fresh content automatically.',
      },
    ],
  },
  {
    icon: <Server className="w-5 h-5" />,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 border-indigo-200',
    title: 'Hosting, Domains & Tech',
    faqs: [
      {
        q: 'Do I need to buy a domain name?',
        a: 'Yes — your domain (like yourshop.com) is yours to own. We walk you through buying it on Namecheap or Google Domains for ~$12/year, then connect it to your site. If you already have one, we\'ll link it for free.',
      },
      {
        q: 'Who hosts my website?',
        a: 'We host everything on Vercel — enterprise-grade infrastructure with 99.9% uptime and US-based servers. Hosting is fully included in your monthly fee. No separate hosting bills.',
      },
      {
        q: 'Do I own my website?',
        a: 'You own your domain name and all your content. The site is hosted and maintained under your subscription. If you ever leave, we hand over all content and code files so you\'re never held hostage.',
      },
      {
        q: 'Is my website secure?',
        a: 'Yes. Every site gets SSL (the padlock in the browser bar) automatically. Data is encrypted, Google sees it as secure, and we handle all security updates in the background.',
      },
      {
        q: 'Do I need any technical knowledge?',
        a: 'None. If you can send an email, you have all the technical skills needed to work with us. We handle everything — you focus on running your business.',
      },
      {
        q: 'What platform do you build on?',
        a: 'We build on Next.js — the same technology used by Airbnb, TikTok, and Nike. It\'s fast, secure, and scales without any extra cost. Your site won\'t slow down as it grows.',
      },
    ],
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-200',
    title: 'After Launch & Support',
    faqs: [
      {
        q: 'What happens after my site goes live?',
        a: 'We monitor 24/7, handle any technical issues, and stay available by phone, text, or email. During months 2–3, we also make small improvements based on real visitor behavior.',
      },
      {
        q: 'Can I update my own content?',
        a: 'Yes. We set up a simple content panel for updating hours, services, prices, and photos yourself. Or just text us the change and we\'ll handle it within 24 hours — whichever is easier for you.',
      },
      {
        q: 'What if my website goes down?',
        a: 'We get the alert before you do. Our uptime monitoring pings every 60 seconds. We have a 2-hour response SLA for any outage, and most issues are resolved in under 30 minutes.',
      },
      {
        q: 'Can I add new pages or features later?',
        a: 'Absolutely. Adding a gallery, blog, new service page, seasonal promotions — all included in your monthly fee. Your site grows with your business.',
      },
      {
        q: 'How do I get in touch with you when I need help?',
        a: 'Phone, text, email, or the contact form on this site. We\'re an Albany-based team — you\'re talking to a real neighbor, not a support ticket queue. We usually respond within a few hours.',
      },
      {
        q: 'Do you offer any kind of guarantee?',
        a: '14-day money-back guarantee, no questions asked. And ongoing, if your site ever has downtime that\'s our fault for more than 4 hours, we credit that month\'s fee automatically.',
      },
    ],
  },
]

function AccordionItem({ faq, id, open, onToggle }: { faq: FAQ; id: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? 'border-blue-200 shadow-sm shadow-blue-100' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 cursor-pointer"
      >
        <span className={`font-semibold text-base leading-snug transition-colors ${open ? 'text-blue-700' : 'text-gray-900'}`}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${open ? 'text-blue-500' : 'text-gray-400'}`} />
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
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-indigo-950 pt-32 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold mb-6"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl lg:text-6xl font-black text-white leading-tight mb-5"
          >
            Everything you want to know<br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              before you get a website.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-white/60 text-lg max-w-xl mx-auto mb-8"
          >
            {categories.reduce((acc, c) => acc + c.faqs.length, 0)} honest answers to the questions every small business owner asks before building their first website.
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
          <button onClick={expandAll} className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
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
                <h2 className="text-xl font-black text-gray-900">{cat.title}</h2>
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
          className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-center text-white"
        >
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Globe className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-3">Still have a question?</h2>
          <p className="text-white/70 text-base max-w-md mx-auto mb-8">
            We're real people in Albany, NY. Call, text, or email — we usually respond within a few hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 transition-all hover:scale-105"
            >
              Send us a message <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+(518) 677-6688"
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
