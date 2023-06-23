import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/signup.css";

const Signup = () => {
  const [user, setuser] = useState(false);
  const [admin, setadmin] = useState(true);

  function handleUser() {
    setuser(true);
    setadmin(false);
  }
  function handleAdmin() {
    setadmin(true);
    setuser(false);
  }

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      {/* Navigation-bar */}
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
      {/* Navigation-bar */}

      <div className="signup-container">
        <div className="signup-group selection">
          <Link to="">
            <button
              onClick={handleAdmin}
              className={admin ? "selectedUserSignup" : ""}
            >
              Admin
            </button>
          </Link>

          <Link to="">
            <button
              onClick={handleUser}
              className={user ? "selectedUserSignup" : ""}
            >
              Student
            </button>
          </Link>
        </div>
        <div className="signup-group">
          <input type="text" id="name" placeholder="Full Name" required />
        </div>
        <div className="signup-group">
          <input type="email" id="email" placeholder="abc@gmail.com" required />
        </div>
        {user && (
          <div className="signup-group selection">
            <div>
              <select
                className="dropdown"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                {/* <option value="">Location</option> */}
                <option value="option1">BH-1</option>
                <option value="option2">BH-2</option>
                <option value="option3">BH-3</option>
                <option value="option4">GH</option>
              </select>
            </div>

            <div style={{ width: "28%" }}>
              <input
                type="number"
                id="room"
                min="1"
                max="300"
                step="1"
                placeholder="Room"
                required
              ></input>
            </div>
          </div>
        )}

        {admin && (
          <div
            className="signup-group selection"
            style={{ justifyContent: "space-evenly" }}
          >
            <div>
              <select
                className="dropdown"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                {/* <option value="">Location</option> */}
                <option value="option1">BH-1</option>
                <option value="option2">BH-2</option>
                <option value="option3">BH-3</option>
                <option value="option4">GH</option>
              </select>
            </div>
          </div>
        )}
        <div className="signup-group">
          <input
            type="password"
            id="password1"
            placeholder="Password"
            required
          />
        </div>
        <div className="signup-group">
          <input
            type="password"
            id="password2"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="signup-group">
          <Link to="">
            <button
              onClick={() => {
                alert("Sign Up successful");
              }}
              className="signup-button"
              type="submit"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
