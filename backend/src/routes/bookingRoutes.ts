import { Router } from 'express';
import type { Request, Response } from 'express';
import { Booking, Resource } from '../models/index.ts';

const router = Router();

// POST /api/bookings -> Create a new booking.
router.post('/', async (req: Request, res: Response) => {
  try {
    const { resource_id, requested_by, booking_date } = req.body;
    const newBooking = await Booking.create({ resource_id, requested_by, booking_date });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET /api/bookings -> Fetch all bookings including the associated Resource data.
router.get('/', async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: Resource, as: 'Resource' }],
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// DELETE /api/bookings/:id -> Cancel/Delete a specific booking by its ID.
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Booking canceled successfully' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

export default router;
