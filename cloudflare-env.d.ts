// Augment the global CloudflareEnv (declared by @opennextjs/cloudflare) with the
// bindings we add in wrangler.toml. Uses a structural KV type so we don't need
// @cloudflare/workers-types installed. Keep in sync with src/lib/contact-guard.ts (KVLike).
export {}

declare global {
  interface CloudflareEnv {
    RATE_LIMIT_KV: {
      get(key: string): Promise<string | null>
      put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>
    }
  }
}
