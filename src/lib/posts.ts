import type { ComponentType } from 'react'
import WebsiteCostAlbany from '@/content/posts/website-cost-small-business-albany-ny'
import LocalSeoAlbany from '@/content/posts/local-seo-albany-small-business'
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
  emoji: string
  component: ComponentType
}

export const posts: Post[] = [
  {
    slug: 'website-cost-small-business-albany-ny',
    title: 'How Much Does a Website Cost for a Small Business in Albany, NY? (2026 Guide)',
    description:
      'Real 2026 numbers: DIY builders vs. freelancers vs. agencies vs. local studios. What an Albany small business website should cost, what it must include, and the hidden fees to ask about.',
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
    emoji: '💰',
    component: WebsiteCostAlbany,
  },
  {
    slug: 'local-seo-albany-small-business',
    title: 'Local SEO for Albany Small Businesses: How to Show Up on Google Maps',
    description:
      'A plain-English local SEO playbook for Albany, Troy, and Schenectady businesses: Google Business Profile setup, reviews, consistent listings, and the website signals that win the map pack.',
    datePublished: '2026-06-02',
    dateModified: '2026-06-02',
    keywords: [
      'local SEO Albany NY',
      'show up on Google Maps small business',
      'Google Business Profile setup Albany',
      'rank in Google map pack',
      'local search Capital Region',
    ],
    readingMinutes: 8,
    emoji: '📍',
    component: LocalSeoAlbany,
  },
  {
    slug: 'restaurant-website-design-albany',
    title: 'Why Your Albany Restaurant Needs Its Own Website (Not Just DoorDash and Facebook)',
    description:
      'Delivery apps take 15–30% per order and Facebook pages don’t rank on Google. What a restaurant website needs — text menu, reservations, local SEO — and what it costs in Albany NY.',
    datePublished: '2026-05-26',
    dateModified: '2026-05-26',
    keywords: [
      'restaurant website design Albany NY',
      'restaurant website vs DoorDash',
      'online menu website restaurant',
      'restaurant marketing Albany',
    ],
    readingMinutes: 6,
    emoji: '🍝',
    component: RestaurantWebsiteAlbany,
  },
  {
    slug: 'website-vs-facebook-page-albany',
    title: 'Website vs. Facebook Page: What Albany Salons, Barbershops, and Gyms Actually Need',
    description:
      'Social media keeps customers; Google search creates them. Why a Facebook page can’t rank for “salon near me,” and how Albany salons, barbershops, and gyms use both together.',
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
    emoji: '⚖️',
    component: WebsiteVsFacebookAlbany,
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
