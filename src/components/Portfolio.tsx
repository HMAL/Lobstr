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
    href: '/projects/pet',
    isLive: false,
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
    name: 'Coupon Companions',
    category: 'E-Commerce',
    emoji: '🏷️',
    description: 'Live e-commerce platform connecting shoppers with deals and coupons — real users, real transactions, built to scale.',
    tags: ['E-Commerce', 'Deals', 'SEO'],
    rating: '5.0',
    color: 'from-amber-400 to-orange-500',
    accent: '#F59E0B',
    href: 'https://couponcompanions.com',
    isLive: true,
    mockScreen: (
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white text-sm">🏷️</div>
          <div className="space-y-1">
            <div className="w-28 h-2 bg-amber-300 rounded-full" />
            <div className="w-16 h-1.5 bg-amber-200 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['20% OFF', 'BOGO', '$5 OFF', 'FREE SHIP'].map((t) => (
            <div key={t} className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl h-14 flex items-center justify-center text-white text-xs font-black">
              {t}
            </div>
          ))}
        </div>
        <div className="bg-amber-500 rounded-xl p-2 text-center text-white text-xs font-bold">Browse All Deals</div>
        <div className="space-y-1.5">
          <div className="w-full h-2 bg-amber-100 rounded-full" />
          <div className="w-3/4 h-2 bg-amber-100 rounded-full" />
        </div>
      </div>
    ),
  },
  {
    name: 'Happy Homes Hub',
    category: 'Web Application',
    emoji: '🏠',
    description: 'Multi-role web platform connecting homeowners, inhabitants, and handymen — all three sides under one roof.',
    tags: ['Marketplace', 'Multi-role', 'Web App'],
    rating: '4.9',
    color: 'from-sky-400 to-blue-500',
    accent: '#0EA5E9',
    href: 'https://happyhomeshub.com',
    isLive: true,
    mockScreen: (
      <div className="w-full h-full bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white text-sm">🏠</div>
          <div className="space-y-1">
            <div className="w-24 h-2 bg-sky-300 rounded-full" />
            <div className="w-16 h-1.5 bg-sky-200 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['🏠 Owner', '🏘️ Renter', '🔧 Pro'].map(t => (
            <div key={t} className="bg-white rounded-lg p-2 text-center border border-sky-100">
              <div className="text-xs font-bold text-sky-600">{t}</div>
            </div>
          ))}
        </div>
        <div className="w-full h-16 bg-gradient-to-r from-sky-400 to-blue-400 rounded-xl flex items-center justify-center text-white text-xs font-bold">Find a Handyman Near You</div>
        <div className="space-y-1.5">
          <div className="w-full h-2 bg-sky-100 rounded-full" />
          <div className="w-4/5 h-2 bg-sky-100 rounded-full" />
          <div className="w-3/5 h-2 bg-sky-100 rounded-full" />
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
            Work That Gets
            <br />
            <span className="text-gradient-coral">Real Results</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From live e-commerce platforms to multi-role web apps — built to perform, not just to look good.
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
                        {project.isLive && (
                          <span className="text-[10px] font-bold text-white bg-green-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
                          </span>
                        )}
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

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 group-hover:border-transparent transition-all"
                    style={{ borderColor: `${project.accent}40`, color: project.accent }}
                  >
                    {project.isLive ? 'Visit Live Site' : 'View Case Study'} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
