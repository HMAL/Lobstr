import Link from 'next/link'

export default function Post() {
  return (
    <>
      <p className="lead">
        When you ask what a website costs, the honest answer is &quot;it depends on the features.&quot;
        But that answer is only useful if someone shows you <em>which</em> features actually drive the
        price — and which ones are filler you&apos;re paying for and will never use. Here&apos;s how
        website cost and features really line up for a small business in the Capital Region.
      </p>

      <h2>Price follows features, not magic</h2>
      <p>
        Two websites can both &quot;look nice&quot; and cost wildly different amounts. The gap is
        almost never the design — it&apos;s what&apos;s working underneath: how it&apos;s built, how
        well it ranks, who supports it, and where it&apos;s hosted. Once you can see the feature
        behind each dollar, pricing stops feeling random.
      </p>

      <h2>What actually drives the cost</h2>
      <table>
        <thead>
          <tr>
            <th>Cost driver</th>
            <th>Why it costs</th>
            <th>Worth paying for?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Custom design</strong></td>
            <td>Built around your business instead of a generic template</td>
            <td>Yes — it&apos;s your first impression</td>
          </tr>
          <tr>
            <td><strong>SEO setup</strong></td>
            <td>Titles, structure, and local signals so Google can rank you</td>
            <td>Yes — a site nobody finds is wasted money</td>
          </tr>
          <tr>
            <td><strong>Ongoing support</strong></td>
            <td>Real humans to fix and update the site after launch</td>
            <td>Yes — websites are never &quot;done&quot;</td>
          </tr>
          <tr>
            <td><strong>Fast, secure hosting</strong></td>
            <td>Speed, the SSL padlock, uptime, and backups</td>
            <td>Yes — non-negotiable fundamentals</td>
          </tr>
          <tr>
            <td><strong>Animations &amp; extras</strong></td>
            <td>Flashy effects that look impressive in a demo</td>
            <td>Only if they help a customer act</td>
          </tr>
          <tr>
            <td><strong>Page count bloat</strong></td>
            <td>Twenty pages when five would convert better</td>
            <td>No — pay for the pages that earn</td>
          </tr>
        </tbody>
      </table>

      <h2>Features worth paying for</h2>
      <p>
        Spend on the things that bring in customers or protect your business: mobile-first design, a
        contact form and click-to-call, basic SEO, a Google Business Profile connection, fast hosting,
        and security. We explain why each of those matters in our{' '}
        <Link href="/blog/small-business-website-features-explained">feature-by-feature guide</Link>.
      </p>

      <h2>Features that are usually filler</h2>
      <ul>
        <li><strong>Dozens of pages</strong> you&apos;ll never update — a focused 5-page site often converts better.</li>
        <li><strong>Heavy animations</strong> that slow the page down and distract from the call to action.</li>
        <li><strong>Stock-photo overload</strong> when one real photo of your business builds more trust.</li>
        <li><strong>Tools you won&apos;t touch</strong> — complex dashboards and integrations sold as &quot;premium.&quot;</li>
      </ul>

      <h2>The value math</h2>
      <p>
        Flip the question from &quot;what does it cost?&quot; to &quot;what does it return?&quot; If your
        average customer is worth $50 and the site brings in one new customer a month, it has already
        paid for a modest monthly cost — everything after that is profit. A cheap site that never ranks
        returns nothing; a focused site with the right features pays for itself.
      </p>

      <h2>How we price it</h2>
      <p>
        We publish our <Link href="/pricing">pricing</Link> instead of hiding it behind a sales call.
        Builds run from $100 to $250 depending on pages and features, and a flat monthly rate from
        $25 covers hosting, SSL, security, and real support — the things others bill separately. The
        honest fine print lives on our <Link href="/faq">FAQ page</Link>.
      </p>

      <h2>The bottom line</h2>
      <p>
        Don&apos;t buy a price — buy the features that bring you customers, and skip the ones that just
        pad an invoice. Want a real number for your business?{' '}
        <Link href="/contact">Tell us what you do</Link> and we&apos;ll quote it plainly, or see how the
        same discipline shows up on big-brand sites in{' '}
        <Link href="/blog/what-small-businesses-learn-from-big-corporation-websites">this guide</Link>.
      </p>
    </>
  )
}
