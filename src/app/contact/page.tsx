import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'Contact a Web Designer in Albany NY | Free Quote | Mylobstr',
  description: 'Get a free website design quote from Mylobstr — Albany NY\'s small business web designer. Response within 24 hours. Serving Albany, Troy, Schenectady, and the Capital Region.',
  keywords: ['web designer Albany NY contact', 'free website quote Albany', 'hire web developer Albany NY', 'website design quote near me'],
  alternates: { canonical: 'https://mylobstr.com/contact' },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-gray-950 pt-32 pb-16 text-center px-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
          Let's Talk
        </span>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
          Ready to put your business
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            on the map?
          </span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Tell us about your Albany business and we'll have a free proposal in your inbox within 24 hours.
        </p>
      </section>

      <Contact />

      <Footer />
    </div>
  )
}
