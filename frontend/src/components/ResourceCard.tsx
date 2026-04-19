import type { BookableResource } from '../types/booking'

type Props = {
  resource: BookableResource
  onBook: (resource: BookableResource) => void
}

export function ResourceCard({ resource, onBook }: Props) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-950/40 ring-1 ring-white/5 backdrop-blur">
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-400/90">
            {resource.type}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-50">{resource.name}</h3>
        </div>
        <p className="text-sm text-slate-400">
          Capacity:{' '}
          <span className="font-medium text-slate-200">{resource.capacity}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => onBook(resource)}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
      >
        Book now
      </button>
    </article>
  )
}
