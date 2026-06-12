import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import Content from './content'

export const metadata: Metadata = {
  title: 'Barbershop Website Design Example — Capital Cuts Demo',
  description:
    'See what a custom barbershop website from Mylobstr looks like — book-a-cut button, barber profiles, pricing, and gallery. A demo site for Albany & Schenectady NY barbershops. Yours starts at $100.',
  keywords: [
    'barbershop website design Albany NY',
    'barber shop website example',
    'website with booking barbershop',
    'barbershop web design Schenectady NY',
  ],
  alternates: { canonical: 'https://mylobstr.com/projects/barbershop' },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/our-work' },
          { name: 'Barbershop Website Demo', path: '/projects/barbershop' },
        ])}
      />
      <Content />
    </>
  )
}
