import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const TO_EMAIL = 'homemadeappsllc@gmail.com'

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  try {
    const { name, email, business, type, message } = await req.json()

    if (!name || !email || !business || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

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
        subject: `New inquiry: ${business} (${type})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1d4ed8; margin-bottom: 4px;">New Website Inquiry</h2>
            <p style="color: #6b7280; font-size: 13px; margin-top: 0;">Submitted via mylobstr.com</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Business</td><td style="padding: 8px 0; font-weight: 600;">${business}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Type</td><td style="padding: 8px 0;">${type}</td></tr>
            </table>
            ${message ? `<div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #2563eb;"><p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">${message}</p></div>` : ''}
            <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">Hit Reply to respond directly to ${name}.</p>
          </div>
        `,
      }),
    })

    const data = await res.json() as { id?: string; name?: string; message?: string }

    if (!res.ok) {
      console.error('Resend error:', data)
      return NextResponse.json(
        { error: 'Failed to send email', detail: data.message ?? data.name ?? 'Unknown error' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Contact form error:', msg)
    return NextResponse.json({ error: 'Failed to send email', detail: msg }, { status: 500 })
  }
}
