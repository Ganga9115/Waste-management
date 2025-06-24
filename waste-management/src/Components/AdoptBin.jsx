import NavBar from "./NavBar"
export default function AdoptBinPage() {
  return (
    <div className="bg-[#F0FDF4] min-h-screen font-sans">
      {/* Navigation Bar */}
     <NavBar />

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Key Responsibilities */}
        <div>
          <h2 className="font-bold text-center text-sm mb-4">YOUR KEY RESPONSIBILITIES</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="bg-white shadow rounded px-4 py-2">Regularly monitor and maintain the cleanliness of the adopted bin area.</li>
            <li className="bg-white shadow rounded px-4 py-2">Report any damage, overflow or misuse.</li>
            <li className="bg-white shadow rounded px-4 py-2">Promote responsible waste disposal in your neighborhood.</li>
            <li className="bg-white shadow rounded px-4 py-2">Encourage others to adopt nearby bins.</li>
            <li className="bg-white shadow rounded px-4 py-2">Attend monthly community clean-up events.</li>
          </ul>
        </div>

        {/* Main Section */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">ADOPT A BIN</h1>
          {/* Location Input */}
          <h3 className="text-base font-semibold mb-1 self-start">Choose the Bin Location</h3>
          <input type="text" placeholder="Enter your location manually" className="w-full px-4 py-2 rounded shadow mb-3" />
          <button className="bg-green-700 text-white font-semibold px-6 py-2 rounded mb-6">Share live location</button>

          {/* Adopt Me Image */}
          <img
            src="/adopt-bin-illustration.png" // Replace with actual path
            alt="Adopt Me"
            className="w-48 mb-2"
          />
          <button className="bg-green-700 text-white font-bold px-6 py-2 rounded">ADOPT</button>
        </div>

        {/* How it Works and Adopted Bins */}
        <div>
          <div className="bg-[#FEFFF6] p-4 rounded shadow mb-6">
            <h2 className="font-semibold text-sm mb-3">How It Works</h2>
            <div className="flex justify-between text-xs text-gray-700">
              <div className="text-center">
                <div>📍</div>
                <p>Choose a Bin</p>
              </div>
              <div className="text-center">
                <div>✔</div>
                <p>Take Responsibility</p>
              </div>
              <div className="text-center">
                <div>📲</div>
                <p>Get Notified</p>
              </div>
              <div className="text-center">
                <div>⭐</div>
                <p>Earn Recognition</p>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded shadow">
            <h2 className="font-semibold text-sm mb-3">YOUR ADOPTED BINS</h2>
            <div className="bg-gray-100 px-3 py-2 flex justify-between items-center mb-2">
              <div>
                <p className="font-medium text-sm">Anna Nagar West →</p>
                <p className="text-xs text-gray-500">Bin Code: BIN2384</p>
              </div>
              <span className="text-green-700 font-bold text-sm">Clean</span>
            </div>
            <div className="bg-gray-100 px-3 py-2 flex justify-between items-center">
              <div>
                <p className="font-medium text-sm">T Nagar →</p>
                <p className="text-xs text-gray-500">Bin Code: BIN1147</p>
              </div>
              <span className="text-green-700 font-bold text-sm">Clean</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}