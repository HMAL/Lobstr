'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, Wallet, MessageSquare, Heart } from 'lucide-react'

const values = [
  { icon: Users, title: 'We\'re your neighbors', desc: 'We shop at the same Albany spots and eat at the same restaurants. When local businesses do well, so does our town.' },
  { icon: Wallet, title: 'Fair pricing, always', desc: 'A good website shouldn\'t mean choosing between getting online and keeping the lights on. We priced it so it doesn\'t.' },
  { icon: MessageSquare, title: 'Real people answer', desc: 'No bots, no call centers. If you message us because something looks off, a real person reads it and gets back to you.' },
  { icon: Heart, title: 'We actually care how it goes', desc: 'We follow how your site does after launch and tune it. Your wins feel like our wins — that part is genuine.' },
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

            {/* Origin story — the most humanizing thing on the page */}
            <div className="p-5 bg-gray-950 rounded-2xl text-white">
              <p className="font-bold text-sm mb-1">How Mylobstr actually started</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                It began at 2am — newborn in one arm, laptop in the other, the dog asleep on
                Likki&apos;s feet. The Wi-Fi was slow; the idea wasn&apos;t. If you can build
                something good under those conditions, you can build it for anyone. That&apos;s
                still the bar we hold ourselves to.
              </p>
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
              <p className="text-2xl font-bold text-gray-900">Local</p>
              <p className="text-xs text-gray-500 font-medium">Albany born &amp;<br />Albany based</p>
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
            <h3 className="text-3xl font-bold mb-2">What we actually care about</h3>
            <p className="text-gray-400">
              The few things that guide how we work — besides good coffee and clean code.
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
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-300 flex items-center justify-center shrink-0">
                  <v.icon className="w-5 h-5" />
                </div>
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
