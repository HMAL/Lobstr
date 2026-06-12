import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import Content from './content'

export const metadata: Metadata = {
  title: 'Plumber Website Design Example — Albany Pro Plumbing Demo',
  description:
    'See what a custom plumbing company website from Mylobstr looks like — emergency call button, services, service area, and free estimate form. A demo site for Albany NY contractors. Yours starts at $100.',
  keywords: [
    'plumber website design Albany NY',
    'plumbing company website example',
    'contractor website design',
    'HVAC electrician plumber web design Capital Region',
  ],
  alternates: { canonical: 'https://mylobstr.com/projects/plumbing' },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/our-work' },
          { name: 'Plumbing Website Demo', path: '/projects/plumbing' },
        ])}
      />
      <Content />
    </>
  )
}
