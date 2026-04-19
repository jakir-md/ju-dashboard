import { Router } from 'express';
import type { Request, Response } from 'express';
import { Resource } from '../models/index.ts';

const router = Router();

// GET /api/resources -> Fetch a list of all available resources in the system.
router.get('/', async (req: Request, res: Response) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// POST /api/resources -> Create a new resource (seed at least 3 via Postman).
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, type, capacity } = req.body;
    const newResource = await Resource.create({ name, type, capacity });
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

export default router;
