import type { ComponentType } from 'react'
import BigCorporationWebsites from '@/content/posts/what-small-businesses-learn-from-big-corporation-websites'
import CostVsFeatures from '@/content/posts/website-cost-vs-features-small-business'
import FeaturesExplained from '@/content/posts/small-business-website-features-explained'
import SupportComparison from '@/content/posts/real-support-vs-ticket-queue-website'

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
    slug: 'real-support-vs-ticket-queue-website',
    title: 'Real 24/7 Support vs. a Ticket Queue: Why Website Support Matters',
    description:
      'When your website breaks on a Saturday night, support is the only feature that matters. Why ongoing, real-human support is part of the product — and how Mylobstr does it differently for Albany small businesses.',
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
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
