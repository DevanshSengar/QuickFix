import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/login.css";

const Login = () => {
  const [student, setStudent] = useState(true);
  const [admin, setAdmin] = useState(false);

  function handleStudent() {
    setStudent(true);
    setAdmin(false);
  }
  function handleAdmin() {
    setAdmin(true);
    setStudent(false);
  }

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
              onClick={handleAdmin}
              className={admin ? "selectedUserLogin" : ""}
            >
              Admin
            </button>
          </Link>

          <Link to="">
            <button
              onClick={handleStudent}
              className={student ? "selectedUserLogin" : ""}
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
