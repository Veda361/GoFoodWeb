import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../index.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
 

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div
        style={{ fontFamily: "Poppins, sans-serif" }}
        className="container mx-auto flex items-center justify-between px-4 py-3"
      >
        {/* Brand Logo */}
        <Link
          to="#"
          className="text-3xl font-extrabold tracking-wide flex items-center"
        >
          <span className="text-yellow-400">Go</span>
          <span className="text-white">Food</span>
          <span className="ml-2 text-sm bg-yellow-400 text-black px-2 py-0.5 rounded-full">
            🍴
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navbar Links */}
        <ul
          className={`lg:flex lg:space-x-6 absolute lg:static left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? "top-14" : "top-[-400px]"
            }`}
        >
          <li>
            <Link
              to="/home"
              className="block px-4 py-2 hover:text-yellow-400 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:text-yellow-400 transition"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:text-yellow-400 transition"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:text-yellow-400 transition"
            >
              About
            </Link>
          </li>
          {(localStorage.getItem("authToken")) ?
            <li>
              <Link
                to="/myOrders"
                className="block px-4 py-2 hover:text-yellow-400 transition">
                My Orders
              </Link>
            </li>
            : ""}
          {(!localStorage.getItem("authToken")) ?
            <div>
              <li className="lg:ml-4 lg:border-l lg:border-gray-700 lg:pl-4 flex space-x-4">
                <Link
                  to="/login"
                  className="gradient-btn"
                >
                  Login
                </Link>

                <Link
                  to="/createUser"
                  className="gradient-btn"
                >
                  Signup
                </Link>
              </li>
            </div>
            :
            <div className="flex gap-2">
              <li className="lg:ml-4 lg:border-l lg:border-gray-700 lg:pl-4 flex space-x-4">
                <Link
                  to="/mycart"
                  className="gradient-btn">
                  Cart
                </Link>
              </li>
            <div>
              <li className="lg:ml-4 lg:border-l lg:border-gray-700 lg:pl-4 flex space-x-4">
                <Link
                  to="/##"
                  className="gradient-btn" onClick={() => { localStorage.removeItem("authToken"); window.location.to = "/login"; }}>
                  Log Out 
                </Link>
              </li>
            </div>
            </div>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
