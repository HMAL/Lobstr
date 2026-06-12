import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import Content from './content'

export const metadata: Metadata = {
  title: 'Gym & Fitness Website Design Example — Albany Iron Fitness Demo',
  description:
    'See what a custom gym website from Mylobstr looks like — class schedule, trainer bios, membership signup, and gallery. A demo site for Albany NY gyms and studios. Yours starts at $100.',
  keywords: [
    'gym website design Albany NY',
    'fitness studio website example',
    'personal trainer web design',
    'gym website with class schedule',
  ],
  alternates: { canonical: 'https://mylobstr.com/projects/fitness' },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/our-work' },
          { name: 'Gym Website Demo', path: '/projects/fitness' },
        ])}
      />
      <Content />
    </>
  )
}
