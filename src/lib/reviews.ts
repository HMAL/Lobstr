// Real customer reviews — the source for Review + aggregateRating JSON-LD.
//
// ⚠️ ONLY add reviews that genuinely exist (e.g. real Google Business Profile
// reviews). Inventing ratings violates Google's structured-data policy and can
// get the whole site's rich results penalized. While this array is empty, NO
// rating schema is emitted — the site stays clean and honest. The moment you
// have real reviews, paste them here and the aggregateRating lights up
// automatically in the entity graph (see src/app/layout.tsx).

export interface Review {
  /** Reviewer's name as it appears publicly */
  author: string
  /** 1–5 */
  rating: number
  /** The review text */
  body: string
  /** ISO date, e.g. '2026-06-20' */
  date: string
}

export const reviews: Review[] = [
  // Example shape (delete this comment and add real ones):
  // { author: 'Jane D.', rating: 5, body: 'Built our salon site in a week for $300. Bookings doubled.', date: '2026-06-20' },
]
