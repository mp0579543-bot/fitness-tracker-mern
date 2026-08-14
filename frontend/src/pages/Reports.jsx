import { useEffect, useState } from "react";
import {
  BarChart3,
  Dumbbell,
  Flame,
  Utensils,
  TrendingUp,
  Target,
} from "lucide-react";

function Reports() {
  const [reportData, setReportData] = useState({
    totalWorkouts: 0,
    mealsLogged: 0,
    currentWeight: 0,
    caloriesBurned: 0,
    workouts: [],
    meals: [],
    progress: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/reports",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setReportData(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Reports Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="reports">
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="reports">

      {/* HEADER */}

      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>
            Track your fitness performance and progress.
          </p>
        </div>

        <div className="report-period">
          All Time
        </div>
      </div>


      {/* SUMMARY CARDS */}

      <div className="report-stats">

        <div className="report-card">
          <div className="report-icon workout-report">
            <Dumbbell size={22} />
          </div>

          <div>
            <p>Total Workouts</p>

            <h2>
              {reportData.totalWorkouts}
            </h2>

            <span>
              Completed workouts
            </span>
          </div>
        </div>


        <div className="report-card">
          <div className="report-icon calories-report">
            <Flame size={22} />
          </div>

          <div>
            <p>Calories Burned</p>

            <h2>
              {reportData.caloriesBurned}
            </h2>

            <span>
              Estimated calories
            </span>
          </div>
        </div>


        <div className="report-card">
          <div className="report-icon meals-report">
            <Utensils size={22} />
          </div>

          <div>
            <p>Meals Logged</p>

            <h2>
              {reportData.mealsLogged}
            </h2>

            <span>
              Total meals
            </span>
          </div>
        </div>


        <div className="report-card">
          <div className="report-icon progress-report">
            <TrendingUp size={22} />
          </div>

          <div>
            <p>Current Weight</p>

            <h2>
              {reportData.currentWeight > 0
                ? `${reportData.currentWeight} kg`
                : "—"}
            </h2>

            <span>
              Latest measurement
            </span>
          </div>
        </div>

      </div>


      {/* REPORT GRID */}

      <div className="reports-grid">


        {/* WORKOUT OVERVIEW */}

        <div className="report-panel">

          <div className="panel-header">

            <div>
              <h2>Workout Overview</h2>

              <p>
                Your workout categories
              </p>
            </div>

            <BarChart3 size={22} />

          </div>


          <div className="chart-placeholder">

            {reportData.workouts.length === 0 ? (

              <p>
                No workout data available.
              </p>

            ) : (

              <div className="chart-bars">

                {reportData.workouts.map(
                  (workout, index) => {

                    const height =
                      Math.min(
                        Math.max(
                          workout.sets * 12,
                          25
                        ),
                        100
                      );

                    return (
                      <div
                        className="chart-column"
                        key={workout._id}
                      >

                        <div
                          className="chart-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        ></div>

                        <span>
                          {workout.exerciseName}
                        </span>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </div>


        {/* WEEKLY GOAL */}

        <div className="report-panel goal-report">

          <div className="panel-header">

            <div>
              <h2>Workout Goal</h2>

              <p>
                Your progress
              </p>
            </div>

            <Target size={22} />

          </div>


          <div className="goal-circle">

            <div>

              <strong>
                {Math.min(
                  Math.round(
                    (reportData.totalWorkouts / 5) * 100
                  ),
                  100
                )}
                %
              </strong>

              <span>
                Complete
              </span>

            </div>

          </div>


          <div className="goal-details">

            <div>
              <span>
                Completed
              </span>

              <strong>
                {Math.min(
                  reportData.totalWorkouts,
                  5
                )} workouts
              </strong>
            </div>

            <div>
              <span>
                Target
              </span>

              <strong>
                5 workouts
              </strong>
            </div>

          </div>

        </div>

      </div>


      {/* PERFORMANCE SUMMARY */}

      <div className="performance-panel">

        <div className="panel-header">

          <div>
            <h2>
              Performance Summary
            </h2>

            <p>
              Your overall fitness activity
            </p>
          </div>

        </div>


        <div className="performance-list">

          <div className="performance-item">

            <span>
              Workout Consistency
            </span>

            <div className="performance-progress">

              <div
                style={{
                  width: `${Math.min(
                    reportData.totalWorkouts * 20,
                    100
                  )}%`,
                }}
              ></div>

            </div>

            <strong>
              {Math.min(
                reportData.totalWorkouts * 20,
                100
              )}
              %
            </strong>

          </div>


          <div className="performance-item">

            <span>
              Nutrition Tracking
            </span>

            <div className="performance-progress">

              <div
                style={{
                  width: `${Math.min(
                    reportData.mealsLogged * 20,
                    100
                  )}%`,
                }}
              ></div>

            </div>

            <strong>
              {Math.min(
                reportData.mealsLogged * 20,
                100
              )}
              %
            </strong>

          </div>


          <div className="performance-item">

            <span>
              Weekly Goal
            </span>

            <div className="performance-progress">

              <div
                style={{
                  width: `${Math.min(
                    (reportData.totalWorkouts / 5) * 100,
                    100
                  )}%`,
                }}
              ></div>

            </div>

            <strong>
              {Math.min(
                Math.round(
                  (reportData.totalWorkouts / 5) * 100
                ),
                100
              )}
              %
            </strong>

          </div>

        </div>

      </div>


      {/* PROGRESS DETAILS */}

      {reportData.progress.length > 0 && (

        <div className="performance-panel">

          <div className="panel-header">

            <div>
              <h2>
                Latest Progress
              </h2>

              <p>
                Your latest body measurements
              </p>
            </div>

            <TrendingUp size={22} />

          </div>


          <div className="goal-details">

            <div>
              <span>
                Weight
              </span>

              <strong>
                {reportData.progress[0].weight} kg
              </strong>
            </div>


            <div>
              <span>
                Chest
              </span>

              <strong>
                {reportData.progress[0].measurements?.chest || 0}
              </strong>
            </div>


            <div>
              <span>
                Waist
              </span>

              <strong>
                {reportData.progress[0].measurements?.waist || 0}
              </strong>
            </div>


            <div>
              <span>
                Arms
              </span>

              <strong>
                {reportData.progress[0].measurements?.arms || 0}
              </strong>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Reports;