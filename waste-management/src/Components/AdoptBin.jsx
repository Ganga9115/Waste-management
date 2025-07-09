import React from 'react';
import AdoptImage from '../assets/adopt.png'; // adjust path if needed
import Navbar from './NavBar';

const AdoptBin = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-50 flex justify-center items-start px-10 pt-24 pb-10 gap-10">
        {/* LEFT - Responsibilities */}
        <div className="w-1/4">
          <h2 className="text-2xl font-bold mb-4">YOUR KEY RESPONSIBILITIES</h2>
          <ul className="space-y-4">
            {[
              'Maintain cleanliness of the adopted bin area.',
              'Report damage, overflow or misuse.',
              'Promote responsible disposal in your neighborhood.',
              'Encourage others to adopt nearby bins.',
              'Attend monthly community clean-up events.',
            ].map((text, index) => (
              <li key={index} className="bg-white shadow rounded-lg p-4 text-sm">
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER - Adopt Section */}
        <div className="w-2/4 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">ADOPT A BIN</h1>
          <p className="text-lg font-medium mb-2">Choose the Bin Location</p>
          <input
            type="text"
            placeholder="Enter your location manually"
            className="w-80 p-2 border rounded mb-4"
          />
          <button className="bg-green-700 text-white px-4 py-2 rounded mb-4 hover:bg-green-800 transition">
            Share live location
          </button>
          <img src={AdoptImage} alt="Adopt Bin" className="w-64 h-auto mb-4" />
          <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
            ADOPT
          </button>
        </div>

        {/* RIGHT - Info Boxes */}
        <div className="w-1/4 space-y-6">
          {/* How It Works */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2">How It Works</h2>
            <ul className="text-sm space-y-2">
              <li><span className="font-semibold">Choose a Bin:</span> Select an available bin.</li>
              <li><span className="font-semibold">Take Responsibility:</span> Commit to upkeep.</li>
              <li><span className="font-semibold">Get Notified:</span> Receive updates.</li>
              <li><span className="font-semibold">Earn Recognition:</span> Community points and badges.</li>
            </ul>
          </div>

          {/* Adopted Bins */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2">YOUR ADOPTED BINS</h2>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-100 p-3 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">Anna Nagar West →</p>
                  <p className="text-xs text-gray-500">Bin Code: BIN2384</p>
                </div>
                <span className="text-green-700 font-semibold">Clean</span>
              </div>
              <div className="bg-gray-100 p-3 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">T Nagar →</p>
                  <p className="text-xs text-gray-500">Bin Code: BIN1147</p>
                </div>
                <span className="text-green-700 font-semibold">Clean</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptBin;
