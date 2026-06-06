import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUBDOMAIN_MAP: Record<string, string> = {
  pet: '/projects/pet',
  restaurant: '/projects/restaurant',
  salon: '/projects/salon',
  barbershop: '/projects/barbershop',
  plumbing: '/projects/plumbing',
  fitness: '/projects/fitness',
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const subdomain = host.split('.')[0]

  const projectPath = SUBDOMAIN_MAP[subdomain]
  if (!projectPath) return NextResponse.next()

  // Avoid rewriting if already on the target path
  if (request.nextUrl.pathname.startsWith(projectPath)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = projectPath
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
