import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of Mylobstr website design and hosting services.',
  alternates: { canonical: 'https://mylobstr.com/terms' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-950 pt-32 pb-14 text-center">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Legal</p>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Terms of Service</h1>
        <p className="text-white/40 text-sm">Last updated: June 25, 2026</p>
      </section>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-16 legal-prose">
        <p className="lead text-gray-600">
          These Terms of Service ("Terms") govern your use of Mylobstr.com services. By engaging us to design, build, or host your website, you agree to these Terms. Please read them carefully.
        </p>

        <h2>1. Services</h2>
        <p>Mylobstr provides website design, development, hosting, and maintenance services for local businesses. The specific deliverables for each project are agreed upon before work begins and may include:</p>
        <ul>
          <li>Custom website design and development</li>
          <li>Online booking system integration</li>
          <li>Contact form and payment integration</li>
          <li>SEO setup and Google Search Console submission</li>
          <li>Hosting on enterprise-grade infrastructure</li>
          <li>Ongoing maintenance, updates, and 24/7 monitoring</li>
        </ul>

        <h2>2. Pricing & Payment</h2>
        <p>Our standard pricing is:</p>
        <ul>
          <li><strong>Starter:</strong> a flat one-time fee of $300 for design and development. There is no monthly fee on this plan.</li>
          <li><strong>Growing Business &amp; Scale:</strong> a one-time build fee ($150 or $250) plus a monthly fee ($30/month or $50/month) for hosting, maintenance, and support, beginning the month after your site launches.</li>
        </ul>
        <p>
          One-time fees are billed at project kickoff. Where a plan includes a monthly fee, it is charged via the payment method on file, with invoices sent 3 days before each billing date. All prices are in USD. We reserve the right to update pricing with 30 days advance written notice.
        </p>
        <p>
          Payments not received within 10 days of the due date may result in suspension of services until the balance is settled.
        </p>

        <h2>3. Client Responsibilities</h2>
        <p>To allow us to deliver your project on time, you agree to:</p>
        <ul>
          <li>Provide accurate business information, content, and materials within 5 business days of project kickoff</li>
          <li>Respond to review requests within 5 business days</li>
          <li>Ensure any content provided (photos, text, logos) does not infringe on third-party intellectual property rights</li>
          <li>Maintain payment of the monthly subscription fee to keep your site live</li>
        </ul>
        <p>Delays caused by lack of client response may extend the delivery timeline. Mylobstr is not responsible for delays caused by client inaction.</p>

        <h2>4. Intellectual Property</h2>
        <p>
          <strong>Your content:</strong> You own all content you provide — logos, photos, text, and business information. You grant Mylobstr a license to use this content solely to build and operate your website.
        </p>
        <p>
          <strong>Your domain:</strong> Domain names registered by or transferred to you remain your property at all times.
        </p>
        <p>
          <strong>Website code:</strong> The website code, design system, and infrastructure built by Mylobstr remain the intellectual property of Mylobstr and are licensed to you for use during your active subscription. Upon cancellation, we will provide an export of all your content in a portable format.
        </p>
        <p>
          <strong>Portfolio use:</strong> By using our services, you grant Mylobstr the right to display your completed website in our portfolio and marketing materials, unless you request otherwise in writing.
        </p>

        <h2>5. Cancellation</h2>
        <p>
          On plans with a monthly fee (Growing Business and Scale), you may cancel at any time by providing 30 days written notice via email to info@mylobstr.com. Your site will remain live until the end of the 30-day notice period, after which it is taken offline and your content exported and made available for 14 days. The Starter plan is a one-time purchase with no recurring fee, so there is nothing to cancel.
        </p>
        <p>
          Mylobstr reserves the right to cancel your subscription for non-payment, violation of these Terms, or any activity deemed harmful to our infrastructure or reputation. In such cases, we will provide 7 days notice except in cases of severe abuse.
        </p>

        <h2>6. Satisfaction Guarantee & Refunds</h2>
        <p>
          We offer a 14-day satisfaction guarantee on all new projects. If you are not satisfied with your website within the first 14 days of launch, contact us and we will issue a full refund of your build fee (or, on Starter, your one-time payment). See our <a href="/refund" className="text-blue-600">Refund Policy</a> for full details.
        </p>

        <h2>7. Uptime & Service Level</h2>
        <p>
          We target 99.9% uptime for hosted websites. In the event of an outage caused by Mylobstr infrastructure for more than 4 continuous hours, we will issue a credit equal to one month's subscription fee. This does not apply to outages caused by third-party providers, client-caused issues, or scheduled maintenance.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          Mylobstr is not liable for indirect, incidental, or consequential damages including lost revenue, lost data, or business interruption. Our total liability to you for any claim arising from our services is limited to the fees paid by you in the 3 months preceding the claim.
        </p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>
          Our services are provided "as is." We do not guarantee that your website will achieve any specific search ranking, conversion rate, or business outcome. SEO results depend on many factors outside our control.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of New York. Any disputes will be resolved in the courts of Albany County, New York.
        </p>

        <h2>11. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. We will notify active clients by email at least 14 days before changes take effect. Continued use of our services after that date constitutes acceptance of the updated Terms.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          Questions about these Terms?<br />
          <strong>Mylobstr.com</strong><br />
          Albany, NY Metro Area<br />
          Email: <a href="mailto:info@mylobstr.com" className="text-blue-600">info@mylobstr.com</a>
        </p>
      </main>

      <Footer />
    </div>
  )
}
