import type { ResourceBooking } from '../types/booking'

function resourceName(booking: ResourceBooking): string {
  return booking.resource?.name ?? `Resource #${booking.resource_id}`
}

type Props = {
  bookings: ResourceBooking[]
  cancellingId: number | null
  onCancel: (id: number) => void
}

export function ScheduleTable({ bookings, cancellingId, onCancel }: Props) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center text-sm text-slate-400">
        No bookings yet. Reserve a resource from the dashboard to see it here.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl shadow-slate-950/30">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
          <thead className="bg-slate-950/50 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Requested by
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Resource
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Date
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right sm:px-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-800/40">
                <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-50 sm:px-6">
                  {booking.requested_by}
                </td>
                <td className="px-4 py-4 text-slate-300 sm:px-6">{resourceName(booking)}</td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-300 sm:px-6">
                  {formatDisplayDate(booking.booking_date)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                  <span className="inline-flex rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/25">
                    {booking.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={() => onCancel(booking.id)}
                    disabled={cancellingId === booking.id}
                    className="inline-flex items-center justify-center rounded-lg border border-rose-500/40 px-3 py-1.5 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {cancellingId === booking.id ? 'Cancelling…' : 'Cancel'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatDisplayDate(value: string): string {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
