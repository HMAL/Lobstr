import Link from 'next/link'

export default function Post() {
  return (
    <>
      <p className="lead">
        Your website breaks on a Saturday night — a form stops working, an image won&apos;t load, or it
        just goes down. What happens next depends entirely on who supports it. For most small
        businesses, that&apos;s the moment they discover their &quot;support&quot; is a ticket form and
        a three-day wait. Here&apos;s why support is a feature worth caring about, and how ours is
        different.
      </p>

      <h2>The Saturday-night test</h2>
      <p>
        Picture your busiest evening. A customer tries to book online and the button does nothing. With
        a typical builder or agency, you submit a ticket into a queue and hope someone reads it Monday.
        With real support, you send one message and a human fixes it. <strong>Same problem, completely
        different outcome</strong> — and the difference is measured in lost customers.
      </p>

      <h2>What &quot;support&quot; usually means</h2>
      <ul>
        <li>
          <strong>DIY builders:</strong> a help center and a chatbot. You are the support team — if it
          breaks, fixing it is your evening.
        </li>
        <li>
          <strong>Freelancers:</strong> great until they&apos;re on vacation, busy with another client,
          or simply stop replying. One person is a single point of failure.
        </li>
        <li>
          <strong>Agencies:</strong> tiered support where real help lives behind a pricier plan, an
          account manager, and a ticket SLA measured in days.
        </li>
      </ul>

      <h2>Why ongoing support is part of the product</h2>
      <p>
        A website is never truly &quot;done.&quot; Hours change, prices change, a holiday promo needs to
        go up, software needs updating, and things occasionally break. <strong>Why it matters:</strong>{' '}
        a site that&apos;s slowly rotting because no one maintains it stops bringing in customers. Support
        isn&apos;t an add-on to the website — it&apos;s what keeps the website working.
      </p>

      <h2>How our support actually works</h2>
      <p>
        We&apos;re a small Albany team, and we answer our own messages — no call center, no bots, no
        tiered ticket queue. Real humans, around the clock. Need your hours updated before a long
        weekend? Message us. Something looks off? We&apos;re on it. Ongoing support, hosting, security,
        and updates are bundled into one flat monthly rate, so you never get a surprise invoice for a
        small fix. The details are on our <Link href="/pricing">pricing page</Link> and{' '}
        <Link href="/faq">FAQ</Link>.
      </p>

      <h2>Support and trust go together</h2>
      <p>
        Knowing a real person stands behind your site changes how you run your business. You can promise
        customers online booking because you know it&apos;ll be fixed fast if it ever hiccups. That
        confidence is the same reason big brands invest so heavily in reliability — a principle we cover
        in{' '}
        <Link href="/blog/what-small-businesses-learn-from-big-corporation-websites">what small
        businesses can learn from big-corporation websites</Link>.
      </p>

      <h2>The bottom line</h2>
      <p>
        When you compare website offers, don&apos;t just compare looks and price — ask what happens at
        9pm on a Saturday when something breaks. Real, human, around-the-clock support is one of the
        most valuable features you can have, and it&apos;s built into every plan we offer.{' '}
        <Link href="/contact">Get in touch</Link> and you&apos;ll see the difference from the very first
        message — or see what else earns its place in our{' '}
        <Link href="/blog/small-business-website-features-explained">guide to website features</Link>.
      </p>
    </>
  )
}
