import React, { useState } from "react";
import { FaMapMarkerAlt, FaCamera, FaFlag, FaCommentDots, FaClipboardList } from "react-icons/fa";
import img5 from "../assets/img5.png";
import NavBar from "./NavBar";

const BinMonitoring = () => {
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [comments, setComments] = useState("");
  const [reports, setReports] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
      });
    } else {
      alert("Geolocation is not supported.");
    }
  };

  const handleSubmit = () => {
    if (!location) {
      alert("Please share your location before submitting.");
      return;
    }

    const newReport = { images, location, priority, comments, status: "Pending" };
    setReports([newReport, ...reports]);
    setImages([]);
    setLocation("");
    setComments("");
    alert("Report submitted successfully!");
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
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
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
          {location && <p className="mt-2 text-sm text-gray-700">{location}</p>}
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

    {/* Report History */}
    {reports.length > 0 && (
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl mx-6 md:mx-20 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <FaClipboardList className="text-green-600" /> Report History
        </h2>
        {reports.map((report, index) => (
          <div key={index} className="border-b border-gray-300 py-4">
            <p className="text-gray-700"><strong>📍 Location:</strong> {report.location}</p>
            <p className="text-gray-700"><strong>⚡ Priority:</strong> {report.priority}</p>
            <p className="text-gray-700"><strong>💬 Comments:</strong> {report.comments}</p>
            <p className="text-green-700"><strong>📌 Status:</strong> {report.status}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {report.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
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


/*return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center overflow-y-auto">
      <Navbar />

      <div className="flex flex-wrap justify-center items-start mt-6 gap-6 w-full max-w-6xl px-4">
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={img5} alt="Waste Collection" className="rounded-lg shadow-lg w-full md:w-96" />
        </div>

        <div className="w-full md:w-1/2 bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white/50">
          <h2 className="text-lg font-semibold text-green-800 mb-4">📢 Report Overflowing Bin</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium flex items-center gap-2">
              <FaCamera className="text-green-600" /> Upload Images
            </label>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="mt-2" />
            <div className="mt-3 flex gap-2 flex-wrap">
              {images.map((img, index) => (
                <img key={index} src={img} alt="Bin Preview" className="w-20 h-20 object-cover rounded-md border border-gray-300 shadow-sm" />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> Live Location
            </label>
            <button
              onClick={getLiveLocation}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-md"
            >
              Share Location
            </button>
            {location && <p className="mt-2 text-gray-600">{location}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium flex items-center gap-2">
              <FaFlag className="text-yellow-500" /> Priority
            </label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-2 w-full p-2 border rounded-md shadow-sm">
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High (🚨 Emergency Alert)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium flex items-center gap-2">
              <FaCommentDots className="text-blue-500" /> Additional Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-2 w-full p-2 border rounded-md shadow-sm"
              placeholder="Describe the issue..."
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 shadow-md w-full text-lg font-semibold"
          >
            🚀 Submit Report
          </button>
        </div>
      </div>

      {reports.length > 0 && (
        <div className="bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white/50 w-full max-w-4xl mt-6">
          <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2">
            <FaClipboardList className="text-green-600" /> Report History
          </h2>
          {reports.map((report, index) => (
            <div key={index} className="border-b py-4">
              <p className="text-gray-600"><strong>📍 Location:</strong> {report.location}</p>
              <p className="text-gray-600"><strong>⚡ Priority:</strong> {report.priority}</p>
              <p className="text-gray-600"><strong>💬 Comments:</strong> {report.comments}</p>
              <p className="text-green-500"><strong>📌 Status:</strong> {report.status}</p>
              <div className="flex gap-2 mt-2">
                {report.images.map((img, idx) => (
                  <img key={idx} src={img} alt="Report Preview" className="w-20 h-20 object-cover rounded-md border border-gray-300 shadow-sm" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ); */