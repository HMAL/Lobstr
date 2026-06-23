'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Layout, Workflow, MapPin } from 'lucide-react'

const paths = [
  {
    icon: Layout,
    num: '01',
    title: 'My website needs a clearer first impression',
    desc: 'For homepage refreshes, cleaner layout, smoother mobile, and calls to action people actually understand.',
    cta: 'Start with a quick chat',
    href: '/contact',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Workflow,
    num: '02',
    title: 'I want the busy work handled for me',
    desc: 'For booking, contact forms, follow-up emails, and the quiet parts behind the page that should just work.',
    cta: 'Start with a quick chat',
    href: '/contact',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: MapPin,
    num: '03',
    title: 'I need a clean place to send people',
    desc: 'For a simple starter site with a clear message, basic SEO, and one obvious way to get in touch.',
    cta: 'See the starter plan',
    href: '/pricing',
    color: 'bg-emerald-100 text-emerald-600',
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function ChooseWhereToBegin() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            Where to start
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Choose the clearest place to begin
          </h2>
          <p className="text-lg text-gray-500">
            You don&apos;t have to read the whole page before you take a step. Pick the one that
            sounds closest to where you are, reach out, and we&apos;ll help you sort out the rest.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {paths.map((path) => {
            const Icon = path.icon
            return (
              <motion.div
                key={path.num}
                variants={item}
                className="flex flex-col bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <span className="inline-block text-4xl font-black text-gray-100 mb-4 leading-none">{path.num}</span>

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${path.color}`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-black text-gray-900 text-xl mb-3 leading-snug">{path.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-6">{path.desc}</p>

                <a
                  href={path.href}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {path.cta} <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
