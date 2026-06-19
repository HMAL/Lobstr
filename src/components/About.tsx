'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const values = [
  { emoji: '🤝', title: 'We\'re your neighbors', desc: 'We shop at the same Albany spots, eat at the same restaurants, and genuinely want them to thrive.' },
  { emoji: '💸', title: 'Fair pricing always', desc: 'Small business owners shouldn\'t have to choose between a website and keeping the lights on. We priced it that way.' },
  { emoji: '📞', title: '24/7 real humans', desc: 'No bots, no call centers. If you text us at midnight because the site looks weird — yes, someone actually reads that.' },
  { emoji: '❤️', title: 'Emotionally invested', desc: 'When your bookings drop, we lose sleep. When you land your biggest client yet, we celebrate. It\'s personal.' },
]

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* Mission block */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-500 leading-relaxed">
              Mylobstr is family — a developer, a mom, and a small business believer — who got tired
              of watching great Albany businesses lose customers to competitors with better-looking
              websites. A brilliant local restaurant shouldn't lose a booking because their site
              looks like 2008.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              So she built a no-fluff, affordable web studio specifically for the Albany metro.
              <strong className="text-gray-800"> For the community, by the community.</strong>
            </p>

            {/* Origin story — most humanizing thing on the page */}
            <div className="flex items-start gap-4 p-5 bg-gray-950 rounded-2xl text-white">
              <span className="text-3xl shrink-0">🐾</span>
              <div>
                <p className="font-bold text-sm mb-1">How Mylobstr actually started:</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  2am. Newborn in one arm. Laptop in the other. Luna asleep on Likki's feet.
                  The Wi-Fi was slow. The idea was fast. She thought — <em>"if I can build something
                  beautiful under these conditions, I can build it for anyone."</em>
                  That's still the standard.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 lg:h-96">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85"
                alt="Team working together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-bold text-lg">Albany, NY</p>
                <p className="text-white/70 text-sm">Building for our community since 2023</p>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <p className="text-2xl font-black text-gray-900">Making</p>
              <p className="text-xs text-gray-500 font-medium">Albany businesses<br />with a web presence</p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="rounded-3xl bg-gray-950 text-white p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-3xl font-black mb-2">What We Actually Care About</h3>
            <p className="text-gray-400">
              (Besides really good coffee and not terrible code reviews)
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl shrink-0">{v.emoji}</span>
                <div>
                  <h4 className="font-bold text-white mb-1">{v.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
