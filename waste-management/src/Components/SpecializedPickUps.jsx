import NavBar from "./NavBar";

const SpecializedPickUps = () => {
  return (
    <>
      <NavBar />

      <div className="mt-10">
        <div className="min-h-screen bg-green-50 px-6 py-8 font-sans">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">Specialized Waste Pickups</h1>
            <p className="text-gray-600 mt-2">
              E-waste, furniture, hazardous items? We’ll take care of it safely.
            </p>
          </div>

          {/* Main layout: form left, guidelines right */}
          <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
            {/* Pickup Form */}
            <div className="bg-white p-6 rounded shadow w-full md:max-w-md">
              <h2 className="text-xl font-bold mb-4 text-center">Pickup Form</h2>
              <form className="space-y-4">
                <select
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select waste type
                  </option>
                  <option value="e-waste">E-waste</option>
                  <option value="hazardous">Hazardous waste</option>
                  <option value="furniture">Furniture waste</option>
                </select>

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

            {/* Guidelines Section */}
            <div className="bg-white p-6 rounded-lg shadow w-full md:max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-center">Pickup Guidelines</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 max-h-[500px] overflow-y-auto text-sm">
                <li>Clean and pack items before pickup.</li>
                <li>Label hazardous waste clearly.</li>
                <li>Disassemble bulky furniture if possible.</li>
                <li>Place items near the main entrance for easy access.</li>
                <li>No food waste, medical waste, or construction debris.</li>
                <li>Pickup available only during selected time slots.</li>
                <li>Charges may apply for certain item types.</li>
                <li>Support: support@ecofriend.com | 📞 +91-9876543210</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecializedPickUps;
