
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setMessage("⚠️ Please enter both email and password");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login/",
      {
        email: email,
        password: password,
      }
    );

    // ✅ Store JWT tokens
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    setMessage("✅ Login successful!");
    toast.success("Login sussess.");

    setTimeout(() => {
      window.location.href = "/";
    }, 800);

  } catch (err) {
     const msg =
    err.response?.data?.detail ||
    err.response?.data?.error ||
    "Login failed. Please try again.";
    setMessage(`❌ ${msg}` );

   
  }
};


  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-sky-600 mb-6 text-center">Login</h2>

      {message && (
        <div
          className={`mb-4 text-center font-medium ${
            message.includes("successful")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link
          to="/signup"
          className="inline-block bg-gray-100 text-sky-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
