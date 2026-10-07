import type { Metadata } from 'next'
import { MapPin, Zap, Handshake, Target } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { absolute: 'Careers — Join the MyLobstr Designs Team' },
  description: 'We\'re a small, growing web design studio in Albany, NY. If you love building things for local businesses, let\'s talk.',
  alternates: { canonical: 'https://mylobstr.com/careers' },
}

export default function CareersPage() {
  const values = [
    { icon: MapPin, title: 'Local first', desc: 'We serve Albany businesses and we live here too. Community matters to us.' },
    { icon: Zap, title: 'Bias toward action', desc: 'We ship quickly, learn from real users, and keep improving.' },
    { icon: Handshake, title: 'Honest communication', desc: 'No corporate speak. We say what we mean and mean what we say.' },
    { icon: Target, title: 'Ownership mindset', desc: 'Everyone on the team takes full responsibility for their work.' },
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-ink pt-32 pb-16 text-center">
        <p className="text-marigold text-sm font-semibold tracking-widest uppercase mb-3">Careers</p>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Help local businesses thrive online
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          We&apos;re a small, fast-moving web studio in Albany, NY, building websites for restaurants, salons, gyms, and more. We&apos;re looking for people who care about doing the work well.
        </p>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16">

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How we work</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                <div className="w-10 h-10 rounded-xl bg-coral/10 text-coral-ink flex items-center justify-center mb-3">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">We are not hiring</h2>
        </section>

      </main>

      <Footer />
    </div>
  )
}
