import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import Content from './content'

export const metadata: Metadata = {
  title: 'Tutoring & School Website Design Example — Bright Minds Demo',
  description:
    'See what a custom tutoring center website from Mylobstr looks like — programs, tutor profiles, free assessment booking, and parent reviews. A demo site for Albany NY tutors and schools. Yours starts at $100.',
  keywords: [
    'tutoring website design Albany NY',
    'tutor website example',
    'school website design',
    'education website with booking Capital Region',
  ],
  alternates: { canonical: 'https://mylobstr.com/projects/tutoring' },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/our-work' },
          { name: 'Tutoring Website Demo', path: '/projects/tutoring' },
        ])}
      />
      <Content />
    </>
  )
}
