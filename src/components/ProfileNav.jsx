import React from "react";
import logo from "../assets/logo.png";
import plogo from "../assets/profileLOGO.png";
import { Link } from "react-router-dom";

export default function ProfileNav() {
  return (
    <nav className="nav-bar">
      <Link to={`/student/${localStorage.getItem("userId")}`}>
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <Link to={`/profile/${localStorage.getItem("userId")}`}>
        <img src={plogo} alt="Logo" className="plogo" />
      </Link>
    </nav>
  );
}
