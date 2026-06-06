'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Star } from 'lucide-react'

const projects = [
  {
    name: 'Happy Paws Veterinary',
    category: 'Vet Hospital',
    emoji: '🏥',
    description: 'Full-stack vet clinic website with online booking, staff profiles, and patient portal.',
    tags: ['Next.js', 'Booking', 'SEO'],
    rating: '4.9',
    color: 'from-rose-400 to-pink-500',
    accent: '#FF6B6B',
    mockScreen: (
      <div className="w-full h-full bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white text-sm">🐾</div>
          <div className="space-y-1">
            <div className="w-24 h-2 bg-rose-300 rounded-full" />
            <div className="w-16 h-1.5 bg-rose-200 rounded-full" />
          </div>
        </div>
        <div className="w-full h-24 bg-gradient-to-r from-rose-400 to-pink-400 rounded-xl flex items-center justify-center text-white text-4xl">🏥</div>
        <div className="grid grid-cols-3 gap-2">
          {['Book Now', 'Services', 'Team'].map(t => (
            <div key={t} className="bg-white rounded-lg p-2 text-center">
              <div className="text-xs font-bold text-rose-600">{t}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          <div className="w-full h-2 bg-rose-100 rounded-full" />
          <div className="w-4/5 h-2 bg-rose-100 rounded-full" />
          <div className="w-3/5 h-2 bg-rose-100 rounded-full" />
        </div>
      </div>
    ),
  },
  {
    name: 'Fluffy Cuts Grooming',
    category: 'Pet Groomer',
    emoji: '✂️',
    description: 'Colorful grooming salon site with gallery, pricing packages, and instant booking widget.',
    tags: ['Gallery', 'Stripe', 'Booking'],
    rating: '5.0',
    color: 'from-violet-400 to-purple-500',
    accent: '#A855F7',
    mockScreen: (
      <div className="w-full h-full bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center text-white text-sm">✂️</div>
          <div className="space-y-1">
            <div className="w-20 h-2 bg-violet-300 rounded-full" />
            <div className="w-14 h-1.5 bg-violet-200 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['🐶', '🐱', '🐰', '🦮'].map((e, i) => (
            <div key={i} className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl h-16 flex items-center justify-center text-2xl">
              {e}
            </div>
          ))}
        </div>
        <div className="bg-violet-500 rounded-xl p-2 text-center text-white text-xs font-bold">Book Appointment</div>
        <div className="space-y-1.5">
          <div className="w-full h-2 bg-violet-100 rounded-full" />
          <div className="w-3/4 h-2 bg-violet-100 rounded-full" />
        </div>
      </div>
    ),
  },
  {
    name: 'Coastal Animal Clinic',
    category: 'Vet Hospital',
    emoji: '🌊',
    description: '24/7 emergency vet site with live chat, emergency line button, and location finder.',
    tags: ['Emergency', 'Live Chat', 'Maps'],
    rating: '4.8',
    color: 'from-teal-400 to-cyan-500',
    accent: '#4ECDC4',
    mockScreen: (
      <div className="w-full h-full bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-white text-sm">🌊</div>
          <div className="space-y-1">
            <div className="w-28 h-2 bg-teal-300 rounded-full" />
            <div className="w-18 h-1.5 bg-teal-200 rounded-full" />
          </div>
        </div>
        <div className="bg-red-500 rounded-xl p-2 text-white text-xs font-bold text-center flex items-center justify-center gap-1">
          🚨 24/7 Emergency Line
        </div>
        <div className="w-full h-20 bg-teal-200 rounded-xl flex items-center justify-center text-teal-600 text-xs font-bold">📍 Interactive Map</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-lg p-2 border border-teal-100">
            <div className="text-xs font-bold text-teal-600">Book Visit</div>
          </div>
          <div className="bg-white rounded-lg p-2 border border-teal-100">
            <div className="text-xs font-bold text-teal-600">Live Chat</div>
          </div>
        </div>
      </div>
    ),
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/20 font-semibold px-4 py-1.5">
            ✨ Our Work
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Sites That Make Pet Owners
            <br />
            <span className="text-gradient-coral">Stop and Stare</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Every project is custom-crafted with love for the business and the pets they serve.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden border-2 border-border hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Mock browser */}
                <div className="relative">
                  {/* Browser chrome */}
                  <div className="bg-slate-100 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-muted-foreground font-mono">
                      {project.name.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                  </div>
                  {/* Screen */}
                  <div className="h-56 p-3">
                    {project.mockScreen}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{project.emoji}</span>
                        <Badge
                          className="text-xs"
                          style={{ background: `${project.accent}15`, color: project.accent, borderColor: `${project.accent}30` }}
                        >
                          {project.category}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg text-foreground">{project.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-yellow-700">{project.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-muted rounded-lg text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 group-hover:border-transparent transition-all"
                    style={{ borderColor: `${project.accent}40`, color: project.accent }}
                  >
                    View Case Study <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
