import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — every route is prerendered to a file in `out/` and served
  // as a Cloudflare Pages static asset. The one dynamic endpoint (/api/contact) and
  // the subdomain rewrite live in `functions/` as Pages Functions instead.
  output: "export",

  // Inline atomic (Tailwind) CSS into <head> instead of emitting a render-blocking
  // <link>. Removes the CSS request from the critical path → faster FCP/LCP.
  experimental: {
    inlineCss: true,
  },

  images: {
    // Static export can't run Next's image optimizer (no server). Serve images as-is;
    // Cloudflare's CDN handles compression/caching. Remote images (Unsplash) already
    // come pre-optimized via their URL params.
    unoptimized: true,
  },

  // NOTE: `headers()` is not applied in a static export — security headers now live
  // in `public/_headers` (Cloudflare Pages). Rewrites/redirects likewise move to
  // Pages Functions / `_redirects`.
};

export default nextConfig;
