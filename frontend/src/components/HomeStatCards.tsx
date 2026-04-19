const stats = [
  {
    label: 'Core REST routes',
    value: '4',
    hint: 'GET/POST /resources · GET/POST /bookings · DELETE /bookings/:id',
  },
  {
    label: 'API prefix',
    value: 'v1',
    hint: 'Mounted at /api/v1 — matches Vite proxy /api → port 5000',
  },
  {
    label: 'Theme modes',
    value: '2',
    hint: 'Light / dark with localStorage preference',
  },
  {
    label: 'Forms on UI',
    value: '2',
    hint: 'Add resource & add booking panels on catalogue + schedule',
  },
] as const

export function HomeStatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`ju-stat-card group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-emerald-500/35 dark:hover:shadow-emerald-950/20`}
          style={{ animationDelay: `${80 + i * 70}ms` }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 transition group-hover:opacity-100 dark:via-emerald-400/40"
            aria-hidden
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">
            {stat.label}
          </p>
          <p className="mt-2 font-mono text-3xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-white">
            {stat.value}
          </p>
          <p className="mt-2 text-sm leading-snug text-slate-600 dark:text-slate-400">{stat.hint}</p>
        </div>
      ))}
    </div>
  )
}
