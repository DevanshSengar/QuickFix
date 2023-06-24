import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import rlogo from "../assets/recentLOGO.png";
import clogo from "../assets/newComLOGO.png";
import plogo from "../assets/profileLOGO.png";
import Complaint from "../components/Complaint.jsx";

import "../styles/student.css";

const Student = () => {
  const [selectedButton, setSelectedButton] = useState(1);

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
        <img src={plogo} alt="Logo" className="plogo" />
      </nav>
      {/* Navigation-bar */}

      <div className="container">
        <div className="choices">
          <div>
            <h2 style={{ fontSize: "25px", fontWeight: 500 }}>Category</h2>
            <form>
              <label>
                <input type="checkbox" name="item" value="Item 1" />
                <p>Carpentary</p>
              </label>

              <label>
                <input type="checkbox" name="item" value="Item 2" />
                <p>Electrical</p>
              </label>

              <label>
                <input type="checkbox" name="item" value="Item 3" />
                <p>Plumbing</p>
              </label>
            </form>
          </div>

          <div>
            <h2 style={{ fontSize: "25px", fontWeight: 500 }}>State</h2>
            <form>
              <label>
                <input type="radio" name="item" value="Item 1" />
                <p>New</p>
              </label>

              <label>
                <input type="radio" name="item" value="Item 2" />
                <p>Accepted</p>
              </label>

              <label>
                <input type="radio" name="item" value="Item 3" />
                <p>Rejected</p>
              </label>

              <label>
                <input type="radio" name="item" value="Item 4" />
                <p>Done</p>
              </label>

              <label>
                <input type="radio" name="item" value="Item 5" />
                <p>Closed</p>
              </label>
            </form>
          </div>
        </div>

        <div className="com">
          <div className="com-container">
            <div className="com-header">
              <div>
                <button
                  style={{ borderRadius: "5rem 0 0 50rem" }}
                  onClick={() => handleButtonClick(1)}
                  className={
                    selectedButton === 1
                      ? "selectedUserLogin slanted-border"
                      : "slanted-border"
                  }
                >
                  <p>My Complaints</p>
                </button>
                <button
                  style={{ borderRadius: "0 50rem 5rem 0" }}
                  onClick={() => handleButtonClick(2)}
                  className={
                    selectedButton === 2
                      ? "selectedUserLogin slanted-border"
                      : "slanted-border"
                  }
                >
                  <p>Common Complaints</p>
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    margin: "0.8rem 0.5rem 0.3rem 0.5rem",
                    padding: "0.8rem 1.6rem",
                    backgroundColor: "#17c17b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={clogo} alt="Logo" className="clogo" />
                  <p>New Complaint</p>
                </button>
                <button
                  style={{
                    margin: "0.8rem 0.5rem 0.3rem 0.5rem",
                    padding: "0.8rem 1.6rem",
                    backgroundColor: "#425fc6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={rlogo} alt="Logo" className="rlogo" />
                  <p>Recent</p>
                </button>
              </div>
            </div>
            <div className="com-complaints">
              <Complaint />
              <Complaint />
              <Complaint />
              <Complaint />
              <Complaint />
              <Complaint />
              <Complaint />
              <Complaint />
              <Complaint />
              <Complaint />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
