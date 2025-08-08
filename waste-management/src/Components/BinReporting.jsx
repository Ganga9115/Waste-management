import React, { useState, useEffect } from "react";
import img5 from "../assets/img5.png";
import NavBar from "./NavBar";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const BinMonitoring = () => {
  const [selectedFilesBase64, setSelectedFilesBase64] = useState([]);
  const [locationDisplay, setLocationDisplay] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [priority, setPriority] = useState("Medium");
  const [comments, setComments] = useState("");
  const [reports, setReports] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFilesBase64([]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFilesBase64(prevFiles => [...prevFiles, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocationDisplay(`Lat: ${lat}, Lng: ${lng}`);
          setLatitude(lat);
          setLongitude(lng);
          toast.success("Live location captured!");
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Unable to retrieve your location. Please ensure location services are enabled and permissions granted.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Geolocation permission denied. Please enable location services in your browser settings.";
          }
          toast.error(errorMessage);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      toast.error("Geolocation is not supported by your browser. Please use a modern browser.");
    }
  };

  const handleSubmit = async () => {
    if (latitude === null || longitude === null) {
      toast.error("Please share your location before submitting.");
      return;
    }

    const data = {
      latitude,
      longitude,
      priority,
      comments,
      imagesData: selectedFilesBase64,
    };

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

      const response = await axios.post(`${API_BASE_URL}/api/bins/report`, data, config);

      console.log("Report submitted successfully:", response.data);
      toast.success("Report submitted successfully!");

      setSelectedFilesBase64([]);
      setLocationDisplay("");
      setLatitude(null);
      setLongitude(null);
      setComments("");
      setPriority("Medium");

      fetchReports();

    } catch (error) {
      console.error("Error submitting report:", error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || error.message || "Failed to submit report.";
      toast.error(`Failed to submit report: ${errorMessage}`);
    }
  };

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn("No authentication token found. Cannot fetch reports.");
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/api/bins/my-reports`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const fetchedReports = response.data.map(report => ({
        ...report,
        imagesData: report.imagesData ? JSON.parse(report.imagesData) : []
      }));
      setReports(fetchedReports);
    } catch (error) {
      console.error("Error fetching reports:", error.response ? error.response.data : error.message);
      toast.error("Failed to load report history.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-50 flex flex-col">
      <NavBar />
      <ToastContainer />

      {/* Main content with side-by-side layout on desktop */}
      <div className="flex flex-col lg:flex-row gap-6 mx-auto p-6 md:p-6 lg:p-8 max-w-7xl mt-16 mb-6 w-full">

        {/* Left: Report Form */}
        <div className="flex-1 bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Report Overflowing Bin
          </h2>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-1">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-1 w-full p-2 bg-white/80 rounded-md shadow"
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              {selectedFilesBase64.map((base64String, index) => (
                <img
                  key={index}
                  src={base64String}
                  alt="Bin Preview"
                  className="w-16 h-16 object-cover rounded-md border border-gray-300 shadow"
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-1">
              Live Location
            </label>
            <button
              onClick={getLiveLocation}
              className="mt-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow"
            >
              Share Location
            </button>
            {locationDisplay && <p className="mt-1 text-sm text-gray-700">{locationDisplay}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 bg-white/80 rounded-md shadow"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High (Emergency Alert)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-1">
              Additional Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full p-3 bg-white/80 rounded-md shadow"
              rows="3"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white py-3 w-full rounded-md hover:bg-green-800 font-semibold text-lg shadow-md"
          >
            Submit Report
          </button>
        </div>

        {/* Right: Report History */}
        <div className="flex-1 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[80vh]">
          <h2 className="text-xl font-bold text-green-800 mb-3">
            Report History
          </h2>
          {reports.length > 0 ? (
            <div className="space-y-3 text-sm">
              {reports.map((report, index) => (
                <div key={report.id || index} className="border-b border-gray-300 py-3 last:border-b-0">
                  <p className="text-gray-700"><strong>📍 Location:</strong> Lat: {report.latitude}, Lng: {report.longitude}</p>
                  <p className="text-gray-700"><strong>⚡ Priority:</strong> {report.priority}</p>
                  <p className="text-gray-700"><strong>💬 Comments:</strong> {report.comments}</p>
                  <p className="text-green-700"><strong>📌 Status:</strong> {report.status}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {report.imagesData && report.imagesData.map((imageData, idx) => (
                      <img
                        key={idx}
                        src={imageData}
                        alt={`Report Image ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded-md border border-gray-300 shadow"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reports found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BinMonitoring;
