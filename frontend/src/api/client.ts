import axios from 'axios'

/** Base URL for the Express API (e.g. http://localhost:5000). Leave empty in dev to use Vite /api proxy. */
const baseURL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

/** Shared Axios instance for resource booking endpoints under {@link ../api/bookingApi#BOOKING_API_ROUTES}. */
export const api = axios.create({
  baseURL,
  headers: { Accept: 'application/json' },
})
