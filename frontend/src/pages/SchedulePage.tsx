import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { cancelResourceBooking, listResourceBookings } from '../api/bookingApi'
import { ScheduleTable } from '../components/ScheduleTable'
import type { ResourceBooking } from '../types/booking'

export function SchedulePage() {
  const [bookings, setBookings] = useState<ResourceBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [cancellingId, setCancellingId] = useState<number | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const data = await listResourceBookings()
      setBookings(data)
    } catch {
      setLoadError('Could not load bookings. Is the API running?')
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-50">Schedule viewer</h2>
          <p className="mt-1 text-sm text-slate-400">
            Every reservation in one table—who booked which space and when.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="self-start rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
        >
          Refresh schedule
        </button>
      </div>

      {actionError ? (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
          {actionError}
        </div>
      ) : null}

      {loadError ? (
        <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-100">
          {loadError}
        </div>
      ) : null}

      {loading ? (
        <div className="h-56 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/60" />
      ) : (
        <ScheduleTable bookings={bookings} cancellingId={cancellingId} onCancel={handleCancel} />
      )}
    </div>
  )
}
