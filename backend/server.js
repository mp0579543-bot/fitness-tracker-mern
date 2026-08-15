import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import nutritionRoutes from "./routes/nutritionRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
let dbPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!dbPromise) {
    dbPromise = mongoose.connect(process.env.MONGO_URI);
  }

  await dbPromise;
};

// Connect MongoDB before handling API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.log("MongoDB Connection Error ❌");
    console.log(error.message);

    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportsRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Fitness Tracker API is running 🚀",
  });
});

// Local development
if (process.env.NODE_ENV !== "production") {
  const PORT = 5000;

  connectDB()
    .then(() => {
      console.log("MongoDB Connected ✅");

      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.log("MongoDB Connection Error ❌");
      console.log(error.message);
    });
}

export default app;