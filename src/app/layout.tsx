import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: {
    default: "Mylobstr — Web Design for Local Businesses",
    template: "%s | Mylobstr",
  },
  description:
    "Mylobstr builds beautiful, high-converting websites for local businesses — restaurants, pet clinics, salons, barbershops, plumbers, and gyms. Launch in 48 hours starting at $100.",
  keywords: [
    "local business website design",
    "small business website",
    "restaurant website design",
    "pet clinic website",
    "salon website design",
    "barbershop website",
    "plumber website",
    "gym website design",
    "web design agency Albany NY",
    "affordable web design",
    "website with online booking",
  ],
  openGraph: {
    title: "Mylobstr — Web Design for Local Businesses",
    description:
      "Beautiful, animated websites for local businesses. Pet clinics, restaurants, salons, barbershops, plumbers, and gyms. Launch in 48 hours starting at $100.",
    type: "website",
    url: "https://mylobstr.com",
    siteName: "Mylobstr",
    images: [
      {
        url: "https://mylobstr.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mylobstr — Web Design for Local Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mylobstr — Web Design for Local Businesses",
    description:
      "Beautiful websites for local businesses. Launch in 48 hours starting at $100.",
    images: ["https://mylobstr.com/opengraph-image"],
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
        {children}
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
