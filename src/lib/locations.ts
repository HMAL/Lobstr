// Per-city landing content for the Capital Region. Each entry is genuinely
// distinct — real neighborhoods, anchors, and local business types — so the
// pages read as local content, not a templated city-swap. Consumed by
// /web-design/[city] (route + metadata + JSON-LD) and the sitemap/llms files.

export interface CityFaq {
  q: string
  a: string
}

export interface City {
  /** URL slug under /web-design/ — e.g. "troy-ny" → /web-design/troy-ny */
  slug: string
  /** City name without state, e.g. "Troy" */
  name: string
  /** "Troy, NY" */
  nameState: string
  /** Distance/relationship line used in copy, e.g. "just across the Hudson from Albany" */
  proximity: string
  /** <title> */
  title: string
  /** meta description */
  description: string
  keywords: string[]
  /** Hero sub-headline (the colored second line) */
  heroLine: string
  /** 2–3 sentence intro paragraph, locally specific */
  intro: string
  /** Why-local section: a paragraph about the city's business landscape */
  landscape: string
  /** Recognizable local anchors woven into copy (neighborhoods, landmarks) */
  anchors: string[]
  /** Local business types this city skews toward — drives the "who we build for" list */
  businessTypes: string[]
  /** City-specific FAQs (also emitted as FAQPage JSON-LD) */
  faqs: CityFaq[]
}

