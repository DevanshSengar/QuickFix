import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/home.css";

const Home = () => {
  const usenavigate = useNavigate();
  let abc = localStorage.getItem("jwtToken");
  // console.log(abc);
  useEffect(() => {
    if (abc !== null) {
      usenavigate(`/student/${localStorage.getItem("userId")}`);
    }
  }, [abc, usenavigate]);
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
