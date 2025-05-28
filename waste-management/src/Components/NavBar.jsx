import React from "react";
import {Link} from 'react-router-dom'
const Navbar = () => (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-700">EcoTrack</h1>
      <ul className="flex space-x-6 text-green-700 font-medium">
        <li><a href="#section1" className="hover:text-green-900">Home</a></li>
        <Link to="/vehicle-track" className="hover:text-green-600 transition">
            Track
          </Link>
          <li>
          <Link to="/bin-reporting" className="hover:text-green-600 transition">
            Report
          </Link>
        </li>
        <li>
          <Link to="/educational-resources" className="hover:text-green-600 transition">
            Resources
          </Link>
        </li>
      </ul>
    </nav>
  );

  export default Navbar;