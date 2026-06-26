import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LiveSiteSlider from '@/components/LiveSiteSlider'
import OurWorkGrid from './OurWorkGrid'

export const metadata: Metadata = {
  title: 'Website Design Portfolio Albany NY | Web Design Examples | MyLobstr Designs',
  description: "See MyLobstr Designs's website design work for Albany NY small businesses — live sites and demos for restaurants, salons, barbershops, contractors, gyms, and more.",
  keywords: ['website design portfolio Albany NY', 'web design examples Albany', 'small business website examples', 'website designer portfolio New York'],
  alternates: { canonical: 'https://mylobstr.com/our-work' },
}

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center px-4">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
          Our work
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Live sites and full demo builds
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Real platforms already serving customers, plus complete demo builds across the business
          types we see most around Albany. Click any one to explore it.
        </p>
      </section>

      {/* Live site screenshot slider */}
      <LiveSiteSlider />

      {/* Demo grid */}
      <OurWorkGrid />

      <Footer />
    </div>
  )
}
