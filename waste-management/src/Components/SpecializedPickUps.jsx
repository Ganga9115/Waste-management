import { useState } from "react";
import NavBar from "./NavBar";
const SpecializedPickUps = () => {
  const [showGuidelines, setShowGuidelines] = useState(false);

  return (
    <div className="relative min-h-screen bg-green-50 p-6 font-sans">
        <NavBar />
      {/* Hero Section */}
      <div className={`${showGuidelines ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Specialized Waste Pickups</h1>
          <p className="text-gray-600 mt-2">
            E-waste, furniture, hazardous items? We’ll take care of it safely.
          </p>
          <button
            onClick={() => setShowGuidelines(true)}
            className="mt-4 border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-100"
          >
            View Guidelines
          </button>
        </div>

        {/* Waste Type Selection */}
        <h2 className="text-lg font-semibold mb-2">Select the type of waste</h2>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "E-Waste", img: "e-waste.jpg" },
            { label: "Furniture waste", img: "furniture.jpg" },
            { label: "Hazardous waste", img: "hazard.jpg" },
          ].map((waste, i) => (
            <div
              key={i}
              className="bg-white rounded shadow p-2 text-center hover:ring hover:ring-green-300 cursor-pointer"
            >
              <img
                src={waste.img}
                alt={waste.label}
                className="h-32 w-full object-cover mb-2 rounded"
              />
              <span className="font-medium">{waste.label}</span>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded shadow max-w-md ml-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Pickup Form</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="time"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="file"
              className="w-full border border-gray-300 rounded px-4 py-2 bg-white"
            />
            <textarea
              placeholder="Additional notes"
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows="3"
            ></textarea>
            <div className="flex items-center">
              <input type="checkbox" id="agree" className="mr-2" />
              <label htmlFor="agree">I agree to the pickup guidelines</label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Confirm Pickup
            </button>
          </form>
        </div>
      </div>

      {/* Guidelines Modal */}
      {showGuidelines && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Pickup Guidelines</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 max-h-80 overflow-y-auto text-sm">
              <li>Clean and pack items before pickup.</li>
              <li>Label hazardous waste clearly.</li>
              <li>Disassemble bulky furniture if possible.</li>
              <li>Place items near the main entrance for easy access.</li>
              <li>No food waste, medical waste, or construction debris.</li>
              <li>Pickup available only during selected time slots.</li>
              <li>Charges may apply for certain item types.</li>
              <li>Support: support@ecofriend.com | 📞 +91-9876543210</li>
            </ul>
            <button
              onClick={() => setShowGuidelines(false)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecializedPickUps;
