import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/signup.css";
import Login from "../pages/Login";

const Signup = () => {
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

  const [formData, setFormData] = useState(
    student
      ? {
          name: "",
          email: "",
          hostel: "",
          room: "",
          password: "",
          password2: "",
        }
      : {
          name: "",
          email: "",
          hostel: "",
          password: "",
          password2: "",
        }
  );

  // const { name, email, hostel, room, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [error, setError] = useState("");
  const baseURL = "http://192.168.69.167:8000";
  const [isRegister, setIsRegister] = useState(false);
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // if (!isEmail(formData.email)) {
    //   setError("Invalid email");
    //   return;
    // }
    // if (!isLength(formData.password, { min: 6 })) {
    //   setError("Password must be at least 6 characters");
    //   return;
    // }
    if (formData.password !== formData.password2) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${baseURL}/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res.data);
      const json = await res.json();
      console.log(json);
      if (res.status === 201) {
        setIsRegister(true);
        console.log("response recieved");
      } else if (res.status === 409) {
        setIsRegister(true);
        console.log("already registered");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  if (isRegister) {
    setTimeout(() => {
      <Login />;
    }, 2000);
  }

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

      <form className="signup-container">
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
        {student && (
          <div className="user-block">
            <div className="signup-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="signup-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                  value={formData.hostel}
                  onChange={handleChange}
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
                  value={formData.room}
                  onChange={handleChange}
                  min="1"
                  max="300"
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Set Password"
                required
              />
            </div>
            <div className="signup-group">
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="signup-group">
              <Link to="/user-student">
                <button
                  onClick={handleSubmit}
                  className="signup-button"
                  type="submit"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}

        {admin && (
          <div className="admin-block">
            <div className="signup-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="signup-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.hostel}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Set Password"
                required
              />
            </div>
            <div className="signup-group">
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="signup-group">
              <Link to="">
                <button className="signup-button" type="submit">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
