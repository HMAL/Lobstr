// Single source of truth for FAQ content. The visible accordion (content.tsx)
// and the FAQPage JSON-LD schema (page.tsx) both render from this data —
// Google requires FAQ schema to match visible page content.

export interface Faq {
  q: string
  a: string
  /** Included in the FAQPage JSON-LD schema */
  featured?: boolean
}

export interface FaqCategory {
  title: string
  faqs: Faq[]
}

export const faqCategories: FaqCategory[] = [
  {
    title: 'Who We Work With',
    faqs: [
      {
        q: 'Do you build websites for small businesses in Albany NY?',
        a: 'Yes — Mylobstr is based in Albany, NY and specializes in website design for local small businesses across Albany, Troy, Schenectady, Saratoga Springs, and the Capital Region. You work with a real local team, not an offshore agency.',
        featured: true,
      },
      {
        q: 'What types of small businesses do you build websites for?',
        a: 'All types — restaurants, barbershops, hair salons, plumbers, electricians, HVAC contractors, gyms, pet clinics, retail stores, and more. Any local business that needs a professional online presence.',
        featured: true,
      },
    ],
  },
  {
    title: 'Cost & Pricing',
    faqs: [
      {
        q: 'How much does a website cost?',
        a: 'Three plans, all transparent. Starter is a flat one-time $300 (a 5-page website for new businesses) with no monthly fee at all. Growing Business is $150 to build plus $30/mo (10 pages with logo design and full SEO). Scale is $250 to build plus $50/mo (20 pages with an admin panel). On Growing and Scale, the monthly covers hosting, support, and updates. No surprise invoices, no hidden fees.',
        featured: true,
      },
      {
        q: 'Are there any hidden fees I should know about?',
        a: 'None from us. The only outside cost is a domain name (~$12/year through a registrar like Namecheap), and on Growing Business and Scale plans we register it for you if it\'s under $20/year. Hosting, SSL, updates, and support are all included — in the one-time price on Starter, and in the monthly fee on Growing Business and Scale.',
        featured: true,
      },
      {
        q: 'Is there a long-term contract?',
        a: 'No contracts and no lock-in. On Growing Business and Scale you can cancel the monthly any time — we\'d rather earn your business each month than trap you. Starter is a one-time price, so there\'s nothing to cancel.',
        featured: true,
      },
      {
        q: 'What payment methods do you accept?',
        a: 'All major credit and debit cards, ACH bank transfer, and PayPal. Billing is monthly and fully automatic — set it and forget it.',
      },
      {
        q: 'What happens to my site if I cancel?',
        a: 'You keep your domain name. We\'ll export all your content (text, images, pages) in a portable format so you\'re never stranded. We can also help you migrate to another provider if needed.',
        featured: true,
      },
      {
        q: 'Do you offer refunds?',
        a: 'Yes — 14-day satisfaction guarantee. If you\'re not happy within the first 14 days, we refund your first payment in full, no questions asked.',
        featured: true,
      },
    ],
  },
  {
    title: 'Timeline & Process',
    faqs: [
      {
        q: 'How long does it take to build my website?',
        a: 'Most sites go live within 7 business days of receiving your content. Complex builds with custom features or ecommerce may take a little longer. We\'ll give you a firm timeline before we start.',
        featured: true,
      },
      {
        q: 'What\'s the process from start to launch?',
        a: 'Four steps: (1) Fill out our 10-minute brief online. (2) We design and build. (3) You review on a private preview link and give feedback. (4) We go live. Most clients are live within the week.',
      },
      {
        q: 'What do I need to provide to get started?',
        a: 'Just the basics: your business name, logo (or we\'ll create one), a few photos, your services or menu, hours, and contact info. If you have an existing site, share the link and we\'ll improve on it.',
      },
      {
        q: 'Can I see a preview before the site goes live?',
        a: 'Always. We share a private preview link before publishing anything. You get two rounds of revisions included, and we won\'t go live until you say the word.',
      },
      {
        q: 'What if I don\'t have photos or a logo?',
        a: 'Not a problem. We source professional stock photos that fit your business and can create a clean starter logo. Many clients launch with stock photos and swap in real ones after their first photoshoot.',
      },
      {
        q: 'Can I be involved in the design process?',
        a: 'As much or as little as you want. Some clients say "surprise me" and love what we build. Others want to approve every color and font. We work both ways — just tell us your preference upfront.',
      },
    ],
  },
  {
    title: 'Design & Branding',
    faqs: [
      {
        q: 'Can I choose my own colors and style?',
        a: 'Yes. We\'ll ask about your brand colors, preferred style (modern, warm, bold, minimal), and any websites you admire. If you have no preferences, we design something great and you approve or adjust.',
      },
      {
        q: 'How many pages will my website have?',
        a: 'It depends on your plan: Starter includes 5 pages, Growing Business includes 10, and Scale includes 20. A typical small business site covers Home, Services/Menu, About, Gallery, and Contact.',
      },
      {
        q: 'Can you match my existing branding?',
        a: 'Absolutely. Send us your logo, brand colors (hex codes if you have them), and any print materials. We\'ll make the website feel like a seamless extension of what you\'ve already built.',
      },
      {
        q: 'What if I want to change the design later?',
        a: 'Design refreshes are included in your monthly subscription. Want a seasonal look for the holidays? New color scheme after a rebrand? Just ask — we\'ll handle it.',
      },
      {
        q: 'Will my website look unique or like a template?',
        a: 'Every site is custom-built for your business. We don\'t use page builders or WordPress themes. Your site is coded from scratch, so it looks and performs exactly how it should.',
        featured: true,
      },
    ],
  },
  {
    title: 'Features & Functionality',
    faqs: [
      {
        q: 'Can customers book appointments through my website?',
        a: 'Yes — online booking is included on Growing Business and Scale plans. Customers book directly from your site, you receive email confirmations, and it syncs with Google Calendar so you\'re never double-booked.',
      },
      {
        q: 'Will my website work on phones and tablets?',
        a: 'Always. Every site is mobile-first by design — built for phones before anything else. Most people will find you on their phone, so we treat that as the main view, not an afterthought.',
      },
      {
        q: 'Can I take payments on my website?',
        a: 'Yes. We integrate Stripe or Square for deposits, prepayments, or product sales. We don\'t add any markup — you pay only the standard processing fee (2.9% + 30¢ per transaction).',
      },
      {
        q: 'Will my website show up on Google?',
        a: 'We set up all SEO basics: page titles, meta descriptions, sitemap, and Google Search Console submission — plus we claim and set up your Google Business Profile. Results typically appear within 2–8 weeks. We can\'t guarantee rankings, but we give Google everything it needs.',
        featured: true,
      },
      {
        q: 'Can I have a contact form on my site?',
        a: 'Every site includes a contact form with direct email delivery. We also add click-to-call on mobile and your full address with a Google Maps embed so customers can find you instantly.',
      },
      {
        q: 'Can I sell products online?',
        a: 'Basic product pages with Stripe checkout are included. For full ecommerce (inventory, shipping labels, variants, product catalog), we build on Shopify — same pricing, more power.',
      },
      {
        q: 'Can you connect my social media to my website?',
        a: 'Yes. We add links to your Instagram, Facebook, Google Business Profile, and any other platforms you use. We can also embed your Instagram feed directly on the site if you want fresh content automatically.',
      },
    ],
  },
  {
    title: 'Hosting, Domains & Tech',
    faqs: [
      {
        q: 'Do I need to buy a domain name?',
        a: 'Your domain (like yourshop.com) is yours to own. On Growing Business and Scale plans we register it for you (if under $20/year). On Starter, we walk you through buying it for ~$12/year, then connect it to your site. If you already have one, we\'ll link it for free.',
      },
      {
        q: 'Who hosts my website?',
        a: 'We host everything on Cloudflare — enterprise-grade global infrastructure with 99.9% uptime. Hosting is fully included in your monthly fee. No separate hosting bills.',
      },
      {
        q: 'Do I own my website?',
        a: 'You own your domain name and all your content. The site is hosted and maintained under your subscription. If you ever leave, we hand over all content and code files so you\'re never held hostage.',
        featured: true,
      },
      {
        q: 'Is my website secure?',
        a: 'Yes. Every site gets SSL (the padlock in the browser bar) automatically. Data is encrypted, Google sees it as secure, and we handle all security updates in the background.',
      },
      {
        q: 'Do I need any technical knowledge?',
        a: 'None. If you can send an email, you have all the technical skills needed to work with us. We handle everything — you focus on running your business.',
      },
      {
        q: 'What platform do you build on?',
        a: 'We build on Next.js — the same technology used by Airbnb, TikTok, and Nike. It\'s fast, secure, and scales without any extra cost. Your site won\'t slow down as it grows.',
      },
    ],
  },
  {
    title: 'After Launch & Support',
    faqs: [
      {
        q: 'What happens after my site goes live?',
        a: 'We monitor 24/7, handle any technical issues, and stay available by phone, text, or email. During the first months, we also make small improvements based on real visitor behavior.',
      },
      {
        q: 'Can I update my own content?',
        a: 'Yes. On the Scale plan you get an admin panel for updating hours, services, prices, and photos yourself. On any plan, just text us the change and we\'ll handle it within 24 hours.',
      },
      {
        q: 'What if my website goes down?',
        a: 'We get the alert before you do. Our uptime monitoring pings every 60 seconds. We have a 2-hour response SLA for any outage, and most issues are resolved in under 30 minutes.',
      },
      {
        q: 'Can I add new pages or features later?',
        a: 'Absolutely. Adding a gallery, blog, new service page, seasonal promotions — your site grows with your business. Page counts depend on your plan, and upgrading is easy.',
      },
      {
        q: 'How do I get in touch with you when I need help?',
        a: 'Phone, text, email, or the contact form on this site. We\'re an Albany-based team — you\'re talking to a real neighbor, not a support ticket queue. We usually respond within a few hours.',
      },
      {
        q: 'Do you offer any kind of guarantee?',
        a: '14-day money-back guarantee, no questions asked. And ongoing, if your site ever has downtime that\'s our fault for more than 4 hours, we credit that month\'s fee automatically.',
      },
    ],
  },
]
