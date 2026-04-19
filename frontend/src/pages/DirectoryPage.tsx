export function DirectoryPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        Faculties & administrative units
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        A single directory helps students, staff, and visitors find the right office without juggling PDFs and
        outdated microsites. Future releases can connect this view to your official LDAP or HR master data.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {['Faculty of Mathematical & Physical Sciences', 'Faculty of Biological Sciences', 'Faculty of Social Sciences', 'Registrar & examination wing'].map(
          (name) => (
            <div
              key={name}
              className="rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 text-sm font-medium text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
            >
              {name}
            </div>
          ),
        )}
      </div>
    </article>
  )
}
