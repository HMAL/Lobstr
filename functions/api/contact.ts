// Cloudflare Pages Function — handles POST /api/contact.
// Ported from the former Next.js route handler (src/app/api/contact/route.ts) during
// the static-export migration. Same logic; reads bindings/secrets from `context.env`
// instead of `process.env`, and uses the Web `Response` instead of `NextResponse`.
import {
  escapeHtml,
  verifyTurnstile,
  checkRateLimit,
  checkGlobalCap,
  type KVLike,
} from './_contact-guard'

interface Env {
  RATE_LIMIT_KV?: KVLike
  RESEND_API_KEY?: string
  TURNSTILE_SECRET_KEY?: string
  CONTACT_GLOBAL_DAILY_CAP?: string
}

// Minimal Pages Functions context shape (avoids a dependency on @cloudflare/workers-types).
interface PagesContext {
  request: Request
  env: Env
}

const TO_EMAIL = 'homemadeappsllc@gmail.com'

// Field length caps — reject oversized payloads before they reach Resend.
const MAX = {
  name: 100,
  email: 200,
  phone: 20,
  business: 100,
  address: 200,
  type: 100,
  message: 4000,
} as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Accept posts only from our own site (any subdomain) or local dev.
const ALLOWED_ORIGIN_RE = /^https?:\/\/(localhost(:\d+)?|127\.0\.0\.1(:\d+)?|([a-z0-9-]+\.)*mylobstr\.com)$/i

