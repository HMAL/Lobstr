import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog — Website & SEO Tips for Albany NY Small Businesses',
  description:
    'Practical guides on websites, local SEO, and getting found on Google — written for Albany, Troy, and Schenectady small business owners by the Mylobstr team.',
  keywords: [
    'small business website tips Albany',
    'local SEO tips Albany NY',
    'small business marketing Capital Region',
    'website advice local business',
  ],
  alternates: { canonical: 'https://mylobstr.com/blog' },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-950 pt-32 pb-16 text-center">
        <p className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-3">Blog</p>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
          Practical tips for local business owners.
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto px-4">
          No fluff. No jargon. Just honest advice on growing your business online — written by the people who build your website.
        </p>
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {posts.map((post) => {
            const published = new Date(`${post.datePublished}T12:00:00`).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-7 rounded-2xl border border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
              >
                <div className="flex items-start gap-5">
                  <span className="text-4xl">{post.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 mb-1.5">
                      {published} · {post.readingMinutes} min read
                    </p>
                    <h2 className="font-black text-gray-900 text-xl mb-2 leading-snug">{post.title}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{post.description}</p>
                    <span className="text-sm font-bold text-blue-600">Read the guide →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <h2 className="text-2xl font-black mb-2">Rather just have it handled?</h2>
          <p className="text-white/70 mb-6 text-sm">
            We build custom websites for Albany small businesses — SEO, hosting, and Google Business Profile included. From $100.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 transition-all hover:scale-105 text-sm"
          >
            Get a free quote →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
