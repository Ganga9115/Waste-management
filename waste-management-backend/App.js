const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authenticate = require("./middlewares/authMiddleware");
require("./models"); // Loads all Sequelize models (e.g., User)

const app = express();

// ========== Middlewares ==========
app.use(cors());
app.use(express.json());

// ========== Basic Route ==========
app.get("/", (req, res) => {
  res.send("🌱 Welcome to EcoTrack Waste Management API Server!");
});

// ========== Routes ==========
app.use("/api/auth", authRoutes);

// ========== Protected Dashboard Route ==========
app.get("/api/dashboard", authenticate, (req, res) => {
  res.json({ message: `Welcome to the Dashboard, ${req.user.email}` });
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");

    // Sync models (non-destructive update)
    sequelize.sync({ alter: true }).then(() => {
      console.log("Database models synced (altered as needed).");

      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
