# 🏋️ FitTracker - MERN Fitness Tracker

A full-stack fitness tracking web application built with the MERN stack.

FitTracker allows users to manage workouts, track nutrition, record fitness progress, view reports, and manage their profile through a modern dashboard.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing
- Logout

### 🏋️ Workout Management
- Add workouts
- View workouts
- Edit workouts
- Delete workouts
- Workout categories:
  - Strength
  - Cardio
  - Flexibility
- Track:
  - Exercise name
  - Sets
  - Reps
  - Weight
  - Notes

### 🍎 Nutrition Tracking
- Add meals
- View meals
- Edit meals
- Delete meals
- Meal types:
  - Breakfast
  - Lunch
  - Dinner
  - Snacks
- Track food items
- Track calories
- Add meal notes

### 📈 Progress Tracking
- Record current weight
- Track body measurements
  - Chest
  - Waist
  - Arms
- Track performance metrics
- Edit progress
- Delete progress

### 📊 Dashboard
- Total workouts
- Calories burned
- Meals logged
- Current weight
- Recent workouts
- Weekly workout goal
- Quick actions

### 📑 Reports & Analytics
- Workout statistics
- Calories burned
- Meals logged
- Current weight
- Workout overview
- Performance summary
- Latest progress measurements

### 👤 Profile
- View profile
- Edit name
- Edit email
- Logout

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- React Router
- Lucide React
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt / password hashing

### Development Tools

- VS Code
- Thunder Client
- Nodemon
- Git
- GitHub

---

## 📁 Project Structure

```text
fitness-tracker-mern/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore