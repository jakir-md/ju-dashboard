import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base Route for testing
app.get("/", (req, res) => {
  res.send("SpaceSync API is running...");
});

// We will import and use routes here later:
// app.use('/api/resources', resourceRoutes);
// app.use('/api/bookings', bookingRoutes);

export default app;
