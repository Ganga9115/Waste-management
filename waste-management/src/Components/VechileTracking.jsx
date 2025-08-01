import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client"; 
import { Bell, Send } from "lucide-react";
import NavBar from "./NavBar";


const MapUpdater = ({ position }) => {
  const map = useMapEvents({});
  useEffect(() => {
    const currentCenter = map.getCenter();
    const distance = map.distance(currentCenter, position);
    if (distance > 50) { 
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
};


const VehicleTracking = () => {
  const [vehicleData, setVehicleData] = useState({
    id: "Loading...",
    latitude: 37.7749,
    longitude: -122.4194,
    arrivalTime: "Loading...",
    status: "Scheduled",
  });
  const [mobileNumber, setMobileNumber] = useState(''); 
  const [messageInput, setMessageInput] = useState(''); 
  const [notificationStatus, setNotificationStatus] = useState(''); 

  const socket = useRef(null); 

  useEffect(() => {
  
    if (!socket.current) {
      socket.current = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:5000");

      socket.current.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      socket.current.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });

   
      socket.current.on('vehicleLocationUpdate', (data) => {
        console.log('Received real-time update:', data);
        setVehicleData({
          id: data.vehicleId,
          latitude: data.lat,
          longitude: data.lng,
          arrivalTime: data.arrivalTime,
          status: data.status,
        });
      });

      socket.current.on('welcome', (message) => {
        console.log(message);
      });
    }
    const fetchInitialVehicleData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vehicle/current');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVehicleData({
          id: data.id,
          latitude: data.latitude,
          longitude: data.longitude,
          arrivalTime: data.arrivalTime,
          status: data.status,
        });
      } catch (error) {
        console.error("Error fetching initial vehicle data:", error);
        setNotificationStatus('Failed to load initial vehicle data.');
      }
    };

    fetchInitialVehicleData();

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []); 

  
  const handleNotifyMe = async () => {
    if (!mobileNumber) {
      const inputNumber = prompt("Please enter your mobile number (e.g., +1234567890) to receive notifications:");
      if (inputNumber) {
        setMobileNumber(inputNumber);
       
        try {
          const registerResponse = await fetch('http://localhost:5000/api/notifications/register-mobile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobileNumber: inputNumber }),
          });
          const registerData = await registerResponse.json();
          if (!registerResponse.ok) {
            throw new Error(registerData.message || 'Failed to register mobile number.');
          }
          console.log(registerData.message);
          setNotificationStatus(registerData.message);
        } catch (error) {
          console.error("Error registering mobile number:", error);
          setNotificationStatus(`Error: ${error.message}`);
          return; 
        }
      } else {
        setNotificationStatus('Mobile number is required for notifications.');
        return;
      }
    }

    try {
      setNotificationStatus('Sending notification...');
      const response = await fetch('http://localhost:5000/api/notifications/send-pickup-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobileNumber: mobileNumber,
          vehicleId: vehicleData.id,
          arrivalTime: vehicleData.arrivalTime,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send notification.');
      }
      setNotificationStatus('Notification sent successfully!');
    } catch (error) {
      console.error("Error sending notification:", error);
      setNotificationStatus(`Error: ${error.message}`);
    }
  };


  const handleSendMessage = async () => {
    if (!messageInput.trim()) {
      setNotificationStatus('Message cannot be empty.');
      return;
    }

    try {
      setNotificationStatus('Sending message...');
      const response = await fetch('http://localhost:5000/api/vehicle/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageInput }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message.');
      }
      setNotificationStatus('Message sent!');
      setMessageInput(''); // Clear input
    } catch (error) {
      console.error("Error sending message:", error);
      setNotificationStatus(`Error: ${error.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-gray-400';
      case 'On the way':
        return 'bg-green-600';
      case 'Completed':
        return 'bg-blue-600'; 
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <>
     <NavBar/>
      <div className="min-h-screen w-full bg-green-50 flex items-start justify-center pt-32 px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-screen-xl">

          {/* Map Container */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-green-700 mb-2 text-center">🚛 Vehicle Tracking</h2>
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[60vh] rounded-lg overflow-hidden">
              <MapContainer
                center={[vehicleData.latitude, vehicleData.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full rounded-lg"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[vehicleData.latitude, vehicleData.longitude]}>
                  <Popup>
                    🚛 Garbage Truck ID: <strong>{vehicleData.id}</strong><br />
                    Status: <strong>{vehicleData.status}</strong><br />
                    Estimated Arrival: <strong>{vehicleData.arrivalTime}</strong>
                  </Popup>
                </Marker>
                <MapUpdater position={[vehicleData.latitude, vehicleData.longitude]} />
              </MapContainer>
            </div>
          </div>

          {/* Details Container */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-between min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:h-[60vh]">

              {/* Upcoming Vehicle Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-green-700">Upcoming Collection</h3>
                <p className="text-lg text-gray-700 mt-6">
                  🚛 Vehicle ID: <strong>{vehicleData.id}</strong>
                </p>
                <p className="text-lg text-gray-700">
                  🕒 Arrival Time: <strong>{vehicleData.arrivalTime}</strong>
                </p>
              </div>

              {/* Collection Status */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h4 className="text-md font-semibold text-green-800 mb-3">Collection Status</h4>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 ${getStatusColor('Scheduled')} rounded-full mb-1`}></div>
                    <span className="text-xs text-gray-600">Scheduled</span>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 ${getStatusColor('On the way')} rounded-full mb-1`}></div>
                    <span className="text-xs text-gray-600">On the way</span>
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 ${getStatusColor('Completed')} rounded-full mb-1`}></div>
                    <span className="text-xs text-gray-600">Completed</span>
                  </div>
                </div>
              </div>

              {/* Notification Status Message */}
              {notificationStatus && (
                <div className="text-center text-sm text-blue-600 mb-2">
                  {notificationStatus}
                </div>
              )}

              {/* Notify Button */}
              <button
                onClick={handleNotifyMe}
                className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition mb-4"
              >
                Notify Me <Bell className="w-4 h-4" />
              </button>

              {/* Message Box */}
              <div className="flex items-center bg-white border rounded-lg shadow-sm p-2">
                <input
                  type="text"
                  placeholder="Message"
                  className="flex-1 outline-none px-2 text-sm text-gray-700"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="text-green-700 hover:text-green-900 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default VehicleTracking;

