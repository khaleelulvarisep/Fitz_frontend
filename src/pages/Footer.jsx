import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-sky-700 text-white py-8 mt-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
       
        <div>
          <h2 className="text-2xl font-bold mb-3">FiTz.</h2>
          <p className="text-gray-200">
            Discover the latest trends in fashion. Your style, your statement!
          </p>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-yellow-300 transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-yellow-300 transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-yellow-300 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300 transition text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-yellow-300 transition text-2xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-yellow-300 transition text-2xl">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      
      <div className="text-center mt-6 border-t border-sky-500 pt-4 text-gray-200 text-sm">
        © {new Date().getFullYear()} FiTz. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
