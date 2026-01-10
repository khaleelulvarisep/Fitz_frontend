
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields");
      return;
    }

    if (name.length < 3) {
      setMessage(" Name must be at least 3 characters long");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        " Password must be at least 6 characters and include a number & special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage(" Passwords do not match");
      return;
    }

    try {
      
      const newUser = { 
        name, 
        email, 
        password, 
        isAdmin:false,
        cart: [], 
        wishlist: [] 
      };

      // await axios.post("http://localhost:5000/users", newUser);
      await axios.post("http://localhost:8000/api/auth/register/", {
  name: name,
  email: email,
  password: password,
  confirm_password: confirmPassword
});//neww

      setMessage("✅ User registered successfully!");

     
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage(" Error registering user");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-sky-600 mb-6 text-center">
        Register
      </h2>

      {message && (
        <div className="mb-4 text-center text-red-600 font-medium">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        
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

        
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        
        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

