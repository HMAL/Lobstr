import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Pricing from '@/components/Pricing'

export const metadata: Metadata = {
  title: 'Affordable Website Design Pricing Albany NY | Plans from $100 | Mylobstr',
  description: 'Transparent website design pricing for Albany NY small businesses. Starter $100, Growing Business $150, Scale $250 — then low monthly rate. No contracts, no surprises.',
  keywords: ['affordable website design Albany NY', 'website design cost small business', 'how much does a website cost', 'website design packages Albany', 'small business website pricing'],
  alternates: { canonical: 'https://mylobstr.com/pricing' },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Dark hero so transparent navbar text is visible */}
      <section className="bg-gray-950 pt-32 pb-16 text-center px-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
          Transparent Pricing
        </span>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
          Your website journey,
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            priced like it should be.
          </span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          A custom site live in <span className="text-white font-semibold">7 days</span>. No setup fees, no contracts — your entire first year online costs less than a single agency meeting.
        </p>
      </section>

      {/* Pricing component — renders without its own header since the page has one */}
      <Pricing />

      <Footer />
    </div>
  )
}
