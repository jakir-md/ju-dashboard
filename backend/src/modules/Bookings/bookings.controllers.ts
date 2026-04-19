import { Request, Response } from "express";
import { bookingsService } from "./bookings.services";

const getBookings = async (_req: Request, res: Response) => {
  try {
    const data = await bookingsService.getBookings();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

const addBooking = async (req: Request, res: Response) => {
  try {
    const data = await bookingsService.addBooking(req.body);
    res.status(201).json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create booking";
    if (
      message === "Resource not found" ||
      message === "Resource already booked for this date" ||
      message.includes("required") ||
      message.includes("must be") ||
      message.includes("must use") ||
      message.includes("JSON object")
    ) {
      return res.status(400).json({ error: message });
    }
    res.status(500).json({ error: "Failed to create booking" });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id || !/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid booking id" });
    }
    const removed = await bookingsService.deleteBookings(id);
    if (removed === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete booking" });
  }
};

export const bookingsControllers = {
  getBookings,
  addBooking,
  deleteBooking,
};
