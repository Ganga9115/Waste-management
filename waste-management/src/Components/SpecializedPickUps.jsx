import { useState } from "react";
import NavBar from "./NavBar";
import Ewaste from "../assets/e-waste.jpg";
import Furniture from "../assets/furniture.jpg";
import Hazard from "../assets/hazard.jpg";

const SpecializedPickUps = () => {
  const [showGuidelines, setShowGuidelines] = useState(false);

  return (
    <>
      <NavBar />

      <div className="mt-10">
        <div className="relative min-h-screen bg-green-50 px-6 py-8 font-sans">
          {/* Main Content */}
          <div
            className={`${
              showGuidelines ? "blur-sm pointer-events-none" : ""
            } transition-all duration-300`}
          >
            {/* Hero Section */}
            <div className="text-center mb-10">
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

            {/* Flex container for waste types + form */}
            <div className="flex flex-wrap md:flex-nowrap gap-10 items-start">
              {/* Waste Types */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-4">
                  Select the type of waste
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "E-Waste", img: Ewaste },
                    { label: "Furniture waste", img: Furniture },
                    { label: "Hazardous waste", img: Hazard },
                  ].map((waste, i) => (
                    <div
                      key={i}
                      className="bg-white rounded shadow p-2 text-center hover:ring hover:ring-green-300 cursor-pointer"
                    >
                      <img
                        src={waste.img}
                        alt={waste.label}
                        className="h-48 w-full object-cover mb-2 rounded"
                      />
                      <span className="font-medium">{waste.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pickup Form */}
              <div className="bg-white p-6 rounded shadow w-full max-w-sm -mt-8">
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
      </div>
    </>
  );
};

export default SpecializedPickUps;
