import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Careers — Join the Mylobstr Team',
  description: 'We\'re a small, growing web design studio in Albany, NY. If you love building things for local businesses, let\'s talk.',
  alternates: { canonical: 'https://mylobstr.com/careers' },
}

export default function CareersPage() {
  const values = [
    { emoji: '🏙️', title: 'Local first', desc: 'We serve Albany businesses and we live here too. Community matters to us.' },
    { emoji: '⚡', title: 'Bias toward action', desc: 'We ship fast, learn from real users, and improve continuously.' },
    { emoji: '🤝', title: 'Honest communication', desc: 'No corporate speak. We say what we mean and mean what we say.' },
    { emoji: '🎯', title: 'Ownership mindset', desc: 'Everyone on the team takes full responsibility for their work.' },
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-950 pt-32 pb-16 text-center">
        <p className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-3">Careers</p>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
          Help local businesses thrive online.
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          We're a small, fast-moving web studio in Albany, NY. We build beautiful websites for restaurants, salons, gyms, and more — and we're looking for people who care about doing great work.
        </p>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16">

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">How we work</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-gray-900 mb-3">Open positions</h2>
          <p className="text-gray-500 mb-8 text-sm">We're a small team and hire slowly — but when we need someone, we find the best person for the role.</p>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Open</span>
                <h3 className="text-xl font-black text-gray-900 mt-3 mb-1">Freelance Web Developer</h3>
                <p className="text-gray-500 text-sm mb-4">Remote · Part-time · Project-based</p>
                <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                  We're looking for a developer comfortable with Next.js, Tailwind CSS, and Framer Motion who wants to help build websites for local businesses. You'd work directly with our founder on client projects, with flexibility to set your own hours.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-gray-500">
                  <li>✓ Next.js & React experience required</li>
                  <li>✓ Tailwind CSS proficiency</li>
                  <li>✓ Eye for design and attention to detail</li>
                  <li>✓ Reliable communication and deadline ownership</li>
                </ul>
              </div>
            </div>
            <a
              href="mailto:info@mylobstr.com?subject=Freelance Developer Application"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all hover:scale-105"
            >
              Apply via email →
            </a>
          </div>

          <div className="mt-5 p-6 rounded-2xl border border-gray-100 bg-gray-50 text-center text-sm text-gray-400">
            Don't see the right role? We always want to hear from talented people. Send your portfolio to{' '}
            <a href="mailto:info@mylobstr.com" className="text-blue-600 font-semibold">info@mylobstr.com</a>.
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
