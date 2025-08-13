// Simulated vehicle data (later you can connect real GPS)
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
    arrivalTime: "9:00 AM",
    status: "Scheduled"
  },
    {
    id: "TRUCK-003",
    latitude: 37.7849,
    longitude: -122.4094,
    arrivalTime: "11:00 AM",
    status: "On the way"
  },
    {
    id: "TRUCK-004",
    latitude: 37.7849,
    longitude: -122.4094,
    arrivalTime: "10:20 AM",
    status: "Scheduled"
  },
    {
    id: "TRUCK-005",
    latitude: 37.7849,
    longitude: -122.4094,
    arrivalTime: "1:40 pM",
    status: "Scheduled"
  }
];

// Get the current active vehicle
export const getCurrentVehicle = (req, res) => {
  const activeVehicle = vehicles[0]; // Example: first vehicle in array
  res.json(activeVehicle);
};

// Get the next upcoming vehicle
export const getNextVehicle = (req, res) => {
  const upcoming = vehicles.slice(1); // All except current
  res.json(upcoming);
};

// Simulate vehicle movement
export const updateVehiclePosition = (io) => {
  setInterval(() => {
    vehicles = vehicles.map(v => ({
      ...v,
      latitude: v.latitude + (Math.random() - 0.5) * 0.001,
      longitude: v.longitude + (Math.random() - 0.5) * 0.001
    }));

    // Broadcast update for current vehicle
    io.emit("vehicleLocationUpdate", {
      vehicleId: vehicles[0].id,
      lat: vehicles[0].latitude,
      lng: vehicles[0].longitude,
      arrivalTime: vehicles[0].arrivalTime,
      status: vehicles[0].status
    });

  }, 5000); // Every 5 seconds
};
