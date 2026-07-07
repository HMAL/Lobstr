import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Pricing from '@/components/Pricing'
import Awning from '@/components/Awning'

export const metadata: Metadata = {
  title: { absolute: 'Website Design Pricing Albany NY | Plans from $300 | MyLobstr Designs' },
  description: 'Straightforward website pricing for Albany NY small businesses. Starter is a flat one-time $300 with no monthly fee. Growing Business $150 + $30/mo, Scale $250 + $50/mo. No contracts, no surprises.',
  keywords: ['affordable website design Albany NY', 'website design cost small business', 'how much does a website cost', 'website design packages Albany', 'small business website pricing'],
  alternates: { canonical: 'https://mylobstr.com/pricing' },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* Ink hero — same storefront grammar as the homepage, closed by the awning */}
      <section className="bg-ink px-5 pt-32 pb-16 text-paper sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-paper/65">
            Pricing · plain numbers, no surprises
          </p>
          <h1 className="max-w-2xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
            A real website, from a flat{' '}
            <span className="italic font-medium text-[#ef7d5a]">$300.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            Starter is one payment, no monthly bill. Need more pages or ongoing help? Growing and
            Scale add a low monthly rate. No setup fees, no contracts — and every plan is backed
            by a 14-day money-back guarantee.
          </p>
        </div>
      </section>
      <Awning />

      {/* Pricing component — renders without its own header since the page has one */}
      <Pricing />

      <Footer />
    </div>
  )
}
