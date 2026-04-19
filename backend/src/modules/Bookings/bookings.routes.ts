import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";

const bookingsRouter = Router();
bookingsRouter.get("/bookings", bookingsControllers.getBookings);
bookingsRouter.post("/bookings", bookingsControllers.addBooking);
bookingsRouter.delete("/bookings/:id", bookingsControllers.deleteBooking);
export default bookingsRouter;
