import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OurWorkGrid from './OurWorkGrid'

export const metadata: Metadata = {
  title: 'Our Work — Demo Portfolio',
  description: "We built 6 full demo sites across Albany's most common business types to show exactly what we're capable of.",
}

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center px-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
          Demo Portfolio
        </span>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
          We're a startup. So we
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            built the proof ourselves.
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          We don't have 50 clients yet — so we built 6 full demo sites across different Albany business types to show you exactly what we're capable of. Click any to explore a fully-built, live website.
        </p>
      </section>

      {/* Grid */}
      <OurWorkGrid />

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-white mb-3">Don't see your industry?</h2>
        <p className="text-gray-400 mb-8">
          We build for any local business. Tell us what you do and we'll show you what your site could look like.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-black rounded-2xl transition-all hover:scale-105 text-sm"
        >
          Get a Free Quote →
        </a>
      </section>

      <Footer />
    </div>
  )
}
