import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const VehicleTracking = () => {
  const [vehiclePosition, setVehiclePosition] = useState({ lat: 37.7749, lng: -122.4194 });
  const [upcomingVehicle, setUpcomingVehicle] = useState({ id: "TX-1289", arrivalTime: "10:30 AM" });

  useEffect(() => {
    const interval = setInterval(() => {
      setVehiclePosition((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.01,
        lng: prev.lng + (Math.random() - 0.5) * 0.01,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-green-50 flex flex-col items-center p-4">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-green-700 mb-4">🚛 Vehicle Tracking</h2>

      {/* Map Section */}
      <div className="w-full max-w-screen-lg h-[60vh] rounded-lg shadow-lg overflow-hidden">
        <MapContainer center={vehiclePosition} zoom={13} className="h-full w-full rounded-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={vehiclePosition}>
            <Popup>🚛 Garbage Truck is here!</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Upcoming Vehicle Info */}
      <div className="bg-white w-full max-w-screen-lg mt-6 p-4 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold text-green-700">Upcoming Collection</h3>
        <p className="text-lg text-gray-700 mt-2">🚛 Vehicle ID: <strong>{upcomingVehicle.id}</strong></p>
        <p className="text-lg text-gray-700">🕒 Arrival Time: <strong>{upcomingVehicle.arrivalTime}</strong></p>
      </div>
    </div>
  );
};

export default VehicleTracking;
