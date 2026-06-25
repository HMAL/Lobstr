import type { Metadata } from "next";
import { Suspense } from "react";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mylobstr.com"),
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  title: {
    default: "Website Design Albany NY | Small Business Web Designer | Mylobstr",
    template: "%s | Mylobstr",
  },
  description:
    "Mylobstr builds custom websites for small businesses in Albany, NY — starting at $300. Professional website design, web development, SEO, and hosting. Live in 7 days. Serving Albany, Troy, Schenectady, and the Capital Region.",
  keywords: [
    "website design Albany NY",
    "web designer Albany NY",
    "small business website design",
    "website developer Albany NY",
    "affordable website design Albany",
    "custom website design",
    "web design company Albany NY",
    "website designer near me",
    "professional web design Albany",
    "small business web developer",
    "local business website design",
    "website design Troy NY",
    "website design Schenectady NY",
    "Capital Region web design",
    "cheap website design small business",
    "restaurant website design Albany",
    "salon website design Albany",
    "contractor website design Albany",
    "website with SEO Albany NY",
    "affordable web design New York",
  ],
  openGraph: {
    title: "Website Design Albany NY | Small Business Web Designer | Mylobstr",
    description:
      "Custom websites for Albany NY small businesses — restaurants, salons, barbershops, contractors, gyms. Starting at $300. Live in about a week.",
    type: "website",
    url: "https://mylobstr.com",
    siteName: "Mylobstr",
    images: [
      {
        url: "https://mylobstr.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mylobstr — Website Design for Albany NY Small Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design Albany NY | Small Business Web Designer | Mylobstr",
    description:
      "Custom websites for Albany NY small businesses starting at $300. Live in 7 days.",
    images: ["https://mylobstr.com/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://mylobstr.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Google Search Console ownership verification. Set the token in .env.local
  // (and the Cloudflare env) as GOOGLE_SITE_VERIFICATION to emit the meta tag.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-FC1Y3Z3VDH';

const SITE_URL = 'https://mylobstr.com';

// Official profiles for brand-entity recognition (schema.org sameAs). This is the
// signal that tells Google "Mylobstr" is a real brand, not a typo for "lobster".
// Add Instagram / Facebook / LinkedIn / X URLs here as they go live.
const SAME_AS = [
  'https://maps.app.goo.gl/VSpNFM1BWebdBLvH7', // Google Business Profile
];

// One linked @graph so Google resolves a single entity (Knowledge Panel) instead
// of separate, unrelated blocks. Organization carries sameAs; WebSite and the
// ProfessionalService reference it by @id.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Mylobstr',
      alternateName: 'MyLobstr Web Design',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
      image: `${SITE_URL}/opengraph-image.png`,
      email: 'info@mylobstr.com',
      telephone: '+1-518-677-6688',
      description:
        'Custom website design and web development for small businesses in Albany, NY and the Capital Region. Professional, affordable websites starting at $300.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-518-677-6688',
        email: 'info@mylobstr.com',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: 'English',
      },
      sameAs: SAME_AS,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Mylobstr',
      description: 'Website design and web development for small businesses in Albany, NY',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: 'Mylobstr',
      alternateName: 'MyLobstr Web Design',
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      url: SITE_URL,
      email: 'info@mylobstr.com',
      telephone: '+1-518-677-6688',
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/opengraph-image.png`,
      description:
        'Custom website design and web development for small businesses in Albany, NY and the Capital Region. Professional, affordable websites starting at $300.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Albany',
        addressRegion: 'NY',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: '42.6526', longitude: '-73.7562' },
      areaServed: [
        { '@type': 'City', name: 'Albany, NY' },
        { '@type': 'City', name: 'Troy, NY' },
        { '@type': 'City', name: 'Schenectady, NY' },
        { '@type': 'City', name: 'Saratoga Springs, NY' },
        { '@type': 'AdministrativeArea', name: 'Capital Region, NY' },
      ],
      serviceType: [
        'Website Design',
        'Web Development',
        'Small Business Website',
        'SEO Services',
        'Web Hosting',
        'Logo Design',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Website Design Packages',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Starter Website', description: '5-page custom website for new businesses — flat one-time price, no monthly fee' },
            price: '300',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Growing Business Website', description: '10-page custom website with logo, SEO, and booking' },
            price: '150',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Scale Website', description: '20-page custom website with admin panel and multi-location support' },
            price: '250',
            priceCurrency: 'USD',
          },
        ],
      },
      sameAs: SAME_AS,
      priceRange: '$',
      openingHours: 'Mo-Su 00:00-23:59',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <AnalyticsPageView />
        </Suspense>
        {children}

        {/* ── Structured Data (linked entity graph) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false})`}
        </Script>
      </body>
    </html>
  );
}
