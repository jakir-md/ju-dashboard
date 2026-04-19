import { useState, type FormEvent } from 'react'
import { createBookableResource, getApiErrorMessage } from '../api/bookingApi'
import type { BookableResource } from '../types/booking'

type Props = {
  onCreated: (resource: BookableResource) => void
}

export function AddResourceForm({ onCreated }: Props) {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [capacity, setCapacity] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const cap = parseInt(capacity, 10)
    if (!name.trim() || !type.trim() || !capacity.trim() || Number.isNaN(cap) || cap < 1) {
      setError('Name, type, and a positive capacity are required.')
      return
    }
    setSubmitting(true)
    try {
      const created = await createBookableResource({
        name: name.trim(),
        type: type.trim(),
        capacity: cap,
      })
      setName('')
      setType('')
      setCapacity('')
      setError(null)
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
      aria-labelledby="add-resource-heading"
    >
      <h2 id="add-resource-heading" className="text-lg font-semibold text-slate-900 dark:text-white">
        Add resource
      </h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        POST <span className="font-mono text-xs">/api/v1/resources</span> — registers a new bookable room or
        equipment item.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label htmlFor="ar-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Name
          </label>
          <input
            id="ar-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="e.g. Networking Lab"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="ar-type" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Type
          </label>
          <input
            id="ar-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Room or Equipment"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="ar-cap" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Capacity
          </label>
          <input
            id="ar-cap"
            type="number"
            min={1}
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="40"
          />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-3 sm:flex-row sm:items-center sm:justify-between">
          {error ? (
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          ) : success ? (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">Resource created successfully.</p>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-60 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 sm:ml-auto"
          >
            {submitting ? 'Saving…' : 'Create resource'}
          </button>
        </div>
      </form>
    </section>
  )
}
