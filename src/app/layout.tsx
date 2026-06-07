import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import IdleModal from "@/components/IdleModal";
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
    "Mylobstr builds custom websites for small businesses in Albany, NY — starting at $75. Professional website design, web development, SEO, and hosting. Launch in 48 hours. Serving Albany, Troy, Schenectady, and the Capital Region.",
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
      "Custom websites for Albany NY small businesses — restaurants, salons, barbershops, contractors, gyms. Starting at $75. Launch in 48 hours.",
    type: "website",
    url: "https://mylobstr.com",
    siteName: "Mylobstr",
    images: [
      {
        url: "https://mylobstr.com/opengraph-image",
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
      "Custom websites for Albany NY small businesses starting at $75. Launch in 48 hours.",
    images: ["https://mylobstr.com/opengraph-image"],
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
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-FC1Y3Z3VDH';

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
        <IdleModal />
        {children}

        {/* ── Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Mylobstr",
              "alternateName": "MyLobstr Web Design",
              "description": "Custom website design and web development for small businesses in Albany, NY and the Capital Region. Professional, affordable websites starting at $75.",
              "url": "https://mylobstr.com",
              "email": "info@mylobstr.com",
              "logo": "https://mylobstr.com/logo.png",
              "image": "https://mylobstr.com/opengraph-image",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Albany",
                "addressRegion": "NY",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "42.6526",
                "longitude": "-73.7562"
              },
              "areaServed": [
                { "@type": "City", "name": "Albany, NY" },
                { "@type": "City", "name": "Troy, NY" },
                { "@type": "City", "name": "Schenectady, NY" },
                { "@type": "City", "name": "Saratoga Springs, NY" },
                { "@type": "AdministrativeArea", "name": "Capital Region, NY" }
              ],
              "serviceType": [
                "Website Design",
                "Web Development",
                "Small Business Website",
                "SEO Services",
                "Web Hosting",
                "Logo Design"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Website Design Packages",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": { "@type": "Service", "name": "Starter Website", "description": "5-page custom website for new businesses" },
                    "price": "75", "priceCurrency": "USD"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": { "@type": "Service", "name": "Growing Business Website", "description": "10-page custom website with logo, SEO, and booking" },
                    "price": "150", "priceCurrency": "USD"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": { "@type": "Service", "name": "Scale Website", "description": "20-page custom website with admin panel and multi-location support" },
                    "price": "250", "priceCurrency": "USD"
                  }
                ]
              },
              "priceRange": "$",
              "openingHours": "Mo-Su 00:00-23:59",
              "sameAs": [
                "https://mylobstr.com"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mylobstr",
              "url": "https://mylobstr.com",
              "description": "Website design and web development for small businesses in Albany, NY"
            })
          }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}')`}
        </Script>
      </body>
    </html>
  );
}
