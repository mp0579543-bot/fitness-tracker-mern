import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workout from "./pages/Workout";
import Nutrition from "./components/Nutrition";
import Progress from "./components/Progress";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= REGISTER ================= */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= DASHBOARD ================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>

              <div className="app">

                <Sidebar />

                <main className="main-content">
                  <Dashboard />
                </main>

              </div>

            </ProtectedRoute>
          }
        />


        {/* ================= WORKOUTS ================= */}

        <Route
          path="/workouts"
          element={
            <ProtectedRoute>

              <div className="app">

                <Sidebar />

                <main className="main-content">
                  <Workout />
                </main>

              </div>

            </ProtectedRoute>
          }
        />


        {/* ================= NUTRITION ================= */}

        <Route
          path="/nutrition"
          element={
            <ProtectedRoute>

              <div className="app">

                <Sidebar />

                <main className="main-content">
                  <Nutrition />
                </main>

              </div>

            </ProtectedRoute>
          }
        />


        {/* ================= PROGRESS ================= */}

        <Route
          path="/progress"
          element={
            <ProtectedRoute>

              <div className="app">

                <Sidebar />

                <main className="main-content">
                  <Progress />
                </main>

              </div>

            </ProtectedRoute>
          }
        />

        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <div className="app">

        <Sidebar />

        <main className="main-content">
          <Profile />
        </main>

      </div>
    </ProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <div className="app">
        <Sidebar />

        <main className="main-content">
          <Reports />
        </main>
      </div>
    </ProtectedRoute>
  }
/>


        {/* ================= UNKNOWN URL ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;