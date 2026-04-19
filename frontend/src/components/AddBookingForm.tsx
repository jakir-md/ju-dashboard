import { useState, type FormEvent } from 'react'
import { createResourceBooking, getApiErrorMessage } from '../api/bookingApi'
import type { BookableResource, ResourceBooking } from '../types/booking'

type Props = {
  resources: BookableResource[]
  onCreated: (booking: ResourceBooking) => void
}

export function AddBookingForm({ resources, onCreated }: Props) {
  const [resourceId, setResourceId] = useState('')
  const [requestedBy, setRequestedBy] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const rid = parseInt(resourceId, 10)
    if (!resourceId || Number.isNaN(rid) || rid < 1) {
      setError('Select a resource.')
      return
    }
    if (!requestedBy.trim() || !bookingDate) {
      setError('Requested by and booking date are required.')
      return
    }
    setSubmitting(true)
    try {
      const created = await createResourceBooking({
        resource_id: rid,
        requested_by: requestedBy.trim(),
        booking_date: bookingDate,
      })
      setRequestedBy('')
      setBookingDate('')
      setSuccess(true)
      onCreated(created)
      window.setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-6"
      aria-labelledby="add-booking-heading"
    >
      <h2 id="add-booking-heading" className="text-lg font-semibold text-slate-900 dark:text-white">
        New booking
      </h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        POST <span className="font-mono text-xs">/api/v1/bookings</span> — same payload as the card booking
        modal. One booking per resource per day (server returns 400 on conflict).
      </p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="ab-resource" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Resource
          </label>
          <select
            id="ab-resource"
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            required
          >
            <option value="">Select…</option>
            {resources.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.type})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ab-by" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Requested by
          </label>
          <input
            id="ab-by"
            value={requestedBy}
            onChange={(e) => setRequestedBy(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Dr. Ali"
          />
        </div>
        <div>
          <label htmlFor="ab-date" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Date
          </label>
          <input
            id="ab-date"
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-3 sm:flex-row sm:items-center sm:justify-between">
          {error ? (
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          ) : success ? (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">Booking created successfully.</p>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={submitting || resources.length === 0}
            className="inline-flex justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 sm:ml-auto"
          >
            {submitting ? 'Booking…' : 'Create booking'}
          </button>
        </div>
      </form>
      {resources.length === 0 ? (
        <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">
          Add at least one resource before creating a booking.
        </p>
      ) : null}
    </section>
  )
}
