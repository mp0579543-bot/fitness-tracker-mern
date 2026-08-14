import express from "express";

import Workout from "../models/Workout.js";
import Meal from "../models/Meal.js";
import Progress from "../models/Progress.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user.userId;

    const workouts = await Workout.find({
      user: userId,
    }).sort({ createdAt: -1 });

    const meals = await Meal.find({
      user: userId,
    }).sort({ createdAt: -1 });

    const progress = await Progress.find({
      user: userId,
    }).sort({ createdAt: -1 });

    const totalWorkouts = workouts.length;

    const mealsLogged = meals.length;

    const currentWeight =
      progress.length > 0
        ? progress[0].weight
        : 0;

    const caloriesBurned = workouts.reduce(
      (total, workout) => {
        let calories = 0;

        if (workout.category === "Cardio") {
          calories = 400;
        } else if (workout.category === "Strength") {
          calories = 300;
        } else if (workout.category === "Flexibility") {
          calories = 180;
        }

        return total + calories;
      },
      0
    );

    res.json({
      totalWorkouts,
      mealsLogged,
      currentWeight,
      caloriesBurned,
      workouts,
      meals,
      progress,
    });

  } catch (error) {
    console.log("Reports Error:", error);

    res.status(500).json({
      message: "Failed to load reports",
      error: error.message,
    });
  }
});

export default router;