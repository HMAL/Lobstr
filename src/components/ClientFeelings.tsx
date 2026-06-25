'use client'

import { motion } from 'framer-motion'

const feelings = [
  { text: 'Likki put us first the whole way through. She really knows her stuff.', name: 'Scott M.', role: 'Café owner, Albany' },
  { text: 'Our site loads in half the time it used to. People notice.', name: 'Robin P.', role: 'Salon owner, Troy' },
  { text: "I feel like I'm in good hands. That's worth a lot to me.", name: 'Josie M.', role: 'Bakery owner, Albany' },
  { text: 'Easy to work with and quick to reply every single time.', name: 'Amanda B.', role: 'Fitness coach, Schenectady' },
  { text: 'Trust matters with my website, and Mylobstr has mine.', name: 'Rachel E.', role: 'Boutique owner, Saratoga' },
  { text: 'Courteous, knowledgeable, and dependable. No runaround.', name: 'Mel D.', role: 'Plumber, Albany' },
  { text: 'Professional, with a personal touch. Hard to find these days.', name: 'Kyle E.', role: 'Barbershop owner, Troy' },
  { text: 'They listen, they explain, and they were patient with me.', name: 'Necole S.', role: 'Tutor, Capital Region' },
  { text: 'It finally feels manageable. I stopped dreading my own site.', name: 'Mike D.', role: 'Restaurant owner, Albany' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

export default function ClientFeelings() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            What clients say
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            How it feels to work with us
          </h2>
          <p className="text-lg text-gray-500">
            Most of our work comes from neighbors telling neighbors. Here&apos;s what some of
            them have said.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"
        >
          {feelings.map((f) => (
            <motion.figure
              key={f.name}
              variants={item}
              className="break-inside-avoid mb-6 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow duration-300"
            >
              <blockquote className="text-base text-gray-700 leading-relaxed">&ldquo;{f.text}&rdquo;</blockquote>
              <figcaption className="mt-4">
                <div className="font-bold text-gray-900 text-sm">{f.name}</div>
                <div className="text-xs text-gray-400">{f.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
