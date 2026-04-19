export type CreateResourceInput = {
  name: string;
  type: string;
  capacity: number;
};

export function parseCreateResourceBody(body: unknown): CreateResourceInput {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be a JSON object");
  }
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const type = typeof b.type === "string" ? b.type.trim() : "";
  const rawCap = b.capacity;
  const capacity =
    typeof rawCap === "number"
      ? rawCap
      : typeof rawCap === "string"
        ? parseInt(rawCap, 10)
        : NaN;

  if (!name) throw new Error("Field 'name' is required");
  if (!type) throw new Error("Field 'type' is required");
  if (!Number.isFinite(capacity) || !Number.isInteger(capacity) || capacity < 1) {
    throw new Error("Field 'capacity' must be a positive integer");
  }

  return { name, type, capacity };
}
