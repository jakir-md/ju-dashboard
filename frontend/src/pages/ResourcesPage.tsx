import { useCallback, useEffect, useState } from 'react'
import { listBookableResources } from '../api/bookingApi'
import { AddResourceForm } from '../components/AddResourceForm'
import { BookingModal } from '../components/BookingModal'
import { ResourceCard } from '../components/ResourceCard'
import type { BookableResource } from '../types/booking'

export function ResourcesPage() {
  const [resources, setResources] = useState<BookableResource[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selected, setSelected] = useState<BookableResource | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const data = await listBookableResources()
      setResources(data)
    } catch {
      setLoadError('Could not load resources. Is the API running on port 5000?')
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

  const openBooking = (resource: BookableResource) => {
    setSelected(resource)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelected(null)
  }

  return (
    <div className="space-y-8">
      <AddResourceForm
        onCreated={(created) => {
          setResources((prev) => [...prev, created].sort((a, b) => a.id - b.id))
        }}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Resource catalogue</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Bookable items from GET /api/v1/resources — use Book now or add entries above.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Refresh list
        </button>
      </div>

      {loadError ? (
        <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-800 dark:text-rose-100">
          {loadError}
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} onBook={openBooking} />
          ))}
        </div>
      )}

      {!loading && resources.length === 0 && !loadError ? (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          No resources yet — use the form above to create your first bookable item.
        </p>
      ) : null}

      <BookingModal resource={selected} open={modalOpen} onClose={closeModal} onBooked={() => void load()} />
    </div>
  )
}
