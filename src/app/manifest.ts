import type { MetadataRoute } from 'next'

// Required for `output: export` — emit this as a static file at build time.
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mylobstr — Website Design Albany NY',
    short_name: 'Mylobstr',
    description:
      'Custom websites for small businesses in Albany, NY — live in 7 days, starting at $100.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
