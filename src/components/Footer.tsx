'use client'

import { motion } from 'framer-motion'
import { Globe, Heart, Mail, MapPin } from 'lucide-react'

const links: Record<string, { label: string; href: string }[]> = {
  'Our Work': [
    { label: 'Happy Paws Vet', href: '/projects/pet' },
    { label: 'Trattoria Albany', href: '/projects/restaurant' },
    { label: 'The Cut Collective', href: '/projects/salon' },
    { label: 'Capital Cuts', href: '/projects/barbershop' },
    { label: 'Albany Pro Plumbing', href: '/projects/plumbing' },
    { label: 'Albany Iron Fitness', href: '/projects/fitness' },
  ],
  'Company': [
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/our-work' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top CTA strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-black mb-1">
                Let's build something great together.{' '}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Right here in Albany.</span>
              </h3>
              <p className="text-white/50 text-sm">
                No fancy agency. Just neighbors who know how to build a great website.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center shrink-0">
              <a
                href="/contact"
                className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors hover:scale-105 transform"
              >
                Get a Free Quote →
              </a>
              <a
                href="mailto:info@mylobstr.com"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                info@mylobstr.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <a href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                <Globe className="w-[18px] h-[18px] text-white" />
              </div>
              <span className="font-black text-base text-white">
                mylobstr<span className="text-blue-400">.</span>com
              </span>
            </a>
            <p className="text-sm text-white/50 leading-relaxed">
              Albany Metro's neighborhood web studio. For the community, by the community.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-white/40">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Albany, NY Metro Area
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Always here — 24/7
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-xs font-black text-white/70 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-white/40 hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2025 Mylobstr.com · Made with{' '}
            <Heart className="w-3 h-3 inline fill-blue-400 text-blue-400" /> in Albany, NY
          </p>
          <div className="flex items-center gap-3 text-xs text-white/30">
            <span>🏙️ Albany, NY</span>
            <span>·</span>
            <span>🔒 SSL Secured</span>
            <span>·</span>
            <span>⚡ Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
