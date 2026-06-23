import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Website Design Albany NY | Small Business Web Designer | Mylobstr',
  description: 'Mylobstr builds custom websites for small businesses in Albany, NY starting at $100. Professional website design, SEO, and hosting. Live in 7 days. Serving Albany, Troy, Schenectady & the Capital Region.',
  alternates: { canonical: 'https://mylobstr.com' },
}
import Hero from '@/components/Hero'
import ChooseWhereToBegin from '@/components/ChooseWhereToBegin'
import ClientFeelings from '@/components/ClientFeelings'
import TheWorkIsTheProof from '@/components/TheWorkIsTheProof'
import ReadyWhenYouAre from '@/components/ReadyWhenYouAre'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ChooseWhereToBegin />
      <ClientFeelings />
      <TheWorkIsTheProof />
      <ReadyWhenYouAre />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
