const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const binRoutes = require("./routes/binRoutes");
const adoptBinRoutes = require("./routes/adoptBinRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const pickupRoutes = require("./routes/pickupRoutes");

const authenticate = require("./middlewares/authMiddleware");

const http = require("http");
const { Server } = require("socket.io");

require("./models"); // Load models

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// -----------------------
// 🚛 Vehicle Tracking Setup
// -----------------------
let vehicles = [
    {
        id: "TRUCK-001",
        latitude: 37.7749,
        longitude: -122.4194,
        arrivalTime: "10:30 AM",
        status: "On the way"
    },
    {
        id: "TRUCK-002",
        latitude: 37.7849,
        longitude: -122.4094,
        arrivalTime: "11:00 AM",
        status: "Scheduled"
    }
];

// Route to get current vehicle
app.get("/api/vehicle/current", (req, res) => {
    res.json(vehicles[0]); // Active vehicle
});

// Route to get upcoming vehicles
app.get("/api/vehicle/upcoming", (req, res) => {
    res.json(vehicles.slice(1));
});

// Simulate vehicle movement every 5 seconds
setInterval(() => {
    vehicles = vehicles.map(v => ({
        ...v,
        latitude: v.latitude + (Math.random() - 0.5) * 0.001,
        longitude: v.longitude + (Math.random() - 0.5) * 0.001
    }));

    // Emit updated location for current vehicle
    io.emit("vehicleLocationUpdate", {
        vehicleId: vehicles[0].id,
        lat: vehicles[0].latitude,
        lng: vehicles[0].longitude,
        arrivalTime: vehicles[0].arrivalTime,
        status: vehicles[0].status,
        timestamp: new Date()
    });
}, 5000);

// -----------------------

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Default route
app.get("/", (req, res) => {
    res.send("🌱 Welcome to EcoTrack Waste Management API Server!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/bins", binRoutes);
app.use("/api/adopt-bins", adoptBinRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/pickups", pickupRoutes);

// Authenticated dashboard welcome message
app.get("/api/dashboard", authenticate, (req, res) => {
    res.json({ message: `Welcome to the Dashboard, ${req.user.email}` });
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.emit('welcome', 'Welcome to the EcoTrack real-time updates!');

    socket.on('clientMessage', (message) => {
        console.log(`Message from client ${socket.id}: ${message}`);
        io.emit('serverMessage', `User ${socket.id}: ${message}`);
    });

    socket.on('updateVehicleLocation', (data) => {
        console.log(`Vehicle ${data.vehicleId} updated location to Lat: ${data.lat}, Lng: ${data.lng}`);

        // Update in-memory vehicle data
        const idx = vehicles.findIndex(v => v.id === data.vehicleId);
        if (idx !== -1) {
            vehicles[idx].latitude = data.lat;
            vehicles[idx].longitude = data.lng;
        }

        io.emit('vehicleLocationUpdate', {
            vehicleId: data.vehicleId,
            lat: data.lat,
            lng: data.lng,
            timestamp: new Date()
        });
    });

    socket.on('requestNotification', (data) => {
        console.log(`User ${data.userId} requested notification for vehicle ${data.vehicleId}`);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start server after DB connection and syncing models
const PORT = process.env.PORT || 5000;

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection established successfully.");
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log("Database models synced (altered as needed).");
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`Socket.IO is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to start the server:", err);
        process.exit(1);
    });

module.exports = { app, io };
