import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import About from '@/components/About'

export const metadata: Metadata = {
  title: 'About — The People Behind Mylobstr',
  description: 'Mylobstr is Likki — a developer, a mom, and a small business believer building affordable websites for Albany, NY businesses.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gray-950 pt-32 pb-16 text-center px-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
          Who We Are
        </span>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
          Not a big agency.
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            A real person who gives a damn.
          </span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Built in Albany, for Albany. By a developer, a mom, and a small business believer.
        </p>
      </section>

      <About />

      <Footer />
    </div>
  )
}
