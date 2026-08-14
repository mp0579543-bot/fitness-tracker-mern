import express from "express";
import {
  addMeal,
  getMeals,
  updateMeal,
  deleteMeal,
} from "../controllers/nutritionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addMeal);

router.get("/", protect, getMeals);

router.put("/:id", protect, updateMeal);

router.delete("/:id", protect, deleteMeal);

export default router;