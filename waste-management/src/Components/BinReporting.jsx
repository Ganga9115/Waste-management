import React, { useState, useEffect } from "react";
import img5 from "../assets/img5.png";
import NavBar from "./NavBar"; 
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const BinMonitoring = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [locationDisplay, setLocationDisplay] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [priority, setPriority] = useState("Medium");
  const [comments, setComments] = useState("");
  const [reports, setReports] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
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

    const formData = new FormData();
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("priority", priority);
    formData.append("comments", comments);

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      };

      const response = await axios.post(`${API_BASE_URL}/api/bins/report`, formData, config);

      console.log("Report submitted successfully:", response.data);
      toast.success("Report submitted successfully!");

      setSelectedFiles([]);
      setLocationDisplay("");
      setLatitude(null);
      setLongitude(null);
      setComments("");
      setPriority("Medium");

      setReports((prevReports) => [response.data.report, ...prevReports]);

    } catch (error) {
      console.error("Error submitting report:", error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || error.message || "Failed to submit report.";
      toast.error(`Failed to submit report: ${errorMessage}`);
    }
  };

  useEffect(() => {
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
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error.response ? error.response.data : error.message);
        toast.error("Failed to load report history.");
      }
    };
    fetchReports();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-50 flex flex-col">
      <NavBar />
      <div className="mx-auto p-6 md:p-8 lg:p-10 max-w-4xl bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg shadow-xl mt-24 mb-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <img
            src={img5}
            alt="Clean-up"
            className="md:w-1/2 w-full h-auto object-cover rounded-lg shadow-md hidden md:block"
          />
          <div className="w-full md:w-1/2 rounded-2xl p-6"> 
            <h2 className="text-2xl font-bold text-green-800 mb-5 text-center">
              Report Overflowing Bin
            </h2>
            <div className="mb-5">
              <label className="block text-gray-800 font-medium mb-1">
                Upload Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mt-2 w-full p-2 bg-white/80 rounded-md shadow"
              />
              <div className="mt-3 flex gap-2 flex-wrap">
                {selectedFiles.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="Bin Preview"
                    className="w-16 h-16 object-cover rounded-md border border-gray-300 shadow"
                  />
                ))}
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-gray-800 font-medium mb-1">
                Live Location
              </label>
              <button
                onClick={getLiveLocation}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow"
              >
                Share Location
              </button>
              {locationDisplay && <p className="mt-2 text-sm text-gray-700">{locationDisplay}</p>}
            </div>
            <div className="mb-5">
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
            <div className="mb-6">
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
        </div>
      </div>
      {reports.length > 0 && (
        <div className="mx-auto p-6 md:p-8 lg:p-10 max-w-4xl bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl mb-10">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            Report History
          </h2>
          <div className="space-y-2 text-sm">
            {reports.map((report, index) => (
              <div key={report.id || index} className="border-b border-gray-300 py-4 last:border-b-0">
                <p className="text-gray-700"><strong>📍 Location:</strong> Lat: {report.latitude}, Lng: {report.longitude}</p>
                <p className="text-gray-700"><strong>⚡ Priority:</strong> {report.priority}</p>
                <p className="text-gray-700"><strong>💬 Comments:</strong> {report.comments}</p>
                <p className="text-green-700"><strong>📌 Status:</strong> {report.status}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {report.imagePaths && report.imagePaths.map((imagePath, idx) => (
                    <img
                      key={idx}
                      src={`${API_BASE_URL}/${imagePath}`}
                      alt="Report Preview"
                      className="w-16 h-16 object-cover rounded-md border border-gray-300 shadow"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BinMonitoring;
