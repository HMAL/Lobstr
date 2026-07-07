// Single source of truth for the portfolio.
//
// Both the homepage hero "storefront street" (src/components/StorefrontStreet.tsx)
// and the Our Work grid (src/app/our-work/OurWorkGrid.tsx) read from here, so the
// two never drift apart. `live` marks a real, finished client site (drives the hero
// tile's Live vs Demo badge) — our own mylobstr.com demo builds are `false` even
// though they're reachable, because the builds themselves note they're works in
// progress. `screenshot` (when present) is a real capture we point the hero tile at
// instead of the stock `img`.

export type Project = {
  slug: string
  href: string
  business: string
  category: string
  emoji: string
  desc: string
  img: string
  accent: string
  border: string
  tag: string
  live: boolean
  screenshot?: string
}

// Real client sites we have genuine screenshots for.
export const liveWork: Project[] = [
  {
    slug: 'couponcompanions',
    href: 'https://couponcompanions.com',
    business: 'Coupon Companions',
    category: 'E-Commerce · Live',
    emoji: '🏷️',
    desc: 'A live e-commerce platform connecting shoppers with deals and coupons — built for scale with real users transacting daily.',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
    accent: 'from-amber-500/30 to-orange-500/20',
    border: 'hover:border-amber-500/40',
    tag: 'E-Commerce',
    live: true,
    screenshot: '/screenshots/cc-1.webp',
  },
  {
    slug: 'happyhomeshub',
    href: 'https://happyhomeshub.com',
    business: 'Happy Homes Hub',
    category: 'Web Application · Live',
    emoji: '🏠',
    desc: 'A full web application connecting homeowners, inhabitants, and handymen — multi-role platform with real users across all three sides.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    accent: 'from-sky-500/30 to-blue-500/20',
    border: 'hover:border-sky-500/40',
    tag: 'Marketplace',
    live: true,
    screenshot: '/screenshots/hhh-1.webp',
  },
]

