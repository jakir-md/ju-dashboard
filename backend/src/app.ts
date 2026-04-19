import express, { Application } from "express";
import cors from "cors";
import resourcesRouter from "./modules/Resources/resources.routes";
import bookingsRouter from "./modules/Bookings/bookings.routes";
const router = express.Router();

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to your frontend URL
  }),
);
app.use(express.json());
app.use("/api/v1", resourcesRouter);
app.use("/api/v1", bookingsRouter);

// Base Route for testing
app.get("/", (req, res) => {
  res.send("SpaceSync API is running...");
});

// We will import and use routes here later:
// app.use('/api/resources', resourceRoutes);
// app.use('/api/bookings', bookingRoutes);

export default app;
