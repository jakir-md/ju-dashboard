import { CampusPhoto } from '../components/CampusPhoto'
import { extracurricularSpots } from '../data/campusLife'

export function ExtracurricularPage() {
  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400/90">
          Student experience
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Extra-curricular sights & activities
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Beyond lecture theatres, JU hosts hundreds of voluntary initiatives—robotics chapters, theatre troupes,
          environmental brigades, and more. Use this layout to showcase timetables, sign-up forms, and hero
          photography for each club fair.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        {extracurricularSpots.map((spot) => (
          <article
            key={spot.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
          >
            <CampusPhoto src={spot.imageSrc} alt={spot.imageAlt} aspectClass="aspect-[16/10]" className="rounded-none border-0" />
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400/90">
                {spot.category}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{spot.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {spot.description}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
