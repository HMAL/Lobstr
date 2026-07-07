import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Awning from '@/components/Awning'
import ShelfLabel from '@/components/ShelfLabel'
import JsonLd from '@/components/seo/JsonLd'
import IndustryCTA from '@/components/IndustryCTA'
import { industries, getIndustry, type PlanId } from '@/lib/industries'
import { industryIcons, defaultIndustryIcon } from '@/lib/industryIcons'
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '@/lib/schema'

// Only the known industries are valid; anything else 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return industries.map((i) => ({ niche: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ niche: string }>
}): Promise<Metadata> {
  const { niche } = await params
  const industry = getIndustry(niche)
  if (!industry) return {}
  return {
    title: { absolute: industry.title },
    description: industry.description,
    keywords: industry.keywords,
    alternates: { canonical: `https://mylobstr.com/industries/${industry.slug}` },
    openGraph: {
      title: industry.title,
      description: industry.description,
      url: `https://mylobstr.com/industries/${industry.slug}`,
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

const PLANS: { id: PlanId; name: string; price: string; sub: string; desc: string }[] = [
  { id: 'starter', name: 'Starter', price: '$300', sub: 'one-time, no monthly', desc: '5-page custom website for new businesses.' },
  { id: 'growing', name: 'Growing', price: '$150 + $30/mo', sub: 'build + hosting & support', desc: '10 pages with logo design, full SEO, and online booking.' },
  { id: 'scale', name: 'Scale', price: '$250 + $50/mo', sub: 'build + hosting & support', desc: '20 pages with an admin panel and multi-location support.' },
]

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ niche: string }>
}) {
  const { niche } = await params
  const industry = getIndustry(niche)
  if (!industry) notFound()

  const Icon = industryIcons[industry.slug] ?? defaultIndustryIcon
  const recommended = PLANS.find((p) => p.id === industry.recommendedPlan)!
  const related = industry.relatedSlugs
    .map((slug) => getIndustry(slug))
    .filter((i): i is NonNullable<typeof i> => Boolean(i))

  return (
    <div className="min-h-screen bg-paper">
      <JsonLd
        data={serviceSchema({
          name: `Website Design for ${industry.name}`,
          description: industry.description,
          path: `/industries/${industry.slug}`,
        })}
      />
      <JsonLd data={faqPageSchema(industry.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ])}
      />

      <Navbar />

      {/* Hero — same left-aligned storefront grammar as Pricing, closed by the awning */}
      <section className="bg-ink px-5 pt-32 pb-16 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-paper/65">
            <Icon className="h-3.5 w-3.5" /> Albany, NY · Capital Region
          </p>
          <h1 className="max-w-2xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
            Website design for {industry.name.toLowerCase()}{' '}
            <span className="italic font-medium text-[#ef7d5a]">{industry.heroLine}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">{industry.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-coral px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Get a free quote <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/our-work"
              className="inline-flex items-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              See our work
            </a>
          </div>
        </div>
      </section>
      <Awning />

      {/* Pain point -> outcome */}
      <section className="bg-paper px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <ShelfLabel className="mb-8">The problem</ShelfLabel>
          <h2 className="max-w-2xl font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-ink lg:text-3xl">
            Why {industry.name.toLowerCase()} lose customers to a bad website
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-steam">{industry.painPoint}</p>
        </div>
      </section>

      {/* What the site needs to do */}
      <section className="bg-paper-2 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <ShelfLabel className="mb-8">The checklist</ShelfLabel>
          <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-ink lg:text-3xl">
            What a {industry.singular} website actually needs
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {industry.whatTheyNeed.map((need) => (
              <div key={need} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral-ink" strokeWidth={2.5} />
                <span className="text-sm font-medium leading-relaxed text-ink">{need}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended package */}
      <section className="bg-paper px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <ShelfLabel className="mb-8">The right fit</ShelfLabel>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
            <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-ink lg:text-3xl">
              Which plan fits a {industry.singular}
            </h2>
            <p className="text-base leading-relaxed text-steam">
              Flat pricing, no industry surcharge, no contracts — here&apos;s the plan we&apos;d
              recommend for most {industry.name.toLowerCase()}, and why.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PLANS.map((p) => {
              const isRecommended = p.id === industry.recommendedPlan
              return (
                <div
                  key={p.id}
                  className={
                    isRecommended
                      ? 'rounded-2xl border-2 border-coral bg-white p-5'
                      : 'rounded-2xl border border-border bg-white p-5'
                  }
                >
                  {isRecommended && (
                    <span className="mb-2 inline-block rounded-full bg-coral px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
                      Recommended
                    </span>
                  )}
                  <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-coral-ink">{p.name}</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">{p.price}</p>
                  <p className="mb-3 text-xs text-steam">{p.sub}</p>
                  <p className="text-sm leading-relaxed text-steam">{p.desc}</p>
                </div>
              )
            })}
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steam">
            <span className="font-semibold text-ink">Why {recommended.name}: </span>
            {industry.recommendedReason}
          </p>
          <a href="/pricing" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-ink hover:text-coral-ink">
            See full pricing details <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper-2 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <ShelfLabel className="mb-8">Questions</ShelfLabel>
          <h2 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-ink lg:text-3xl">
            Websites for {industry.name.toLowerCase()} — common questions
          </h2>
          <div className="mt-8 space-y-6">
            {industry.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-semibold text-ink">{f.q}</h3>
                <p className="mt-1.5 leading-relaxed text-steam">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related industries */}
      {related.length > 0 && (
        <section className="bg-paper px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-steam">
              Other industries we build for
            </p>
            <div className="flex flex-wrap gap-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/industries/${r.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-coral/40 hover:text-coral-ink"
                >
                  {r.name} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              ))}
              <Link
                href="/industries"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-coral/40 hover:text-coral-ink"
              >
                All industries <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA — contact info + the form itself, right here (no click-through) */}
      <IndustryCTA singular={industry.singular} />

      <Footer />
    </div>
  )
}
