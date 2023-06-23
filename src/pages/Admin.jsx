import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/admin.css";

const Admin = () => {
  return (
    <div>
      {/* Navigation-bar */}
      <nav className="nav-bar">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </nav>
      {/* Navigation-bar */}
    </div>
  );
};

export default Admin;
