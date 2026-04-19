import { CampusPhoto } from '../components/CampusPhoto'
import { dormitoryGallery, dormitoryHalls } from '../data/campusLife'

export function DormitoriesPage() {
  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400/90">
          Residential life
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Halls of residence & guest housing
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Jahangirnagar University combines forest-campus serenity with high-density student housing. The cards
          below summarise representative halls—swap names, capacities, and imagery with your official hall
          office dataset when you connect a CMS.
        </p>
      </header>

      <section aria-labelledby="dorm-gallery-heading">
        <h2 id="dorm-gallery-heading" className="text-lg font-semibold text-slate-900 dark:text-white">
          Campus gallery
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Stock photography placeholders illustrate how photo grids render; publish your own JPEG/WebP sets for
          accreditation visits and prospectus PDFs.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dormitoryGallery.map((photo) => (
            <CampusPhoto key={photo.src} src={photo.src} alt={photo.alt} aspectClass="aspect-square sm:aspect-[4/3]" />
          ))}
        </div>
      </section>

      <section aria-labelledby="halls-heading" className="space-y-6">
        <h2 id="halls-heading" className="text-lg font-semibold text-slate-900 dark:text-white">
          Hall profiles
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2">
          {dormitoryHalls.map((hall) => (
            <li
              key={hall.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            >
              <CampusPhoto src={hall.imageSrc} alt={hall.imageAlt} aspectClass="aspect-[16/10]" className="rounded-none border-0" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{hall.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">
                  {hall.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{hall.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {hall.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
