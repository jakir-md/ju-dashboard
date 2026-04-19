import { Link } from 'react-router-dom'

const marqueeItems = [
  'Register bookable resources',
  'Create reservations by date',
  'Prevent double-booking per resource',
  'REST API · Express · Sequelize · MySQL',
  'JU-Dashboard resource allocation',
] as const

export function HomeHero() {
  return (
    <section
      className="hero-shell relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 sm:rounded-3xl dark:border-slate-800/90 dark:bg-slate-900/40 dark:shadow-black/40"
      aria-labelledby="home-hero-heading"
    >
      <div className="hero-aurora pointer-events-none absolute inset-0 opacity-90 dark:opacity-100" aria-hidden />
      <div
        className="pointer-events-none absolute -left-20 top-0 size-56 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/15 ju-orb-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-64 rounded-full bg-teal-400/18 blur-3xl dark:bg-teal-500/12 ju-orb-float-reverse"
        aria-hidden
      />

      <div
        className="relative z-10 border-b border-slate-200/60 bg-slate-900/[0.03] py-2 dark:border-slate-700/50 dark:bg-white/[0.03]"
        aria-hidden
      >
        <div className="ju-marquee-mask overflow-hidden">
          <div className="ju-marquee-track flex gap-10">
            {[...marqueeItems, ...marqueeItems].map((text, i) => (
              <span
                key={`${text}-${i}`}
                className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 sm:text-xs"
              >
                {text}
                <span className="mx-6 text-emerald-500/60 dark:text-emerald-400/50">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <p className="ju-reveal text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400/95 sm:text-xs">
          Jahangirnagar University
        </p>
        <h1
          id="home-hero-heading"
          className="ju-reveal ju-reveal-delay-1 mt-3 text-center text-2xl font-semibold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl lg:text-5xl dark:text-white"
        >
          Resource{' '}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
            booking dashboard
          </span>
        </h1>
        <p className="ju-reveal ju-reveal-delay-2 mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base dark:text-slate-400">
          Add labs and equipment, place bookings with a name and date, and keep the live schedule in sync with
          your Express + Sequelize API under <span className="font-mono text-xs">/api/v1</span>.
        </p>
        <div className="ju-reveal ju-reveal-delay-3 mx-auto mt-6 flex max-w-lg flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          <Link
            to="/resources"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 sm:px-5 sm:py-3 dark:bg-emerald-500 dark:text-slate-950 dark:shadow-emerald-900/40 dark:hover:bg-emerald-400"
          >
            Resources & add form
          </Link>
          <Link
            to="/schedule"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300/90 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-emerald-300 sm:px-5 sm:py-3 dark:border-slate-600 dark:bg-slate-950/50 dark:text-slate-100 dark:hover:border-emerald-500/50"
          >
            Schedule & new booking
          </Link>
          <Link
            to="/help"
            className="inline-flex items-center justify-center rounded-xl border border-transparent px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 sm:px-5 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
          >
            Help →
          </Link>
        </div>
      </div>
    </section>
  )
}
