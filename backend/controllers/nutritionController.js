import Meal from "../models/Meal.js";

// ADD MEAL
export const addMeal = async (req, res) => {
  try {
    const { mealType, foodItems, notes } = req.body;

    if (!mealType || !foodItems) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const meal = await Meal.create({
      user: req.user.userId,
      mealType,
      foodItems,
      notes,
    });

    res.status(201).json({
      message: "Meal added successfully",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add meal",
      error: error.message,
    });
  }
};


// GET MEALS
export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      meals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch meals",
      error: error.message,
    });
  }
};


// UPDATE MEAL
export const updateMeal = async (req, res) => {
  try {
    const { mealType, foodItems, notes } = req.body;

    const meal = await Meal.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        mealType,
        foodItems,
        notes,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    res.status(200).json({
      message: "Meal updated successfully",
      meal,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update meal",
      error: error.message,
    });
  }
};


// DELETE MEAL
export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    res.status(200).json({
      message: "Meal deleted successfully",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete meal",
      error: error.message,
    });
  }
};