'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

// gtag's automatic page_view only fires on full page loads. App Router
// navigations are client-side, so we report every route change ourselves
// (send_page_view is disabled in the layout config to avoid double-counting).
export default function AnalyticsPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This effect can run before gtag.js loads; the dataLayer queue shim
    // (same as gtag's own snippet — it requires the `arguments` object,
    // not an array) holds events until the script arrives and flushes them.
    window.dataLayer = window.dataLayer || []
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer!.push(arguments)
      } as (...args: unknown[]) => void
    }
    const qs = searchParams.toString()
    const pagePath = qs ? `${pathname}?${qs}` : pathname
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  return null
}
