import axios from 'axios'
import { api } from './client'
import type {
  BookableResource,
  CreateBookableResourcePayload,
  CreateResourceBookingPayload,
  ResourceBooking,
} from '../types/booking'

/** Matches `app.use("/api/v1", …)` in `backend/src/app.ts`. */
export const API_V1_PREFIX = '/api/v1' as const

/** Paths used by `resources.routes.ts` and `bookings.routes.ts`. */
export const BOOKING_API_ROUTES = {
  resources: `${API_V1_PREFIX}/resources`,
  bookings: `${API_V1_PREFIX}/bookings`,
  bookingById: (id: number | string) => `${API_V1_PREFIX}/bookings/${id}`,
} as const

function unwrapList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[]
  if (payload && typeof payload === 'object' && 'data' in payload) {
    const inner = (payload as { data: unknown }).data
    if (Array.isArray(inner)) return inner as T[]
  }
  return []
}

/** GET /api/v1/resources — `Resource.findAll()` */
export async function listBookableResources(): Promise<BookableResource[]> {
  const { data } = await api.get<unknown>(BOOKING_API_ROUTES.resources)
  return unwrapList<BookableResource>(data)
}

/** POST /api/v1/resources — `Resource.create()` (admin / seeding). */
export async function createBookableResource(
  payload: CreateBookableResourcePayload,
): Promise<BookableResource> {
  const { data } = await api.post<BookableResource>(BOOKING_API_ROUTES.resources, payload)
  return data
}

/** GET /api/v1/bookings — `Booking.findAll({ include: { as: "resource" } })` */
export async function listResourceBookings(): Promise<ResourceBooking[]> {
  const { data } = await api.get<unknown>(BOOKING_API_ROUTES.bookings)
  return unwrapList<ResourceBooking>(data)
}

/**
 * POST /api/v1/bookings — `bookingsService.addBooking`.
 * 400 → `{ error: string }` (e.g. duplicate resource_id + booking_date).
 */
export async function createResourceBooking(
  payload: CreateResourceBookingPayload,
): Promise<ResourceBooking> {
  const { data } = await api.post<ResourceBooking>(BOOKING_API_ROUTES.bookings, payload)
  return data
}

/** DELETE /api/v1/bookings/:id — `Booking.destroy`; responds **204** No Content. */
export async function cancelResourceBooking(id: number): Promise<void> {
  await api.delete(BOOKING_API_ROUTES.bookingById(id))
}

/** Parses `{ error }` / `{ message }` from booking & resource POST responses. */
export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return 'Something went wrong. Please try again.'
  const data = error.response?.data
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>
    const message = record.message
    if (typeof message === 'string' && message.trim()) return message
    const err = record.error
    if (typeof err === 'string' && err.trim()) return err
  }
  if (error.response?.status === 400) {
    return 'This resource is already booked for that date.'
  }
  if (error.response?.status === 404) {
    const err404 = (data as Record<string, unknown> | undefined)?.error
    if (typeof err404 === 'string' && err404.trim()) return err404
    return 'Not found.'
  }
  return error.message || 'Request failed. Please try again.'
}

export function isBookingConflictError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 400
}
