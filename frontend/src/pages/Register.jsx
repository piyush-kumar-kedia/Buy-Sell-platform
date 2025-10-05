import React, { useState } from "react";
import { registerUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await registerUser(form); // JWT cookie set automatically
      setMessage("✅ Registration successful! Logging in...");

      // Redirect to home
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setMessage(err.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white border rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        🚀 Register
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Username */}
        <div className="flex items-center border border-gray-300 p-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <User size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full outline-none p-2"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-300 p-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <Mail size={20} className="text-gray-400 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full outline-none p-2"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border border-gray-300 p-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 relative">
          <Lock size={20} className="text-gray-400 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full outline-none p-2 pr-10"
          />
          {/* Eye Icon */}
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center border border-gray-300 p-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <Phone size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            name="phone"
            placeholder="Phone (Optional)"
            value={form.phone}
            onChange={handleChange}
            className="w-full outline-none p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
        >
          {loading ? "⏳ Registering..." : "✨ Register"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-5 text-center font-medium ${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
