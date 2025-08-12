import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleFromUrl = queryParams.get("role");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!roleFromUrl) {
      navigate("/choose-role");
    }
  }, [roleFromUrl, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, mobile, address, pincode, password } = formData;

    if (!fullName || !email || !mobile || !address || !pincode || !password) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        ...formData,
        role: roleFromUrl,
      });

      setSuccessMessage("Signup successful! Redirecting to login...");

      setTimeout(() => {
        navigate(`/login?role=${roleFromUrl}`);
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {/* ✅ UPDATED: Changed 'admin' to 'municipality' for display */}
          {roleFromUrl === "municipality" ? "Municipality Sign Up" : "User Sign Up"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-800 px-4 py-2 mb-4 rounded-md text-sm text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-green-700">
          Already have an account?{" "}
          <span onClick={() => navigate(`/login?role=${roleFromUrl}`)} className="text-green-900 font-medium hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}