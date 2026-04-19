import { Resource } from "../Resources/resources.models";
import { Booking } from "./bookings.models";
import { parseCreateBookingBody } from "./bookings.validation";

const getBookings = () =>
  Booking.findAll({
    include: [{ model: Resource, as: "resource" }],
    order: [["booking_date", "DESC"], ["id", "DESC"]],
  });

const addBooking = async (body: unknown) => {
  const data = parseCreateBookingBody(body);
  const resource = await Resource.findByPk(data.resource_id);
  if (!resource) {
    throw new Error("Resource not found");
  }
  const exists = await Booking.findOne({
    where: { resource_id: data.resource_id, booking_date: data.booking_date },
  });
  if (exists) {
    throw new Error("Resource already booked for this date");
  }
  return Booking.create(data);
};

const deleteBookings = (id: string) => Booking.destroy({ where: { id } });

export const bookingsService = {
  getBookings,
  addBooking,
  deleteBookings,
};
