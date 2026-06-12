import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import Content from './content'

export const metadata: Metadata = {
  title: 'Hair Salon Website Design Example — The Cut Collective Demo',
  description:
    'See what a custom salon website from Mylobstr looks like — services with prices, stylist profiles, online booking, and gallery. A demo site for Albany & Troy NY salons. Yours starts at $100.',
  keywords: [
    'salon website design Albany NY',
    'hair salon website example',
    'website with online booking salon',
    'beauty salon web design Troy NY',
  ],
  alternates: { canonical: 'https://mylobstr.com/projects/salon' },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/our-work' },
          { name: 'Salon Website Demo', path: '/projects/salon' },
        ])}
      />
      <Content />
    </>
  )
}
