import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog — Tips for Local Business Owners',
  description: 'Practical advice on websites, SEO, and online presence for local business owners. Coming soon from Mylobstr.',
}

export default function BlogPage() {
  const topics = [
    { emoji: '🔍', title: 'SEO for local businesses', desc: 'How to show up when someone searches for your service in your city.' },
    { emoji: '📱', title: 'Why mobile-first matters', desc: 'Over 70% of your customers find you on their phone. Here\'s what that means.' },
    { emoji: '📅', title: 'Online booking vs. phone calls', desc: 'How adding an online booking button changes your no-show rate overnight.' },
    { emoji: '🖼️', title: 'What makes a homepage convert', desc: 'The 5 things every local business homepage needs above the fold.' },
    { emoji: '⭐', title: 'Getting Google reviews that stick', desc: 'The right way to ask, the right time to ask, and how to respond.' },
    { emoji: '💰', title: 'Website ROI for small businesses', desc: 'A simple calculation to know if your website is paying for itself.' },
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-950 pt-32 pb-16 text-center">
        <p className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-3">Blog</p>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
          Practical tips for local business owners.
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          No fluff. No jargon. Just honest advice on growing your business online — written by the people who build your website.
        </p>
        <div className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold">
          ✍️ First posts dropping soon — check back shortly
        </div>
      </section>

      {/* Preview topics */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Topics we'll be covering</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((t) => (
            <div key={t.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
              <div className="text-3xl mb-3">{t.emoji}</div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{t.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Notify CTA */}
        <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <h2 className="text-2xl font-black mb-2">Want to know when we publish?</h2>
          <p className="text-white/70 mb-6 text-sm">Send us your email and we'll let you know when the first post goes live.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 transition-all hover:scale-105 text-sm"
          >
            Send us your email →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
