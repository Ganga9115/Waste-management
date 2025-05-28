import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
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

    // Check for empty fields
    if (!fullName || !email || !mobile || !address || !pincode || !password) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      // API Call
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);

      // Optionally show a success toast or message
      setSuccessMessage("Signup successful! Redirecting to login...");
      
      // Redirect to login page after delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Create an EcoTrack Account</h2>

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
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-green-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-green-700">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-900 font-medium hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
