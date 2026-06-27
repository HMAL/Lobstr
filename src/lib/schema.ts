import { reviews } from './reviews'

const BASE = 'https://mylobstr.com'

// aggregateRating + review nodes for the Organization/ProfessionalService entity.
// Returns `null` when there are no real reviews yet, so nothing is emitted until
// genuine ratings exist (see src/lib/reviews.ts). Spread the result into the
// business node only when non-null.
export function ratingNodes() {
  if (reviews.length === 0) return null
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewBody: r.body,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  }
}

// Areas MyLobstr Designs serves — shared by the entity graph and per-service nodes.
const AREA_SERVED = [
  { '@type': 'City', name: 'Albany, NY' },
  { '@type': 'City', name: 'Troy, NY' },
  { '@type': 'City', name: 'Schenectady, NY' },
  { '@type': 'City', name: 'Saratoga Springs, NY' },
  { '@type': 'AdministrativeArea', name: 'Capital Region, NY' },
]

// A real service MyLobstr Designs offers (e.g. "Restaurant Website Design"), linked to the
// Organization entity declared in layout.tsx by @id so crawlers and LLMs resolve a
// single provider. Used on the industry demo pages under /projects/[type].
export function serviceSchema(s: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: `${BASE}${s.path}`,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: AREA_SERVED,
    offers: {
      '@type': 'Offer',
      price: '300',
      priceCurrency: 'USD',
      description: 'Custom-built and live in about a week. Starter plan is a flat one-time $300, no monthly fee.',
    },
  }
}

// A local landing page for one Capital Region city (e.g. /web-design/troy-ny).
// Modeled as a Service tied to the Organization entity by @id, with areaServed
// pinned to the specific city so crawlers and LLMs read "web design IN <city>".
export function cityServiceSchema(c: {
  name: string
  nameState: string
  slug: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Website Design in ${c.nameState}`,
    serviceType: 'Website Design',
    description: c.description,
    url: `${BASE}/web-design/${c.slug}`,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: { '@type': 'City', name: c.nameState },
    offers: {
      '@type': 'Offer',
      price: '300',
      priceCurrency: 'USD',
      description: `Custom website design for ${c.name} small businesses — flat one-time $300 Starter plan, no monthly fee, live in about a week.`,
    },
  }
}

// FAQPage schema. Google (and AI answer engines) require the questions/answers
// here to match what is visible on the page, so always build it from the same
// data the page renders.
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function articleSchema(post: {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    image: `${BASE}/opengraph-image.png`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${post.slug}` },
    author: {
      '@type': 'Organization',
      name: 'MyLobstr Designs',
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyLobstr Designs',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    },
  }
}
