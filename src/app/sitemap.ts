import type { MetadataRoute } from 'next'

const BASE = 'https://mylobstr.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core pages — highest priority
    { url: BASE,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/pricing`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/contact`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/our-work`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/faq`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/about`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },

    // Demo portfolio pages — target industry-specific searches
    { url: `${BASE}/projects/restaurant`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/salon`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/barbershop`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/plumbing`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/pet`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/projects/fitness`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },

    // Legal / utility pages
    { url: `${BASE}/privacy`,  lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/terms`,    lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/refund`,   lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/careers`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]
}
