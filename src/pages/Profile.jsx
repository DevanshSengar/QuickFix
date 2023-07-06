import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import back from "../assets/goBack.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [name, setName] = useState(null);
  const [hostel, setHostel] = useState(null);
  const [room, setRoom] = useState(null);
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

  const isValid = () => {
    if (
      name === null ||
      name === "" ||
      hostel === null ||
      hostel === "" ||
      room === null ||
      room === ""
    ) {
      toast.warning("Please fill all the credentials.");
      return false;
    }
    if (room < 0 || room > 400) {
      toast.warning("Please enter a valid room.");
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (isValid()) {
      const data = { name: name, hostel: hostel, room: room };
      try {
        const response = await fetch(
          "https://quickfix-fuql.onrender.com/student/me",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        // console.log(1, response);
        // const res = await response.json();
        // console.log(2, res);
        if (response.status === 200) {
          toast.success("Profile Updated Successfully");
          localStorage.setItem("userName", name);
          localStorage.setItem("userHostel", hostel);
          localStorage.setItem("userRoom", room);
        } else {
          toast.error("Failed to update profile due to some error.");
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <nav className="nav-bar">
        <Link to={`/student/${localStorage.getItem("userId")}`}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button
          style={{
            backgroundColor: "#17c17b",
            color: "black",
            marginRight: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.9rem 1.5rem",
          }}
          onClick={() => {
            usenavigate(-1);
          }}
        >
          <img src={back} alt="Back_arrow" style={{ height: "1.3rem" }} />
          &nbsp; <p>Back</p>
        </button>
      </nav>

      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            color: "white",
            maxWidth: "38rem",
            margin: "auto",
            marginTop: "14rem",
            padding: "4rem 4.8rem",
            borderRadius: "3.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <div
            style={{
              fontWeight: 400,
              fontSize: "3rem",
              marginBottom: "2rem",
            }}
          >
            Manage Profile
          </div>

          <div style={{ width: "100%", margin: "1.2rem" }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={localStorage.getItem("userName")}
              required
            />
          </div>

          <div
            style={{
              width: "100%",
              margin: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {localStorage.getItem("userHostel") === "bh1" && (
              <div>
                <select
                  className="dropdown"
                  name="hostel"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                >
                  <option value="bh1">BH-1</option>
                  <option value="bh2">BH-2</option>
                  <option value="bh3">BH-3</option>
                  <option value="gh">GH</option>
                </select>
              </div>
            )}
            {localStorage.getItem("userHostel") === "gh" && (
              <div>
                <select
                  className="dropdown"
                  name="hostel"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                >
                  <option value="gh">GH</option>
                  <option value="bh1">BH-1</option>
                  <option value="bh2">BH-2</option>
                  <option value="bh3">BH-3</option>
                </select>
              </div>
            )}
            {localStorage.getItem("userHostel") === "bh2" && (
              <div>
                <select
                  className="dropdown"
                  name="hostel"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                >
                  <option value="bh2">BH-2</option>
                  <option value="bh1">BH-1</option>
                  <option value="bh3">BH-3</option>
                  <option value="gh">GH</option>
                </select>
              </div>
            )}
            {localStorage.getItem("userHostel") === "bh3" && (
              <div>
                <select
                  className="dropdown"
                  name="hostel"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                >
                  <option value="bh3">BH-3</option>
                  <option value="bh1">BH-1</option>
                  <option value="bh2">BH-2</option>
                  <option value="gh">GH</option>
                </select>
              </div>
            )}

            <div style={{ width: "28%" }}>
              <input
                type="number"
                name="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                min="1"
                max="400"
                step="1"
                placeholder={localStorage.getItem("userRoom")}
                required
              ></input>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              margin: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              style={{ width: "46%", backgroundColor: "#17c17b" }}
              onClick={handleUpload}
            >
              Update
            </button>

            <button
              style={{ width: "46%", backgroundColor: "#C31919" }}
              onClick={() => {
                localStorage.clear();
                toast.success("Log Out Successful");
                usenavigate("/");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
