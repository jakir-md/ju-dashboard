export function AnnouncementsPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">University notices</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Centralise exam timetables, holiday closures, and emergency updates. This placeholder view shows how
        JU-Dashboard can surface high-priority items above day-to-day operations modules.
      </p>
      <div className="mt-8 space-y-3">
        {[
          { title: 'Semester registration window', meta: 'Academic · Central' },
          { title: 'Campus network maintenance', meta: 'ICT · Scheduled' },
          { title: 'Guest lecture series — venue map', meta: 'Public affairs' },
        ].map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-1 rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</span>
            <span className="text-xs text-slate-500 dark:text-slate-500">{item.meta}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
