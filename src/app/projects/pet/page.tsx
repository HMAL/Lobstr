import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import Content from './content'

export const metadata: Metadata = {
  title: 'Veterinary & Pet Business Website Design Example — Happy Paws Demo',
  description:
    'See what a custom vet clinic and pet grooming website from Mylobstr looks like — online appointments, services, and team profiles. A demo site for Albany NY pet businesses. Yours starts at $100.',
  keywords: [
    'veterinary website design Albany NY',
    'pet grooming website example',
    'vet clinic web design',
    'pet business website Capital Region',
  ],
  alternates: { canonical: 'https://mylobstr.com/projects/pet' },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/our-work' },
          { name: 'Pet Clinic Website Demo', path: '/projects/pet' },
        ])}
      />
      <Content />
    </>
  )
}
