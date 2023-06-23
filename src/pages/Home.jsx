import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/home.css";

const Home = () => {
  return (
    <div>
      <nav className="nav-bar">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="nav-buttons">
          <Link to="/login">
            <button className="nav-login">Log In</button>
          </Link>

          <Link to="/signup">
            <button className="nav-signup">Sign Up</button>
          </Link>
        </div>
      </nav>

      <div className="home-container">
        <h1 className="heading">Welcome</h1>
        <p className="paragraph">
          Submit your feedback to improve our campus infrastructure for a better
          college experience.
        </p>
      </div>
    </div>
  );
};

export default Home;
