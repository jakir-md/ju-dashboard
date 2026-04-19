export type CreateBookingInput = {
  resource_id: number;
  requested_by: string;
  booking_date: string;
};

export function parseCreateBookingBody(body: unknown): CreateBookingInput {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be a JSON object");
  }
  const b = body as Record<string, unknown>;
  const rawRid = b.resource_id;
  const resource_id =
    typeof rawRid === "number"
      ? rawRid
      : typeof rawRid === "string"
        ? parseInt(rawRid, 10)
        : NaN;
  const requested_by =
    typeof b.requested_by === "string" ? b.requested_by.trim() : "";
  const booking_date =
    typeof b.booking_date === "string" ? b.booking_date.trim() : "";

  if (!Number.isFinite(resource_id) || !Number.isInteger(resource_id) || resource_id < 1) {
    throw new Error("Field 'resource_id' must be a positive integer");
  }
  if (!requested_by) throw new Error("Field 'requested_by' is required");
  if (!booking_date) throw new Error("Field 'booking_date' is required (YYYY-MM-DD)");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking_date)) {
    throw new Error("Field 'booking_date' must use YYYY-MM-DD format");
  }

  return { resource_id, requested_by, booking_date };
}
