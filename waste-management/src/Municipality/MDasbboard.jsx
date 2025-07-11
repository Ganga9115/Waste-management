import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FaTrash,
  FaCheckSquare,
  FaRecycle,
  FaChartLine,
  FaTruckLoading,
} from "react-icons/fa";

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3382/3382763.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const GarbageVehicleStatus = () => {
  const truckPosition = [13.0827, 80.2707]; // Chennai coordinates

  return (
    <div className="min-h-screen bg-green-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-xl font-bold border border-black inline-block px-4 py-1 mb-2">
          CHENNAI MUNICIPALITY
        </h1>
        <h2 className="text-lg font-semibold mb-6">
          Live Status of Garbage collection vehicles
        </h2>

        {/* Main layout: map + stats */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Map container */}
          <div className="w-full md:w-[66%] h-[500px] bg-white rounded shadow overflow-hidden">
  <MapContainer
    center={truckPosition}
    zoom={13}
    scrollWheelZoom={true}
    className="w-full h-full"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={truckPosition} icon={truckIcon}>
      <Popup>
        Garbage Collection Vehicle<br /> Active
      </Popup>
    </Marker>
  </MapContainer>
</div>


          {/* Stats */}
          <div className="w-full md:w-[34%] flex flex-col justify-start gap-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-4 rounded shadow">
                <FaTrash className="text-green-700 mx-auto text-2xl mb-1" />
                <div className="font-bold text-xl">3952</div>
                <p className="text-sm text-gray-600">Total Dustbins</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <FaCheckSquare className="text-green-700 mx-auto text-2xl mb-1" />
                <div className="font-bold text-xl">2840</div>
                <p className="text-sm text-gray-600">Total Cleaned</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <FaTruckLoading className="text-green-700 mx-auto text-2xl mb-1" />
              <div className="text-green-700 text-xl font-bold">3375 t</div>
              <p className="text-sm text-gray-600">Waste Collected</p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <FaRecycle className="text-green-700 mx-auto text-2xl mb-1" />
              <div className="text-green-700 font-bold text-xl">1078 t</div>
              <p className="text-sm text-gray-600">Waste Recycled</p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <FaChartLine className="text-green-700 mx-auto text-2xl mb-1" />
              <div className="text-green-700 font-bold text-xl">31.9%</div>
              <p className="text-sm text-gray-600">Recycling Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarbageVehicleStatus;
