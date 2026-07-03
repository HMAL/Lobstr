import Image from 'next/image'

/**
 * LobsterMark — the studio's maker's mark. Uses the real lobster logo asset so
 * the mark IS the brand. Appears exactly twice on the homepage: small beside
 * the wordmark, and once large + quiet as a watermark in the final CTA.
 *
 * `watermark` tints it to a faint monochrome so it embosses into a dark ground
 * instead of sitting on top as a full-color sticker.
 */

export default function LobsterMark({
  size = 36,
  watermark = false,
  priority = false,
  className = '',
}: {
  size?: number
  watermark?: boolean
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src="/logo-icon.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      priority={priority}
      draggable={false}
      className={`select-none ${
        watermark ? 'pointer-events-none opacity-[0.06] [filter:brightness(0)_invert(1)]' : ''
      } ${className}`}
    />
  )
}
