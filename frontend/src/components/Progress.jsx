import { useEffect, useState } from "react";
import {
  TrendingUp,
  Edit,
  Trash2,
  X,
  Weight,
  Ruler,
  Dumbbell,
} from "lucide-react";

function Progress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    weight: "",
    chest: "",
    waist: "",
    arms: "",
    performanceMetric: "",
  });

  // GET PROGRESS
  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/progress",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProgress(data.progress);
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
    fetchProgress();
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
      weight: "",
      chest: "",
      waist: "",
      arms: "",
      performanceMetric: "",
    });

    setShowForm(true);
  };

  // OPEN EDIT FORM
  const openEditForm = (item) => {
    setEditingId(item._id);

    setFormData({
      weight: item.weight || "",
      chest: item.measurements?.chest || "",
      waist: item.measurements?.waist || "",
      arms: item.measurements?.arms || "",
      performanceMetric: item.performanceMetric || "",
    });

    setShowForm(true);
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const url = editingId
        ? `http://localhost:5000/api/progress/${editingId}`
        : "http://localhost:5000/api/progress";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          weight: Number(formData.weight),

          measurements: {
            chest: Number(formData.chest) || 0,
            waist: Number(formData.waist) || 0,
            arms: Number(formData.arms) || 0,
          },

          performanceMetric: formData.performanceMetric,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          editingId
            ? "Progress updated successfully!"
            : "Progress added successfully!"
        );

        setShowForm(false);
        setEditingId(null);

        fetchProgress();
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
      "Are you sure you want to delete this progress?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/progress/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Progress deleted successfully!");

        setProgress(
          progress.filter((item) => item._id !== id)
        );
      } else {
        alert(data.message || "Failed to delete progress");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="progress-page">

      {/* HEADER */}

      <div className="progress-header">

        <div>
          <h1>
            <TrendingUp size={30} />
            My Progress
          </h1>

          <p>
            Track your body measurements and performance
          </p>
        </div>

        <button
          className="add-progress-btn"
          onClick={openAddForm}
        >
          + Add Progress
        </button>

      </div>


      {/* FORM */}

      {showForm && (
        <div className="progress-form">

          <div className="progress-form-header">

            <h2>
              {editingId
                ? "Edit Progress"
                : "Add New Progress"}
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

            {/* WEIGHT */}

            <div className="progress-form-group">

              <label>
                Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                placeholder="e.g. 70"
                value={formData.weight}
                onChange={handleChange}
                required
              />

            </div>


            {/* MEASUREMENTS */}

            <div className="measurements-section">

              <h3>
                Body Measurements
              </h3>

              <div className="measurements-grid">

                <div>
                  <label>
                    Chest (in)
                  </label>

                  <input
                    type="number"
                    name="chest"
                    placeholder="e.g. 40"
                    value={formData.chest}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>
                    Waist (in)
                  </label>

                  <input
                    type="number"
                    name="waist"
                    placeholder="e.g. 32"
                    value={formData.waist}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>
                    Arms (in)
                  </label>

                  <input
                    type="number"
                    name="arms"
                    placeholder="e.g. 14"
                    value={formData.arms}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>


            {/* PERFORMANCE */}

            <div className="progress-form-group">

              <label>
                Performance Metric
              </label>

              <textarea
                name="performanceMetric"
                placeholder="e.g. Bench Press improved to 75kg"
                value={formData.performanceMetric}
                onChange={handleChange}
              />

            </div>


            {/* BUTTONS */}

            <div className="progress-form-buttons">

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
                  ? "Update Progress"
                  : "Add Progress"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* PROGRESS LIST */}

      {loading ? (

        <p>Loading progress...</p>

      ) : progress.length === 0 ? (

        <div className="empty-progress">

          <TrendingUp size={55} />

          <h2>
            No Progress Yet
          </h2>

          <p>
            Start tracking your fitness progress.
          </p>

        </div>

      ) : (

        <div className="progress-grid">

          {progress.map((item) => (

            <div
              className="progress-card"
              key={item._id}
            >

              {/* CARD HEADER */}

              <div className="progress-card-header">

                <div>
                  <h2>
                    Progress Record
                  </h2>

                  <span>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <TrendingUp size={26} />

              </div>


              {/* WEIGHT */}

              <div className="weight-box">

                <Weight size={22} />

                <div>
                  <span>
                    Weight
                  </span>

                  <strong>
                    {item.weight} kg
                  </strong>
                </div>

              </div>


              {/* MEASUREMENTS */}

              <div className="progress-measurements">

                <h3>
                  <Ruler size={18} />
                  Measurements
                </h3>

                <div className="measurement-items">

                  <div>
                    <strong>
                      {item.measurements?.chest || 0}
                    </strong>

                    <span>
                      Chest
                    </span>
                  </div>

                  <div>
                    <strong>
                      {item.measurements?.waist || 0}
                    </strong>

                    <span>
                      Waist
                    </span>
                  </div>

                  <div>
                    <strong>
                      {item.measurements?.arms || 0}
                    </strong>

                    <span>
                      Arms
                    </span>
                  </div>

                </div>

              </div>


              {/* PERFORMANCE */}

              {item.performanceMetric && (
                <div className="performance-box">

                  <Dumbbell size={20} />

                  <div>
                    <span>
                      Performance
                    </span>

                    <p>
                      {item.performanceMetric}
                    </p>
                  </div>

                </div>
              )}


              {/* ACTIONS */}

              <div className="progress-actions">

                <button
                  onClick={() =>
                    openEditForm(item)
                  }
                >
                  <Edit size={17} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(item._id)
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

export default Progress;