export const demoWork: Project[] = [
  {
    slug: 'tandoori-grill',
    href: 'https://indianfood.mylobstr.com/',
    business: 'Tandoori Grill',
    category: 'Indian Restaurant · Live',
    emoji: '🍛',
    desc: 'A live Indian restaurant site — full menu, ordering, and atmosphere. A real build serving customers online, not just a mockup.',
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
    accent: 'from-orange-500/30 to-red-500/20',
    border: 'hover:border-orange-500/40',
    tag: 'Restaurant',
    live: false,
    screenshot: '/screenshots/tandoori-1.webp',
  },
  {
    slug: 'little-journeys',
    href: 'https://daycare.mylobstr.com/',
    business: 'Little Journeys Childcare',
    category: 'In-Home Daycare · Albany, NY',
    emoji: '🧸',
    desc: 'A warm in-home daycare site — programs, daily routine, and a simple way for parents to inquire and enroll. A real live site earning families’ trust.',
    img: 'https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=600&q=80',
    accent: 'from-amber-500/30 to-yellow-500/20',
    border: 'hover:border-amber-500/40',
    tag: 'Childcare',
    live: false,
    screenshot: '/screenshots/daycare-1.webp',
  },
  {
    slug: 'walworld',
    href: 'https://walworld.mylobstr.com/',
    business: 'Walworld International Supermarket',
    category: 'Grocery & Food Court · Albany, NY',
    emoji: '🛒',
    desc: 'An international supermarket site with fresh groceries, a food court, and shelf staples priced to show real savings — built to earn a shopper’s trust before they walk in.',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    accent: 'from-green-500/30 to-lime-500/20',
    border: 'hover:border-green-500/40',
    tag: 'Grocery',
    live: false,
  },
  {
    slug: 'pet',
    href: '/projects/pet',
    business: 'Happy Paws Vet & Grooming',
    category: 'Pet Care · Albany, NY',
    emoji: '🐾',
    desc: 'A full vet clinic site with online booking, services, and team profiles — built to show what a modern pet care business looks like online.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    accent: 'from-emerald-500/30 to-teal-500/20',
    border: 'hover:border-emerald-500/40',
    tag: 'Pet Care',
    live: false,
  },
  {
    slug: 'restaurant',
    href: '/projects/restaurant',
    business: 'Trattoria Albany',
    category: 'Restaurant · Albany, NY',
    emoji: '🍽️',
    desc: 'A restaurant demo with an online menu, reservation system, and photo gallery — so customers decide before they even walk in.',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    accent: 'from-orange-500/30 to-red-500/20',
    border: 'hover:border-orange-500/40',
    tag: 'Restaurant',
    live: false,
  },
  {
    slug: 'salon',
    href: '/projects/salon',
    business: 'The Cut Collective',
    category: 'Hair Salon · Troy, NY',
    emoji: '✂️',
    desc: 'A salon site where clients book appointments online, browse stylists, and see pricing — no more back-and-forth phone calls.',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    accent: 'from-pink-500/30 to-rose-500/20',
    border: 'hover:border-pink-500/40',
    tag: 'Salon',
    live: false,
  },
  {
    slug: 'barbershop',
    href: '/projects/barbershop',
    business: 'Capital Cuts Barbershop',
    category: 'Barbershop · Schenectady, NY',
    emoji: '💈',
    desc: 'A sharp, minimal barbershop site built for local SEO — shows hours, services, and makes it dead simple to walk in or book.',
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
    accent: 'from-violet-500/30 to-purple-500/20',
    border: 'hover:border-violet-500/40',
    tag: 'Barbershop',
    live: false,
  },
  {
    slug: 'plumbing',
    href: '/projects/plumbing',
    business: 'Albany Pro Plumbing',
    category: 'Home Services · Latham, NY',
    emoji: '🔧',
    desc: 'A contractor site that builds trust before the first call — with services, emergency contact, and a clear call-to-action above the fold.',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    accent: 'from-blue-500/30 to-cyan-500/20',
    border: 'hover:border-blue-500/40',
    tag: 'Home Services',
    live: false,
  },
  {
    slug: 'fitness',
    href: '/projects/fitness',
    business: 'Albany Iron Fitness',
    category: 'Gym & Fitness · Albany, NY',
    emoji: '💪',
    desc: 'A gym site with class schedules, membership tiers, and trainer profiles — so new members can sign up without ever picking up the phone.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    accent: 'from-yellow-500/30 to-orange-500/20',
    border: 'hover:border-yellow-500/40',
    tag: 'Fitness',
    live: false,
  },
  {
    slug: 'tutoring',
    href: '/projects/tutoring',
    business: 'Bright Minds Tutoring',
    category: 'Tutoring & Education · Albany, NY',
    emoji: '🎓',
    desc: 'A tutoring center site with programs, tutor profiles, parent reviews, and free assessment booking — built to earn parents\' trust at first glance.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    accent: 'from-indigo-500/30 to-blue-500/20',
    border: 'hover:border-indigo-500/40',
    tag: 'Education',
    live: false,
  },
]

// The address bar shown in each hero storefront tile. External sites show their
// bare domain; in-house demo builds honestly show their mylobstr.com/… path.
export function displayUrl(href: string): string {
  if (href.startsWith('http')) {
    return href.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
  return `mylobstr.com${href}`
}

// Curated, ordered subset for the hero street: the two real-screenshot client
// sites lead, then the other live builds, then a spread of demo trades so an
// owner can spot a business like theirs.
const bySlug = (slug: string): Project => {
  const all = [...liveWork, ...demoWork]
  const found = all.find((p) => p.slug === slug)
  if (!found) throw new Error(`heroShowcase: unknown project slug "${slug}"`)
  return found
}

export const heroShowcase: Project[] = [
  'happyhomeshub',
  'couponcompanions',
  'tandoori-grill',
  'little-journeys',
  'walworld',
  'salon',
  'plumbing',
  'fitness',
  'tutoring',
  'pet',
  'barbershop',
  'restaurant',
].map(bySlug)
