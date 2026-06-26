const BASE = 'https://mylobstr.com'

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
