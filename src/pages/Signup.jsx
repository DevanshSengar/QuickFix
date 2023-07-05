import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { toast } from "react-toastify";
import LoginNav from "../components/LoginNav.jsx";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [student, setStudent] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwtToken") !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const usenavigate = useNavigate();

  if (isLoggedIn) {
    usenavigate(`/student/${localStorage.getItem("userId")}`);
    return null;
  }

  function handleStudent() {
    setStudent(true);
    setAdmin(false);
  }

  function handleAdmin() {
    setAdmin(true);
    setStudent(false);
  }

  const IsValidate = () => {
    if (
      name === null ||
      name === "" ||
      email === null ||
      email === "" ||
      hostel === null ||
      hostel === "" ||
      (student && (room === null || room === "")) ||
      password === null ||
      password === ""
    ) {
      toast.warning("Please fill all the credentials.");
      return false;
    }
    if (student && (room < 0 || room > 400)) {
      toast.warning("Please enter a valid room.");
      return false;
    }
    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return false;
    }
    if (password !== password2) {
      setPassword("");
      setPassword2("");
      toast.warning("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (student) {
      const formData = { name, email, hostel, room, password };
      if (IsValidate()) {
        // console.log(formData);
        try {
          const response = await fetch(
            "https://quickfix-fuql.onrender.com/student",
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(formData),
            }
          );
          // console.log(1, response);
          const result = await response.json();
          // console.log(2, result);

          if (response.status === 201) {
            toast.success("Registered successfully.");
            usenavigate("/emailVerification");
            return;
          }
          if (response.status === 422) {
            toast.error("Use Institute Email Only");
            return;
          }
          if (response.status === 409) {
            toast.error(result.detail);
            return;
          }
        } catch (err) {
          console.log(err);
          toast.error("Failed :" + err);
        }
      }
    }
    if (admin) {
      const formData = { name, email, hostel, password };
      if (IsValidate()) {
        // console.log(formData);
        try {
          const response = await fetch(
            "https://quickfix-fuql.onrender.com/admin",
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(formData),
            }
          );
          // console.log(1, response);
          const result = await response.json();
          // console.log(2, result);

          if (response.status === 201) {
            toast.success("Registered successfully.");
            usenavigate("/emailVerification");
            return;
          }
          if (response.status === 422) {
            toast.error("Validation Error");
            return;
          }
          if (response.status === 409) {
            toast.error(result.detail);
            return;
          }
        } catch (err) {
          console.log(err);
          toast.error("Failed :" + err);
        }
      }
    }
  };

  return (
    <div>
      {/* Navigation-bar */}
      <LoginNav />
      {/* Navigation-bar */}

      <form className="signup-container">
        {/* User select */}
        <div className="signup-group selection">
          <Link to="">
            <button onClick={handleAdmin} className={admin ? "selectUser" : ""}>
              Admin
            </button>
          </Link>

          <Link to="">
            <button
              onClick={handleStudent}
              className={student ? "selectUser" : ""}
            >
              Student
            </button>
          </Link>
        </div>
        {/* User select */}

        {/* Student Block */}
        {student && (
          <div className="user-block">
            <div className="signup-group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="signup-group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. bcs_2021023@iiitm.ac.in"
                required
              />
            </div>

            <div
              className="signup-group"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <select
                  className="dropdown"
                  name="hostel"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                >
                  <option value="">Hostel</option>
                  <option value="bh1">BH-1</option>
                  <option value="bh2">BH-2</option>
                  <option value="bh3">BH-3</option>
                  <option value="gh">GH</option>
                </select>
              </div>

              <div style={{ width: "28%" }}>
                <input
                  type="number"
                  name="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  min="1"
                  max="350"
                  step="1"
                  placeholder="Room"
                  required
                ></input>
              </div>
            </div>

            <div className="signup-group">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set Password"
                required
              />
            </div>

            <div className="signup-group">
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="signup-group">
              <button
                className="signup-button"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
        {/* Student Block */}

        {/* Admin block */}
        {admin && (
          <div className="admin-block">
            <div className="signup-group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="signup-group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. bcs_2021023@iiitm.ac.in"
                required
              />
            </div>

            <div
              className="signup-group"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <select
                className="dropdown"
                name="hostel"
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
              >
                <option value="">Location</option>
                <option value="bh1">BH-1</option>
                <option value="bh2">BH-2</option>
                <option value="bh3">BH-3</option>
                <option value="gh">GH</option>
              </select>
            </div>

            <div className="signup-group">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Set Password"
                required
              />
            </div>

            <div className="signup-group">
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="signup-group">
              <button
                className="signup-button"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
        {/* Admin block */}
      </form>
    </div>
  );
};

export default Signup;
