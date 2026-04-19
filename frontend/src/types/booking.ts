/**
 * Domain types for the resource booking dashboard (REST: /api/resources, /api/bookings).
 * Field names mirror Sequelize / Express JSON responses (snake_case).
 */

/** A room or equipment item that can be reserved. */
export type BookableResource = {
  id: number
  name: string
  type: string
  capacity: number
}

/** A confirmed (or default-status) reservation for one resource on one date. */
export type ResourceBooking = {
  id: number
  resource_id: number
  requested_by: string
  booking_date: string
  status: string
  /** Sequelize often nests as `Resource` */
  Resource?: BookableResource
  /** Alternate association key */
  resource?: BookableResource
}

/** Request body for POST /api/bookings */
export type CreateResourceBookingPayload = {
  resource_id: number
  requested_by: string
  booking_date: string
}
