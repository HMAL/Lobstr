import Link from 'next/link'

export default function Post() {
  return (
    <>
      <p className="lead">
        Plenty of Albany restaurants run on a Facebook page, a DoorDash listing, and word of mouth. It
        works — until you notice how much of your margin goes to delivery apps, and how many people
        searching &quot;Italian restaurant Albany NY&quot; never find you. Here&apos;s why your own
        website is the highest-margin seat in the house, and exactly what it needs to include.
      </p>

      <h2>The math on third-party apps</h2>
      <p>
        DoorDash, Uber Eats, and Grubhub charge restaurants commissions that commonly run 15–30% per
        order. On a $40 order, that&apos;s up to $12 gone — often more than the profit on the food. The
        apps are fine for discovery, but every regular who orders through them instead of through you is
        a recurring tax you don&apos;t need to pay.
      </p>
      <p>
        A website with your own menu and online ordering (or even just a phone number and reservations
        link) converts those regulars into direct customers. If your site moves even three orders a week
        off the apps, it pays for itself several times over.
      </p>

      <h2>Facebook isn&apos;t a website</h2>
      <p>
        A Facebook page is rented space. The problems show up where they hurt:
      </p>
      <ul>
        <li><strong>Google barely ranks it.</strong> Search &quot;best brunch Albany&quot; — the results are websites and Google Maps listings, not Facebook pages.</li>
        <li><strong>The algorithm decides who sees your posts</strong> — typically a small fraction of your own followers, unless you pay to boost.</li>
        <li><strong>Menus get buried.</strong> A customer wanting your hours or menu has to scroll past months of posts.</li>
        <li><strong>You don&apos;t own it.</strong> Accounts get locked, pages get flagged, and there&apos;s no support line to call on a Friday night.</li>
      </ul>
      <p>
        Keep the Facebook page — it&apos;s great for community and events. But point it at a website you
        own. We covered the broader comparison in
        <Link href="/blog/website-vs-facebook-page-albany"> Website vs. Facebook Page</Link>.
      </p>

      <h2>What a restaurant website actually needs</h2>
      <p>Restaurant sites fail when they&apos;re built like brochures. Yours needs exactly six things, in this order:</p>
      <ol>
        <li><strong>The menu, as text, on the page.</strong> Not a PDF, not a photo of a printed menu. Text menus load instantly on phones, are readable by Google (so your dishes become search results), and are usable by screen readers.</li>
        <li><strong>Hours and location, visible without scrolling.</strong> With a Google Maps embed and a tap-to-navigate link.</li>
        <li><strong>A reservation or order button</strong> that works — whether that&apos;s OpenTable, Resy, a booking form, or &quot;Call us&quot; with click-to-call.</li>
        <li><strong>Real photos.</strong> Your food, your dining room, your people. Stock pasta photos are worse than no photos.</li>
        <li><strong>Mobile-first design.</strong> The majority of &quot;restaurant near me&quot; searches happen on a phone, often in the car.</li>
        <li><strong>Local SEO basics.</strong> Page titles like &quot;Authentic Italian Restaurant in Albany, NY,&quot; schema markup for your menu and hours, and a linked Google Business Profile. (Here&apos;s our full <Link href="/blog/local-seo-albany-small-business">local SEO guide for Albany businesses</Link>.)</li>
      </ol>

      <h2>What this looks like in practice</h2>
      <p>
        We built a full demo of a restaurant website — <Link href="/projects/restaurant">Trattoria
        Albany</Link> — to show exactly what we mean: text menu, reservations, gallery, hours, and maps,
        all on a site that loads fast on a phone. Click through it the way a hungry customer would. That
        demo is the level every Albany restaurant site should be at, and it&apos;s what
        a <Link href="/pricing">$100–$150 build from Mylobstr</Link> gets you — not a five-figure agency
        project.
      </p>

      <h2>&quot;But I&apos;m always full anyway&quot;</h2>
      <p>
        The best argument we hear against a website — and it&apos;s a good one, until the slow season, a
        road construction summer, or a new competitor opening two blocks away. A website is how you fill
        Tuesday nights, promote the private room, sell gift cards, and stay findable when habits change.
        It&apos;s insurance that also happens to generate revenue.
      </p>

      <h2>Getting started</h2>
      <p>
        If you can send us your menu, hours, and a handful of photos, we can have a custom site live in
        about a week — hosting, SSL, SEO setup, and your Google Business Profile included, from $100 with
        a monthly rate that starts at $25. <Link href="/contact">Tell us about your restaurant</Link> and
        we&apos;ll send a firm quote, or check the <Link href="/faq">FAQ</Link> for the fine print (there
        isn&apos;t much — that&apos;s the point).
      </p>
    </>
  )
}
