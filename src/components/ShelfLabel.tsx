/**
 * ShelfLabel — the shop shelf-edge label used to open every section.
 * A mono, tracked label hung off the LEFT with a hairline rule running right.
 * Replaces the old centered uppercase eyebrow-pill, and encodes the section
 * name honestly instead of decorating. Left-aligned on purpose: it breaks the
 * everything-centered template rhythm.
 */

type Tone = 'paper' | 'ink'

export default function ShelfLabel({
  children,
  tone = 'paper',
  className = '',
}: {
  children: React.ReactNode
  tone?: Tone
  className?: string
}) {
  const label = tone === 'ink' ? 'text-marigold' : 'text-coral-ink'
  const rule = tone === 'ink' ? 'bg-ink-wash' : 'bg-border'

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span
        className={`shrink-0 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${label}`}
      >
        {children}
      </span>
      <span className={`h-px flex-1 ${rule}`} aria-hidden="true" />
    </div>
  )
}
