import { Link } from 'react-router-dom'

const explore = [
  { to: '/', label: 'Overview' },
  { to: '/resources', label: 'Resources' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/campus', label: 'Campus & services' },
  { to: '/dormitories', label: 'Halls of residence' },
  { to: '/extracurricular', label: 'Clubs & culture' },
  { to: '/university-activities', label: 'University activities' },
  { to: '/directory', label: 'Directory' },
  { to: '/announcements', label: 'Notices' },
  { to: '/help', label: 'Help & contact' },
] as const

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200/90 bg-white/90 text-slate-700 backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-950/90 dark:text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-xs font-bold text-white shadow-md shadow-emerald-600/20">
                JU
              </span>
              <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                JU-Dashboard
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              A modern web console for Jahangirnagar University—designed to unify operational tools across
              faculties and central administration with clear navigation, accessible layouts, and API-first
              integrations.
            </p>
            <a
              href="https://juniv.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
            >
              Visit the official university website ↗
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-500">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {explore.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-slate-700 transition hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-500">
                University
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li>Savar, Dhaka, Bangladesh</li>
                <li>Central administration & ICT</li>
                <li>Faculty & departmental services</li>
              </ul>
              <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-500">
                Compliance (template)
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/help#privacy"
                    className="text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                  >
                    Privacy & data handling
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help#accessibility"
                    className="text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                  >
                    Accessibility statement
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-500">
              Contact (demo)
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Replace this block with your production IT service desk, DPO, and public information office
              channels. Keep a single source of truth for escalation paths and on-call schedules.
            </p>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium text-slate-800 dark:text-slate-200">ICT coordination:</span>{' '}
              integration testing & API documentation for academic submissions.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-8 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Jahangirnagar University. JU-Dashboard is a demonstration interface;
            governance and branding should follow your official ICT policy before public launch.
          </p>
          <p className="text-slate-400 dark:text-slate-600">
            React · Vite · TypeScript · Tailwind · Node · Express · MySQL
          </p>
        </div>
      </div>
    </footer>
  )
}
