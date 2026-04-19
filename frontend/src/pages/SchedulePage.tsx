import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { cancelResourceBooking, listBookableResources, listResourceBookings } from '../api/bookingApi'
import { AddBookingForm } from '../components/AddBookingForm'
import { ScheduleTable } from '../components/ScheduleTable'
import type { BookableResource, ResourceBooking } from '../types/booking'

export function SchedulePage() {
  const [bookings, setBookings] = useState<ResourceBooking[]>([])
  const [resources, setResources] = useState<BookableResource[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [cancellingId, setCancellingId] = useState<number | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const [bookingData, resourceData] = await Promise.all([
        listResourceBookings(),
        listBookableResources(),
      ])
      setBookings(bookingData)
      setResources(resourceData)
    } catch {
      setLoadError('Could not load schedule or resources. Is the API running on port 5000?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const timer = window.setTimeout(() => {
      if (cancelled) return
      void load()
    }, 0)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [load])

  const handleCancel = async (id: number) => {
    setActionError(null)
    const previous = bookings
    setBookings((rows) => rows.filter((b) => b.id !== id))
    setCancellingId(id)
    try {
      await cancelResourceBooking(id)
    } catch (error) {
      setBookings(previous)
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setActionError('That booking was already removed.')
      } else {
        setActionError('Could not cancel the booking. Please try again.')
      }
    } finally {
      setCancellingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <AddBookingForm resources={resources} onCreated={() => void load()} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Booking schedule</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            GET /api/v1/bookings — who booked which resource and when. Cancel sends DELETE /api/v1/bookings/:id.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Refresh
        </button>
      </div>

      {actionError ? (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-100">
          {actionError}
        </div>
      ) : null}

      {loadError ? (
        <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-800 dark:text-rose-100">
          {loadError}
        </div>
      ) : null}

      {loading ? (
        <div className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60" />
      ) : (
        <ScheduleTable bookings={bookings} cancellingId={cancellingId} onCancel={handleCancel} />
      )}
    </div>
  )
}
