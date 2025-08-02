import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";

const SpecializedPickUps = () => {
  const [formData, setFormData] = useState({
    wasteType: "",
    address: "",
    pickupDate: "",
    pickupTime: "",
    additionalNotes: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!agreed) {
      setError("You must agree to the pickup guidelines.");
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to confirm a pickup.");
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (selectedFile) {
      data.append("wasteImage", selectedFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pickups/request",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      // Reset form on success
      setFormData({
        wasteType: "",
        address: "",
        pickupDate: "",
        pickupTime: "",
        additionalNotes: "",
      });
      setSelectedFile(null);
      setAgreed(false);
    } catch (err) {
      console.error("Error confirming pickup:", err);
      setError(
        err.response?.data?.message || "Failed to confirm pickup. Please try again."
      );
      toast.error("Failed to confirm pickup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

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
              {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <select
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-white"
                  defaultValue=""
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleChange}
                  required
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
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                />
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  required
                />
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-white"
                  name="wasteImage"
                  onChange={handleFileChange}
                />
                <textarea
                  placeholder="Additional notes"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  rows="3"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                ></textarea>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agree"
                    className="mr-2"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                  />
                  <label htmlFor="agree">I agree to the pickup guidelines</label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-green-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Confirming..." : "Confirm Pickup"}
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