export const cities: City[] = [
  {
    slug: 'troy-ny',
    name: 'Troy',
    nameState: 'Troy, NY',
    proximity: 'just across the Hudson from Albany',
    title: 'Web Design Troy NY | Affordable Small Business Websites | MyLobstr Designs',
    description:
      'Affordable, custom website design for Troy, NY small businesses — starting at a flat one-time $300. A local Capital Region studio serving downtown Troy, Lansingburgh, and the Collar City. Live in about a week.',
    keywords: [
      'web design Troy NY',
      'website designer Troy NY',
      'affordable website design Troy NY',
      'small business website Troy NY',
      'web developer Troy New York',
      'cheap website design Troy NY',
    ],
    heroLine: 'built for the Collar City.',
    intro:
      'MyLobstr Designs builds affordable custom websites for small businesses in Troy, NY — and we are right next door, just across the Hudson from Albany. The Starter plan is a flat one-time $300 with no monthly fee, your site is hand-coded (no WordPress themes or page builders), and it goes live in about a week.',
    landscape:
      "Troy's small-business scene runs on independents — the Troy Waterfront Farmers Market vendors, the boutiques and antique shops along River Street, the breweries and restaurants downtown, and the makers and studios near the RPI campus. Those businesses need a website that loads fast on a phone, shows up when someone Googles them, and does not cost agency money. That is exactly what we build.",
    anchors: ['downtown Troy', 'River Street', 'Lansingburgh', 'the RPI area', 'the Troy Waterfront Farmers Market'],
    businessTypes: [
      'Restaurants, cafés & breweries',
      'River Street boutiques & antique shops',
      'Salons, barbershops & spas',
      'Contractors, plumbers & electricians',
      'Makers, studios & creative shops',
    ],
    faqs: [
      {
        q: 'Do you design websites for businesses in Troy, NY?',
        a: 'Yes. MyLobstr Designs is a Capital Region studio based across the Hudson in Albany, and Troy is one of our core service areas. We work with downtown Troy, River Street, Lansingburgh, and businesses near RPI. You deal with a local team you can actually call, not an offshore agency.',
      },
      {
        q: 'How much does a website cost for a Troy small business?',
        a: 'The same transparent pricing everywhere we work: Starter is a flat one-time $300 with no monthly fee, Growing Business is $150 to build plus $30/month, and Scale is $250 to build plus $50/month. There is no Troy surcharge and no hidden fees — the price you see is the price you pay.',
      },
      {
        q: 'Can we meet in person in Troy?',
        a: 'Yes — Troy is a short drive from our home base in Albany, so in-person is easy when you want it. Most of our Troy clients prefer phone, text, or email, but either way you are working with a real local person, not a ticket queue.',
      },
    ],
  },
  {
    slug: 'schenectady-ny',
    name: 'Schenectady',
    nameState: 'Schenectady, NY',
    proximity: 'a short drive up the Mohawk from Albany',
    title: 'Web Design Schenectady NY | Affordable Small Business Websites | MyLobstr Designs',
    description:
      'Affordable, custom website design for Schenectady, NY small businesses — starting at a flat one-time $300. A local Capital Region studio serving downtown Schenectady, the Stockade, and Union Street. Live in about a week.',
    keywords: [
      'web design Schenectady NY',
      'website designer Schenectady NY',
      'affordable website design Schenectady NY',
      'small business website Schenectady NY',
      'web developer Schenectady New York',
      'cheap website design Schenectady NY',
    ],
    heroLine: 'built for the Electric City.',
    intro:
      'MyLobstr Designs builds affordable custom websites for small businesses in Schenectady, NY — the Electric City, a short drive up the Mohawk from our home base in Albany. The Starter plan is a flat one-time $300 with no monthly fee, every site is hand-coded for speed, and it goes live in about a week.',
    landscape:
      "Schenectady has reinvented itself around its downtown — the restaurants and shops along lower State Street and near Proctors, the independents in the historic Stockade, and the trades and service businesses across Bellevue, Mont Pleasant, and Union Street. A clean, fast website is how those businesses get found by people searching nearby, and it should not require an agency budget to get one.",
    anchors: ['downtown Schenectady', 'the Stockade Historic District', 'Proctors', 'Union Street', 'lower State Street'],
    businessTypes: [
      'Restaurants, cafés & food trucks',
      'Retail shops & the Stockade independents',
      'Salons, barbershops & nail studios',
      'HVAC, plumbing & home-service contractors',
      'Medical, dental & professional offices',
    ],
    faqs: [
      {
        q: 'Do you design websites for businesses in Schenectady, NY?',
        a: 'Yes. MyLobstr Designs serves all of the Capital Region from our base in Albany, and Schenectady is one of our main areas. We build for downtown Schenectady, the Stockade, Union Street, and the surrounding neighborhoods — working with a local team, not an offshore shop.',
      },
      {
        q: 'How much does a website cost for a Schenectady small business?',
        a: 'Transparent, flat pricing: Starter is a one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month. No Schenectady markup, no surprise invoices — what you see is what you pay.',
      },
      {
        q: 'How fast can my Schenectady website go live?',
        a: 'Usually about a week from the time we have your content. Because we hand-code the site rather than wrestling a template, we can move quickly and still hand you something fast, clean, and built specifically for your business.',
      },
    ],
  },
  {
    slug: 'saratoga-springs-ny',
    name: 'Saratoga Springs',
    nameState: 'Saratoga Springs, NY',
    proximity: 'about 40 minutes north of Albany',
    title: 'Web Design Saratoga Springs NY | Small Business Websites | MyLobstr Designs',
    description:
      'Custom website design for Saratoga Springs, NY small businesses — affordable, starting at a flat one-time $300. A local Capital Region studio serving Broadway, downtown, and the Saratoga area. Live in about a week.',
    keywords: [
      'web design Saratoga Springs NY',
      'website designer Saratoga Springs NY',
      'affordable website design Saratoga NY',
      'small business website Saratoga Springs',
      'web developer Saratoga Springs New York',
      'Saratoga web design',
    ],
    heroLine: 'built for Saratoga.',
    intro:
      'MyLobstr Designs builds custom websites for small businesses in Saratoga Springs, NY — about 40 minutes north of our home base in Albany. You get an upscale, fast, mobile-first site for an honest price: the Starter plan is a flat one-time $300 with no monthly fee, hand-coded and live in about a week.',
    landscape:
      "Saratoga is a destination town — track season, the springs, SPAC, Skidmore, and a Broadway full of restaurants, boutiques, spas, and wellness businesses that all compete for visitors' attention online. A polished website that loads instantly and ranks for local searches matters more here than almost anywhere in the region, and you can have one without paying resort-town agency rates.",
    anchors: ['Broadway', 'downtown Saratoga', 'the Saratoga Race Course area', 'SPAC', 'the Skidmore area'],
    businessTypes: [
      'Restaurants, cafés & wine bars',
      'Boutiques & Broadway retail',
      'Spas, salons & wellness studios',
      'Hotels, inns & short-term rentals',
      'Event, tourism & hospitality services',
    ],
    faqs: [
      {
        q: 'Do you design websites for businesses in Saratoga Springs, NY?',
        a: 'Yes. Saratoga Springs is part of our Capital Region service area — we are based in Albany, about 40 minutes south. We build for Broadway, downtown, and the wider Saratoga area, with the polished look a destination town needs and the support of a real local team.',
      },
      {
        q: 'Is your pricing affordable for a Saratoga business?',
        a: 'Yes — that is the point. Saratoga rates can run high, but our pricing is flat and the same everywhere: Starter is a one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month. You get an upscale, custom site without the resort-town agency invoice.',
      },
      {
        q: 'Can you build a site ready for track season traffic?',
        a: 'Yes. Every site we build is hand-coded for speed and hosted on Cloudflare\'s global network, so it stays fast when seasonal traffic spikes. We can have your Saratoga site live in about a week — well ahead of your busy season.',
      },
    ],
  },
]

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug)
}
