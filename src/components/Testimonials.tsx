'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Megaphone } from 'lucide-react'

const perks = [
  {
    emoji: '💰',
    title: 'Real results, not promises.',
    desc: "We show you a free mockup of your actual site before you pay a cent. You see exactly what you're getting — no guesswork, no surprises.",
  },
  {
    emoji: '🎨',
    title: "More attention than you'll ever get again.",
    desc: "Right now you get Likki — the founder — personally working on your site. Not a junior, not a template. Her full focus.",
  },
  {
    emoji: '🔧',
    title: 'You shape the product.',
    desc: "Early clients get to tell us what's missing, what's confusing, and what they wish existed. We actually build it.",
  },
  {
    emoji: '📣',
    title: "You become our story.",
    desc: "We'll feature your business prominently. Your real results become the proof that helps the next Albany business say yes.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 mesh-dark bg-dot-grid-dark overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            Work With Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            We're just getting started.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Be one of our first.
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We won't pretend we have 50 happy clients yet. We don't.
            What we have is sharp skills, a genuine love for Albany businesses,
            and a real deal for the people who want to get in early — and get a lot more for it.
          </p>
        </motion.div>

        {/* Honest callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 mb-12 max-w-2xl mx-auto"
        >
          <Megaphone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">Straight talk:</strong> We're a startup. We built 6 demo sites to prove what we can do.
            Now we want real Albany businesses to work with — and we're willing to earn your trust
            by overdelivering on the first few. That's the deal.
          </p>
        </motion.div>

        {/* Perks grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
            >
              <span className="text-2xl shrink-0">{perk.emoji}</span>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">{perk.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{perk.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl text-sm hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
          >
            Get a Free Mockup <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-gray-500 mt-3">
            Free mockup first. No credit card. No obligation. Just an honest conversation.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
