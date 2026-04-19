import { Request, Response } from "express";
import { resourcesService } from "./resources.services";

const getResources = async (req: Request, res: Response) => {
  try {
    const data = await resourcesService.getAll();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

const addResource = async (req: Request, res: Response) => {
  try {
    const data = await resourcesService.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create resource" });
  }
};

export const resourcesControllers = {
  getResources,
  addResource,
};
