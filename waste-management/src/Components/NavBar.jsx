import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/"); // redirect to homepage
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

        {isLoggedIn && (
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="hover:text-green-800 transition focus:outline-none"
            >
              <UserCircle className="w-6 h-6" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md border">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
