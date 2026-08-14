import express from "express";

import {
  addProgress,
  getProgress,
  updateProgress,
  deleteProgress,
} from "../controllers/progressController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Progress
router.post("/", protect, addProgress);

// Get Progress
router.get("/", protect, getProgress);

// Update Progress
router.put("/:id", protect, updateProgress);

// Delete Progress
router.delete("/:id", protect, deleteProgress);

export default router;