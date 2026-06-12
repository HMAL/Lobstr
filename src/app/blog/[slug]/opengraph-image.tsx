import { ImageResponse } from 'next/og'
import { getPost, posts } from '@/lib/posts'

export const alt = 'Mylobstr Blog — Tips for Albany NY Small Businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  const title = post?.title ?? 'Mylobstr Blog'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '-80px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: 'white',
            }}
          >
            🦞
          </div>
          <span style={{ fontSize: '32px', fontWeight: '700', color: 'white', letterSpacing: '-1px' }}>
            mylobstr
          </span>
          <span
            style={{
              marginLeft: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#cbd5e1',
              fontSize: '18px',
            }}
          >
            Blog
          </span>
        </div>

        <div
          style={{
            fontSize: title.length > 70 ? '48px' : '56px',
            fontWeight: '800',
            color: 'white',
            lineHeight: '1.15',
            letterSpacing: '-1.5px',
            maxWidth: '1000px',
            marginBottom: '32px',
          }}
        >
          {title}
        </div>

        <div style={{ fontSize: '22px', color: '#94a3b8' }}>
          Web design for Albany NY small businesses · mylobstr.com
        </div>
      </div>
    ),
    { ...size }
  )
}
