import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: "MyLobstr Designs's 14-day satisfaction guarantee and refund process.",
  alternates: { canonical: 'https://mylobstr.com/refund' },
}

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-950 pt-32 pb-14 text-center">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Legal</p>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Refund Policy</h1>
        <p className="text-white/40 text-sm">Last updated: June 25, 2026</p>
      </section>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-16 legal-prose">
        <p className="lead text-gray-600">
          We stand behind our work. If you're not happy, we make it right — or we refund you.
        </p>

        <h2>14-Day Satisfaction Guarantee</h2>
        <p>
          Every new website project comes with a 14-day satisfaction guarantee. If your website launches and you are not satisfied with the result within the first 14 days, contact us and we will issue a full refund of your build fee ($150–$300 depending on plan).
        </p>
        <p>No hoops. No lengthy back-and-forth. We'll ask what went wrong (so we can improve), process your refund, and part on good terms.</p>

        <h2>What's Eligible for a Refund</h2>
        <ul>
          <li>The initial build fee ($150–$300 depending on plan) within 14 days of your site going live</li>
          <li>Monthly subscription fees charged in error</li>
          <li>Duplicate charges</li>
        </ul>

        <h2>What's Not Eligible</h2>
        <ul>
          <li>Refund requests made after 14 days of the site launch date</li>
          <li>Monthly fees for services already rendered (hosting, maintenance, support)</li>
          <li>Domain registration fees (paid to the domain registrar, not to us)</li>
          <li>Third-party service fees (Stripe processing fees, etc.)</li>
          <li>Cases where the client provided inaccurate information that caused project issues</li>
        </ul>

        <h2>How to Request a Refund</h2>
        <p>To request a refund, email us at <a href="mailto:info@mylobstr.com" className="text-blue-600">info@mylobstr.com</a> with:</p>
        <ul>
          <li>Your name and business name</li>
          <li>The reason for your refund request</li>
          <li>The date your site launched</li>
        </ul>
        <p>We will respond within 2 business days to confirm receipt of your request.</p>

        <h2>Processing Time</h2>
        <p>
          Approved refunds are processed within 5–10 business days. The refund will be returned to the original payment method. Processing times may vary depending on your bank or card issuer.
        </p>

        <h2>Uptime Credits</h2>
        <p>
          In addition to the satisfaction guarantee, if your website experiences downtime caused by our infrastructure for more than 4 continuous hours, we automatically apply a credit equal to one month's subscription fee to your next invoice. No request needed.
        </p>

        <h2>Questions?</h2>
        <p>
          We want every client to be happy. If something isn't right, reach out before requesting a refund — most issues can be resolved quickly.<br /><br />
          Email: <a href="mailto:info@mylobstr.com" className="text-blue-600">info@mylobstr.com</a><br />
          Albany, NY Metro Area
        </p>
      </main>

      <Footer />
    </div>
  )
}
