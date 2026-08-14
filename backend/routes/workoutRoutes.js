import express from "express";
import Workout from "../models/Workout.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const {
      exerciseName,
      category,
      sets,
      reps,
      weight,
      notes,
    } = req.body;

    if (!exerciseName || !category || !sets || !reps) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const workout = await Workout.create({
      user: req.user.userId,
      exerciseName,
      category,
      sets,
      reps,
      weight,
      notes,
    });

    res.status(201).json({
      message: "Workout added successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add workout",
      error: error.message,
    });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json({
      message: "Workouts fetched successfully",
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch workouts",
      error: error.message,
    });
  }
});

// UPDATE WORKOUT
router.put("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      exerciseName,
      category,
      sets,
      reps,
      weight,
      notes,
    } = req.body;

    const workout = await Workout.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId,
      },
      {
        exerciseName,
        category,
        sets,
        reps,
        weight,
        notes,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.json({
      message: "Workout updated successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update workout",
      error: error.message,
    });
  }
});

// DELETE WORKOUT
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.json({
      message: "Workout deleted successfully",
      workout,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete workout",
      error: error.message,
    });
  }
});


export default router;