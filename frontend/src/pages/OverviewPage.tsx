import { Link } from 'react-router-dom'
import { HomeHero } from '../components/HomeHero'
import { HomeStatCards } from '../components/HomeStatCards'

const cards = [
  {
    to: '/resources',
    title: 'Resource catalogue',
    desc: 'List bookable rooms and equipment, add new resources, and open the booking modal from each card.',
    tag: 'GET/POST /api/v1/resources',
  },
  {
    to: '/schedule',
    title: 'Booking schedule',
    desc: 'Add bookings with the form, review the table, and cancel with DELETE /api/v1/bookings/:id.',
    tag: 'GET/POST/DELETE /api/v1/bookings',
  },
] as const

export function OverviewPage() {
  return (
    <div className="space-y-12">
      <HomeHero />

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
          At a glance
        </h2>
        <HomeStatCards />
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
          Start here
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-emerald-300/80 hover:shadow-md dark:border-slate-800/90 dark:bg-slate-900/60 dark:hover:border-emerald-500/35 dark:hover:shadow-emerald-950/20"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">
                {card.tag}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{card.desc}</p>
              <span className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
