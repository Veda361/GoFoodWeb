import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          className={`lg:flex lg:space-x-6 absolute lg:static left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? "top-14" : "top-[-400px]"
          }`}
        >
          <li>
            <Link
              to="#"
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
          <li>
            <Link
              to="/login"
              className="ml-4 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition block text-center"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
