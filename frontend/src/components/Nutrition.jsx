import { useEffect, useState } from "react";
import { Utensils, Edit, Trash2, X } from "lucide-react";

function Nutrition() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    mealType: "Breakfast",
    foodItems: [
      {
        name: "",
        quantity: "",
        calories: "",
      },
    ],
    notes: "",
  });

  // GET MEALS
  const fetchMeals = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/nutrition",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMeals(data.meals);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FOOD ITEM CHANGE
  const handleFoodChange = (index, field, value) => {
    const updatedFoodItems = [...formData.foodItems];

    updatedFoodItems[index][field] = value;

    setFormData({
      ...formData,
      foodItems: updatedFoodItems,
    });
  };

  // ADD FOOD ITEM
  const addFoodItem = () => {
    setFormData({
      ...formData,
      foodItems: [
        ...formData.foodItems,
        {
          name: "",
          quantity: "",
          calories: "",
        },
      ],
    });
  };

  // REMOVE FOOD ITEM
  const removeFoodItem = (index) => {
    if (formData.foodItems.length === 1) {
      return;
    }

    const updatedFoodItems = formData.foodItems.filter(
      (_, i) => i !== index
    );

    setFormData({
      ...formData,
      foodItems: updatedFoodItems,
    });
  };

  // OPEN ADD FORM
  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      mealType: "Breakfast",
      foodItems: [
        {
          name: "",
          quantity: "",
          calories: "",
        },
      ],
      notes: "",
    });

    setShowForm(true);
  };

  // OPEN EDIT FORM
  const openEditForm = (meal) => {
    setEditingId(meal._id);

    setFormData({
      mealType: meal.mealType,
      foodItems: meal.foodItems.map((food) => ({
        name: food.name || "",
        quantity: food.quantity || "",
        calories: food.calories || "",
      })),
      notes: meal.notes || "",
    });

    setShowForm(true);
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const url = editingId
        ? `http://localhost:5000/api/nutrition/${editingId}`
        : "http://localhost:5000/api/nutrition";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          mealType: formData.mealType,

          foodItems: formData.foodItems.map((food) => ({
            name: food.name,
            quantity: food.quantity,
            calories: Number(food.calories) || 0,
          })),

          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          editingId
            ? "Meal updated successfully!"
            : "Meal added successfully!"
        );

        setShowForm(false);
        setEditingId(null);

        fetchMeals();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Something went wrong");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meal?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/nutrition/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Meal deleted successfully!");

        setMeals(
          meals.filter((meal) => meal._id !== id)
        );
      } else {
        alert(data.message || "Failed to delete meal");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // TOTAL CALORIES
  const getTotalCalories = (foodItems) => {
    return foodItems.reduce(
      (total, food) =>
        total + Number(food.calories || 0),
      0
    );
  };

  return (
    <div className="nutrition-page">

      {/* HEADER */}

      <div className="nutrition-header">

        <div>
          <h1>
            <Utensils size={30} />
            Nutrition
          </h1>

          <p>
            Track and manage your daily nutrition
          </p>
        </div>

        <button
          className="add-meal-btn"
          onClick={openAddForm}
        >
          + Add Meal
        </button>

      </div>


      {/* FORM */}

      {showForm && (
        <div className="nutrition-form">

          <div className="nutrition-form-header">

            <h2>
              {editingId
                ? "Edit Meal"
                : "Add New Meal"}
            </h2>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              <X size={20} />
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            {/* MEAL TYPE */}

            <div className="nutrition-form-group">

              <label>
                Meal Type
              </label>

              <select
                name="mealType"
                value={formData.mealType}
                onChange={handleChange}
              >
                <option value="Breakfast">
                  Breakfast
                </option>

                <option value="Lunch">
                  Lunch
                </option>

                <option value="Dinner">
                  Dinner
                </option>

                <option value="Snacks">
                  Snacks
                </option>
              </select>

            </div>


            {/* FOOD ITEMS */}

            <div className="food-items-section">

              <div className="food-items-title">

                <h3>
                  Food Items
                </h3>

                <button
                  type="button"
                  onClick={addFoodItem}
                >
                  + Add Food
                </button>

              </div>


              {formData.foodItems.map(
                (food, index) => (

                  <div
                    className="food-item-row"
                    key={index}
                  >

                    <input
                      type="text"
                      placeholder="Food name"
                      value={food.name}
                      onChange={(e) =>
                        handleFoodChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      required
                    />

                    <input
                      type="text"
                      placeholder="Quantity"
                      value={food.quantity}
                      onChange={(e) =>
                        handleFoodChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                    />

                    <input
                      type="number"
                      placeholder="Calories"
                      value={food.calories}
                      onChange={(e) =>
                        handleFoodChange(
                          index,
                          "calories",
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeFoodItem(index)
                      }
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                )
              )}

            </div>


            {/* NOTES */}

            <div className="nutrition-form-group">

              <label>
                Notes
              </label>

              <textarea
                name="notes"
                placeholder="Write some notes..."
                value={formData.notes}
                onChange={handleChange}
              />

            </div>


            {/* BUTTONS */}

            <div className="nutrition-form-buttons">

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>

              <button type="submit">
                {editingId
                  ? "Update Meal"
                  : "Add Meal"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* MEALS */}

      {loading ? (

        <p>Loading meals...</p>

      ) : meals.length === 0 ? (

        <div className="empty-meals">

          <Utensils size={50} />

          <h2>
            No Meals Yet
          </h2>

          <p>
            Start adding meals to track
            your nutrition.
          </p>

        </div>

      ) : (

        <div className="meal-grid">

          {meals.map((meal) => (

            <div
              className="meal-card"
              key={meal._id}
            >

              <div className="meal-card-header">

                <div>
                  <h2>
                    {meal.mealType}
                  </h2>

                  <span>
                    {meal.foodItems.length} food items
                  </span>
                </div>

                <Utensils size={25} />

              </div>


              {/* FOOD LIST */}

              <div className="food-list">

                {meal.foodItems.map(
                  (food, index) => (

                    <div
                      className="food-list-item"
                      key={food._id || index}
                    >

                      <div>
                        <strong>
                          {food.name}
                        </strong>

                        <small>
                          {food.quantity}
                        </small>
                      </div>

                      <span>
                        {food.calories} kcal
                      </span>

                    </div>

                  )
                )}

              </div>


              {/* CALORIES */}

              <div className="total-calories">

                <span>
                  Total Calories
                </span>

                <strong>
                  {getTotalCalories(
                    meal.foodItems
                  )} kcal
                </strong>

              </div>


              {meal.notes && (
                <p className="meal-notes">
                  {meal.notes}
                </p>
              )}


              {/* ACTIONS */}

              <div className="meal-actions">

                <button
                  onClick={() =>
                    openEditForm(meal)
                  }
                >
                  <Edit size={17} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(meal._id)
                  }
                >
                  <Trash2 size={17} />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Nutrition;