export type SearchHit = {
  id: string
  title: string
  description: string
  to: string
  hash?: string
  category: string
  haystack: string
}

function h(hit: Omit<SearchHit, 'haystack'> & { haystack?: string }): SearchHit {
  const haystack = (hit.haystack ?? `${hit.title} ${hit.description} ${hit.category}`).toLowerCase()
  return { ...hit, haystack }
}

function buildCatalog(): SearchHit[] {
  return [
    h({
      id: 'page-overview',
      title: 'Overview',
      description: 'Dashboard home — hero, stats, and links to the resource catalogue and booking schedule.',
      to: '/',
      category: 'Dashboard',
    }),
    h({
      id: 'page-resources',
      title: 'Resource catalogue',
      description: 'GET/POST /api/v1/resources — list bookable items and use the add-resource form.',
      to: '/resources',
      category: 'API',
      haystack: 'resources catalogue book lab room equipment capacity create',
    }),
    h({
      id: 'page-schedule',
      title: 'Booking schedule',
      description: 'GET/POST/DELETE /api/v1/bookings — add booking form, table, cancel rows.',
      to: '/schedule',
      category: 'API',
      haystack: 'schedule booking reservation cancel delete calendar',
    }),
    h({
      id: 'page-help',
      title: 'Help & templates',
      description: 'ICT placeholders, privacy and accessibility sections for your submission pack.',
      to: '/help',
      category: 'Support',
      haystack: 'help contact privacy accessibility',
    }),
    h({
      id: 'page-faq',
      title: 'FAQ',
      description: 'Common questions about booking flow, theme, and API base URL.',
      to: '/',
      hash: 'site-faq',
      category: 'Help',
      haystack: 'faq questions answers api proxy theme',
    }),
  ]
}

export const searchCatalog: SearchHit[] = buildCatalog()

export function querySearchCatalog(raw: string, limit = 10): SearchHit[] {
  const q = raw.trim().toLowerCase()
  if (q.length === 0) return []

  const scored = searchCatalog
    .map((hit) => ({ hit, score: scoreHit(hit, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.hit.title.localeCompare(b.hit.title))

  const seen = new Set<string>()
  const out: SearchHit[] = []
  for (const { hit } of scored) {
    const key = `${hit.to}::${hit.hash ?? ''}::${hit.title}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(hit)
    if (out.length >= limit) break
  }
  return out
}

function scoreHit(hit: SearchHit, q: string): number {
  const t = hit.title.toLowerCase()
  const d = hit.description.toLowerCase()
  const hay = hit.haystack
  const words = q.split(/\s+/).filter(Boolean)

  let score = 0
  if (t === q) score += 120
  else if (t.startsWith(q)) score += 100
  else if (t.includes(q)) score += 85

  if (d.includes(q)) score += 45
  for (const w of words) {
    if (w.length < 2) continue
    if (t.includes(w)) score += 25
    else if (hay.includes(w)) score += 12
  }

  if (hay.includes(q) && score === 0) score = 20
  if (hit.category === 'API' || hit.category === 'Dashboard') score += 6
  return score
}
