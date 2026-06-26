import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'Contact a Web Designer in Albany NY | Free Quote | MyLobstr Designs',
  description: 'Get a free website design quote from MyLobstr Designs — Albany NY\'s small business web designer. Response within 24 hours. Serving Albany, Troy, Schenectady, and the Capital Region.',
  keywords: ['web designer Albany NY contact', 'free website quote Albany', 'hire web developer Albany NY', 'website design quote near me'],
  alternates: { canonical: 'https://mylobstr.com/contact' },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-gray-950 pt-32 pb-16 text-center px-4">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
          Let&apos;s talk
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Tell us about your business
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Share a few details and we&apos;ll send back a free quote and a short plan — usually
          within about a day. No obligation, no hard sell.
        </p>
      </section>

      <Contact />

      <Footer />
    </div>
  )
}
