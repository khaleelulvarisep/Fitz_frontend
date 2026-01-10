

import React, { useState } from "react";
import "../App.css"
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      
        <div className="text-2xl font-bold text-sky-600">
          <Link to="/">FiTz.</Link>
        </div>

   
        <ul className="hidden md:flex flex-1 justify-center space-x-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-sky-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-sky-600">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="hover:text-sky-600">
              Wishlist
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-sky-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-sky-600">
              Contact
            </Link>
          </li>
            {user?.isAdmin && (
              <li>
          <Link
            to="/admin"
            className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
          >
            Admin
          </Link>
          </li>
        )}
        
        </ul>

      
        {user? (
          <button
            onClick={() => navigate("/user")}
            className=" ml-4 w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow-md hover:bg-blue-700 transition"
          >
            {user.name? user.name[0].toUpperCase() : "?"}
          </button>
        ):<button 
               onClick={()=>{navigate('/login')}}
              className="flex bg-sky-600 text-white py-2 px-2 rounded">Login/signUp</button>}

 
        <div
          className="md:hidden text-2xl text-sky-600 cursor-pointer ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-sky-50 border-t border-sky-200 px-6 py-4 space-y-4">
          <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-sky-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-sky-600">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-sky-600">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-sky-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-sky-600">
                Contact
              </Link>
            </li>
            {user && (
              <li>
                <button
                  onClick={() => navigate("/user")}
                  className="hover:text-sky-600"
                >
                 Settings
                </button>
              </li>
            )}
             {user?.isAdmin && (
              <li>
          <Link
            to="/admin"
            className="hover:text-sky-600"
          >
            Admin
          </Link>
          </li>
        )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;


