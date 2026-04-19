import { Request, Response } from "express";
import { bookingsService } from "./bookings.services";

const getBookings = async (req: Request, res: Response) => {
  const data = await bookingsService.getBookings();
  res.json(data);
};

const addBooking = async (req: Request, res: Response) => {
  try {
    const data = await bookingsService.addBooking(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await bookingsService.deleteBookings(id);
  res.status(204).send();
};

export const bookingsControllers = {
  getBookings,
  addBooking,
  deleteBooking,
};
