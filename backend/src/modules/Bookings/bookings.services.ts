import { Resource } from "../Resources/resources.models";
import { Booking } from "./bookings.models";

const getBookings = () =>
  Booking.findAll({ include: [{ model: Resource, as: "resource" }] });

const addBooking = async (data: any) => {
  const exists = await Booking.findOne({
    where: { resource_id: data.resource_id, booking_date: data.booking_date },
  });
  if (exists) throw new Error("Resource already booked for this date");
  return Booking.create(data);
};

const deleteBookings = (id: string) => Booking.destroy({ where: { id } });

export const bookingsService = {
  getBookings,
  addBooking,
  deleteBookings,
};
