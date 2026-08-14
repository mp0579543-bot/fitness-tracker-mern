import { useEffect, useState } from "react";
import {
  Dumbbell,
  Flame,
  TrendingUp,
  Utensils,
  ArrowRight,
  Target,
} from "lucide-react";

import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);

 const [dashboardData, setDashboardData] = useState({
  totalWorkouts: 0,
  mealsLogged: 0,
  currentWeight: 0,
  caloriesBurned: 0,
  recentWorkouts: [],
});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setDashboardData(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Dashboard error:", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setUser(data.user);
      } catch (error) {
        console.log("Profile error:", error);
      }
    };

    fetchDashboard();
    fetchProfile();
  }, []);

  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">
        <div>
          <h1>
            Good Morning
            {user ? `, ${user.name}` : ""}! 👋
          </h1>

          <p>
            Let's make today a healthy day.
          </p>
        </div>

        <button
          className="add-workout-btn"
          onClick={() => navigate("/workouts")}
        >
          <Dumbbell size={18} />
          Add Workout
        </button>
      </div>


      {/* STAT CARDS */}

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon workout-icon">
              <Dumbbell size={23} />
            </div>

            <span className="stat-badge">
              Workouts
            </span>
          </div>

          <p>Total Workouts</p>

          <h2>
            {dashboardData.totalWorkouts}
          </h2>

          <span className="stat-description">
            All time
          </span>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon calories-icon">
              <Flame size={23} />
            </div>

            <span className="stat-badge">
              Calories
            </span>
          </div>

          <p>Calories Burned</p>

         <h2>
  {dashboardData.caloriesBurned}
</h2>

<span className="stat-description">
  Estimated calories
</span>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon meal-icon">
              <Utensils size={23} />
            </div>

            <span className="stat-badge">
              Meals
            </span>
          </div>

          <p>Meals Logged</p>

          <h2>
            {dashboardData.mealsLogged}
          </h2>

          <span className="stat-description">
            All time
          </span>

        </div>


        <div className="dashboard-stat-card">

          <div className="dashboard-stat-top">
            <div className="dashboard-stat-icon progress-icon">
              <TrendingUp size={23} />
            </div>

            <span className="stat-badge negative">
              Weight
            </span>
          </div>

          <p>Current Weight</p>

          <h2>
            {dashboardData.currentWeight > 0
              ? `${dashboardData.currentWeight} kg`
              : "—"}
          </h2>

          <span className="stat-description">
            Latest progress
          </span>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="dashboard-content">

        {/* RECENT WORKOUTS */}

        <div className="dashboard-section recent-workouts">

          <div className="section-header">

            <div>
              <h2>Recent Workouts</h2>

              <p>
                Your latest workout activity
              </p>
            </div>

            <button
              className="view-all-btn"
              onClick={() => navigate("/workouts")}
            >
              View All
              <ArrowRight size={16} />
            </button>

          </div>


          <div className="workout-list">

            {dashboardData.recentWorkouts.length === 0 ? (

              <p>
                No workouts yet.
              </p>

            ) : (

              dashboardData.recentWorkouts.map((workout) => (

                <div
                  className="dashboard-workout-item"
                  key={workout._id}
                >

                  <div className="workout-item-icon">
                    <Dumbbell size={20} />
                  </div>

                  <div className="workout-item-info">

                    <h3>
                      {workout.exerciseName}
                    </h3>

                    <p>
                      {workout.category} • {workout.sets} sets •{" "}
                      {workout.reps} reps
                    </p>

                  </div>

                  <strong>
                    {workout.weight} kg
                  </strong>

                </div>

              ))

            )}

          </div>

        </div>


        {/* WEEKLY GOAL */}

        <div className="dashboard-section weekly-goal">

          <div className="goal-icon">
            <Target size={25} />
          </div>

          <h2>
            Weekly Goal
          </h2>

          <p>
            Keep going! You're almost there.
          </p>

          <div className="goal-number">

            <strong>
              {Math.min(dashboardData.totalWorkouts, 5)}
            </strong>

            <span>
              / 5 workouts
            </span>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${Math.min(
                  (dashboardData.totalWorkouts / 5) * 100,
                  100
                )}%`,
              }}
            ></div>

          </div>

          <div className="progress-info">

            <span>
              Weekly Goal
            </span>

            <strong>
              {Math.min(
                Math.round(
                  (dashboardData.totalWorkouts / 5) * 100
                ),
                100
              )}
              %
            </strong>

          </div>

        </div>

      </div>


      {/* QUICK ACTIONS */}

      <div className="quick-actions">

        <h2>
          Quick Actions
        </h2>

        <div className="quick-action-grid">

          <button
            onClick={() => navigate("/workouts")}
          >
            <Dumbbell size={21} />
            <span>
              Add Workout
            </span>
          </button>

          <button
            onClick={() => navigate("/nutrition")}
          >
            <Utensils size={21} />
            <span>
              Log Meal
            </span>
          </button>

          <button
            onClick={() => navigate("/progress")}
          >
            <TrendingUp size={21} />
            <span>
              Track Progress
            </span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;