import { useEffect, useState } from "react";
import { Dumbbell, Trash2, Edit, X } from "lucide-react";

function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    exerciseName: "",
    category: "Strength",
    sets: "",
    reps: "",
    weight: "",
    notes: "",
  });

  // GET WORKOUTS
  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/workouts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setWorkouts(data.workouts);
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
    fetchWorkouts();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // OPEN ADD FORM
  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      exerciseName: "",
      category: "Strength",
      sets: "",
      reps: "",
      weight: "",
      notes: "",
    });

    setShowForm(true);
  };

  // OPEN EDIT FORM
  const openEditForm = (workout) => {
    setEditingId(workout._id);

    setFormData({
      exerciseName: workout.exerciseName || "",
      category: workout.category || "Strength",
      sets: workout.sets || "",
      reps: workout.reps || "",
      weight: workout.weight || "",
      notes: workout.notes || "",
    });

    setShowForm(true);
  };

  // ADD / UPDATE WORKOUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const url = editingId
        ? `http://localhost:5000/api/workouts/${editingId}`
        : "http://localhost:5000/api/workouts";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          exerciseName: formData.exerciseName,
          category: formData.category,
          sets: Number(formData.sets),
          reps: Number(formData.reps),
          weight: Number(formData.weight),
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          editingId
            ? "Workout updated successfully!"
            : "Workout added successfully!"
        );

        setShowForm(false);
        setEditingId(null);

        setFormData({
          exerciseName: "",
          category: "Strength",
          sets: "",
          reps: "",
          weight: "",
          notes: "",
        });

        fetchWorkouts();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Something went wrong");
    }
  };

  // DELETE WORKOUT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/workouts/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Workout deleted successfully!");

        setWorkouts(
          workouts.filter(
            (workout) => workout._id !== id
          )
        );
      } else {
        alert(data.message || "Failed to delete workout");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="workout-page">

      {/* HEADER */}
      <div className="workout-header">

        <div>
          <h1>
            <Dumbbell size={30} />
            My Workouts
          </h1>

          <p>
            Track and manage your workouts
          </p>
        </div>

        <button
          className="add-workout-btn"
          onClick={openAddForm}
        >
          + Add Workout
        </button>

      </div>


      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="workout-form">

          <div className="form-header">

            <h2>
              {editingId
                ? "Edit Workout"
                : "Add New Workout"}
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

            {/* EXERCISE */}
            <div className="form-group">

              <label>
                Exercise Name
              </label>

              <input
                type="text"
                name="exerciseName"
                placeholder="e.g. Bench Press"
                value={formData.exerciseName}
                onChange={handleChange}
                required
              />

            </div>


            {/* CATEGORY */}
            <div className="form-group">

              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Strength">
                  Strength
                </option>

                <option value="Cardio">
                  Cardio
                </option>

                <option value="Flexibility">
                  Flexibility
                </option>
              </select>

            </div>


            {/* SETS */}
            <div className="form-group">

              <label>
                Sets
              </label>

              <input
                type="number"
                name="sets"
                placeholder="e.g. 4"
                value={formData.sets}
                onChange={handleChange}
                min="1"
                required
              />

            </div>


            {/* REPS */}
            <div className="form-group">

              <label>
                Reps
              </label>

              <input
                type="number"
                name="reps"
                placeholder="e.g. 10"
                value={formData.reps}
                onChange={handleChange}
                min="1"
                required
              />

            </div>


            {/* WEIGHT */}
            <div className="form-group">

              <label>
                Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                placeholder="e.g. 60"
                value={formData.weight}
                onChange={handleChange}
                min="0"
              />

            </div>


            {/* NOTES */}
            <div className="form-group">

              <label>
                Notes
              </label>

              <textarea
                name="notes"
                placeholder="Write workout notes..."
                value={formData.notes}
                onChange={handleChange}
              />

            </div>


            {/* BUTTONS */}
            <div className="form-buttons">

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
                  ? "Update Workout"
                  : "Add Workout"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* WORKOUTS */}
      {loading ? (

        <p>Loading workouts...</p>

      ) : workouts.length === 0 ? (

        <div className="empty-workouts">

          <Dumbbell size={50} />

          <h2>
            No Workouts Yet
          </h2>

          <p>
            Start adding your workouts to
            track your progress.
          </p>

        </div>

      ) : (

        <div className="workout-grid">

          {workouts.map((workout) => (

            <div
              className="workout-card"
              key={workout._id}
            >

              <div className="workout-card-header">

                <div>

                  <h2>
                    {workout.exerciseName}
                  </h2>

                  <span className="category">
                    {workout.category}
                  </span>

                </div>

                <Dumbbell size={25} />

              </div>


              <div className="workout-details">

                <div>
                  <strong>
                    {workout.sets}
                  </strong>

                  <span>
                    Sets
                  </span>
                </div>

                <div>
                  <strong>
                    {workout.reps}
                  </strong>

                  <span>
                    Reps
                  </span>
                </div>

                <div>
                  <strong>
                    {workout.weight || 0} kg
                  </strong>

                  <span>
                    Weight
                  </span>
                </div>

              </div>


              {workout.notes && (
                <p className="workout-notes">
                  {workout.notes}
                </p>
              )}


              {/* ACTION BUTTONS */}
              <div className="workout-actions">

                <button
                  onClick={() =>
                    openEditForm(workout)
                  }
                >
                  <Edit size={18} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(workout._id)
                  }
                >
                  <Trash2 size={18} />
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

export default Workout;