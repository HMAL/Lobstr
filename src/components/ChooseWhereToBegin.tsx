'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Layout, Workflow, MapPin } from 'lucide-react'
import { track, AnalyticsEvent } from '@/lib/analytics'

const paths = [
  {
    icon: Layout,
    num: '01',
    title: 'My website needs a better first impression',
    desc: 'A cleaner layout, a homepage that reads well on a phone, and buttons people actually understand.',
    cta: 'Start with a quick chat',
    href: '/contact',
  },
  {
    icon: Workflow,
    num: '02',
    title: 'I want the busy work handled for me',
    desc: 'Booking, contact forms, follow-up emails — the quiet parts behind the page that should just work.',
    cta: 'Start with a quick chat',
    href: '/contact',
  },
  {
    icon: MapPin,
    num: '03',
    title: 'I just need a simple place to send people',
    desc: 'A clear starter site: who you are, what you do, and one easy way to get in touch.',
    cta: 'See the Starter plan',
    href: '/pricing',
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function ChooseWhereToBegin() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Where to start
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Pick the spot that sounds most like you
          </h2>
          <p className="text-lg text-gray-500">
            No need to read the whole page first. Choose whichever one fits where you are right
            now, get in touch, and we&apos;ll help you figure out the rest.
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
                className="flex flex-col bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <span className="inline-block text-4xl font-bold text-gray-200 mb-4 leading-none">{path.num}</span>

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-blue-50 text-blue-600">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-3 leading-snug">{path.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-6">{path.desc}</p>

                <a
                  href={path.href}
                  onClick={() => track(AnalyticsEvent.CtaClick, { location: 'choose_where_to_begin', label: path.cta, destination: path.href })}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
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
