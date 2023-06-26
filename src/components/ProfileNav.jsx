import React from "react";
import logo from "../assets/logo.png";
import plogo from "../assets/profileLOGO.png";
import { Link } from "react-router-dom";

export default function ProfileNav() {
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <img src={plogo} alt="Logo" className="plogo" />
    </nav>
  );
}
