import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Mylobstr collects, uses, and protects your personal information.',
  alternates: { canonical: 'https://mylobstr.com/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-950 pt-32 pb-14 text-center">
        <p className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-3">Legal</p>
        <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">Privacy Policy</h1>
        <p className="text-white/40 text-sm">Last updated: June 5, 2026</p>
      </section>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-16 legal-prose">
        <p className="lead text-gray-600">
          Mylobstr.com ("we," "us," or "our") operates the website at mylobstr.com. This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using our site or services, you agree to the practices described here.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>Information you provide directly</h3>
        <p>When you contact us, request a quote, or sign up for our services, we collect:</p>
        <ul>
          <li>Name and business name</li>
          <li>Email address and phone number</li>
          <li>Business address and website URL</li>
          <li>Any other information you include in a message or form submission</li>
        </ul>

        <h3>Information collected automatically</h3>
        <p>When you visit our website, we automatically collect:</p>
        <ul>
          <li>IP address and general location (city/country level)</li>
          <li>Browser type, device type, and operating system</li>
          <li>Pages visited, time on site, and referring URL</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to inquiries and deliver the services you requested</li>
          <li>Send project updates, invoices, and support communications</li>
          <li>Improve our website and understand how visitors use it</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>We do not sell your personal information to third parties — ever.</p>

        <h2>3. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies (including Google Analytics) to understand website traffic and improve our services. You can disable cookies in your browser settings at any time. Doing so may affect certain features of the site.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>We use the following third-party services to operate our business:</p>
        <ul>
          <li><strong>Google Analytics</strong> — website traffic analysis. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600">Google's Privacy Policy</a></li>
          <li><strong>Resend</strong> — email delivery for contact form submissions. <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600">Resend's Privacy Policy</a></li>
          <li><strong>Vercel</strong> — website hosting and infrastructure. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600">Vercel's Privacy Policy</a></li>
          <li><strong>Stripe / Square</strong> — payment processing (if applicable). Data is handled directly by these processors under their own privacy policies.</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Contact form submissions are kept for up to 3 years. You may request deletion at any time by contacting us.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We implement industry-standard security measures including SSL encryption, secure hosting infrastructure, and access controls. No method of transmission over the internet is 100% secure, but we take all reasonable precautions to protect your data.
        </p>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>
        <p>To exercise any of these rights, email us at <a href="mailto:info@mylobstr.com" className="text-blue-600">info@mylobstr.com</a>.</p>

        <h2>8. Children's Privacy</h2>
        <p>
          Our services are not directed to anyone under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, please contact us immediately and we will delete it.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the updated version on this page with a revised "Last updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          Questions about this Privacy Policy? Reach us at:<br />
          <strong>Mylobstr.com</strong><br />
          Albany, NY Metro Area<br />
          Email: <a href="mailto:info@mylobstr.com" className="text-blue-600">info@mylobstr.com</a>
        </p>
      </main>

      <Footer />
    </div>
  )
}
