import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import rlogo from "../assets/recentLOGO.png";
import clogo from "../assets/newComLOGO.png";
import Complaint from "../components/Complaint.jsx";
import ProfileNav from "../components/ProfileNav.jsx";
import "../styles/student.css";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const Student = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState(null);
  const [filteredComplaints, setFilteredComplaints] = useState(null);
  // category
  const [carpentary, setCarpentary] = useState(true);
  const [electrical, setElectrical] = useState(true);
  const [plumbing, setPlumbing] = useState(true);
  // states
  const [newc, setNewc] = useState(true);
  const [accepted, setAccepted] = useState(true);
  const [rejected, setRejected] = useState(true);
  const [done, setDone] = useState(true);
  const [closed, setClosed] = useState(true);

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
          url = "https://quickfix-fuql.onrender.com/complaint/my";
        else url = "https://quickfix-fuql.onrender.com/complaint/common";

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
        // console.log(1, data);
        if (data !== null) {
          setLoading(true);
          setComplaints(data);
          setFilteredComplaints(data);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchData();
  }, [selectedButton]);

  useEffect(() => {
    if (loading) {
      let cat = [];
      if (carpentary) cat.push("carpentry");
      if (electrical) cat.push("electrical");
      if (plumbing) cat.push("plumbing");

      let stat = [];
      if (newc) stat.push("new");
      if (accepted) stat.push("accepted");
      if (rejected) stat.push("rejected");
      if (closed) stat.push("closed");
      if (done) stat.push("done");

      let newList = [];
      for (let i of complaints) {
        if (cat.includes(i.category) && stat.includes(i.state)) newList.push(i);
      }
      console.log(2, newList);
      setFilteredComplaints(newList);
    }
  }, [
    loading,
    complaints,
    carpentary,
    electrical,
    plumbing,
    newc,
    accepted,
    rejected,
    done,
    closed,
  ]);

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
              <div className="filter">
                <input
                  className="check"
                  type="checkbox"
                  value="Item 1"
                  checked={carpentary}
                  onChange={() => {
                    setCarpentary(!carpentary);
                  }}
                />
                <p style={{ paddingLeft: "0.5rem" }}>Carpentary</p>
              </div>

              <div className="filter">
                <input
                  className="check"
                  type="checkbox"
                  value="Item 2"
                  checked={electrical}
                  onChange={() => {
                    setElectrical(!electrical);
                  }}
                />
                <p style={{ paddingLeft: "0.5rem" }}>Electrical</p>
              </div>

              <div className="filter">
                <input
                  className="check"
                  type="checkbox"
                  value="Item 3"
                  checked={plumbing}
                  onChange={() => {
                    setPlumbing(!plumbing);
                  }}
                />
                <p style={{ paddingLeft: "0.5rem" }}>Plumbing</p>
              </div>
            </form>
          </div>

          <div>
            <h2 style={{ fontSize: "25px", fontWeight: 500 }}>State</h2>
            <form>
              <div className="filter">
                <input
                  className="check"
                  type="checkbox"
                  value="Item 1"
                  checked={newc}
                  onChange={() => {
                    setNewc(!newc);
                  }}
                />
                <p style={{ paddingLeft: "0.5rem" }}>New</p>
              </div>

              <div className="filter">
                <input
                  className="check"
                  type="checkbox"
                  value="Item 2"
                  checked={accepted}
                  onChange={() => {
                    setAccepted(!accepted);
                  }}
                />
                <p style={{ paddingLeft: "0.5rem" }}>Accepted</p>
              </div>

              <div className="filter">
                <input
                  // onChange={}
                  className="check"
                  type="checkbox"
                  value="Item 3"
                  checked={rejected}
                  onChange={() => {
                    setRejected(!rejected);
                  }}
                />
                <p style={{ paddingLeft: "0.5rem" }}>Rejected</p>
              </div>

              <div className="filter">
                <input
                  className="check"
                  type="checkbox"
                  value="Item 4"
                  checked={done}
                  onChange={() => {
                    setDone(!done);
                  }}
                />
                <p style={{ paddingLeft: "0.5rem" }}>Done</p>
              </div>

              <div className="filter">
                <input
                  className="check"
                  type="checkbox"
                  value="Item 5"
                  checked={closed}
                  onChange={() => {
                    setClosed(!closed);
                  }}
                />
                <p style={{ paddingLeft: "0.5rem" }}>Closed</p>
              </div>
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
                filteredComplaints.map((complaint) => (
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
