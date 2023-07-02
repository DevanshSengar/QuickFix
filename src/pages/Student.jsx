import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import rlogo from "../assets/recentLOGO.png";
import clogo from "../assets/newComLOGO.png";
import Complaint from "../components/Complaint.jsx";
import ProfileNav from "../components/ProfileNav.jsx";
import "../styles/student.css";
import { toast } from "react-toastify";
// import axios from "axios";
// import { toast } from "react-toastify";

const Student = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState(null);
  const usenavigate = useNavigate();

  const isTokenExpired = () => {
    try {
      const expirationTime = Number(localStorage.getItem("expDate"));
      const currentTime = Date.now();
      if (
        expirationTime < currentTime ||
        localStorage.getItem("jwtToken") === null
      ) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  useEffect(() => {
    if (isTokenExpired()) {
      toast.error("Session Expired");
      localStorage.clear();
      usenavigate("/");
    }
  }, [usenavigate]);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem("jwtToken");
        let url = "";
        if (selectedButton === 1)
          url = "http://192.168.69.167:8000/complaint/my";
        else url = "http://192.168.69.167:8000/complaint/common";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          toast.error("Failed to fetch user complaints.");
          return;
        }

        const data = await response.json();
        // console.log(data);
        if (data !== null) setLoading(true);
        setComplaints(data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchData();
  }, [selectedButton]);

  return (
    <div>
      {/* Navigation-bar */}
      <ProfileNav />
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
                <input type="checkbox" name="item" value="Item 1" />
                <p>New</p>
              </label>

              <label>
                <input type="checkbox" name="item" value="Item 2" />
                <p>Accepted</p>
              </label>

              <label>
                <input type="checkbox" name="item" value="Item 3" />
                <p>Rejected</p>
              </label>

              <label>
                <input type="checkbox" name="item" value="Item 4" />
                <p>Done</p>
              </label>

              <label>
                <input type="checkbox" name="item" value="Item 5" />
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
                <Link to={"/newComplaint"}>
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
                </Link>

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
              {loading &&
                complaints.map((complaint) => (
                  <Complaint key={complaint.id} objectProp={complaint} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
