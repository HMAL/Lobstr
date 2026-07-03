/**
 * Awning — the signature. A scalloped storefront-awning valance in coral,
 * rendered ONCE as the transition out of the dark hero. The convex scallops
 * point down; the transparent cusps between them reveal the section behind,
 * so it reads as a real awning hanging over the page. A marigold hairline
 * along the top is its one "sign" flourish.
 *
 * Built with a tiled SVG so the scallop size stays constant at any width
 * (no horizontal distortion). Purely decorative — hidden from the a11y tree.
 */

const CORAL = '#c8442c'

// One scallop tile: a solid band on top, a downward semicircle bump below.
const tile = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='34' viewBox='0 0 40 34'><path d='M0 0 H40 V13 A20 20 0 0 1 0 13 Z' fill='${CORAL}'/></svg>`

export default function Awning({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full ${className}`}
      style={{ height: '26px' }}
    >
      {/* marigold sign-stripe along the top edge of the awning */}
      <div style={{ height: '3px', background: '#e7a427' }} />
      <div
        style={{
          height: '23px',
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(tile)}")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '38px 23px',
          backgroundPosition: 'left top',
        }}
      />
    </div>
  )
}
