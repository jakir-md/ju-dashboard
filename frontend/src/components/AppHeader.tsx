import { useEffect, useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HeaderSearch } from './HeaderSearch'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/resources', label: 'Resources', end: false },
  { to: '/schedule', label: 'Schedule', end: false },
  { to: '/campus', label: 'Campus', end: false },
  { to: '/dormitories', label: 'Halls', end: false },
  { to: '/extracurricular', label: 'Clubs', end: false },
  { to: '/university-activities', label: 'Activities', end: false },
  { to: '/directory', label: 'Directory', end: false },
  { to: '/announcements', label: 'Notices', end: false },
  { to: '/help', label: 'Help', end: false },
] as const

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors duration-200',
    isActive
      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 dark:bg-emerald-500/20 dark:text-emerald-50 dark:shadow-none dark:ring-1 dark:ring-emerald-500/40'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
  ].join(' ')

const drawerLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-emerald-600 text-white dark:bg-emerald-500/20 dark:text-emerald-100'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
  ].join(' ')

export function AppHeader() {
  const menuId = useId()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const t = window.setTimeout(() => {
      setMenuOpen(false)
    }, 0)
    return () => window.clearTimeout(t)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/90 backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-950/90">
      {/* Mobile: one compact bar */}
      <div className="flex h-14 items-center gap-2 px-4 sm:px-5 lg:hidden">
        <NavLink
          to="/"
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg outline-none ring-emerald-500/0 focus-visible:ring-2 focus-visible:ring-emerald-500/60"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-[10px] font-bold text-white shadow-md shadow-emerald-600/20">
            JU
          </span>
          <div className="min-w-0 text-left leading-tight">
            <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
              JU-Dashboard
            </span>
            <span className="block truncate text-[10px] font-medium text-slate-500 dark:text-slate-500">
              Jahangirnagar University
            </span>
          </div>
        </NavLink>
        <div className="flex shrink-0 items-center gap-1.5">
          <HeaderSearch menuOpen={menuOpen} />
          <ThemeToggle className="size-9 rounded-lg [&_svg]:size-[1.15rem]" />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Desktop: single aligned row */}
      <div className="mx-auto hidden h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:flex lg:px-8">
        <NavLink
          to="/"
          className="group flex shrink-0 items-center gap-3 rounded-lg outline-none ring-emerald-500/0 focus-visible:ring-2 focus-visible:ring-emerald-500/60"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 text-xs font-bold text-white shadow-md shadow-emerald-600/25 ring-1 ring-white/15 dark:shadow-emerald-950/30">
            JU
          </span>
          <div className="hidden max-w-[11rem] leading-tight lg:block xl:max-w-[14rem]">
            <span className="block truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
              JU-Dashboard
            </span>
            <span className="block truncate text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Jahangirnagar University
            </span>
          </div>
        </NavLink>

        <nav
          className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <HeaderSearch menuOpen={menuOpen} />

        <div className="flex shrink-0 items-center gap-2 border-l border-slate-200/80 pl-3 dark:border-slate-700/80">
          <a
            href="https://juniv.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-emerald-200 hover:text-emerald-800 min-[1200px]:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:text-emerald-300"
          >
            juniv.edu ↗
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Slim context line — desktop only (saves mobile vertical space) */}
      <div className="hidden border-t border-slate-200/70 bg-slate-50/80 dark:border-slate-800/70 dark:bg-slate-900/35 lg:block">
        <div className="mx-auto max-w-7xl px-4 py-1.5 text-center text-[11px] leading-snug text-slate-500 dark:text-slate-500">
          <span className="font-medium text-slate-600 dark:text-slate-400">Whole-university scope:</span>{' '}
          teaching, research, residences, student life, notices, and operations in one navigation system.
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Main menu">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id={menuId}
            className="absolute right-0 top-14 flex h-[calc(100dvh-3.5rem)] w-[min(100%,20rem)] flex-col border-l border-slate-200/90 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Menu</span>
              <button
                type="button"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-3" aria-label="Primary mobile">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={drawerLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-slate-200/80 p-4 dark:border-slate-800">
              <a
                href="https://juniv.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white dark:bg-emerald-500 dark:text-slate-950"
              >
                Official university site ↗
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function MenuIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}
