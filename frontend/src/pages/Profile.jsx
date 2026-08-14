import { useEffect, useState } from "react";
import { User, Mail, Save, LogOut } from "lucide-react";
import authService from "../services/authService";

function Profile() {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await authService.getProfile();

      setUser(data.user);

      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
      });
    } catch (error) {
      console.log("Profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const data = await authService.updateProfile(formData);

      setUser(data.user);

      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
      });

      setMessage("Profile updated successfully!");
    } catch (error) {
      console.log("Update profile error:", error);

      setMessage(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="profile-page">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* HEADER */}

      <div className="profile-header">
        <div>
          <h1>My Profile</h1>

          <p>
            Manage your personal information.
          </p>
        </div>
      </div>


      {/* PROFILE CARD */}

      <div className="profile-container">

        {/* USER INFO */}

        <div className="profile-user-card">

          <div className="profile-avatar">
            <User size={45} />
          </div>

          <h2>
            {user?.name || "User"}
          </h2>

          <p>
            {user?.email || "No email"}
          </p>

          <span className="profile-status">
            Active Account
          </span>

        </div>


        {/* EDIT PROFILE */}

        <div className="profile-edit-card">

          <div className="profile-card-header">

            <div>
              <h2>
                Personal Information
              </h2>

              <p>
                Update your account information.
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="profile-form-group">

              <label>
                Full Name
              </label>

              <div className="profile-input">

                <User size={18} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="profile-form-group">

              <label>
                Email Address
              </label>

              <div className="profile-input">

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>

            </div>


            {/* MESSAGE */}

            {message && (
              <div className="profile-message">
                {message}
              </div>
            )}


            {/* BUTTON */}

            <button
              type="submit"
              className="save-profile-btn"
              disabled={saving}
            >
              <Save size={18} />

              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>

        </div>

      </div>


      {/* LOGOUT */}

      <div className="profile-logout-card">

        <div>
          <h3>
            Logout
          </h3>

          <p>
            Sign out from your Fitness Tracker account.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="logout-profile-btn"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;