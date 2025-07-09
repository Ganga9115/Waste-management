const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const binRoutes = require("./routes/binRoutes"); // <--- ADD THIS LINE
const authenticate = require("./middlewares/authMiddleware");
require("./models"); // This ensures all models (User, ReportedBin) are loaded and associations set

const app = express();

// ========== Middlewares ==========
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies (important for some form submissions)

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads')); // <--- ADD THIS LINE. This makes uploaded images accessible via http://localhost:5000/uploads/image_name.jpg

// ========== Basic Route ==========
app.get("/", (req, res) => {
    res.send("🌱 Welcome to EcoTrack Waste Management API Server!");
});

// ========== Routes ==========
app.use("/api/auth", authRoutes);
app.use("/api/bins", binRoutes); // <--- ADD THIS LINE to mount your bin reporting routes

// ========== Protected Dashboard Route (Existing) ==========
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
        // This will create the `ReportedBins` table (and `Users` table if not exists) in your MySQL database.
        // It will also apply any schema changes defined in your models.
        sequelize.sync({ alter: true })
            .then(() => {
                console.log("Database models synced (altered as needed).");
                app.listen(PORT, () => {
                    console.log(`Server is running on http://localhost:${PORT}`);
                });
            })
            .catch((err) => {
                console.error("Database model sync failed:", err);
                process.exit(1); // Exit process if sync fails
            });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit process if connection fails
    });