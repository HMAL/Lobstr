'use client'

import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { track, AnalyticsEvent } from '@/lib/analytics'

const legal = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refund', href: '/refund' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
              <Image src="/logo-icon.png" alt="MyLobstr Designs" width={40} height={40} className="h-full w-full object-contain" />
            </span>
            <span className="font-display text-base font-semibold text-paper">
              MyLobstr<span className="text-[#ef7d5a]"> Designs</span>
            </span>
          </a>

          {/* Contact */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="tel:+15186776688"
              onClick={() => track(AnalyticsEvent.ContactChannelClick, { channel: 'phone', location: 'footer' })}
              className="inline-flex items-center gap-2 text-sm font-medium text-paper/80 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Phone className="h-4 w-4 text-[#ef7d5a]" /> (518) 677-6688
            </a>
            <a
              href="mailto:info@mylobstr.com"
              onClick={() => track(AnalyticsEvent.ContactChannelClick, { channel: 'email', location: 'footer' })}
              className="inline-flex items-center gap-2 text-sm font-medium text-paper/80 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Mail className="h-4 w-4 text-[#ef7d5a]" /> info@mylobstr.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-wash pt-6 sm:flex-row">
          <p className="text-xs text-paper/50">
            © {new Date().getFullYear()} MyLobstr Designs · Built in Albany, NY
          </p>
          <nav aria-label="Legal" className="flex items-center gap-5">
            {legal.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs text-paper/60 transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
