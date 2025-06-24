import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./NavBar";
import { Bell, Send } from "lucide-react";

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
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-green-50 flex items-start justify-center pt-32 px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-screen-xl">

          {/* Map Container */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-green-700 mb-2 text-center">🚛 Vehicle Tracking</h2>
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[60vh] rounded-lg overflow-hidden">
              <MapContainer center={vehiclePosition} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-lg">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={vehiclePosition}>
                  <Popup>🚛 Garbage Truck is here!</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

         {/* Details Container */}
<div className="w-full lg:w-1/3">
  <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-between min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:h-[60vh]">

    {/* Upcoming Vehicle Info */}
    <div className="text-center mb-4">
      <h3 className="text-xl font-semibold text-green-700">Upcoming Collection</h3>
      <p className="text-lg text-gray-700 mt-6">
        🚛 Vehicle ID: <strong>{upcomingVehicle.id}</strong>
      </p>
      <p className="text-lg text-gray-700">
        🕒 Arrival Time: <strong>{upcomingVehicle.arrivalTime}</strong>
      </p>
    </div>
    {/* Collection Status */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h4 className="text-md font-semibold text-green-800 mb-3">Collection Status</h4>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-green-600 rounded-full mb-1"></div>
              <span className="text-xs text-gray-600">Scheduled</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-green-600 rounded-full mb-1"></div>
              <span className="text-xs text-gray-600">On the way</span>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-gray-300 rounded-full mb-1"></div>
              <span className="text-xs text-gray-600">Completed</span>
            </div>
          </div>
        </div>

    {/* Notify Button */}
    <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition mb-4">
      Notify Me <Bell className="w-4 h-4" />
    </button>

    {/* Message Box */}
    <div className="flex items-center bg-white border rounded-lg shadow-sm p-2">
      <input
        type="text"
        placeholder="Message"
        className="flex-1 outline-none px-2 text-sm text-gray-700"
      />
      <button className="text-green-700 hover:text-green-900 transition">
        <Send className="w-5 h-5" />
      </button>
    </div>

  </div>
</div>

          </div>

        </div>
      
    </>
  );
};

export default VehicleTracking;
