import React from "react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import CartProvider from "./components/ContextReducer.jsx";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
