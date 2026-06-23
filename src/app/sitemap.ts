import type { MetadataRoute } from 'next'
import { posts } from '@/lib/posts'

// Required for `output: export` — emit this as a static file at build time.
export const dynamic = 'force-static'

const BASE = 'https://mylobstr.com'

// Fixed dates: update when a page meaningfully changes. Regenerating lastmod on
// every build makes Google distrust the sitemap's lastmod signal entirely.
const SITE_UPDATED = new Date('2026-06-11')
const LEGAL_UPDATED = new Date('2025-11-01')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core pages — highest priority
    { url: BASE,                       lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/pricing`,          lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/contact`,          lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/our-work`,         lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/faq`,              lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/about`,            lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,             lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 0.8 },

    // Blog posts — fresh, locally-targeted content
    ...posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Demo portfolio pages — target industry-specific searches
    { url: `${BASE}/projects/restaurant`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/salon`,      lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/barbershop`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/plumbing`,   lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/pet`,        lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/fitness`,    lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/tutoring`,   lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.75 },

    // Legal / utility pages
    { url: `${BASE}/privacy`,  lastModified: LEGAL_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/terms`,    lastModified: LEGAL_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/refund`,   lastModified: LEGAL_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/careers`,  lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.4 },
  ]
}
