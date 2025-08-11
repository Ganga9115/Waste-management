import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const roleFromUrl = queryParams.get("role");

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!roleFromUrl) {
      navigate("/choose-role");
    }
  }, [roleFromUrl, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        ...formData,
        role: roleFromUrl, 
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", roleFromUrl);

      if (roleFromUrl === "admin") {
        navigate("/municipality-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-6 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          {roleFromUrl === "admin" ? "Municipality Login" : "User Login"}
        </h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-green-700 font-medium">
              Email or Mobile Number
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter email or mobile number"
            />
          </div>

          <div>
            <label className="block mb-1 text-green-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don''t have an account?{" "}
          <Link
            to={`/signup?role=${roleFromUrl}`} 
            className="text-green-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
