import Progress from "../models/Progress.js";

// ADD PROGRESS
export const addProgress = async (req, res) => {
  try {
    const {
      weight,
      measurements,
      performanceMetric,
    } = req.body;

    if (weight === undefined) {
      return res.status(400).json({
        message: "Weight is required",
      });
    }

    const progress = await Progress.create({
      user: req.user.userId,
      weight,
      measurements,
      performanceMetric,
    });

    res.status(201).json({
      message: "Progress added successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add progress",
      error: error.message,
    });
  }
};


// GET PROGRESS
export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch progress",
      error: error.message,
    });
  }
};


// UPDATE PROGRESS
export const updateProgress = async (req, res) => {
  try {
    const {
      weight,
      measurements,
      performanceMetric,
    } = req.body;

    const progress = await Progress.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        weight,
        measurements,
        performanceMetric,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found",
      });
    }

    res.status(200).json({
      message: "Progress updated successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update progress",
      error: error.message,
    });
  }
};


// DELETE PROGRESS
export const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found",
      });
    }

    res.status(200).json({
      message: "Progress deleted successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete progress",
      error: error.message,
    });
  }
};