'use client'

import { Suspense } from 'react'
import { Phone, Mail } from 'lucide-react'
import { track, AnalyticsEvent } from '@/lib/analytics'
import ShelfLabel from '@/components/ShelfLabel'
import { ContactForm } from '@/components/Contact'

export default function IndustryCTA({ singular }: { singular: string }) {
  return (
    <section className="bg-ink px-5 py-16 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-2 md:gap-14">
        <div className="md:pt-2">
          <ShelfLabel tone="ink" className="mb-8">Get started</ShelfLabel>
          <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em] lg:text-3xl">
            Ready for a website that works as hard as you do?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-paper/70">
            Tell us about your {singular} and we&apos;ll send a free custom proposal — no
            pressure, no jargon.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <a
              href="tel:+15186776688"
              onClick={() => track(AnalyticsEvent.ContactChannelClick, { channel: 'phone', location: 'industry_cta' })}
              className="inline-flex items-center gap-2 text-sm font-medium text-paper/80 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Phone className="h-4 w-4 text-[#ef7d5a]" /> (518) 677-6688
            </a>
            <a
              href="mailto:info@mylobstr.com"
              onClick={() => track(AnalyticsEvent.ContactChannelClick, { channel: 'email', location: 'industry_cta' })}
              className="inline-flex items-center gap-2 text-sm font-medium text-paper/80 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Mail className="h-4 w-4 text-[#ef7d5a]" /> info@mylobstr.com
            </a>
          </div>
          <p className="mt-6 text-xs text-paper/45">Albany-based · We reply within about a day</p>
        </div>

        {/* The form itself — right here, so a lead doesn't have to click through */}
        <div className="relative">
          <Suspense fallback={null}>
            <ContactForm compact />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
