/**
 * Domain types aligned with the Express + Sequelize backend (`/api/v1/*`).
 * JSON uses snake_case to match model fields.
 */

/** `resource` table — bookable room or equipment. */
export type BookableResource = {
  id: number
  name: string
  type: string
  capacity: number
}

/** `booking` row; `include` uses `as: "resource"` so nested data is under `resource`. */
export type ResourceBooking = {
  id: number
  resource_id: number
  requested_by: string
  /** DATEONLY from MySQL — ISO date string in JSON */
  booking_date: string
  status: string
  resource?: BookableResource
}

/** POST /api/v1/bookings body (see `bookings.services.addBooking`). */
export type CreateResourceBookingPayload = {
  resource_id: number
  requested_by: string
  booking_date: string
}

/** POST /api/v1/resources body (see `Resource` model). */
export type CreateBookableResourcePayload = {
  name: string
  type: string
  capacity: number
}
