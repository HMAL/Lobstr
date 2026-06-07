import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LiveSiteSlider from './LiveSiteSlider'
import OurWorkGrid from './OurWorkGrid'

export const metadata: Metadata = {
  title: 'Our Work — Live Sites & Demo Portfolio',
  description: "Live sites we've shipped and demo builds across Albany's most common business types. See exactly what we're capable of.",
}

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center px-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
          Our Work
        </span>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
          Live sites. Real results.
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            See what we build.
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Live platforms already serving real users, plus full demo builds across Albany's most common business types. Click any to explore.
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
