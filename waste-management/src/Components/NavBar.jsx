import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react"; // Import profile icon

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Replace "token" with whatever key you store in localStorage after login
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-700">EcoTrack</h1>
      
      <ul className="flex items-center space-x-6 text-green-700 font-medium">
        <li><a href="#section1" className="hover:text-green-900">Home</a></li>
        <li><Link to="/vehicle-track" className="hover:text-green-600 transition">Track</Link></li>
        <li><Link to="/bin-reporting" className="hover:text-green-600 transition">Report</Link></li>
        <li><Link to="/adopt-bin" className="hover:text-green-600 transition">AdoptBin</Link></li>
        <li><Link to="/specialized-pickup" className="hover:text-green-600 transition">SpecialPickUp</Link></li>
        <li><Link to="/educational-resources" className="hover:text-green-600 transition">Resources</Link></li>

        {/* Conditionally show profile icon */}
        {isLoggedIn && (
          <li>
            <Link to="/dashboard" className="hover:text-green-800 transition">
              <UserCircle className="w-6 h-6" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
