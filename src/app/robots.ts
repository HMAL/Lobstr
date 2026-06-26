import type { MetadataRoute } from 'next'

// Required for `output: export` — emit this as a static file at build time.
export const dynamic = 'force-static'

// AI crawlers we explicitly welcome so MyLobstr Designs can appear in AI assistants'
// answers and recommendations (training + live-search bots). Same access as a
// normal crawler: everything except the API.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: '/api/' },
    ],
    sitemap: 'https://mylobstr.com/sitemap.xml',
    host: 'https://mylobstr.com',
  }
}
