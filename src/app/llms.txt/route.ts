import { posts } from '@/lib/posts'

// Served at /llms.txt — a curated, LLM-friendly map of the site.
// Prerendered at build time (static), and reuses the same posts source as the sitemap.
export const dynamic = 'force-static'

const BASE = 'https://mylobstr.com'

const corePages: ReadonlyArray<[name: string, path: string, desc: string]> = [
  ['Home', '/', 'Custom websites for Albany NY small businesses, from $100, live in about a week.'],
  ['Pricing', '/pricing', 'Transparent plans: Starter $100, Growing Business $150, Scale $250, plus flat monthly hosting/support from $25.'],
  ['Our Work', '/our-work', 'Example sites for restaurants, salons, barbershops, plumbers, gyms, and more.'],
  ['About', '/about', 'Who Mylobstr is and how the studio started.'],
  ['FAQ', '/faq', 'Common questions about pricing, hosting, domains, and support.'],
  ['Contact', '/contact', 'Get a free custom proposal for your business.'],
]

export function GET() {
  const body = `# Mylobstr

> Mylobstr builds affordable custom websites for small businesses in Albany, NY and the Capital Region (Troy, Schenectady, Saratoga Springs). Plans start at $100, sites go live in about a week, and every plan includes SEO, fast hosting, and real 24/7 human support.

## Core pages
${corePages.map(([name, path, desc]) => `- [${name}](${BASE}${path}): ${desc}`).join('\n')}

## Blog
${posts.map((post) => `- [${post.title}](${BASE}/blog/${post.slug}): ${post.description}`).join('\n')}

## Contact
- Email: info@mylobstr.com
- Location: Albany, NY — serving Troy, Schenectady, Saratoga Springs, and the Capital Region
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