const planData: Record<string, { price: number; phase2: number; monthly: number }> = {
  'Starter':          { price: 75,  phase2: 30, monthly: 10 },
  'Growing Business': { price: 150, phase2: 40, monthly: 15 },
  'Scale':            { price: 250, phase2: 50, monthly: 20 },
}

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request: req, env } = context

  // Trim in case the stored secret picked up trailing whitespace/newline (e.g. set
  // via a shell pipe) — a stray newline in the Bearer header makes Resend reject it.
  const apiKey = env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return json({ error: 'Email service not configured' }, 500)
  }

  try {
    // Cheap pre-filters first — reject obvious junk before any subrequest or KV write.
    // Same-origin only (browsers send Origin on POST); allow localhost for dev.
    const origin = req.headers.get('origin')
    if (origin && !ALLOWED_ORIGIN_RE.test(origin)) {
      return json({ error: 'Invalid origin' }, 403)
    }
    // Bound the body. The form's largest field caps at 4k chars; 20k is generous.
    if (Number(req.headers.get('content-length') ?? 0) > 20_000) {
      return json({ error: 'Payload too large' }, 413)
    }

    const raw = await req.json().catch(() => null)
    if (!raw || typeof raw !== 'object') {
      return json({ error: 'Invalid request' }, 400)
    }

    const body = raw as Record<string, unknown>

    // 1. Honeypot — a hidden field only bots fill. Pretend success, send nothing.
    if (str(body.company_website)) {
      return json({ success: true })
    }

    // 2. Normalize + validate inputs.
    const name = str(body.name)
    const email = str(body.email)
    const phone = str(body.phone)
    const business = str(body.business)
    const address = str(body.address)
    const type = str(body.type)
    const message = str(body.message)
    const plan = str(body.plan)
    const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken : undefined

    if (!name || !email || !business || !type) {
      return json({ error: 'Missing required fields' }, 400)
    }
    if (!EMAIL_RE.test(email)) {
      return json({ error: 'Invalid email address' }, 400)
    }
    if (
      name.length > MAX.name ||
      email.length > MAX.email ||
      phone.length > MAX.phone ||
      business.length > MAX.business ||
      address.length > MAX.address ||
      type.length > MAX.type ||
      message.length > MAX.message
    ) {
      return json({ error: 'One or more fields are too long' }, 400)
    }
    // Only accept known plans; ignore anything else.
    const planKey = plan && planData[plan] ? plan : ''

    const kv = env.RATE_LIMIT_KV
    const ip = req.headers.get('cf-connecting-ip')

    // 3. Bot check.
    const secret = env.TURNSTILE_SECRET_KEY?.trim()
    if (!(await verifyTurnstile(turnstileToken, ip, secret))) {
      return json({ error: 'Verification failed. Please try again.' }, 403)
    }

    // 4 & 5. KV-backed per-IP rate limit + global daily cap. Best-effort: a KV
    // hiccup must never block a legitimate send, and we avoid gateway-class status
    // codes (502/503/504) because Cloudflare replaces those with an HTML error page
    // that the client can't parse as JSON.
    if (kv) {
      try {
        const limited = await checkRateLimit(kv, ip ?? 'unknown')
        if (!limited.ok) {
          return json(
            { error: 'Too many requests. Please try again later, or email info@mylobstr.com.' },
            429,
          )
        }

        const cap = Number(env.CONTACT_GLOBAL_DAILY_CAP ?? 80)
        const within = await checkGlobalCap(kv, cap)
        if (!within.ok) {
          return json(
            { error: "We're experiencing high volume. Please email info@mylobstr.com directly." },
            429,
          )
        }
      } catch (kvErr) {
        // Don't fail the request on a KV error — just log and continue to send.
        console.error('Rate-limit KV error (continuing):', kvErr)
      }
    }

    // 6. Build email — every user value is HTML-escaped.
    const planInfo = planKey ? planData[planKey] : null
    const yearTotal = planInfo ? planInfo.price + planInfo.phase2 * 2 + planInfo.monthly * 9 : null

    const planSection = planInfo && yearTotal !== null ? `
      <div style="margin-top:20px;padding:16px;background:#eff6ff;border-radius:8px;border:2px solid #bfdbfe;">
        <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:.05em;">Selected Plan</p>
        <p style="margin:0 0 12px 0;font-size:20px;font-weight:900;color:#111827;">${escapeHtml(planKey)}</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px 4px 0;font-size:13px;color:#6b7280;">Build (Month 1)</td><td style="font-size:13px;font-weight:700;color:#111827;">$${planInfo.price} one time</td></tr>
          <tr><td style="padding:4px 8px 4px 0;font-size:13px;color:#6b7280;">Optimize (Months 2–3)</td><td style="font-size:13px;font-weight:700;color:#111827;">$${planInfo.phase2}/mo × 2 = $${planInfo.phase2 * 2}</td></tr>
          <tr><td style="padding:4px 8px 4px 0;font-size:13px;color:#6b7280;">Hosting (Month 4+)</td><td style="font-size:13px;font-weight:700;color:#111827;">$${planInfo.monthly}/mo forever</td></tr>
        </table>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid #bfdbfe;">
          <span style="font-size:13px;font-weight:600;color:#1d4ed8;">Estimated Year 1 Total: </span>
          <span style="font-size:18px;font-weight:900;color:#111827;">$${yearTotal}</span>
        </div>
      </div>
    ` : ''

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mylobstr Contact <onboarding@resend.dev>',
        to: [TO_EMAIL],
        reply_to: email,
        subject: planKey
          ? `[${planKey}] New inquiry: ${business} (${type})`
          : `New inquiry: ${business} (${type})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1d4ed8; margin-bottom: 4px;">New Website Inquiry</h2>
            <p style="color: #6b7280; font-size: 13px; margin-top: 0;">Submitted via mylobstr.com</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(phone)}" style="color: #2563eb;">${escapeHtml(phone)}</a></td></tr>` : ''}
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Business</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(business)}</td></tr>
              ${address ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Address</td><td style="padding: 8px 0;">${escapeHtml(address)}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Type</td><td style="padding: 8px 0;">${escapeHtml(type)}</td></tr>
            </table>
            ${planSection}
            ${message ? `<div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #2563eb;"><p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">${escapeHtml(message)}</p></div>` : ''}
            <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">Hit Reply to respond directly to ${escapeHtml(name)}.</p>
          </div>
        `,
      }),
    })

    const data = await res.json() as { id?: string; name?: string; message?: string }

    if (!res.ok) {
      // Log full detail server-side; return a generic message to the client.
      // Use 500 (not 502) so Cloudflare passes our JSON through instead of its own
      // HTML "Bad gateway" page.
      console.error('Resend error:', res.status, data)
      return json({ error: 'Failed to send email' }, 500)
    }

    return json({ success: true, id: data.id })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Contact form error:', msg)
    return json({ error: 'Failed to send email' }, 500)
  }
}
