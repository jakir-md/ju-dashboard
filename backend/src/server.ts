import app from "./app";
import sequelize from "./config/database";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Authenticate connection
    await sequelize.authenticate();
    console.log("✅ Connection to MySQL has been established successfully.");

    // Sync Models (force: false prevents overwriting existing data)
    await sequelize.sync({ force: false });
    console.log("✅ Database models synced.");

    app.listen(PORT, () => {
      console.log(`🚀 Server is flying at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1); // Exit with failure
  }
};

startServer();
