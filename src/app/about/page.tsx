import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import About from '@/components/About'

export const metadata: Metadata = {
  title: { absolute: 'About — The People Behind MyLobstr Designs' },
  description: 'MyLobstr Designs is a family — a developer, a mom, and a small business believer building affordable websites for Albany, NY businesses.',
  keywords: ['web design team Albany NY', 'local web designer Albany', 'about MyLobstr Designs', 'Albany web design studio'],
  alternates: { canonical: 'https://mylobstr.com/about' },
  openGraph: {
    title: 'About MyLobstr Designs — Albany NY Web Design Studio',
    description: 'A local Albany team building affordable custom websites for small businesses across the Capital Region.',
    url: 'https://mylobstr.com/about',
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-ink pt-32 pb-16 text-center px-4">
        <span className="inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-marigold mb-3">
          Who we are
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Not a big agency — a local team
          <br />
          <span className="text-[#ef7d5a]">that actually cares how it goes.</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Built in Albany, for Albany — by a developer, a mom, and a small-business believer.
        </p>
      </section>

      <About />

      <Footer />
    </div>
  )
}
