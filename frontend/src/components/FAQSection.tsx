import { useId, useState } from 'react'

const faqItems = [
  {
    q: 'What is JU-Dashboard used for?',
    a: 'Primarily a resource booking dashboard: browse bookable rooms/equipment (GET /api/resources), create reservations (POST /api/bookings), and manage the live schedule (GET/DELETE /api/bookings). Campus pages are contextual extras around that core lab flow.',
  },
  {
    q: 'How do resource bookings work?',
    a: 'Open Resources, choose a room or equipment card, then submit your name and date. The backend prevents double-booking for the same resource on the same day; the UI shows clear errors if a slot is already taken.',
  },
  {
    q: 'Do I need an account to book?',
    a: 'No. The lab specification uses a simple “requested by” field instead of login. Production systems would typically add SSO or institutional email verification.',
  },
  {
    q: 'Where can I see or cancel my booking?',
    a: 'Use the Schedule page fed by GET /api/bookings. Each row shows who booked which resource and when. Cancel issues DELETE /api/bookings/:id and removes the row immediately in the UI.',
  },
  {
    q: 'Are dormitory photos and club pages official data?',
    a: 'They are structured demo content with stock photography. Replace text and images with verified hall office and student affairs material before any public launch.',
  },
  {
    q: 'How does light / dark mode work?',
    a: 'Your choice is saved in the browser (localStorage) under ju-dashboard-theme. A small script in index.html applies the class early to reduce flash on first paint.',
  },
  {
    q: 'Which API base URL does the dev server use?',
    a: 'By default the Vite dev server proxies /api to http://localhost:5000. Set VITE_API_URL if your Express instance runs elsewhere, or adjust vite.config.ts proxy target.',
  },
  {
    q: 'Who maintains privacy and accessibility statements?',
    a: 'The Help page contains template sections linked from the footer. Your ICT policy office and DPO should replace them with approved legal text and WCAG conformance notes.',
  },
] as const

export function FAQSection() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="site-faq"
      className="scroll-mt-24 border-t border-slate-200/90 bg-gradient-to-b from-slate-100/90 to-slate-50 py-14 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950"
      aria-labelledby={`${baseId}-faq-title`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400/90">
            FAQ
          </p>
          <h2
            id={`${baseId}-faq-title`}
            className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
          >
            Answers before you dive deeper
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Quick orientation for evaluators, visitors, and teammates wiring the Express + MySQL backend.
          </p>
        </div>

        <ul className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`
            return (
              <li
                key={item.q}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
              >
                <h3 className="text-left text-base font-medium leading-snug">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-slate-900 transition hover:bg-slate-50 dark:text-white dark:hover:bg-slate-800/60"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition dark:border-slate-700 dark:text-slate-400 ${
                        isOpen ? 'rotate-180 border-emerald-200 text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-300' : ''
                      }`}
                      aria-hidden
                    >
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
