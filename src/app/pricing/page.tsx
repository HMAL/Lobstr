import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Pricing from '@/components/Pricing'

export const metadata: Metadata = {
  title: 'Pricing — Simple, Transparent Website Pricing',
  description: 'Build your website for $100, then just $10/month. No contracts, no surprises. See exactly what you pay and when.',
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
          Three phases. No setup fees. No surprises. Your entire first year online costs less than a single agency meeting.
        </p>
      </section>

      {/* Pricing component — renders without its own header since the page has one */}
      <Pricing />

      <Footer />
    </div>
  )
}
