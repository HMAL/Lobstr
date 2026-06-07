import type { Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: 'Website Design FAQ Albany NY | Small Business Web Questions | Mylobstr',
  description: 'Common questions Albany small business owners ask about website design — cost, timeline, hosting, SEO, and support. Answered honestly by Mylobstr.',
  keywords: ['website design faq', 'how much does a website cost small business', 'website design questions Albany NY', 'small business website help'],
  alternates: { canonical: 'https://mylobstr.com/faq' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a website cost for a small business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mylobstr offers three plans: Starter at $75 (5-page website for new businesses), Growing Business at $150 (10-page with logo and SEO), and Scale at $250 (20-page with admin panel). Monthly hosting starts at $10/month after launch. No contracts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a small business website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most websites are designed and launched within 48–72 hours of receiving your content. Complex builds with custom features may take 5–7 business days. We give you a firm timeline before starting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you build websites for small businesses in Albany NY?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Mylobstr is based in Albany, NY and specializes in website design for local small businesses across Albany, Troy, Schenectady, and the Capital Region. We build sites for restaurants, salons, barbershops, contractors, gyms, pet clinics, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a contract or long-term commitment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No contracts and no lock-in. Cancel any time. We earn your business every month — not by trapping you. A 14-day money-back guarantee is included on every plan.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in the website design price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every plan includes custom website design, mobile-first responsive layout, SSL certificate, SEO setup (meta tags, sitemap, Google Analytics), contact form, and hosting. Growing Business and Scale plans also include logo design and domain registration (if under $20/year).',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer SEO with website design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every Mylobstr website includes basic SEO — meta tags, XML sitemap, Google Analytics, and Google Search Console setup. Growing Business and Scale plans include full SEO with Google Business Profile setup and schema markup.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of small businesses do you build websites for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We build websites for all types of small businesses — restaurants, barbershops, hair salons, plumbers, electricians, HVAC contractors, gyms, pet clinics, retail stores, and more. Any local Albany-area business that needs a professional online presence.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my website if I cancel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You own your domain and all your content. We export everything in a portable format so you can take it anywhere. We can also help you migrate to another provider. You are never locked in.',
      },
    },
  ],
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Content />
    </>
  )
}
