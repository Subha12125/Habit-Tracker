# HabitTracker - Full Stack MERN Application

A modern, responsive habit tracking application built with the MERN stack (MongoDB, Express, React, Node.js). This application helps users build better routines by tracking daily progress, calculating streaks, and visualizing consistency metrics.

## 🚀 Features

### Backend
- **Authentication**: Secure JWT-based authentication with cookie-based session management.
- **Habit Management**: Complete CRUD functionality (Create, Read, Update, Delete) for habits.
- **Progress Logging**: Log daily completions, skips, or failures with optional notes.
- **Streak Calculation**: Automated calculation of current and all-time longest streaks.
- **Performance Analytics**: Success percentage and total completion statistics.

### Frontend
- **React + Vite**: High-performance development and production builds.
- **Tailwind CSS v4**: Modern utility-first styling for a sleek, dark-themed UI.
- **Responsive Design**: Optimized for both desktop and mobile views.

---

## 📂 Project Structure

```text
HabitTracker/
├── client/                 # React Frontend (Vite + Tailwind v4)
│   ├── src/
│   │   ├── api/            # Base API configurations
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state management
│   │   ├── pages/          # Full page views
│   │   ├── router/         # Application routing
│   │   ├── services/       # Frontend business logic
│   │   ├── utils/          # Frontend helper functions
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
├── server/                 # Node.js + Express Backend
│   ├── src/
│   │   ├── config/         # Database and server configs
│   │   ├── controllers/    # Request handlers logic
│   │   ├── middlewares/    # Custom Express middlewares
│   │   ├── models/         # MongoDB Schemas (User, Habit)
│   │   ├── routes/         # API Endpoints
│   │   ├── services/       # Backend business logic (Streak Calc)
│   │   ├── utils/          # API Error/Response classes
│   │   ├── app.js          # Express app setup
│   │   └── index.js        # Server entry point
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd HabitTracker
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` folder:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_secret_key
   ACCESS_TOKEN_EXPIRY=1d
   CORS_ORIGIN=http://localhost:5173
   ```
   **Start Backend:** `npm run dev`

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` folder:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```
   **Start Frontend:** `npm run dev`

---

## 🧪 API Endpoints

### Auth
- `POST /api/v1/user/register` - Create a new account
- `POST /api/v1/user/login` - User login

### Habits
- `GET /api/v1/habits` - Get all user habits (with current streaks)
- `POST /api/v1/habits` - Create a new habit
- `PATCH /api/v1/habits/:habitId` - Update habit details
- `DELETE /api/v1/habits/:habitId` - Delete a habit
- `POST /api/v1/habits/:habitId/log` - Log daily progress
- `GET /api/v1/habits/:habitId/stats` - Get detailed statistics

---

## 📝 Roadmap
- [ ] Implement Dark/Light mode toggle.
- [ ] Add chart visualizations for habit success rates.
- [ ] Setup email reminders for daily logging.
- [ ] Mobile app version React Native.

## 📄 License
This project is licensed under the ISC License.
