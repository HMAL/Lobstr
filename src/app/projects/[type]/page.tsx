import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'

import RestaurantContent from './_content/restaurant'
import SalonContent from './_content/salon'
import BarbershopContent from './_content/barbershop'
import FitnessContent from './_content/fitness'
import PetContent from './_content/pet'
import PlumbingContent from './_content/plumbing'
import TutoringContent from './_content/tutoring'

type ProjectType =
  | 'restaurant'
  | 'salon'
  | 'barbershop'
  | 'fitness'
  | 'pet'
  | 'plumbing'
  | 'tutoring'

type ProjectInfo = {
  title: string
  description: string
  keywords: string[]
  breadcrumb: string
  /** The real service MyLobstr Designs offers, for Service JSON-LD (e.g. "Restaurant Website Design"). */
  serviceName: string
  Content: () => React.JSX.Element
}

const PROJECTS: Record<ProjectType, ProjectInfo> = {
  restaurant: {
    title: 'Restaurant Website Design Example — Trattoria Albany Demo',
    description:
      'See what a custom restaurant website from MyLobstr Designs looks like — online menu, reservations, photo gallery, and Google Maps. A demo site for Albany NY restaurants. Yours starts at $300.',
    keywords: [
      'restaurant website design Albany NY',
      'restaurant website example',
      'website for restaurant with online menu',
      'small restaurant web design',
    ],
    breadcrumb: 'Restaurant Website Demo',
    serviceName: 'Restaurant Website Design',
    Content: RestaurantContent,
  },
  salon: {
    title: 'Hair Salon Website Design Example — The Cut Collective Demo',
    description:
      'See what a custom salon website from MyLobstr Designs looks like — services with prices, stylist profiles, online booking, and gallery. A demo site for Albany & Troy NY salons. Yours starts at $300.',
    keywords: [
      'salon website design Albany NY',
      'hair salon website example',
      'website with online booking salon',
      'beauty salon web design Troy NY',
    ],
    breadcrumb: 'Salon Website Demo',
    serviceName: 'Hair Salon Website Design',
    Content: SalonContent,
  },
  barbershop: {
    title: 'Barbershop Website Design Example — Capital Cuts Demo',
    description:
      'See what a custom barbershop website from MyLobstr Designs looks like — book-a-cut button, barber profiles, pricing, and gallery. A demo site for Albany & Schenectady NY barbershops. Yours starts at $300.',
    keywords: [
      'barbershop website design Albany NY',
      'barber shop website example',
      'website with booking barbershop',
      'barbershop web design Schenectady NY',
    ],
    breadcrumb: 'Barbershop Website Demo',
    serviceName: 'Barbershop Website Design',
    Content: BarbershopContent,
  },
  fitness: {
    title: 'Gym & Fitness Website Design Example — Albany Iron Fitness Demo',
    description:
      'See what a custom gym website from MyLobstr Designs looks like — class schedule, trainer bios, membership signup, and gallery. A demo site for Albany NY gyms and studios. Yours starts at $300.',
    keywords: [
      'gym website design Albany NY',
      'fitness studio website example',
      'personal trainer web design',
      'gym website with class schedule',
    ],
    breadcrumb: 'Gym Website Demo',
    serviceName: 'Gym & Fitness Website Design',
    Content: FitnessContent,
  },
  pet: {
    title: 'Veterinary & Pet Business Website Design Example — Happy Paws Demo',
    description:
      'See what a custom vet clinic and pet grooming website from MyLobstr Designs looks like — online appointments, services, and team profiles. A demo site for Albany NY pet businesses. Yours starts at $300.',
    keywords: [
      'veterinary website design Albany NY',
      'pet grooming website example',
      'vet clinic web design',
      'pet business website Capital Region',
    ],
    breadcrumb: 'Pet Clinic Website Demo',
    serviceName: 'Veterinary & Pet Business Website Design',
    Content: PetContent,
  },
  plumbing: {
    title: 'Plumber Website Design Example — Albany Pro Plumbing Demo',
    description:
      'See what a custom plumbing company website from MyLobstr Designs looks like — emergency call button, services, service area, and free estimate form. A demo site for Albany NY contractors. Yours starts at $300.',
    keywords: [
      'plumber website design Albany NY',
      'plumbing company website example',
      'contractor website design',
      'HVAC electrician plumber web design Capital Region',
    ],
    breadcrumb: 'Plumbing Website Demo',
    serviceName: 'Plumber & Contractor Website Design',
    Content: PlumbingContent,
  },
  tutoring: {
    title: 'Tutoring & School Website Design Example — Bright Minds Demo',
    description:
      'See what a custom tutoring center website from MyLobstr Designs looks like — programs, tutor profiles, free assessment booking, and parent reviews. A demo site for Albany NY tutors and schools. Yours starts at $300.',
    keywords: [
      'tutoring website design Albany NY',
      'tutor website example',
      'school website design',
      'education website with booking Capital Region',
    ],
    breadcrumb: 'Tutoring Website Demo',
    serviceName: 'Tutoring & School Website Design',
    Content: TutoringContent,
  },
}

// Only the seven known project types are valid; anything else 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return (Object.keys(PROJECTS) as ProjectType[]).map((type) => ({ type }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>
}): Promise<Metadata> {
  const { type } = await params
  const project = PROJECTS[type as ProjectType]
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
    keywords: project.keywords,
    alternates: { canonical: `https://mylobstr.com/projects/${type}` },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  const project = PROJECTS[type as ProjectType]
  if (!project) notFound()

  const { Content } = project

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: project.serviceName,
          description: `${project.serviceName} for small businesses in Albany, NY and the Capital Region by MyLobstr Designs — custom-built, live in about a week, starting at a flat one-time $300.`,
          path: `/projects/${type}`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/our-work' },
          { name: project.breadcrumb, path: `/projects/${type}` },
        ])}
      />
      <Content />
    </>
  )
}
