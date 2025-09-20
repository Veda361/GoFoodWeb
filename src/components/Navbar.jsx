import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer.jsx";
import "../index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const cartCount = cart.reduce((sum, it) => sum + (Number(it.qty) || 1), 0);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div style={{ fontFamily: "Poppins, sans-serif" }} className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-3xl font-extrabold tracking-wide flex items-center">
          <span className="text-yellow-400">Go</span>
          <span className="text-white">Food</span>
          <span className="ml-2 text-sm bg-yellow-400 text-black px-2 py-0.5 rounded-full">🍴</span>
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden focus:outline-none">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <ul
          className={`lg:flex lg:space-x-6 absolute lg:static left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? "top-14" : "top-[-400px]"
          }`}
        >
          <li>
            <Link to="/PersonalisedHome" className="block px-4 py-2 transition hover:text-yellow-400">Home</Link>
          </li>

          {localStorage.getItem("authToken") ? (
            <>
              <li>
                <Link to="/myOrders" className="block px-4 py-2 transition hover:text-yellow-400">
                  My Orders
                </Link>
              </li>
              <li className="lg:ml-4 lg:border-l lg:border-gray-700 lg:pl-4 flex items-center">
                <Link to="/mycart" className="relative gradient-btn">
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-xs font-bold text-black">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="lg:ml-4 lg:border-l lg:border-gray-700 lg:pl-4">
                <button className="gradient-btn" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li className="lg:ml-4 lg:border-l lg:border-gray-700 lg:pl-4 flex space-x-4">
              <Link to="/login" className="gradient-btn">Login</Link>
              <Link to="/createUser" className="gradient-btn">Signup</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
