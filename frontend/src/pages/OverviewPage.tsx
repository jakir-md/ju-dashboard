import { Link } from 'react-router-dom'
import { HomeHero } from '../components/HomeHero'
import { HomeStatCards } from '../components/HomeStatCards'

const operationsCards = [
  {
    to: '/resources',
    title: 'Resource booking',
    desc: 'Browse labs, seminar rooms, and shared equipment. Create and track reservations in one place.',
    tag: 'Operations',
  },
  {
    to: '/schedule',
    title: 'Schedule & occupancy',
    desc: 'See who booked what and when. Cancel or adjust bookings with immediate updates across views.',
    tag: 'Visibility',
  },
] as const

const campusCards = [
  {
    to: '/dormitories',
    title: 'Halls & dormitories',
    desc: 'Photo galleries, hall amenities, and guest-house information for students, guardians, and visitors.',
    tag: 'Residential',
  },
  {
    to: '/extracurricular',
    title: 'Clubs & campus life',
    desc: 'Debating societies, robotics chapters, theatre, volunteering, and the iconic green-campus runs.',
    tag: 'Student life',
  },
  {
    to: '/university-activities',
    title: 'What JU does',
    desc: 'Teaching, research, examinations, extension work, convocation, international relations, and more.',
    tag: 'Institution',
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
          Operations
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {operationsCards.map((card) => (
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
              <span className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Open module →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
          Campus & university life
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {campusCards.map((card) => (
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
              <span className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
