'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { track, AnalyticsEvent } from '@/lib/analytics'

const links: Record<string, { label: string; href: string; newTab?: boolean }[]> = {
  'Demo Sites': [
    { label: 'Pet Clinic — Happy Paws', href: '/projects/pet', newTab: true },
    { label: 'Restaurant — Trattoria Albany', href: '/projects/restaurant', newTab: true },
    { label: 'Salon — The Cut Collective', href: '/projects/salon', newTab: true },
    { label: 'Barbershop — Capital Cuts', href: '/projects/barbershop', newTab: true },
    { label: 'Plumbing — Albany Pro', href: '/projects/plumbing', newTab: true },
    { label: 'Gym — Albany Iron Fitness', href: '/projects/fitness', newTab: true },
    { label: 'Tutoring — Bright Minds', href: '/projects/tutoring', newTab: true },
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
  'Service Areas': [
    { label: 'Web Design Albany NY', href: '/' },
    { label: 'Web Design Troy NY', href: '/web-design/troy-ny' },
    { label: 'Web Design Schenectady NY', href: '/web-design/schenectady-ny' },
    { label: 'Web Design Saratoga Springs NY', href: '/web-design/saratoga-springs-ny' },
  ],
  'From the Blog': [
    { label: 'Learn from Big-Brand Websites', href: '/blog/what-small-businesses-learn-from-big-corporation-websites' },
    { label: 'Website Cost vs. Features', href: '/blog/website-cost-vs-features-small-business' },
    { label: 'What a Website Costs in Albany', href: '/blog/website-cost-small-business-albany-ny' },
    { label: 'Website Features Explained', href: '/blog/small-business-website-features-explained' },
    { label: 'Local SEO for Albany Businesses', href: '/blog/local-seo-albany-small-business' },
    { label: 'Real 24/7 Support vs. Ticket Queues', href: '/blog/real-support-vs-ticket-queue-website' },
    { label: 'Restaurant Websites vs. DoorDash', href: '/blog/restaurant-website-design-albany' },
    { label: 'Website vs. Facebook Page', href: '/blog/website-vs-facebook-page-albany' },
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
      {/* Top CTA strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-1">
                Let&apos;s build something good together — right here in Albany.
              </h3>
              <p className="text-white/50 text-sm">
                No big-agency runaround. Just neighbors who know how to build a solid website.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center shrink-0">
              <a
                href="/contact"
                onClick={() => track(AnalyticsEvent.CtaClick, { location: 'footer', label: 'Get a free quote', destination: '/contact' })}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-colors"
              >
                Get a free quote →
              </a>
              <a
                href="mailto:info@mylobstr.com"
                onClick={() => track(AnalyticsEvent.ContactChannelClick, { channel: 'email', location: 'footer' })}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                info@mylobstr.com
              </a>
              <a
                href="tel:+15186776688"
                onClick={() => track(AnalyticsEvent.ContactChannelClick, { channel: 'phone', location: 'footer' })}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                (518) 677-6688
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/logo-icon.png"
                  alt="MyLobstr Designs"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-base text-white">
                MyLobstr<span className="text-blue-400"> Designs</span>
              </span>
            </a>
            <p className="text-sm text-white/50 leading-relaxed">
              A small web studio for Albany small businesses. Local, hands-on, and easy to reach.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-white/40">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Albany, NY Metro Area
            </div>
            <a
              href="tel:+15186776688"
              onClick={() => track(AnalyticsEvent.ContactChannelClick, { channel: 'phone', location: 'footer_brand' })}
              className="flex items-center gap-2 text-xs font-medium text-white/40 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              (518) 677-6688
            </a>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
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
            © {new Date().getFullYear()} MyLobstr Designs · Built in Albany, NY
          </p>
          <div className="flex items-center gap-3 text-xs text-white/30">
            <span>Albany, NY</span>
            <span>·</span>
            <span>SSL secured</span>
            <span>·</span>
            <span>Live in about a week</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
