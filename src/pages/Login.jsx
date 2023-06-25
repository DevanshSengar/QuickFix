import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/login.css";

const Login = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  return (
    <div>
      {/* Navigation-bar */}
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
      {/* Navigation-bar */}

      <form className="login-container">
        <div className="selection login-group">
          <Link to="">
            <button
              onClick={() => handleButtonClick(1)}
              className={selectedButton === 1 ? "selectedUserLogin" : ""}
            >
              Admin
            </button>
          </Link>

          <Link to="">
            <button
              onClick={() => handleButtonClick(2)}
              className={selectedButton === 2 ? "selectedUserLogin" : ""}
            >
              Student
            </button>
          </Link>
        </div>

        <div className="login-group">
          <input type="email" id="email" placeholder="abc@gmail.com" required />
        </div>

        <div className="login-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="login-group">
          <Link to="">
            <button
              onClick={() => {
                // alert("Login successful");
              }}
              className="login-button"
              type="submit"
            >
              Log In
            </button>
          </Link>
          <p
            onClick={() => {
              alert("Yaad rakha kr na");
            }}
            className="forgot"
          >
            Forgot Password?
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
