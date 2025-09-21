import React from "react";
// import Navbar from "../components/Navbar";
import Menu from "./Menu";
import Footer from "../components/Footer";
// import { Link } from "react-router-dom";

const Home = ({ cartIconRef }) => {
  return (
    <div>
      {/* <Navbar /> */}
      <Menu cartIconRef={cartIconRef} />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
