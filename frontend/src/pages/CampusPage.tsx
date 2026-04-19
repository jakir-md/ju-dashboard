import { Link } from 'react-router-dom'

export function CampusPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Campus & services</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        JU-Dashboard is designed to scale across transport, guest housing, venue hire, and shared facilities.
        This section documents how administrative units can publish service windows, capacity, and policies in
        one university-wide catalogue.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-400">
        <li>Standardised metadata for rooms, vehicles, and equipment.</li>
        <li>Integration-ready APIs for faculties and central administration.</li>
        <li>Clear audit trail for compliance and post-event reporting.</li>
      </ul>
      <div className="mt-10 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/40">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Related campus experience pages</p>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-emerald-700 dark:text-emerald-400">
          <li>
            <Link to="/dormitories" className="underline-offset-2 hover:underline">
              Halls of residence & photo gallery →
            </Link>
          </li>
          <li>
            <Link to="/extracurricular" className="underline-offset-2 hover:underline">
              Clubs, sports & cultural highlights →
            </Link>
          </li>
          <li>
            <Link to="/university-activities" className="underline-offset-2 hover:underline">
              Full spectrum of university activities →
            </Link>
          </li>
        </ul>
      </div>
    </article>
  )
}
