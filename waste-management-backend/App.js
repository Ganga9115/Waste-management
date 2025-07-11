const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const binRoutes = require("./routes/binRoutes");
const adoptBinRoutes = require("./routes/adoptBinRoutes"); // <--- ADD THIS LINE: Import new routes for Adopt a Bin
const authenticate = require("./middlewares/authMiddleware");

// --- ADD THESE LINES FOR SOCKET.IO ---
const http = require('http');
const { Server } = require('socket.io');
// ------------------------------------

require("./models"); // This ensures all models (User, ReportedBin, AdoptedBin) are loaded and associations set

const app = express();

// --- CREATE HTTP SERVER AND ATTACH SOCKET.IO ---
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
// -----------------------------------------------

// ========== Middlewares ==========
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// ========== Basic Route ==========
app.get("/", (req, res) => {
    res.send("🌱 Welcome to EcoTrack Waste Management API Server!");
});

// ========== Routes ==========
app.use("/api/auth", authRoutes);
app.use("/api/bins", binRoutes);
app.use("/api/adopt-bins", adoptBinRoutes); // <--- ADD THIS LINE: Mount new routes for Adopt a Bin

// ========== Protected Dashboard Route (Existing) ==========
app.get("/api/dashboard", authenticate, (req, res) => {
    res.json({ message: `Welcome to the Dashboard, ${req.user.email}` });
});

// ========== Socket.IO Connection Handling ==========
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.emit('welcome', 'Welcome to the EcoTrack real-time updates!');

    socket.on('clientMessage', (message) => {
        console.log(`Message from client ${socket.id}: ${message}`);
        io.emit('serverMessage', `User ${socket.id}: ${message}`);
    });

    socket.on('updateVehicleLocation', (data) => {
        console.log(`Vehicle ${data.vehicleId} updated location to Lat: ${data.lat}, Lng: ${data.lng}`);
        io.emit('vehicleLocationUpdate', {
            vehicleId: data.vehicleId,
            lat: data.lat,
            lng: data.lng,
            timestamp: new Date()
        });
    });

    // Optional: Handle notification request from frontend
    socket.on('requestNotification', (data) => {
        console.log(`User ${data.userId} requested notification for vehicle ${data.vehicleId}`);
        // In a real app, you'd store this preference and trigger a notification
        // when the vehicle is near.
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
// ---------------------------------------------------

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection established successfully.");

        sequelize.sync({ alter: true }) // `alter: true` will add new tables/columns (like AdoptedBins)
            .then(() => {
                console.log("Database models synced (altered as needed).");
                server.listen(PORT, () => { // <--- CHANGE: Use 'server.listen' instead of 'app.listen'
                    console.log(`Server is running on http://localhost:${PORT}`);
                    console.log(`Socket.IO is listening on port ${PORT}`);
                });
            })
            .catch((err) => {
                console.error("Database model sync failed:", err);
                process.exit(1);
            });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });

module.exports = { app, io }; // <--- Export app and io for potential testing if needed