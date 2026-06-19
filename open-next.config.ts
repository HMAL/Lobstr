import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import incrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

// Serve prerendered (SSG) pages — including dynamic routes like /blog/[slug] — from
// Workers static assets. Without an incrementalCache, open-next uses a no-op cache and
// prerendered dynamic-route pages 404 even though they were built. We only do SSG (no
// revalidation), so the static-assets adapter is the right fit (no R2/KV needed).
export default defineCloudflareConfig({
  incrementalCache,
})
