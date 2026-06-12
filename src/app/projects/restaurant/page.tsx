import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import Content from './content'

export const metadata: Metadata = {
  title: 'Restaurant Website Design Example — Trattoria Albany Demo',
  description:
    'See what a custom restaurant website from Mylobstr looks like — online menu, reservations, photo gallery, and Google Maps. A demo site for Albany NY restaurants. Yours starts at $100.',
  keywords: [
    'restaurant website design Albany NY',
    'restaurant website example',
    'website for restaurant with online menu',
    'small restaurant web design',
  ],
  alternates: { canonical: 'https://mylobstr.com/projects/restaurant' },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/our-work' },
          { name: 'Restaurant Website Demo', path: '/projects/restaurant' },
        ])}
      />
      <Content />
    </>
  )
}
