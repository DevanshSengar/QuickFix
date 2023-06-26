import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function LoginNav() {
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <div className="nav-buttons">
        <Link to="/login">
          <button className="nav-login">Log In</button>
        </Link>
      </div>
    </nav>
  );
}
