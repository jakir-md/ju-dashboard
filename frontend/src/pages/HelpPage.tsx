export function HelpPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Help & contact</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        For production deployments, route support tickets through your official IT service desk. Use the
        details below for academic demos and integration testing only.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">ICT support (example)</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">helpdesk@juniv.edu</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">+880 · campus extension</p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">API & integrations</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Validate flows with Postman collections and environment-specific base URLs before go-live.
          </p>
        </div>
      </div>

      <section id="privacy" className="mt-12 scroll-mt-24 border-t border-slate-200 pt-10 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Privacy & data handling</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Replace this template with your institutional privacy notice: lawful basis for processing, retention
          periods for booking records, subprocessors, and how users may request correction or deletion of
          personal data under applicable law.
        </p>
      </section>

      <section
        id="accessibility"
        className="mt-10 scroll-mt-24 border-t border-slate-200 pt-10 dark:border-slate-800"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Accessibility</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          This interface uses semantic landmarks, visible focus states, and high-contrast theme pairs. Before
          production, complete WCAG 2.2 verification (keyboard-only paths, screen reader labels, motion
          preferences) and publish a dated conformance summary here.
        </p>
      </section>
    </article>
  )
}
