// Per-industry landing content. Each entry targets a distinct business vertical
// ("web design for dentists" style searches) rather than a city — genuinely
// different pain points, needs, and FAQs per industry, not a keyword-swapped
// template. Consumed by /industries (hub) and /industries/[niche] (route +
// metadata + JSON-LD), and by the sitemap/llms files.
//
// `faqs` are written as the actual long-tail questions people type into Google
// (or that trigger "People also ask"), not generic marketing copy — the point is
// to match a real search query, not just to fill space. They back the FAQPage
// JSON-LD emitted on the route (see faqPageSchema in src/lib/schema.ts), which
// only helps if the questions are genuinely things people search.
//
// `recommendedPlan` ties back to the 3 plans in src/components/Pricing.tsx
// (Starter = 5 pages, no monthly, no booking; Growing = 10 pages + full SEO +
// online booking; Scale = 20 pages + admin panel + multi-location). Recommend
// Growing whenever the business fundamentally needs online booking/ordering;
// Scale when the business needs to self-manage a lot of changing content
// (listings, multi-location); Starter for a simple, mostly-static presence.

export interface IndustryFaq {
  q: string
  a: string
}

export type PlanId = 'starter' | 'growing' | 'scale'

export interface Industry {
  /** URL slug under /industries/ — e.g. "dentists" -> /industries/dentists */
  slug: string
  /** Plural display name, e.g. "Dentists" */
  name: string
  /** Singular noun used mid-sentence, e.g. "dental practice" */
  singular: string
  /** <title> */
  title: string
  /** meta description */
  description: string
  keywords: string[]
  /** Hero sub-headline (the colored second line, after "Website design for {name}") */
  heroLine: string
  /** 2–3 sentence intro paragraph — names Albany/Troy/Saratoga Springs for local relevance */
  intro: string
  /** Pain point -> outcome paragraph specific to how this industry loses/wins customers online */
  painPoint: string
  /** What a site in this vertical needs to actually do its job — drives the checklist section */
  whatTheyNeed: string[]
  /** Which of the 3 plans fits this industry best */
  recommendedPlan: PlanId
  /** 1–2 sentences: why that plan (not the others) fits this industry */
  recommendedReason: string
  /** 2–3 other industry slugs to cross-link for internal linking */
  relatedSlugs: string[]
  /** Long-tail, search-phrased questions — also emitted as FAQPage JSON-LD */
  faqs: IndustryFaq[]
}

