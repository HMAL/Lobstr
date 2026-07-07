import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check, MapPin, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { cities, getCity } from '@/lib/locations'
import { breadcrumbSchema, cityServiceSchema, faqPageSchema } from '@/lib/schema'

// Only the known Capital Region cities are valid; anything else 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const c = getCity(city)
  if (!c) return {}
  return {
    title: { absolute: c.title },
    description: c.description,
    keywords: c.keywords,
    alternates: { canonical: `https://mylobstr.com/web-design/${c.slug}` },
    openGraph: {
      title: c.title,
      description: c.description,
      url: `https://mylobstr.com/web-design/${c.slug}`,
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
}

const PLANS = [
  { name: 'Starter', price: '$300', sub: 'one-time, no monthly', desc: '5-page custom website for new businesses.' },
  { name: 'Growing', price: '$150 + $30/mo', sub: 'build + hosting & support', desc: '10 pages with logo design, full SEO, and online booking.' },
  { name: 'Scale', price: '$250 + $50/mo', sub: 'build + hosting & support', desc: '20 pages with an admin panel and multi-location support.' },
]

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const c = getCity(city)
  if (!c) notFound()

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={cityServiceSchema(c)} />
      <JsonLd data={faqPageSchema(c.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: `Web Design ${c.nameState}`, path: `/web-design/${c.slug}` },
        ])}
      />

      <Navbar />

      {/* Hero */}
      <section className="bg-ink pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-marigold mb-3">
            <MapPin className="w-3.5 h-3.5" /> {c.nameState} · Capital Region
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Website design in {c.name},
            <br />
            <span className="text-[#ef7d5a]">{c.heroLine}</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg mb-8">{c.intro}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral-ink text-white font-semibold rounded-full transition-colors"
            >
              Get a free quote <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/our-work"
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-colors"
            >
              See our work
            </a>
          </div>
        </div>
      </section>

      {/* Who we build for */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            Websites for {c.name} small businesses
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl">{c.landscape}</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {c.businessTypes.map((b) => (
              <li key={b} className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <Check className="w-5 h-5 text-coral-ink shrink-0 mt-0.5" />
                <span className="text-gray-800 font-medium">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing — affordable + quality framing */}
      <section className="py-16 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Honest, flat pricing — the same in {c.name} as everywhere
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Custom quality at the lowest honest price. No {c.name} surcharge, no contracts, no surprise
            invoices — and the Starter plan has no monthly fee at all.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {PLANS.map((p) => (
              <div key={p.name} className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-coral-ink">{p.name}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{p.price}</p>
                <p className="text-xs text-gray-500 mb-3">{p.sub}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <a href="/pricing" className="inline-flex items-center gap-1.5 mt-6 text-coral-ink font-semibold hover:text-coral-ink">
            See full pricing details <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* City FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
            Web design in {c.name} — common questions
          </h2>
          <div className="space-y-6">
            {c.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{f.q}</h3>
                <p className="text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Ready for a website that works as hard as you do?
          </h2>
          <p className="text-gray-400 mb-6">
            Tell us about your {c.name} business and we&apos;ll send a free custom proposal — no pressure, no jargon.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-coral hover:bg-coral-ink text-white font-semibold rounded-full transition-colors"
          >
            Get a free quote <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
