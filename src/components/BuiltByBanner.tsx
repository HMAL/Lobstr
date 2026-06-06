'use client'

import { ArrowUpRight } from 'lucide-react'

export default function BuiltByBanner() {
  return (
    <section className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: branding + copy */}
        <div className="text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
            Crafted by
          </p>
          <a
            href="https://mylobstr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-black text-white hover:text-blue-400 transition-colors"
          >
            mylobstr
          </a>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">
            We build fast, modern websites for businesses that mean business.
          </p>
        </div>

        {/* Right: CTA */}
        <a
          href="https://mylobstr.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shrink-0"
        >
          Want a site like this? <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