export const industries: Industry[] = [
  {
    slug: 'dentists',
    name: 'Dentists',
    singular: 'dental practice',
    title: 'Website Design for Dentists in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for dental practices in Albany, NY and the Capital Region — online appointment requests, new-patient forms, and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'dentist website design Albany NY',
      'dental website design',
      'dental practice web design',
      'website for dentist',
      'affordable dentist website Capital Region',
    ],
    heroLine: 'that turns "dentist near me" searches into booked appointments.',
    intro:
      'MyLobstr Designs builds custom websites for dental practices across Albany, NY, Troy, and Saratoga Springs. Every site is hand-coded — no dental-directory templates — and built around the one thing that matters: getting a new patient from a Google search to a booked appointment. The Starter plan is a flat one-time $300 with no monthly fee, and your site is live in about a week.',
    painPoint:
      'Most new patients pick a dentist the same way they pick a restaurant: they search, they compare a few sites, and they call the one that looks legitimate and makes booking easy. A practice with an outdated site, no visible phone number, or no way to request an appointment online loses that patient to the next result — even with better dentistry and a closer office.',
    whatTheyNeed: [
      'An online appointment request form, not just a phone number',
      'New-patient forms available before the first visit',
      'Services and accepted insurance listed clearly',
      'Google Maps and directions visible without scrolling',
      'A simple smile/office photo gallery for trust',
      'Mobile-first design — most "dentist near me" searches happen on a phone',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'Dental practices need real online appointment booking (a Growing-plan feature, not included on Starter) plus enough pages for services, insurance, and a team bio — the 10-page Growing plan and its full SEO fit that better than a 5-page Starter site.',
    relatedSlugs: ['primary-care', 'pet-care'],
    faqs: [
      {
        q: 'How much does a website cost for a dental practice?',
        a: 'Flat, transparent pricing across every industry we build for: Starter is a one-time $300 with no monthly fee, Growing Business is $150 to build plus $30/month, and Scale is $250 to build plus $50/month. No "contact us for a quote."',
      },
      {
        q: 'What should a dentist website include?',
        a: 'At minimum: an online appointment request form, services and accepted insurance, new-patient forms, a map, and a simple office/smile gallery. Those five things answer what a prospective patient actually wants to know before calling.',
      },
      {
        q: 'Can patients book or request appointments through the website?',
        a: 'Yes — the Growing Business plan includes real online booking synced to your calendar, so a request lands directly on your schedule instead of in an inbox or on hold.',
      },
      {
        q: 'Do you build dentist websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — we\'re based in Albany and build for dental practices across the Capital Region, including Troy and Saratoga Springs.',
      },
      {
        q: 'How long does it take to get a dental practice website live?',
        a: 'About a week from the time we have your content (logo, photos, services, insurance list) — because we hand-code rather than customize a template, we can move fast without cutting corners.',
      },
    ],
  },
  {
    slug: 'contractors',
    name: 'Contractors',
    singular: 'contracting business',
    title: 'Website Design for Contractors in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for contractors and home-service businesses in Albany, NY and the Capital Region — free-estimate forms, project photos, and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'contractor website design Albany NY',
      'home improvement website design',
      'contractor web design Capital Region',
      'website for general contractor',
      'affordable contractor website',
    ],
    heroLine: 'built to win the call before the next contractor does.',
    intro:
      'MyLobstr Designs builds custom websites for contractors and home-service businesses across Albany, NY, Troy, and Saratoga Springs — general contractors, remodelers, electricians, and more. Sites are hand-coded for speed and built to make a homeowner comfortable enough to call. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'A homeowner with a project usually gets three quotes, and narrows that list online before anyone picks up a phone. A contractor with no site, or a thin one-page site with no photos or license info, gets crossed off that list fast — regardless of the quality of the work.',
    whatTheyNeed: [
      'A free-estimate request form, not just a phone number',
      'A service-area map so people know if you cover them',
      'Before/after project photos',
      'License and insurance info stated clearly',
      'A click-to-call button that works on mobile',
      'Reviews front and center, not buried on a separate page',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'Contractors live or die on estimate requests, which needs the Growing plan\'s online booking/lead-form feature, plus enough pages (10) to show project photos, services, and a real service area.',
    relatedSlugs: ['hvac', 'auto-repair'],
    faqs: [
      {
        q: 'How much does a contractor website cost?',
        a: 'Flat, transparent pricing: Starter is a one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month for multi-crew or multi-location businesses.',
      },
      {
        q: 'What should a contractor website include?',
        a: 'A free-estimate request form, a clear service area, before/after project photos, your license and insurance info, and reviews — those are the things a homeowner checks before calling.',
      },
      {
        q: 'Can customers request a free estimate through the site?',
        a: 'Yes — every Growing and Scale site includes an estimate/quote request form built into the homepage, so a homeowner comparing contractors can reach you without waiting for a callback.',
      },
      {
        q: 'Do you build websites for contractors in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — general contractors, remodelers, and home-service trades across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How fast can a contractor website go live?',
        a: 'Usually about a week once we have your project photos, services, and service area — we hand-code every site rather than wrestling a template.',
      },
    ],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    singular: 'restaurant',
    title: 'Website Design for Restaurants in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for restaurants in Albany, NY and the Capital Region — online menus, reservations, and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'restaurant website design Albany NY',
      'website for restaurant with online menu',
      'small restaurant web design',
      'restaurant web design Capital Region',
      'affordable restaurant website',
    ],
    heroLine: 'that gets you found before the dinner rush.',
    intro:
      'MyLobstr Designs builds custom websites for restaurants, cafés, and breweries across Albany, NY, Troy, and Saratoga Springs. Every site is hand-coded and mobile-first, built around the questions a hungry diner actually asks: what\'s on the menu, is it open, and where is it. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'Someone searching "restaurant near me" checks the menu and hours before they decide, usually on their phone, usually in under a minute. A Facebook page with a photo of last year\'s menu, or no site at all, loses that decision to the restaurant three doors down with a clean site that answers those questions immediately.',
    whatTheyNeed: [
      'An online menu with real prices, updatable anytime',
      'Hours, location, and Google Maps visible immediately',
      'A reservation or online-ordering link',
      'A photo gallery of food and atmosphere',
      'Mobile-first design — most searches happen on a phone, often while deciding where to eat right now',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'Restaurants need a menu that\'s easy to keep current, a reservation/ordering link, and enough pages for gallery, events, and catering — the 10-page Growing plan with full SEO covers that; a 5-page Starter site is usually too thin for a working restaurant menu plus everything else.',
    relatedSlugs: ['mexican-restaurants', 'coffee-shops'],
    faqs: [
      {
        q: 'How much does a restaurant website cost?',
        a: 'The same transparent pricing everywhere: Starter is a flat one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month for multi-location restaurant groups.',
      },
      {
        q: 'What should a restaurant website include?',
        a: 'An online menu with real prices, hours and location up top, a reservation or ordering link, and a photo gallery — those are the four things a diner checks before deciding.',
      },
      {
        q: 'Can we update the menu ourselves once the site is live?',
        a: 'Yes — every plan includes a way to update your menu and hours without calling us, so prices and specials never go stale on the site.',
      },
      {
        q: 'Do you build restaurant websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — restaurants, cafés, and breweries across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How long does it take to get a restaurant website live?',
        a: 'About a week once we have your menu, photos, and hours — see our Trattoria Albany demo linked from Our Work for the kind of layout we build.',
      },
    ],
  },
  {
    slug: 'hvac',
    name: 'HVAC Companies',
    singular: 'HVAC business',
    title: 'Website Design for HVAC Companies in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for HVAC and home-comfort businesses in Albany, NY and the Capital Region — emergency-call CTAs, service plans, and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'HVAC website design Albany NY',
      'heating and cooling website design',
      'HVAC web design Capital Region',
      'website for HVAC company',
      'affordable HVAC contractor website',
    ],
    heroLine: 'that rings the phone when the furnace goes out.',
    intro:
      'MyLobstr Designs builds custom websites for HVAC and home-comfort companies across Albany, NY, Troy, and Saratoga Springs. These sites are built around urgency — a furnace or AC failure is a same-day decision — so speed and a visible phone number matter more here than almost any other industry. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'Searches like "furnace repair near me" or "AC not working" are high-intent and immediate, almost always on a phone, almost always answered by whichever site loads fastest and shows a phone number without scrolling. A slow site or one that buries contact info behind a menu loses that emergency call to the next listing.',
    whatTheyNeed: [
      'A click-to-call button above the fold',
      '24/7 emergency service messaging stated clearly',
      'Service area and seasonal maintenance-plan info',
      'A free-estimate request form for non-emergency jobs',
      'Reviews and licensing badges for trust at a glance',
      'A fast-loading mobile site — no one waits during a breakdown',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'HVAC companies need online scheduling for maintenance visits and estimates (a Growing-plan feature) plus room for seasonal plans and service pages; a multi-crew or multi-location HVAC company should look at Scale instead.',
    relatedSlugs: ['contractors', 'auto-repair'],
    faqs: [
      {
        q: 'How much does an HVAC company website cost?',
        a: 'Flat, transparent pricing: Starter is a one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month for multi-crew or multi-location HVAC businesses.',
      },
      {
        q: 'What should an HVAC website include?',
        a: 'A click-to-call button above the fold, clear 24/7 emergency messaging, your service area, and a way to request a free estimate for non-emergency work.',
      },
      {
        q: 'Can the site handle emergency service calls well?',
        a: 'Yes — every HVAC site we build puts a click-to-call button and 24/7 messaging above the fold, since most emergency searches happen on a phone and convert in seconds, not minutes.',
      },
      {
        q: 'Do you build HVAC websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — heating and cooling businesses across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How fast can an HVAC website go live?',
        a: 'About a week from the time we have your services, service area, and any licensing info — we hand-code every site rather than customizing a template.',
      },
    ],
  },
  {
    slug: 'daycares',
    name: 'Daycares',
    singular: 'daycare or child care center',
    title: 'Website Design for Daycares & Child Care Centers in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for daycares and child care centers in Albany, NY and the Capital Region — enrollment forms, program pages, and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'daycare website design Albany NY',
      'child care center web design',
      'daycare web design Capital Region',
      'website for daycare',
      'affordable daycare website',
    ],
    heroLine: 'that earns a parent\'s trust before the first tour.',
    intro:
      'MyLobstr Designs builds custom websites for daycares and child care centers across Albany, NY, Troy, and Saratoga Springs. Parents research a daycare more carefully than almost any other purchase, so these sites are built to answer their questions clearly — programs, staff, and licensing — before the first phone call. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'Choosing a daycare is one of the most trust-sensitive decisions a parent makes, and they research online long before calling. A daycare with no website, or one that reads like a generic stock template, loses that trust before a tour is ever scheduled — while a clear, warm site with real program and licensing info wins the call.',
    whatTheyNeed: [
      'A simple online inquiry or tour-request form, not just a phone number',
      'Programs, curriculum, and a typical daily schedule explained clearly',
      'Staff bios and licensing/certifications for trust',
      'Tuition and enrollment steps spelled out up front',
      'Photos of the space and classrooms (with appropriate privacy)',
      'Mobile-first design — parents searching "daycare near me" are almost always on a phone',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'Daycares need online tour/enrollment requests (a Growing-plan feature) plus enough pages for programs, staff, tuition, and licensing — a 5-page Starter site is usually too thin to build the trust a daycare decision requires.',
    relatedSlugs: ['pet-care', 'primary-care'],
    faqs: [
      {
        q: 'How much does a daycare website cost?',
        a: 'Flat, transparent pricing: Starter is a one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month for multi-location centers.',
      },
      {
        q: 'What should a daycare website include?',
        a: 'Programs and curriculum, a typical daily schedule, staff bios and licensing, tuition and enrollment steps, and real photos of the space — those are what a parent checks before booking a tour.',
      },
      {
        q: 'Can parents request a tour or enrollment online?',
        a: 'Yes — the Growing Business plan includes an online inquiry/tour-request form so a parent can reach out any time, not just during office hours.',
      },
      {
        q: 'Do you build daycare websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — daycares and child care centers across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How long does it take to build a daycare website?',
        a: 'About a week from the time we have your programs, staff info, and photos — hand-coded, not a template, so it still moves fast.',
      },
    ],
  },
  {
    slug: 'barbers',
    name: 'Barbershops',
    singular: 'barbershop',
    title: 'Website Design for Barbershops in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for barbershops in Albany, NY and the Capital Region — services, pricing, and walk-in-friendly local SEO. Starting at a flat one-time $300.',
    keywords: [
      'barbershop website design Albany NY',
      'barber shop web design',
      'barbershop web design Capital Region',
      'website for barbershop',
      'affordable barbershop website',
    ],
    heroLine: 'that turns "barbershop near me" into a walk-in.',
    intro:
      'MyLobstr Designs builds custom websites for barbershops across Albany, NY, Troy, and Saratoga Springs. A lot of barbershop business is still walk-in and word of mouth, so these sites are built to be fast, simple, and to make hours, pricing, and location obvious at a glance. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'A walk-in only happens if the shop shows up when someone searches "barbershop near me" and the site — or lack of one — looks legit. A shop with no online presence, or just an out-of-date Instagram, loses first-time customers to the shop up the block with a real site and clear hours.',
    whatTheyNeed: [
      'Services and pricing listed clearly, no "call for pricing"',
      'Hours and walk-in policy stated up front',
      'A gallery of real cuts and work',
      'Barber profiles so regulars can find their guy',
      'A click-to-call or booking link for shops that take appointments',
    ],
    recommendedPlan: 'starter',
    recommendedReason:
      'A lot of barbershops run on walk-ins rather than scheduled bookings, so a 5-page Starter site (services, pricing, gallery, barbers, contact) with no monthly fee usually covers it — upgrade to Growing later if you want real online booking.',
    relatedSlugs: ['pet-care', 'coffee-shops'],
    faqs: [
      {
        q: 'How much does a barbershop website cost?',
        a: 'Starter is a flat one-time $300 with no monthly fee — a good fit for most walk-in barbershops. Growing Business ($150 + $30/month) adds online booking if you want to take appointments through the site.',
      },
      {
        q: 'What should a barbershop website include?',
        a: 'Services and pricing (not "call for pricing"), hours, a gallery of real cuts, and barber profiles — those are what someone checks before walking in for the first time.',
      },
      {
        q: 'Can customers book a cut online?',
        a: 'Yes, if you want that — it\'s part of the Growing Business plan. Plenty of shops stick with Starter and keep it walk-in and phone-based, which is also fine.',
      },
      {
        q: 'Do you build barbershop websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — barbershops across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How fast can a barbershop website go live?',
        a: 'About a week from the time we have your services, pricing, and some photos of your work.',
      },
    ],
  },
  {
    slug: 'pet-care',
    name: 'Pet Care Businesses',
    singular: 'vet clinic or pet grooming business',
    title: 'Website Design for Vets & Pet Care Businesses in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for veterinary clinics and pet grooming businesses in Albany, NY and the Capital Region — online appointments and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'veterinary website design Albany NY',
      'pet grooming website design',
      'vet clinic web design Capital Region',
      'website for pet business',
      'affordable vet website',
    ],
    heroLine: 'that gets a worried pet owner to book, fast.',
    intro:
      'MyLobstr Designs builds custom websites for veterinary clinics and pet grooming businesses across Albany, NY, Troy, and Saratoga Springs. A sick or overdue pet is a same-day decision for most owners, so these sites are built around getting an appointment request in as few taps as possible. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'Pet owners searching for a vet or groomer are often anxious and time-pressed. A clinic with no online booking and a slow site loses that customer to the next practice that lets them request an appointment in two taps instead of a phone call during business hours.',
    whatTheyNeed: [
      'Online appointment requests for exams, grooming, or boarding',
      'Services and pricing clearly listed',
      'Emergency contact info visible immediately',
      'Vet or groomer bios and credentials for trust',
      'A photo gallery of the facility and happy patients',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'Online appointment booking is central to how pet owners choose a vet or groomer, which is a Growing-plan feature — the 10 pages also fit services, staff bios, and a gallery better than a 5-page Starter site.',
    relatedSlugs: ['dentists', 'daycares'],
    faqs: [
      {
        q: 'How much does a veterinary or pet grooming website cost?',
        a: 'Flat, transparent pricing: Starter is a one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month for multi-location practices.',
      },
      {
        q: 'What should a vet clinic website include?',
        a: 'Online appointment requests, services and pricing, emergency contact info, and staff credentials — those are what a worried or time-pressed pet owner checks first.',
      },
      {
        q: 'Can pet owners book appointments online?',
        a: 'Yes — the Growing Business plan includes real online booking synced to your calendar, for exams, grooming, or boarding requests.',
      },
      {
        q: 'Do you build vet or pet grooming websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — see our Happy Paws Vet & Grooming demo (linked from Our Work) for the kind of layout we build for pet care businesses across Albany, Troy, Saratoga Springs, and the Capital Region.',
      },
      {
        q: 'How long does it take to get a vet clinic website live?',
        a: 'About a week once we have your services, staff bios, and photos.',
      },
    ],
  },
  {
    slug: 'auto-repair',
    name: 'Auto Repair Shops',
    singular: 'auto repair shop',
    title: 'Website Design for Auto Repair Shops in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for auto repair shops in Albany, NY and the Capital Region — online estimate requests and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'auto repair website design Albany NY',
      'mechanic shop web design',
      'auto shop web design Capital Region',
      'website for auto repair shop',
      'affordable mechanic website',
    ],
    heroLine: 'that wins the call before the tow truck even arrives.',
    intro:
      'MyLobstr Designs builds custom websites for auto repair shops across Albany, NY, Troy, and Saratoga Springs. A car problem is usually urgent, so these sites are built to answer "can they fix this, and can I trust them" in seconds, from a phone, often from the side of the road. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'A car problem search happens fast, often mid-emergency. A repair shop with no visible reviews, no clear service list, or a slow site loses that customer to a competitor shop that answers the trust question faster.',
    whatTheyNeed: [
      'Online appointment or estimate request form',
      'Services offered and specialties (brakes, diagnostics, tires, etc.)',
      'Reviews and certifications (ASE, etc.) for trust',
      'Hours, location, and a click-to-call button',
      'Loaner car or shuttle info, if you offer it',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'Auto repair shops need online appointment/estimate requests to compete for urgent, high-intent searches — a Growing-plan feature — plus enough pages to list specialties, certifications, and reviews.',
    relatedSlugs: ['contractors', 'hvac'],
    faqs: [
      {
        q: 'How much does an auto repair shop website cost?',
        a: 'Flat, transparent pricing: Starter is a one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month for multi-bay or multi-location shops.',
      },
      {
        q: 'What should an auto repair website include?',
        a: 'An online appointment or estimate request, your services and specialties, certifications (like ASE), and reviews — those are what someone checks before trusting a shop with their car.',
      },
      {
        q: 'Can customers request an appointment or estimate online?',
        a: 'Yes — the Growing Business plan includes an online request form so a customer can reach out any time, not just during shop hours.',
      },
      {
        q: 'Do you build auto repair websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — auto repair and mechanic shops across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How fast can an auto repair shop website go live?',
        a: 'About a week once we have your services, specialties, and any certifications.',
      },
    ],
  },
  {
    slug: 'primary-care',
    name: 'Primary Care Practices',
    singular: 'primary care practice',
    title: 'Website Design for Primary Care Practices in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for primary care and medical practices in Albany, NY and the Capital Region — online appointment requests and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'primary care website design Albany NY',
      'medical practice web design',
      'doctor website design Capital Region',
      'website for medical practice',
      'affordable primary care website',
    ],
    heroLine: 'that turns "doctor near me" into a booked visit.',
    intro:
      'MyLobstr Designs builds custom websites for primary care and medical practices across Albany, NY, Troy, and Saratoga Springs. Patients research a new provider carefully — insurance, bios, and whether they can request an appointment without waiting on hold — so these sites are built to answer that clearly. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'Patients research a new primary care provider online before booking, checking accepted insurance and provider bios first. A practice with an outdated site or no online scheduling loses that patient to the next practice that makes it easy.',
    whatTheyNeed: [
      'Online appointment requests, not just a phone number',
      'New-patient forms available before the first visit',
      'Services, providers, and accepted insurance listed clearly',
      'Patient portal or telehealth info, if you offer it',
      'Mobile-first design — most searches happen on a phone',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'Primary care practices need real online appointment requests and enough pages for providers, services, and insurance — the Growing plan\'s booking feature and 10 pages fit that better than a 5-page Starter site.',
    relatedSlugs: ['dentists', 'daycares'],
    faqs: [
      {
        q: 'How much does a primary care website cost?',
        a: 'Flat, transparent pricing: Starter is a one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month for multi-provider or multi-location practices.',
      },
      {
        q: 'What should a medical practice website include?',
        a: 'Online appointment requests, provider bios, accepted insurance, new-patient forms, and telehealth info if you offer it — those are what a prospective patient checks first.',
      },
      {
        q: 'Can patients request appointments online?',
        a: 'Yes — the Growing Business plan includes an online appointment request form, so a patient can reach out outside office hours instead of waiting on hold.',
      },
      {
        q: 'Do you build medical practice websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — primary care and medical practices across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How long does it take to build a medical practice website?',
        a: 'About a week from the time we have your providers, services, and insurance list.',
      },
    ],
  },
  {
    slug: 'apartments',
    name: 'Apartments & Property Managers',
    singular: 'apartment community',
    title: 'Website Design for Apartments & Property Managers in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for apartment communities and property managers in Albany, NY and the Capital Region — self-managed listings and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'apartment website design Albany NY',
      'property management web design',
      'apartment listing website Capital Region',
      'website for property manager',
      'affordable apartment website',
    ],
    heroLine: 'that keeps every listing current without calling a developer.',
    intro:
      'MyLobstr Designs builds custom websites for apartment communities and property managers across Albany, NY, Troy, and Saratoga Springs. Renters compare several properties online in one sitting, so these sites are built to make availability, photos, and applying as current and easy as possible. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'Renters browse listings online before ever calling a leasing office, comparing photos, floor plans, and availability across several properties at once. A property with stale listings or no photos loses that renter to the next listing that looks current and easy to apply to.',
    whatTheyNeed: [
      'Current availability and floor plans you can update yourself',
      'Photos and virtual tours of units and amenities',
      'An online application or inquiry form',
      'Pet policy, parking, and lease terms stated clearly',
      'A simple way to manage listings across multiple properties without calling a developer every time',
    ],
    recommendedPlan: 'scale',
    recommendedReason:
      'Property managers need to update availability and listings themselves, constantly, often across more than one property — that\'s exactly what the Scale plan\'s admin panel and multi-location support are built for.',
    relatedSlugs: ['contractors', 'hvac'],
    faqs: [
      {
        q: 'How much does a website cost for an apartment community?',
        a: 'Scale is $250 to build plus $50/month and includes an admin panel plus multi-location support — the right fit for most property managers who update listings often or manage more than one property.',
      },
      {
        q: 'What should an apartment or property management website include?',
        a: 'Current availability and floor plans, real photos, an online application form, and clear lease terms — those are what a renter checks before ever calling the leasing office.',
      },
      {
        q: 'Can we update listings and availability ourselves?',
        a: 'Yes — the Scale plan includes an admin panel specifically so you can update availability, photos, and pricing yourself, without waiting on a developer.',
      },
      {
        q: 'Do you build apartment or property management websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — apartment communities and property managers across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How long does it take to build a property management website?',
        a: 'About a week to two weeks depending on how many units/properties need to be loaded in at launch.',
      },
    ],
  },
  {
    slug: 'ice-cream-shops',
    name: 'Ice Cream Shops',
    singular: 'ice cream shop',
    title: 'Website Design for Ice Cream Shops in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for ice cream shops in Albany, NY and the Capital Region — flavor menus and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'ice cream shop website design Albany NY',
      'ice cream shop web design',
      'website for ice cream shop',
      'affordable ice cream shop website Capital Region',
    ],
    heroLine: 'that shows up before the walk turns into a drive.',
    intro:
      'MyLobstr Designs builds custom websites for ice cream shops across Albany, NY, Troy, and Saratoga Springs. Ice cream is an impulse decision, so these sites are built to answer "is it open right now, and what flavors do they have" in a couple of seconds on a phone. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'Ice cream is an impulse decision — someone is already out, already deciding between a few nearby options. A shop with no site, or one showing last summer\'s flavor list, loses that walk-in to the truck or shop that shows up first and looks current.',
    whatTheyNeed: [
      'A flavor menu that is easy to update seasonally',
      'Hours and, if seasonal, open/close dates for the year',
      'Location and parking info front and center',
      'Photos that make people want to walk over immediately',
      'Mobile-first design — most "ice cream near me" searches happen on foot, nearby, right now',
    ],
    recommendedPlan: 'starter',
    recommendedReason:
      'Most ice cream shops need a simple, fast, seasonal site (flavors, hours, location) rather than booking or a large page count — the 5-page Starter plan with no monthly fee fits that well.',
    relatedSlugs: ['coffee-shops', 'restaurants'],
    faqs: [
      {
        q: 'How much does an ice cream shop website cost?',
        a: 'Starter is a flat one-time $300 with no monthly fee — enough for a flavor menu, hours, location, and photos, which covers what most ice cream shops need.',
      },
      {
        q: 'What should an ice cream shop website include?',
        a: 'A flavor menu you can update seasonally, hours (including seasonal open/close dates), location and parking, and photos — those answer "is it open and what do they have" fast.',
      },
      {
        q: 'Can we update the flavor list ourselves?',
        a: 'Yes — every plan includes a way to update your menu/flavors and hours without calling us, so the site never shows an out-of-season list.',
      },
      {
        q: 'Do you build ice cream shop websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — ice cream shops across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How fast can an ice cream shop website go live?',
        a: 'About a week — often faster, since these sites are usually straightforward: flavors, hours, location, and photos.',
      },
    ],
  },
  {
    slug: 'coffee-shops',
    name: 'Coffee Shops',
    singular: 'coffee shop',
    title: 'Website Design for Coffee Shops in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for coffee shops in Albany, NY and the Capital Region — menus, online ordering links, and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'coffee shop website design Albany NY',
      'cafe web design',
      'coffee shop web design Capital Region',
      'website for coffee shop',
      'affordable coffee shop website',
    ],
    heroLine: 'that turns "coffee near me" into a regular.',
    intro:
      'MyLobstr Designs builds custom websites for coffee shops and cafés across Albany, NY, Troy, and Saratoga Springs. Someone searching "coffee shop near me" decides in seconds based on hours, menu, and whether they can order ahead — these sites are built to answer that instantly. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'Someone searching "coffee shop near me" decides fast, usually based on hours, menu, and whether they can order ahead. A coffee shop with no site, or a Facebook page with outdated hours, loses that walk-in to the shop next door with a current site — even with worse coffee.',
    whatTheyNeed: [
      'A menu and prices that are simple to update',
      'Hours, wifi/seating info, and location up front',
      'An online ordering link, if you offer mobile order-ahead',
      'A loyalty or rewards program page, if you have one',
      'Mobile-first design — most searches happen on a phone, often while already nearby',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'Coffee shops benefit from an online-ordering link, a loyalty/rewards page, and full SEO for "coffee near me" — all Growing-plan territory — plus 10 pages covers a seasonal menu, events, and a jobs page that a 5-page Starter site can\'t.',
    relatedSlugs: ['ice-cream-shops', 'restaurants'],
    faqs: [
      {
        q: 'How much does a coffee shop website cost?',
        a: 'Flat, transparent pricing: Starter is a one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month for multi-location cafés.',
      },
      {
        q: 'What should a coffee shop website include?',
        a: 'A current menu with prices, hours and wifi/seating info, an online-ordering link if you offer it, and a loyalty program page if you have one.',
      },
      {
        q: 'Can customers order ahead through the website?',
        a: 'Yes, if you use a mobile order-ahead service — the Growing Business plan can link it directly from the site so ordering ahead is one tap.',
      },
      {
        q: 'Do you build coffee shop websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — coffee shops and cafés across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How long does it take to get a coffee shop website live?',
        a: 'About a week once we have your menu, hours, and any loyalty program details.',
      },
    ],
  },
  {
    slug: 'mexican-restaurants',
    name: 'Mexican Restaurants',
    singular: 'Mexican restaurant',
    title: 'Website Design for Mexican Restaurants in Albany, NY | MyLobstr Designs',
    description:
      'Custom website design for Mexican restaurants in Albany, NY and the Capital Region — online menus, catering info, and local SEO. Starting at a flat one-time $300.',
    keywords: [
      'Mexican restaurant website design Albany NY',
      'Mexican restaurant web design',
      'website for Mexican restaurant',
      'affordable restaurant website Capital Region',
    ],
    heroLine: 'that gets the menu in front of people before dinner\'s decided.',
    intro:
      'MyLobstr Designs builds custom websites for Mexican restaurants across Albany, NY, Troy, and Saratoga Springs. Diners searching for Mexican food nearby check the menu and reviews before deciding, usually on a phone, usually fast — these sites are built to answer that immediately. The Starter plan is a flat one-time $300 with no monthly fee, live in about a week.',
    painPoint:
      'Diners searching for Mexican food nearby check the menu and reviews before deciding, usually on a phone, usually fast. A restaurant with no online menu or a slow site loses that decision to the next result — even a place with better food loses to a place that\'s easier to check out first.',
    whatTheyNeed: [
      'An online menu with real prices, updatable anytime',
      'Catering and event info, if you offer it',
      'Hours, location, and Google Maps visible immediately',
      'A reservation or online-ordering link',
      'A photo gallery of food and atmosphere',
    ],
    recommendedPlan: 'growing',
    recommendedReason:
      'A working menu, catering info, and an ordering/reservation link need more than 5 pages and benefit from full SEO — Growing fits a working Mexican restaurant site better than Starter.',
    relatedSlugs: ['restaurants', 'ice-cream-shops'],
    faqs: [
      {
        q: 'How much does a website cost for a Mexican restaurant?',
        a: 'The same transparent pricing everywhere: Starter is a flat one-time $300 with no monthly fee, Growing Business is $150 plus $30/month, and Scale is $250 plus $50/month for multi-location restaurant groups.',
      },
      {
        q: 'What should a Mexican restaurant website include?',
        a: 'An online menu with real prices, catering/event info if you offer it, hours and location, and a reservation or ordering link — those are what a diner checks before deciding.',
      },
      {
        q: 'Can we list catering or event menus separately?',
        a: 'Yes — the Growing Business plan\'s 10 pages comfortably fit a separate catering or events page alongside the regular menu.',
      },
      {
        q: 'Do you build Mexican restaurant websites in Albany, Troy, or Saratoga Springs, NY?',
        a: 'Yes — Mexican restaurants across Albany, Troy, Saratoga Springs, and the wider Capital Region.',
      },
      {
        q: 'How long does it take to build a restaurant website?',
        a: 'About a week once we have your menu, photos, and hours.',
      },
    ],
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}
