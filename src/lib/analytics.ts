// Lightweight GA4 event tracking. Fires through the gtag instance configured in
// the root layout (src/app/layout.tsx) and shimmed in AnalyticsPageView. Safe to
// call from anywhere: it no-ops during SSR / static prerender, and before gtag.js
// has loaded it queues the event on the dataLayer (same shim gtag's own snippet
// uses) so nothing is dropped.

// Funnel events — keep this set small and stable so GA4 reports stay readable.
// `generate_lead` is the conversion; mark it as a Key Event in GA4.
export const AnalyticsEvent = {
  CtaClick: 'cta_click',
  FormStart: 'form_start',
  GenerateLead: 'generate_lead',
  FormError: 'form_error',
  ContactChannelClick: 'contact_channel_click',
} as const

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent]

export function track(
  event: AnalyticsEventName,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return
  // Mirror the gtag shim in AnalyticsPageView so events sent before gtag.js
  // arrives are held on the dataLayer queue rather than lost. The queue shim
  // requires the `arguments` object (not an array), matching gtag's snippet.
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function () {
      // gtag's dataLayer queue requires the real `arguments` object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    } as (...args: unknown[]) => void
  }
  window.gtag('event', event, params)
}
