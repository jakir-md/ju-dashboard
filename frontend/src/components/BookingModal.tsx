import { useId, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { createResourceBooking, getApiErrorMessage } from '../api/bookingApi'
import type { BookableResource } from '../types/booking'

type Props = {
  resource: BookableResource | null
  open: boolean
  onClose: () => void
  onBooked: () => void
}

export function BookingModal({ resource, open, onClose, onBooked }: Props) {
  const titleId = useId()
  const [requestedBy, setRequestedBy] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!open || !resource) return null

  const resetForm = () => {
    setRequestedBy('')
    setBookingDate('')
    setError(null)
    setSuccess(false)
    setSubmitting(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    if (!requestedBy.trim() || !bookingDate) {
      setError('Please fill in every field.')
      return
    }
    setSubmitting(true)
    try {
      await createResourceBooking({
        resource_id: resource.id,
        requested_by: requestedBy.trim(),
        booking_date: bookingDate,
      })
      setSuccess(true)
      onBooked()
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close booking dialog"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-md rounded-t-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-400/90">Booking</p>
            <h2 id={titleId} className="mt-1 text-xl font-semibold text-slate-50">
              {resource.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {resource.type} · seats {resource.capacity}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
            aria-label="Close"
          >
            <span aria-hidden>×</span>
          </button>
        </div>

        {success ? (
          <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <p className="font-medium text-emerald-50">Booking confirmed.</p>
            <p className="mt-2 text-emerald-100/90">
              Your reservation is saved. You can review or cancel it from the schedule.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/schedule"
                onClick={handleClose}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                View schedule
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="requested_by" className="block text-sm font-medium text-slate-200">
                Requested by
              </label>
              <input
                id="requested_by"
                name="requested_by"
                autoComplete="name"
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none ring-emerald-500/0 transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30"
                placeholder="e.g. Dr. Ali"
              />
            </div>
            <div>
              <label htmlFor="booking_date" className="block text-sm font-medium text-slate-200">
                Booking date
              </label>
              <input
                id="booking_date"
                name="booking_date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none ring-emerald-500/0 transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            {error ? (
              <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
                {error}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="size-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
                      aria-hidden
                    />
                    Booking…
                  </span>
                ) : (
                  'Confirm booking'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
