import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import { getPost, posts } from '@/lib/posts'

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://mylobstr.com/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `https://mylobstr.com/blog/${post.slug}`,
      siteName: 'Mylobstr',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const PostBody = post.component
  const morePosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const published = new Date(`${post.datePublished}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white font-sans">
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-950 pt-32 pb-14">
        <div className="max-w-3xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="text-sm text-white/40 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-white/50 text-sm font-medium">
            {published} · {post.readingMinutes} min read · by the Mylobstr team, Albany NY
          </p>
        </div>
      </section>

      {/* Article */}
      <main className="max-w-3xl mx-auto px-4 py-14">
        <article className="post-prose">
          <PostBody />
        </article>

        {/* CTA */}
        <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <h2 className="text-2xl font-black mb-2">Want a website that shows up on Google?</h2>
          <p className="text-white/70 mb-6 text-sm">
            Custom sites for Albany small businesses from $100, live in about a week. SEO included.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 transition-all hover:scale-105 text-sm"
          >
            Get a free quote →
          </Link>
        </div>

        {/* More posts */}
        {morePosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">More from the blog</h2>
            <div className="space-y-4">
              {morePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                >
                  <h3 className="font-bold text-gray-900 text-base mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
