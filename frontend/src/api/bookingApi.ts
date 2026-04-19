import axios from 'axios'
import { api } from './client'
import type {
  BookableResource,
  CreateResourceBookingPayload,
  ResourceBooking,
} from '../types/booking'

/** Central place for booking-dashboard REST paths (align with Postman collection). */
export const BOOKING_API_ROUTES = {
  resources: '/api/resources',
  bookings: '/api/bookings',
  bookingById: (id: number) => `/api/bookings/${id}`,
} as const

function unwrapList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[]
  if (payload && typeof payload === 'object' && 'data' in payload) {
    const inner = (payload as { data: unknown }).data
    if (Array.isArray(inner)) return inner as T[]
  }
  return []
}

/** GET /api/resources — catalogue of bookable rooms/equipment. */
export async function listBookableResources(): Promise<BookableResource[]> {
  const { data } = await api.get<unknown>(BOOKING_API_ROUTES.resources)
  return unwrapList<BookableResource>(data)
}

/** GET /api/bookings — includes nested resource for schedule views. */
export async function listResourceBookings(): Promise<ResourceBooking[]> {
  const { data } = await api.get<unknown>(BOOKING_API_ROUTES.bookings)
  return unwrapList<ResourceBooking>(data)
}

/** POST /api/bookings — backend returns 400 if resource_id + booking_date already taken. */
export async function createResourceBooking(
  payload: CreateResourceBookingPayload,
): Promise<ResourceBooking> {
  const { data } = await api.post<ResourceBooking>(BOOKING_API_ROUTES.bookings, payload)
  return data
}

/** DELETE /api/bookings/:id — cancel a reservation. */
export async function cancelResourceBooking(id: number): Promise<void> {
  await api.delete(BOOKING_API_ROUTES.bookingById(id))
}

/** Map Axios / API error payloads to user-facing copy for booking forms. */
export function getResourceBookingErrorMessage(error: unknown): string {
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
  return error.message || 'Request failed. Please try again.'
}

export function isBookingConflictError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 400
}
