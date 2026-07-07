import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Awning from '@/components/Awning'
import ShelfLabel from '@/components/ShelfLabel'
import JsonLd from '@/components/seo/JsonLd'
import { industries } from '@/lib/industries'
import { industryIcons, defaultIndustryIcon } from '@/lib/industryIcons'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: { absolute: 'Website Design by Industry | Albany NY Small Business Websites | MyLobstr Designs' },
  description:
    'Custom website design for dentists, contractors, restaurants, HVAC companies, and more across Albany, NY and the Capital Region — flat pricing starting at $300, live in about a week.',
  keywords: ['website design by industry Albany NY', 'small business website industries', 'industry-specific web design Capital Region'],
  alternates: { canonical: 'https://mylobstr.com/industries' },
  openGraph: {
    title: 'Website Design by Industry | Albany NY Small Business Websites | MyLobstr Designs',
    description:
      'Custom website design for dentists, contractors, restaurants, HVAC companies, and more across Albany, NY and the Capital Region — flat pricing starting at $300, live in about a week.',
    url: 'https://mylobstr.com/industries',
    siteName: 'MyLobstr Designs',
    images: [
      {
        url: 'https://mylobstr.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'MyLobstr Designs — Website Design for Albany NY Small Businesses',
      },
    ],
  },
}

export default function IndustriesHubPage() {
  return (
    <div className="min-h-screen bg-paper">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
        ])}
      />

      <Navbar />

      {/* Hero — same left-aligned storefront grammar as Pricing, closed by the awning */}
      <section className="bg-ink px-5 pt-32 pb-16 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-paper/65">
            Industries · pick your shop
          </p>
          <h1 className="max-w-2xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
            Every trade searches, books,{' '}
            <span className="italic font-medium text-[#ef7d5a]">and sells differently.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            A dentist and a barbershop don&apos;t lose customers the same way. Pick your industry
            below to see exactly what your site needs to do — and what it costs to build.
          </p>
        </div>
      </section>
      <Awning />

      {/* Industry directory */}
      <section className="bg-paper px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <ShelfLabel className="mb-8">13 industries, one honest price list</ShelfLabel>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
            <h2 className="max-w-xl font-display text-3xl leading-[1.1] font-semibold tracking-[-0.02em] text-ink lg:text-[2.75rem]">
              Find your business below
            </h2>
            <p className="text-lg leading-relaxed text-steam">
              Each page covers the real pain points, the checklist your site needs, and which of
              our three plans actually fits.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industryIcons[industry.slug] ?? defaultIndustryIcon
              return (
                <a
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  <Icon className="h-6 w-6 text-coral-ink" strokeWidth={1.75} />
                  <span className="mt-3 h-0.5 w-8 rounded-full bg-marigold/70" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{industry.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steam">{industry.painPoint.slice(0, 110)}…</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-ink">
                    See {industry.name.toLowerCase()} sites
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink px-5 py-16 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] lg:text-3xl">
            Don&apos;t see your industry?
          </h2>
          <p className="mt-3 text-paper/70">
            We build for small businesses of every kind across Albany, NY and the Capital Region —
            tell us about yours and we&apos;ll send a free custom proposal.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Get a free quote <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
