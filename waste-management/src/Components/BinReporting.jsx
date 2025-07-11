import React, { useState } from "react";
import { FaMapMarkerAlt, FaCamera, FaFlag, FaCommentDots, FaClipboardList } from "react-icons/fa";
import img5 from "../assets/img5.png";
import NavBar from "./NavBar";
import axios from 'axios'; // Make sure you have installed axios: npm install axios

const BinMonitoring = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Stores actual File objects
  const [locationDisplay, setLocationDisplay] = useState(""); // For displaying the location string
  const [latitude, setLatitude] = useState(null); // Stores numeric latitude
  const [longitude, setLongitude] = useState(null); // Stores numeric longitude
  const [priority, setPriority] = useState("Medium");
  const [comments, setComments] = useState("");
  const [reports, setReports] = useState([]); // This state will eventually be populated from backend

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
                setLocationDisplay(`Lat: ${lat}, Lng: ${lng}`); // For display
                setLatitude(lat); // Set numerical latitude
                setLongitude(lng); // Set numerical longitude
           },
            (error) => {
                console.error("Error getting location:", error);
                alert("Unable to retrieve your location. Please ensure location services are enabled and permissions granted.");
            }
        );
    } else {
      alert("Geolocation is not supported by your browser. Please use a modern browser.");
    }
  };

  const handleSubmit = async () => {
    if (latitude === null || longitude === null) {
      alert("Please share your location before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("latitude", latitude); // Send numeric latitude
    formData.append("longitude", longitude); // Send numeric longitude
    formData.append("priority", priority);
    formData.append("comments", comments);

    selectedFiles.forEach((file) => {
        formData.append("images", file); // 'images' must match the key used in multer on backend
    });

    try {
        const token = localStorage.getItem('token'); // Get the authentication token
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Axios handles this automatically with FormData, but explicitly stating is fine
                'Authorization': `Bearer ${token}` // Attach the JWT for authentication
            },
        };

        // Make sure your backend server is running on http://localhost:5000
        const response = await axios.post("http://localhost:5000/api/bins/report", formData, config);

        console.log("Report submitted successfully:", response.data);
        alert("Report submitted successfully!");

        // Clear form fields after successful submission
        setSelectedFiles([]);
        setLocationDisplay("");
        setLatitude(null);
        setLongitude(null);
        setComments("");
        setPriority("Medium");

        // Optionally, refetch reports or update local state to show the new report
        // For now, keeping the local `reports` state to just clear the form for simplicity.
        // In a real app, you'd likely fetch from backend after submission and populate `reports` from there.
        // setReports((prevReports) => [response.data.report, ...prevReports]); // Example if you want to add it to local history
    } catch (error) {
        console.error("Error submitting report:", error.response ? error.response.data : error.message);
        alert(`Failed to submit report: ${error.response ? error.response.data.message : error.message}`);
    }
 };

   return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-50 flex flex-col">
    <NavBar />

    <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-20 pt-32 pb-10">
      {/* Left Side Image */}
      <div className="md:w-1/2 hidden md:block">
          <img
            src={img5}
            alt="Clean-up"
            className="w-full h-full object-cover"
          />
        </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center flex items-center justify-center gap-2">
          <FaClipboardList className="text-green-700" /> Report Overflowing Bin
        </h2>

        {/* Upload Images */}
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-1 flex items-center gap-2">
            <FaCamera className="text-green-600" /> Upload Images
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

        {/* Location */}
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-1 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> Live Location
          </label>
          <button
            onClick={getLiveLocation}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow"
          >
            Share Location
          </button>
          {locationDisplay && <p className="mt-2 text-sm text-gray-700">{locationDisplay}</p>}
        </div>

        {/* Priority */}
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-1 flex items-center gap-2">
            <FaFlag className="text-yellow-500" /> Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 rounded-md shadow bg-white/80"
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High (🚨 Emergency Alert)</option>
          </select>
        </div>

        {/* Comments */}
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-1 flex items-center gap-2">
            <FaCommentDots className="text-blue-500" /> Additional Comments
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Describe the issue..."
            className="w-full p-3 rounded-md shadow bg-white/80"
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

    {/* Report History - This part currently uses local state.
        For persistent history, you'd need to fetch reports from the backend */}
    {reports.length > 0 && (
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl mx-6 md:mx-20 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <FaClipboardList className="text-green-600" /> Report History
        </h2>
        {reports.map((report, index) => (
          <div key={index} className="border-b border-gray-300 py-4">
            {/* Displaying latitude/longitude directly from the backend response */}
            <p className="text-gray-700"><strong>📍 Location:</strong> Lat: {report.latitude}, Lng: {report.longitude}</p>
            <p className="text-gray-700"><strong>⚡ Priority:</strong> {report.priority}</p>
            <p className="text-gray-700"><strong>💬 Comments:</strong> {report.comments}</p>
            <p className="text-green-700"><strong>📌 Status:</strong> {report.status}</p>
            {/* Displaying images using the backend served URL */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {report.imagePaths && report.imagePaths.map((imagePath, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000/${imagePath}`} // Assuming backend serves from /uploads
                  alt="Report Preview"
                  className="w-16 h-16 object-cover rounded-md border border-gray-300 shadow"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

  
};

export default BinMonitoring;