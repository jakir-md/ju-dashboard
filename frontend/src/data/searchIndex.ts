import { dormitoryHalls, extracurricularSpots, universityActivityPillars } from './campusLife'

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
  const pages: SearchHit[] = [
    h({
      id: 'page-overview',
      title: 'Overview',
      description: 'Resource booking dashboard home—quick entry to catalogue, schedule, and campus context.',
      to: '/',
      category: 'Booking dashboard',
      haystack: 'overview dashboard booking resources schedule ju',
    }),
    h({
      id: 'page-resources',
      title: 'Resource catalogue',
      description: 'GET /api/resources — pick a lab, room, or equipment card, then open the booking form.',
      to: '/resources',
      category: 'Booking',
      haystack: 'resources catalogue bookable room lab equipment capacity type post',
    }),
    h({
      id: 'page-schedule',
      title: 'Booking schedule',
      description: 'GET /api/bookings — table of reservations; DELETE /api/bookings/:id to cancel.',
      to: '/schedule',
      category: 'Booking',
      haystack: 'schedule calendar cancel booking occupancy reservation delete',
    }),
    h({
      id: 'page-campus',
      title: 'Campus & services',
      description: 'Transport, guest housing, venue hire, and shared facilities catalogue.',
      to: '/campus',
      category: 'Campus',
    }),
    h({
      id: 'page-dormitories',
      title: 'Halls of residence',
      description: 'Dormitory information, hall amenities, guest house, and campus photo gallery.',
      to: '/dormitories',
      category: 'Residential',
      haystack: 'dormitory dorm hall residence hostel housing student accommodation',
    }),
    h({
      id: 'page-extracurricular',
      title: 'Clubs & extracurricular',
      description: 'Debating, robotics, theatre, volunteering, sports, and wildlife walks on campus.',
      to: '/extracurricular',
      category: 'Student life',
      haystack: 'clubs sports arts debate robotics culture volunteer',
    }),
    h({
      id: 'page-university-activities',
      title: 'University activities',
      description: 'Teaching, research, exams, extension, convocation, international relations, and governance.',
      to: '/university-activities',
      category: 'Institution',
      haystack: 'research teaching convocation extension international phd examination',
    }),
    h({
      id: 'page-directory',
      title: 'Directory',
      description: 'Faculties and administrative units—structured for future LDAP or HR integration.',
      to: '/directory',
      category: 'Directory',
      haystack: 'faculty office department administration',
    }),
    h({
      id: 'page-announcements',
      title: 'Notices',
      description: 'University-wide notices: exams, maintenance, guest lectures, and emergency updates.',
      to: '/announcements',
      category: 'Communications',
      haystack: 'announcement notice news bulletin',
    }),
    h({
      id: 'page-help',
      title: 'Help & contact',
      description: 'ICT support placeholders, API testing notes, privacy and accessibility templates.',
      to: '/help',
      category: 'Support',
      haystack: 'help contact support privacy accessibility api postman',
    }),
    h({
      id: 'page-faq',
      title: 'FAQ — frequently asked questions',
      description: 'Booking rules, theme toggle, API proxy, dormitory demo data, and governance templates.',
      to: '/',
      hash: 'site-faq',
      category: 'Help',
      haystack: 'faq questions answers booking theme localstorage proxy',
    }),
  ]

  const halls: SearchHit[] = dormitoryHalls.map((d) =>
    h({
      id: `hall-${d.id}`,
      title: d.name,
      description: d.subtitle,
      to: '/dormitories',
      category: 'Halls',
      haystack: [d.name, d.subtitle, d.description, ...d.highlights].join(' '),
    }),
  )

  const clubs: SearchHit[] = extracurricularSpots.map((s) =>
    h({
      id: `club-${s.id}`,
      title: s.title,
      description: s.description,
      to: '/extracurricular',
      category: s.category,
      haystack: [s.title, s.category, s.description].join(' '),
    }),
  )

  const pillars: SearchHit[] = universityActivityPillars.map((p) =>
    h({
      id: `pillar-${p.id}`,
      title: p.title,
      description: p.summary,
      to: '/university-activities',
      category: 'Activities',
      haystack: [p.title, p.summary, ...p.examples].join(' '),
    }),
  )

  return [...pages, ...halls, ...clubs, ...pillars]
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

  if (hit.category === 'Booking' || hit.category === 'Booking dashboard') score += 8
  return score
}
