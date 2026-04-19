import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { querySearchCatalog, type SearchHit } from '../data/searchIndex'

type Props = {
  menuOpen?: boolean
}

export function HeaderSearch({ menuOpen = false }: Props) {
  const listId = useId()
  const desktopInputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)
  const desktopRootRef = useRef<HTMLDivElement>(null)
  const mobileSheetRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [desktopOpen, setDesktopOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const results = useMemo(() => querySearchCatalog(query, 10), [query])

  useEffect(() => {
    if (!menuOpen) return
    const t = window.setTimeout(() => {
      setDesktopOpen(false)
      setSheetOpen(false)
    }, 0)
    return () => window.clearTimeout(t)
  }, [menuOpen])

  useEffect(() => {
    if (!sheetOpen) return
    const t = window.setTimeout(() => mobileInputRef.current?.focus(), 30)
    return () => window.clearTimeout(t)
  }, [sheetOpen])

  useEffect(() => {
    if (!sheetOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [sheetOpen])

  useEffect(() => {
    if (!desktopOpen && !sheetOpen) return
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node
      if (desktopRootRef.current?.contains(t)) return
      if (mobileSheetRef.current?.contains(t)) return
      setDesktopOpen(false)
      setSheetOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [desktopOpen, sheetOpen])

  const goHit = useCallback(
    (hit: SearchHit) => {
      const path = hit.hash ? `${hit.to}#${hit.hash}` : hit.to
      navigate(path)
      setQuery('')
      setDesktopOpen(false)
      setSheetOpen(false)
      if (hit.hash) {
        window.setTimeout(() => {
          document.getElementById(hit.hash!)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 120)
      }
    },
    [navigate],
  )

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setDesktopOpen(false)
      setSheetOpen(false)
      desktopInputRef.current?.blur()
      mobileInputRef.current?.blur()
      return
    }
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const hit = results[activeIndex]
      if (hit) goHit(hit)
    }
  }

  const renderPanel = (variant: 'desktop' | 'mobile') => (
    <div
      id={variant === 'desktop' ? listId : `${listId}-m`}
      role="listbox"
      aria-label="Search results"
      className={
        variant === 'desktop'
          ? 'border-t border-slate-100 dark:border-slate-800'
          : 'border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950'
      }
    >
      {query.trim().length === 0 ? (
        <p className="px-4 py-5 text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Search across <span className="font-medium text-slate-700 dark:text-slate-300">pages</span>,{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">halls</span>,{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">clubs</span>, and{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">university programmes</span>.
          <span className="mt-2 block text-xs text-slate-400 dark:text-slate-600">
            Try: <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] dark:bg-slate-800">schedule</kbd>{' '}
            · <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] dark:bg-slate-800">tajuddin</kbd>{' '}
            · <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] dark:bg-slate-800">research</kbd>
          </span>
        </p>
      ) : results.length === 0 ? (
        <p className="px-4 py-5 text-center text-sm text-slate-500 dark:text-slate-400">
          No matches for “<span className="font-medium text-slate-800 dark:text-slate-200">{query}</span>”.
        </p>
      ) : (
        <ul className="max-h-[min(58dvh,20rem)] overflow-y-auto py-1 lg:max-h-[min(70vh,22rem)]">
          {results.map((hit, index) => (
            <li key={hit.id} role="option" aria-selected={index === activeIndex}>
              <ResultRow
                hit={hit}
                query={query}
                active={index === activeIndex}
                onPick={() => goHit(hit)}
                onMouseEnter={() => setActiveIndex(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  const renderInput = (variant: 'desktop' | 'mobile') => (
    <div className="relative">
      <SearchGlyph className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
      <input
        ref={variant === 'desktop' ? desktopInputRef : mobileInputRef}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActiveIndex(0)
        }}
        onFocus={() => {
          if (variant === 'desktop') setDesktopOpen(true)
        }}
        onKeyDown={onKeyDown}
        placeholder="Search…"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-autocomplete="list"
        aria-controls={variant === 'desktop' ? listId : `${listId}-m`}
        aria-expanded={variant === 'desktop' ? desktopOpen : sheetOpen}
        className="w-full rounded-lg border border-slate-200/90 bg-slate-50/90 py-1.5 pl-8 pr-8 text-xs text-slate-900 shadow-inner shadow-slate-900/5 outline-none ring-emerald-500/0 transition placeholder:text-slate-400 focus:border-emerald-400/80 focus:bg-white focus:ring-2 focus:ring-emerald-500/25 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-500/50 dark:focus:bg-slate-900"
      />
      {query ? (
        <button
          type="button"
          className="absolute right-1.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-200/80 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Clear search"
          onClick={() => {
            setQuery('')
            ;(variant === 'desktop' ? desktopInputRef : mobileInputRef).current?.focus()
          }}
        >
          <span className="text-base leading-none">×</span>
        </button>
      ) : null}
    </div>
  )

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        <button
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          aria-label="Open search"
          aria-expanded={sheetOpen}
          onClick={() => setSheetOpen((s) => !s)}
        >
          <SearchGlyph className="size-3.5" />
        </button>
      </div>

      {sheetOpen ? (
        <div className="fixed inset-x-0 top-14 z-[60] border-b border-slate-200/90 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
          <div ref={mobileSheetRef} className="mx-auto max-w-7xl p-3">
            {renderInput('mobile')}
            {renderPanel('mobile')}
            <p className="border-t border-slate-100 px-1 py-2 text-center text-[10px] text-slate-400 dark:border-slate-800 dark:text-slate-600">
              ↑↓ navigate · Enter open · Esc close
            </p>
          </div>
        </div>
      ) : null}

      {/* Desktop */}
      <div className="relative hidden w-[min(100%,14.5rem)] shrink-0 sm:w-[15.5rem] lg:block xl:w-72" ref={desktopRootRef}>
        {renderInput('desktop')}
        {desktopOpen ? (
          <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40 dark:ring-white/10">
            {renderPanel('desktop')}
            <p className="border-t border-slate-100 px-4 py-2 text-[10px] text-slate-400 dark:border-slate-800 dark:text-slate-600">
              ↑↓ navigate · Enter to open · Esc to close
            </p>
          </div>
        ) : null}
      </div>
    </>
  )
}

function ResultRow({
  hit,
  query,
  active,
  onPick,
  onMouseEnter,
}: {
  hit: SearchHit
  query: string
  active: boolean
  onPick: () => void
  onMouseEnter: () => void
}) {
  const to = hit.hash ? `${hit.to}#${hit.hash}` : hit.to
  return (
    <Link
      to={to}
      onClick={(e) => {
        e.preventDefault()
        onPick()
      }}
      onMouseEnter={onMouseEnter}
      className={[
        'flex gap-3 px-4 py-3 transition',
        active ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900/80',
      ].join(' ')}
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <DocGlyph className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-slate-900 dark:text-slate-100">
            <Highlight text={hit.title} query={query} />
          </span>
          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {hit.category}
          </span>
        </span>
        <span className="mt-0.5 block line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          <Highlight text={hit.description} query={query} />
        </span>
        <span className="mt-1 block truncate font-mono text-[11px] text-slate-400 dark:text-slate-600">{to}</span>
      </span>
    </Link>
  )
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>
  const lower = text.toLowerCase()
  const idx = lower.indexOf(q.toLowerCase())
  if (idx === -1) return <>{text}</>
  const before = text.slice(0, idx)
  const match = text.slice(idx, idx + q.length)
  const after = text.slice(idx + q.length)
  return (
    <>
      {before}
      <mark className="rounded bg-emerald-200/90 px-0.5 font-medium text-slate-900 dark:bg-emerald-500/35 dark:text-emerald-50">
        {match}
      </mark>
      {after}
    </>
  )
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm9 2-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DocGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M8 13h8M8 17h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}
