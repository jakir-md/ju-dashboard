import { Request, Response } from "express";
import { resourcesService } from "./resources.services";

const getResources = async (_req: Request, res: Response) => {
  try {
    const data = await resourcesService.getAll();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

const addResource = async (req: Request, res: Response) => {
  try {
    const data = await resourcesService.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create resource";
    if (
      message.includes("required") ||
      message.includes("must be") ||
      message.includes("must use") ||
      message.includes("JSON object")
    ) {
      return res.status(400).json({ error: message });
    }
    res.status(500).json({ error: "Failed to create resource" });
  }
};

export const resourcesControllers = {
  getResources,
  addResource,
};
