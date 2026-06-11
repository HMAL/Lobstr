'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const team = [
  {
    name: 'Likki.',
    role: 'Founder · Developer · Analyst · Sleep-Deprived Visionary',
    bio: "We built Mylobstr at 2am during a phase we call 'hyperfocus season.' we talks to the code. The code talks back. we analyzes everything — your website traffic, your bounce rate, why the checkout button is the wrong shade of blue, and whether our son's nap schedule can fit around a client call. Spoiler: it cannot. But the website always ships.",
    avatar: '/globe.svg',
    emoji: '💻',
    quirk: 'Audits competitor websites for fun at midnight.',
  },
  {
    name: "Son.",
    role: 'Chief Motivation Officer · Diaper Department Head',
    bio: "He doesn't know what a website is. He doesn't know what SEO means. He doesn't care. But every time Likki thinks about quitting, he looks up and grins — and somehow that's the most compelling business case she's ever seen. He is the reason every small business deserves a fighting chance online. He is also the reason she bought stock in wet wipes.",
    avatar: '/team/son.svg',
    emoji: '🍼',
    quirk: 'Closed two client deals just by being adorable on a video call.',
  },
  {
    name: 'Luna.',
    role: "Likki's Dog · Head of Moral Support · Vibes Manager",
    bio: "Luna has never once cared about load times, responsive design, or conversion rates. And honestly? That's her power. She parks herself under Likki's desk, snores through strategy calls, and reminds everyone in the room that sometimes the best thing you can do for your business is take a walk. She is also personally responsible for at least three 'sorry, give me a second' moments on client calls.",
    avatar: '/team/luna.svg',
    emoji: '🐾',
    quirk: 'Has never missed a deadline. Mostly because she sets none.',
  },
]

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

        {/* Team */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-black text-gray-900 mb-2">The People Behind the Pixels</h3>
            <p className="text-gray-500">We're real humans. Possibly too passionate about small business websites.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden ring-4 ring-white shadow-xl mx-auto group-hover:ring-blue-100 transition-all">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 text-xl">{member.emoji}</span>
                </div>
                <h4 className="font-black text-gray-900 text-base">{member.name}</h4>
                <p className="text-blue-600 text-xs font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{member.bio}</p>
                <div className="inline-block text-xs font-bold px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                  Secret talent: {member.quirk}
                </div>
              </motion.div>
            ))}
          </div>
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
