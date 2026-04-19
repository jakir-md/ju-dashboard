import { Router } from "express";
import { resourcesControllers } from "./resources.controllers";

const resourcesRouter = Router();
resourcesRouter.get("/resources", resourcesControllers.getResources);
resourcesRouter.post("/resources", resourcesControllers.addResource);
export default resourcesRouter;
