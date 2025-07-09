import React, { useState, useEffect } from 'react';
import AdoptImage from '../assets/adopt.png'; // adjust path if needed
import Navbar from './NavBar';
import axios from 'axios'; // Import axios for API calls
import { toast } from 'react-toastify'; // Assuming you have react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the CSS for toastify

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AdoptBin = () => {
  const [locationInput, setLocationInput] = useState('');
  const [adoptedBins, setAdoptedBins] = useState([]);
  const [message, setMessage] = useState(''); // To display success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Function to get the JWT token from localStorage
  const getToken = () => localStorage.getItem('token');

  // --- Fetch User's Adopted Bins ---
  const fetchMyAdoptedBins = async () => {
    try {
      const token = getToken();
      if (!token) {
        // Handle unauthenticated state, maybe redirect to login
        console.error('No authentication token found.');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/adopt-bins/my-adopted-bins`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAdoptedBins(response.data);
    } catch (error) {
      console.error('Error fetching adopted bins:', error);
      // toast.error('Failed to load your adopted bins.'); // Optional: show toast
    }
  };

  useEffect(() => {
    fetchMyAdoptedBins();
  }, []); // Run once on component mount

  // --- Handle Location Input Change ---
  const handleLocationInputChange = (e) => {
    setLocationInput(e.target.value);
    setMessage(''); // Clear message when typing
    setMessageType('');
  };

  // --- Handle Share Live Location ---
  const handleShareLiveLocation = () => {
    setMessage('');
    setMessageType('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // For simplicity, we'll use lat/lng as the location string.
          // In a real app, you might use a reverse geocoding API to get a human-readable address.
          const liveLocation = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
          setLocationInput(liveLocation);
          toast.success('Live location captured!');
        },
        (error) => {
          console.error('Error getting live location:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setMessage('Geolocation permission denied. Please enable location services in your browser settings.');
          } else {
            setMessage('Failed to get live location. Please enter manually.');
          }
          setMessageType('error');
          toast.error('Failed to get live location.');
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setMessage('Geolocation is not supported by your browser. Please enter location manually.');
      setMessageType('error');
      toast.error('Geolocation not supported.');
    }
  };

  // --- Handle Adopt Bin ---
  const handleAdoptBin = async () => {
    setMessage('');
    setMessageType('');
    if (!locationInput.trim()) {
      setMessage('Please enter a location or share your live location.');
      setMessageType('error');
      toast.error('Location is required.');
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        toast.error('You must be logged in to adopt a bin.');
        return;
      }

      // 1. Check if bin is already adopted
      const checkResponse = await axios.get(`${API_BASE_URL}/api/adopt-bins/adoption-status`, {
        params: { location: locationInput.trim() },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (checkResponse.data.isAdopted) {
        setMessage(`This bin location is already adopted by ${checkResponse.data.adoptedBy || 'another user'}.`);
        setMessageType('error');
        toast.info(`This bin location is already adopted.`);
        return;
      }

      // 2. If not adopted, proceed with adoption
      const adoptResponse = await axios.post(`${API_BASE_URL}/api/adopt-bins/adopt`,
        { location: locationInput.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (adoptResponse.status === 201) {
        setMessage('Bin adopted successfully!');
        setMessageType('success');
        toast.success('Bin adopted successfully!');
        setLocationInput(''); // Clear input after successful adoption
        fetchMyAdoptedBins(); // Re-fetch adopted bins to update the list
      }
    } catch (error) {
      console.error('Error adopting bin:', error);
      const errorMessage = error.response?.data?.message || 'Failed to adopt bin.';
      setMessage(errorMessage);
      setMessageType('error');
      toast.error(errorMessage);
    }
  };


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
            value={locationInput}
            onChange={handleLocationInputChange}
          />
          <button
            onClick={handleShareLiveLocation}
            className="bg-green-700 text-white px-4 py-2 rounded mb-4 hover:bg-green-800 transition"
          >
            Share live location
          </button>

          {/* Display messages */}
          {message && (
            <p className={`mb-4 text-center ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <img src={AdoptImage} alt="Adopt Bin" className="w-64 h-auto mb-4" />
          <button
            onClick={handleAdoptBin}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
          >
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
              {adoptedBins.length > 0 ? (
                adoptedBins.map((bin) => (
                  <div key={bin.id} className="bg-gray-100 p-3 rounded flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{bin.location} →</p>
                      {/* You can add a bin code if your AdoptedBin model had one */}
                      {/* <p className="text-xs text-gray-500">Bin Code: {bin.binCode}</p> */}
                    </div>
                    {/* You could add dynamic status like 'Clean', 'Needs Attention' here */}
                    {/* For now, it's static in your image, but the data is there */}
                    <span className="text-green-700 font-semibold">Adopted</span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No bins adopted yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptBin;