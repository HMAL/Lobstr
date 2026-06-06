import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mylobstr — Web Design for Local Businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background accent circles */}
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

        {/* Logo / Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
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
          <span style={{ fontSize: '36px', fontWeight: '700', color: 'white', letterSpacing: '-1px' }}>
            mylobstr
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: '800',
            color: 'white',
            textAlign: 'center',
            lineHeight: '1.1',
            letterSpacing: '-2px',
            maxWidth: '900px',
            marginBottom: '24px',
          }}
        >
          Web Design for
          <br />
          <span style={{ background: 'linear-gradient(90deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Local Businesses
          </span>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: '24px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: '1.5',
          }}
        >
          Launch in 48 hours · Starting at $100
        </div>

        {/* Bottom badges */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
          {['Restaurants', 'Salons', 'Pet Clinics', 'Barbershops', 'Plumbers', 'Gyms'].map((label) => (
            <div
              key={label}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#cbd5e1',
                fontSize: '16px',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
