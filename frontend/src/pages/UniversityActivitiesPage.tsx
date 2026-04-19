import { CampusPhoto } from '../components/CampusPhoto'
import { universityActivityPillars } from '../data/campusLife'

export function UniversityActivitiesPage() {
  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400/90">
          Institutional footprint
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          What the university does—end to end
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          From first-semester orientation to convocation, public universities orchestrate dozens of parallel
          activity streams. JU-Dashboard can eventually anchor dashboards for each pillar; for now this page
          communicates the breadth stakeholders expect in a modern portal.
        </p>
      </header>

      <div className="space-y-10">
        {universityActivityPillars.map((pillar, i) => (
          <article
            key={pillar.id}
            className={`grid gap-6 rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 lg:grid-cols-12 lg:p-8 ${
              pillar.imageSrc ? '' : ''
            }`}
          >
            <div className={pillar.imageSrc ? 'lg:col-span-7' : 'lg:col-span-12'}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                <span className="mr-2 inline-flex size-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
                  {i + 1}
                </span>
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{pillar.summary}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {pillar.examples.map((ex) => (
                  <li
                    key={ex}
                    className="flex items-start gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300"
                  >
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
            {pillar.imageSrc ? (
              <div className="lg:col-span-5">
                <CampusPhoto
                  src={pillar.imageSrc}
                  alt={pillar.imageAlt ?? pillar.title}
                  aspectClass="aspect-[4/3] lg:aspect-auto lg:min-h-[220px]"
                />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
