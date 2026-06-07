'use client'

import { motion } from 'framer-motion'
import { ClipboardList, Hammer, Eye, Rocket } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    num: '01',
    title: 'Tell us about your business',
    desc: "Fill out our 10-minute brief — your services, style, and what you want customers to do when they land on your site.",
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Hammer,
    num: '02',
    title: 'We design & build',
    desc: 'Your custom site is built from scratch — no templates. You get a private preview link within 48 hours of us starting.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Eye,
    num: '03',
    title: 'You review & approve',
    desc: "Click through your site on the preview link. Two full rounds of revisions included. We don't go live until you say the word.",
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Rocket,
    num: '04',
    title: 'You go live',
    desc: "We point your domain, flip the switch, your site is live. 24/7 monitoring starts immediately. You're on the map.",
    color: 'bg-emerald-100 text-emerald-600',
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-white bg-dot-grid relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            The Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
            From idea to live site
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              in 4 simple steps.
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Most clients are live before the weekend. Here's exactly what happens after you reach out.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                variants={item}
                className="relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Step number badge */}
                <span className="inline-block text-4xl font-black text-gray-100 mb-4 leading-none">{step.num}</span>

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${step.color}`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="font-black text-gray-900 text-2xl mb-3 leading-snug">{step.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/pricing"
            className="shimmer inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full text-base hover:bg-gray-700 transition-all hover:scale-105"
          >
            See plans &amp; get a quote
          </a>
        </motion.div>
      </div>
    </section>
  )
}
