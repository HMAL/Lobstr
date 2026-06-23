// Abuse + injection guards for the public contact endpoint (/api/contact).
// Kept separate from the function handler so the request flow stays readable.
// (Relocated from src/lib/contact-guard.ts during the Pages migration.)

/** Minimal KV surface we rely on — matches Cloudflare's KVNamespace. */
export interface KVLike {
  get(key: string): Promise<string | null>
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>
}

/** Escape user-supplied text before interpolating it into the email HTML. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 * Returns false on any failure (missing secret/token, network error, rejected token).
 */
export async function verifyTurnstile(
  token: string | undefined,
  ip: string | null,
  secret: string | undefined,
): Promise<boolean> {
  if (!secret) {
    console.error('Turnstile: TURNSTILE_SECRET_KEY is not set')
    return false
  }
  if (!token) {
    console.error('Turnstile: no token submitted by the client')
    return false
  }
  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip) body.set('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
    if (data.success !== true) {
      console.error('Turnstile verification failed:', data['error-codes'])
    }
    return data.success === true
  } catch (err) {
    console.error('Turnstile siteverify request error:', err)
    return false
  }
}

// Per-IP limits. Two windows so a burst and a slow drip are both bounded.
const IP_LIMIT_15M = 3
const IP_WINDOW_15M = 15 * 60
const IP_LIMIT_DAY = 10
const IP_WINDOW_DAY = 24 * 60 * 60

async function bump(kv: KVLike, key: string, ttl: number): Promise<number> {
  const current = Number((await kv.get(key)) ?? 0)
  const next = current + 1
  await kv.put(key, String(next), { expirationTtl: ttl })
  return next
}

/** Per-IP rate limit backed by KV. ok=false once either window is exceeded. */
export async function checkRateLimit(kv: KVLike, ip: string): Promise<{ ok: boolean }> {
  const short = await bump(kv, `rl:ip:${ip}:15m`, IP_WINDOW_15M)
  if (short > IP_LIMIT_15M) return { ok: false }
  const day = await bump(kv, `rl:ip:${ip}:day`, IP_WINDOW_DAY)
  if (day > IP_LIMIT_DAY) return { ok: false }
  return { ok: true }
}

/**
 * Global daily send cap — the circuit breaker that protects the Resend quota
 * even if everything else is bypassed. ok=false once `cap` sends are reached today.
 */
export async function checkGlobalCap(kv: KVLike, cap: number): Promise<{ ok: boolean }> {
  if (!Number.isFinite(cap) || cap <= 0) return { ok: true }
  const day = new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)
  const count = await bump(kv, `global:sends:${day}`, 48 * 60 * 60)
  return { ok: count <= cap }
}
