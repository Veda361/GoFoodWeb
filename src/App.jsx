import React, { useRef } from "react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import CartProvider from "./components/ContextReducer.jsx";
import MyCart from "./components/MyCart.jsx";
import MyOrders from "./screens/MyOrders.jsx";
import PersonalizedHome from "./components/PersonalizedHome.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const cartIconRef = useRef(null);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          {/* Mount Navbar once and share ref upward */}
          <Navbar setCartIconRef={(r) => (cartIconRef.current = r?.current || r)} />
          <Routes>
            <Route path="/" element={<Home cartIconRef={cartIconRef} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/mycart" element={<MyCart />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/PersonalisedHome" element={<PersonalizedHome />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
