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
      name: 'Mylobstr',
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mylobstr',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    },
  }
}
