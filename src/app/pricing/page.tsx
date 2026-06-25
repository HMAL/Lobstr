import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Pricing from '@/components/Pricing'

export const metadata: Metadata = {
  title: 'Website Design Pricing Albany NY | Plans from $300 | Mylobstr',
  description: 'Straightforward website pricing for Albany NY small businesses. Starter is a flat one-time $300 with no monthly fee. Growing Business $150 + $30/mo, Scale $250 + $50/mo. No contracts, no surprises.',
  keywords: ['affordable website design Albany NY', 'website design cost small business', 'how much does a website cost', 'website design packages Albany', 'small business website pricing'],
  alternates: { canonical: 'https://mylobstr.com/pricing' },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Dark hero so transparent navbar text is visible */}
      <section className="bg-gray-950 pt-32 pb-16 text-center px-4">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
          Pricing, in plain numbers
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          A real website, from a flat <span className="text-blue-400">$300</span>.
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Starter is one payment, no monthly bill. Need more pages or ongoing help? Growing and
          Scale add a low monthly rate. No setup fees, no contracts — and every plan is backed
          by a 14-day money-back guarantee.
        </p>
      </section>

      {/* Pricing component — renders without its own header since the page has one */}
      <Pricing />

      <Footer />
    </div>
  )
}
