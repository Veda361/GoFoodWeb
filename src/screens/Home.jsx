import React from "react";
import Navbar from "../components/Navbar";
import Menu from "./Menu";
import Footer from "../components/Footer";
// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Menu />
      <Footer />
    </div>
  );
};

export default Home;
