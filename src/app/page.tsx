import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Services from '@/components/Services'
import PortfolioStrip from '@/components/PortfolioStrip'
import PricingTeaser from '@/components/PricingTeaser'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Services />
      <PortfolioStrip />
      <PricingTeaser />
      <Testimonials />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
