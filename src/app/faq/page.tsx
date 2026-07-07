import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { faqCategories } from './faq-data'
import Content from './content'

export const metadata: Metadata = {
  title: { absolute: 'Website Design FAQ Albany NY | Small Business Web Questions | MyLobstr Designs' },
  description: 'Common questions Albany small business owners ask about website design — cost, timeline, hosting, SEO, and support. Answered honestly by MyLobstr Designs.',
  keywords: ['website design faq', 'how much does a website cost small business', 'website design questions Albany NY', 'small business website help'],
  alternates: { canonical: 'https://mylobstr.com/faq' },
}

// Built from the same data the visible accordion renders, so the schema always
// matches on-page content (a Google requirement for FAQ rich results).
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories
    .flatMap((cat) => cat.faqs)
    .filter((faq) => faq.featured)
    .map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
}

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ])}
      />
      <Content />
    </>
  )
}
