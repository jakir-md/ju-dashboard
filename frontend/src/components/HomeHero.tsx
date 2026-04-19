import { Link } from 'react-router-dom'

const marqueeItems = [
  'Undergraduate & postgraduate teaching',
  'Research centres & PhD training',
  'Central examinations & records',
  'Halls of residence & welfare',
  'Student clubs, arts & debate',
  'Athletics & inter-university sports',
  'Extension & community outreach',
  'International partnerships',
  'Convocation & ceremonial life',
  'Digital services & ICT',
] as const

const pillars = [
  { label: 'Academics', tone: 'from-violet-500/25 to-violet-600/10' },
  { label: 'Research', tone: 'from-cyan-500/25 to-cyan-600/10' },
  { label: 'Residences', tone: 'from-amber-500/25 to-amber-600/10' },
  { label: 'Arts & culture', tone: 'from-pink-500/25 to-rose-600/10' },
  { label: 'Sports', tone: 'from-orange-500/25 to-orange-600/10' },
  { label: 'Extension', tone: 'from-lime-500/20 to-emerald-600/10' },
  { label: 'Global', tone: 'from-sky-500/25 to-blue-600/10' },
  { label: 'Governance', tone: 'from-slate-500/25 to-slate-600/10' },
] as const

export function HomeHero() {
  return (
    <section
      className="hero-shell relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 sm:rounded-3xl dark:border-slate-800/90 dark:bg-slate-900/40 dark:shadow-black/40"
      aria-labelledby="home-hero-heading"
    >
      <div className="hero-aurora pointer-events-none absolute inset-0 opacity-90 dark:opacity-100" aria-hidden />
      <div
        className="pointer-events-none absolute -left-20 top-0 size-56 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/15 ju-orb-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-64 rounded-full bg-amber-400/18 blur-3xl dark:bg-amber-500/12 ju-orb-float-reverse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/3 top-1/2 size-[min(100%,28rem)] -translate-y-1/2 rounded-full bg-emerald-500/12 blur-3xl dark:bg-emerald-400/10"
        aria-hidden
      />

      {/* University life marquee */}
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

      {/* Theme pillars */}
      <div className="relative z-10 border-b border-slate-200/50 px-4 py-3 dark:border-slate-800/50 sm:px-6">
        <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 sm:text-xs">
          Every dimension of university life
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {pillars.map((p, i) => (
            <span
              key={p.label}
              className={`ju-pillar inline-flex items-center rounded-full border border-slate-200/80 bg-gradient-to-br px-2.5 py-1 text-[10px] font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:text-slate-200 sm:px-3 sm:text-xs ${p.tone}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {p.label}
            </span>
          ))}
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
          The full{' '}
          <span className="bg-gradient-to-r from-violet-600 via-emerald-600 to-amber-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-emerald-400 dark:to-amber-300">
            university ecosystem
          </span>
          <br className="hidden sm:block" />
          <span className="text-slate-800 dark:text-slate-100"> in one dashboard experience</span>
        </h1>
        <p className="ju-reveal ju-reveal-delay-2 mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base dark:text-slate-400">
          From lectures and labs to residences, clubs, convocation, and community outreach—JU-Dashboard is
          framed as the digital front door your institution can grow into: structured today, integration-ready
          tomorrow.
        </p>
        <div className="ju-reveal ju-reveal-delay-3 mx-auto mt-6 flex max-w-lg flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          <Link
            to="/resources"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 sm:px-5 sm:py-3 dark:bg-emerald-500 dark:text-slate-950 dark:shadow-emerald-900/40 dark:hover:bg-emerald-400"
          >
            Book a resource
          </Link>
          <Link
            to="/schedule"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300/90 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-emerald-300 sm:px-5 sm:py-3 dark:border-slate-600 dark:bg-slate-950/50 dark:text-slate-100 dark:hover:border-emerald-500/50"
          >
            Live schedule
          </Link>
          <Link
            to="/university-activities"
            className="inline-flex items-center justify-center rounded-xl border border-transparent px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 sm:px-5 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
          >
            University activities →
          </Link>
        </div>
      </div>
    </section>
  )
}
