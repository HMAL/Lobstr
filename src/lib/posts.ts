import type { ComponentType } from 'react'
import BigCorporationWebsites from '@/content/posts/what-small-businesses-learn-from-big-corporation-websites'
import CostVsFeatures from '@/content/posts/website-cost-vs-features-small-business'
import WebsiteCostAlbany from '@/content/posts/website-cost-small-business-albany-ny'
import FeaturesExplained from '@/content/posts/small-business-website-features-explained'
import LocalSeoAlbany from '@/content/posts/local-seo-albany-small-business'
import SupportComparison from '@/content/posts/real-support-vs-ticket-queue-website'
import RestaurantWebsiteAlbany from '@/content/posts/restaurant-website-design-albany'
import WebsiteVsFacebookAlbany from '@/content/posts/website-vs-facebook-page-albany'

export interface Post {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified: string
  keywords: string[]
  readingMinutes: number
  component: ComponentType
}

export const posts: Post[] = [
  {
    slug: 'what-small-businesses-learn-from-big-corporation-websites',
    title: 'What Small Businesses Can Learn from Big-Corporation Websites',
    description:
      'Big brands spend millions on their websites — but the things that make them work are mostly free principles. What the giants get right, and how an Albany small business copies the fundamentals for a few hundred dollars.',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: [
      'small business website',
      'big corporation website design',
      'website fundamentals small business',
      'affordable website design Albany NY',
      'professional website small business',
    ],
    readingMinutes: 6,
    component: BigCorporationWebsites,
  },
  {
    slug: 'website-cost-vs-features-small-business',
    title: "Website Cost vs. Features: What You're Actually Paying For",
    description:
      'A plain breakdown of which website features actually drive the price, which are worth paying for, and which are filler — so an Albany small business knows exactly what it is buying.',
    datePublished: '2026-06-12',
    dateModified: '2026-06-12',
    keywords: [
      'website cost vs features',
      'what does a website cost small business',
      'small business website pricing',
      'affordable website design Albany',
      'website features worth paying for',
    ],
    readingMinutes: 6,
    component: CostVsFeatures,
  },
  {
    slug: 'website-cost-small-business-albany-ny',
    title: 'How Much Does a Website Cost for a Small Business in Albany, NY? (2026 Guide)',
    description:
      'Real 2026 numbers for the Capital Region: DIY builders vs. freelancers vs. agencies vs. a local studio — what an Albany small business website should cost, what it must include, and the hidden fees to ask about.',
    datePublished: '2026-06-09',
    dateModified: '2026-06-09',
    keywords: [
      'website cost small business',
      'how much does a website cost Albany NY',
      'small business website price 2026',
      'affordable website design Albany',
      'website builder vs web designer cost',
    ],
    readingMinutes: 7,
    component: WebsiteCostAlbany,
  },
  {
    slug: 'small-business-website-features-explained',
    title: 'Every Feature Your Small Business Website Needs — and Why',
    description:
      'A feature-by-feature, plain-English guide to what a small business website actually needs — mobile-first design, SSL, SEO, contact forms, Google Business Profile, fast hosting, analytics, and booking — and why each one matters.',
    datePublished: '2026-06-05',
    dateModified: '2026-06-05',
    keywords: [
      'small business website features',
      'what features does a website need',
      'website must-have features',
      'mobile first SSL SEO small business',
      'website features explained',
    ],
    readingMinutes: 7,
    component: FeaturesExplained,
  },
  {
    slug: 'local-seo-albany-small-business',
    title: 'Local SEO for Albany Small Businesses: How to Show Up on Google Maps',
    description:
      'A plain-English local SEO playbook for Albany, Troy, and Schenectady: Google Business Profile setup, reviews, consistent listings, and the website signals that win the map pack.',
    datePublished: '2026-06-02',
    dateModified: '2026-06-02',
    keywords: [
      'local SEO Albany NY',
      'show up on Google Maps small business',
      'Google Business Profile setup Albany',
      'rank in Google map pack',
      'local search Capital Region',
    ],
    readingMinutes: 7,
    component: LocalSeoAlbany,
  },
  {
    slug: 'real-support-vs-ticket-queue-website',
    title: 'Real 24/7 Support vs. a Ticket Queue: Why Website Support Matters',
    description:
      'When your website breaks on a Saturday night, support is the only feature that matters. Why ongoing, real-human support is part of the product — and how MyLobstr Designs does it differently for Albany small businesses.',
    datePublished: '2026-05-29',
    dateModified: '2026-05-29',
    keywords: [
      'website support small business',
      '24/7 website support',
      'website maintenance Albany NY',
      'small business web support',
      'ongoing website support',
    ],
    readingMinutes: 5,
    component: SupportComparison,
  },
  {
    slug: 'restaurant-website-design-albany',
    title: 'Restaurant Websites vs. DoorDash: Why Your Albany Restaurant Needs Its Own Site',
    description:
      'Delivery apps take 15–30% per order and own your customers. What a restaurant website needs — text menu, reservations, local SEO — why it beats relying on apps, and what it costs in Albany NY.',
    datePublished: '2026-05-26',
    dateModified: '2026-05-26',
    keywords: [
      'restaurant website design Albany NY',
      'restaurant website vs DoorDash',
      'online menu website restaurant',
      'restaurant marketing Albany',
    ],
    readingMinutes: 6,
    component: RestaurantWebsiteAlbany,
  },
  {
    slug: 'website-vs-facebook-page-albany',
    title: 'Website vs. Facebook Page: What Albany Small Businesses Actually Need',
    description:
      'Social media keeps customers; Google search creates them. Why a Facebook page cannot rank for "salon near me", and how Albany salons, barbershops, and gyms use a website and social together.',
    datePublished: '2026-05-18',
    dateModified: '2026-05-18',
    keywords: [
      'website vs Facebook page small business',
      'salon website design Albany NY',
      'barbershop website Albany',
      'gym website design Albany',
      'do I need a website if I have Facebook',
    ],
    readingMinutes: 6,
    component: WebsiteVsFacebookAlbany,
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
