import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  TrendingUp,
  User,
  LogOut,
  BarChart3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      {/* LOGO */}

      <div className="logo">
        <Dumbbell size={28} />
        <span>FitTracker</span>
      </div>


      {/* MENU */}

      <nav className="sidebar-menu">

        {/* DASHBOARD */}

        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </a>


        {/* WORKOUTS */}

        <a
          href="/workouts"
          onClick={(e) => {
            e.preventDefault();
            navigate("/workouts");
          }}
        >
          <Dumbbell size={20} />
          Workouts
        </a>


        {/* NUTRITION */}

        <a
          href="/nutrition"
          onClick={(e) => {
            e.preventDefault();
            navigate("/nutrition");
          }}
        >
          <Utensils size={20} />
          Nutrition
        </a>


        {/* PROGRESS */}

        <a
          href="/progress"
          onClick={(e) => {
            e.preventDefault();
            navigate("/progress");
          }}
        >
          <TrendingUp size={20} />
          Progress
        </a>

        {/* REPORTS */}

<a
  href="/reports"
  onClick={(e) => {
    e.preventDefault();
    navigate("/reports");
  }}
>
  <BarChart3 size={20} />
  Reports
</a>


        {/* PROFILE */}

        <a
          href="/profile"
          onClick={(e) => {
            e.preventDefault();
            navigate("/profile");
          }}
        >
          <User size={20} />
          Profile
        </a>

      </nav>


      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;