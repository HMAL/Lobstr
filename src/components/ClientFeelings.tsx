'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ShelfLabel from '@/components/ShelfLabel'

const feelings = [
  { text: 'Likki put us first the whole way through. She really knows her stuff.', name: 'Scott M.', role: 'Café owner, Albany', featured: true },
  { text: 'Our site loads in half the time it used to. People notice.', name: 'Robin P.', role: 'Salon owner, Troy' },
  { text: "I feel like I'm in good hands. That's worth a lot to me.", name: 'Josie M.', role: 'Bakery owner, Albany' },
  { text: 'Easy to work with and quick to reply every single time.', name: 'Amanda B.', role: 'Fitness coach, Schenectady' },
  { text: 'Trust matters with my website, and MyLobstr Designs has mine.', name: 'Rachel E.', role: 'Boutique owner, Saratoga', featured: true },
  { text: 'Courteous, knowledgeable, and dependable. No runaround.', name: 'Mel D.', role: 'Plumber, Albany' },
  { text: 'Professional, with a personal touch. Hard to find these days.', name: 'Kyle E.', role: 'Barbershop owner, Troy' },
  { text: 'They listen, they explain, and they were patient with me.', name: 'Necole S.', role: 'Tutor, Capital Region' },
  { text: 'It finally feels manageable. I stopped dreading my own site.', name: 'Mike D.', role: 'Restaurant owner, Albany', featured: true },
]

export default function ClientFeelings() {
  const reduce = useReducedMotion()
  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  }

  return (
    <section className="bg-paper-2 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ShelfLabel className="mb-8">What neighbors say</ShelfLabel>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
            <h2 className="max-w-xl font-display text-3xl leading-[1.1] font-semibold tracking-[-0.02em] text-ink lg:text-[2.75rem]">
              How it feels to work with us
            </h2>
            <p className="text-lg leading-relaxed text-steam">
              Most of our work comes from neighbors telling neighbors. Here&apos;s what some
              of them have said.
            </p>
          </div>
        </motion.div>

        {/* Pinned index cards — featured quotes run larger to break the uniform grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]"
        >
          {feelings.map((f) => (
            <motion.figure
              key={f.name}
              variants={item}
              className={`mb-6 break-inside-avoid rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-md ${
                f.featured
                  ? 'border-coral/25 bg-white shadow-sm'
                  : 'border-border bg-white/70'
              }`}
            >
              {f.featured && (
                <span
                  className="mb-1 block font-display text-4xl leading-none text-coral"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
              )}
              <blockquote
                className={`text-ink/85 ${f.featured ? 'font-display text-lg leading-snug' : 'text-base leading-relaxed'}`}
              >
                {f.featured ? f.text : `“${f.text}”`}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-marigold" aria-hidden="true" />
                <span className="text-sm font-semibold text-ink">{f.name}</span>
                <span className="text-xs text-steam">· {f.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
