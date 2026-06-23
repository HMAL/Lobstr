// Cloudflare Pages middleware — runs on every request.
// Ported from src/middleware.ts: maps vanity subdomains (e.g. pet.mylobstr.com)
// to their project demo page (/projects/pet) via a silent rewrite, so the URL bar
// keeps the subdomain while serving the prerendered project page.

const SUBDOMAIN_MAP: Record<string, string> = {
  pet: '/projects/pet',
  restaurant: '/projects/restaurant',
  salon: '/projects/salon',
  barbershop: '/projects/barbershop',
  plumbing: '/projects/plumbing',
  fitness: '/projects/fitness',
}

interface MiddlewareContext {
  request: Request
  next: (input?: Request) => Promise<Response>
}

export async function onRequest(context: MiddlewareContext): Promise<Response> {
  const { request, next } = context
  const url = new URL(request.url)

  // Never rewrite static assets, Next internals, or API calls — let them resolve
  // normally (the project page's own JS/CSS load from /_next/* on the subdomain).
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/api/') ||
    /\.[a-z0-9]+$/i.test(url.pathname)
  ) {
    return next()
  }

  const subdomain = (request.headers.get('host') ?? '').split('.')[0]
  const projectPath = SUBDOMAIN_MAP[subdomain]
  if (!projectPath) return next()

  // Already on the target path — serve as-is to avoid a redundant rewrite.
  if (url.pathname === projectPath || url.pathname.startsWith(`${projectPath}/`)) {
    return next()
  }

  url.pathname = projectPath
  return next(new Request(url.toString(), request))
}
