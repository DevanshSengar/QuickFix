import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function SignupNav() {
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <div className="nav-buttons">
        <Link to="/signup">
          <button className="nav-signup">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}
