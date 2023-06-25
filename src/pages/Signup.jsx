import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/signup.css";
import { toast } from "react-toastify";
// import Login from "../pages/Login";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (room === null || room === "") {
      isproceed = false;
      errormessage += " Hostel";
    }
    if (hostel === null || hostel === "") {
      isproceed = false;
      errormessage += " Hostel";
    }
    if (name === null || name === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else if (password !== password2) {
      isproceed = false;
      toast.warning("Password is not Confirmed");
    }
    // else {
    //   if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
    //   } else {
    //     isproceed = false;
    //     toast.warning("Please enter the valid email");
    //   }
    // }
    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student) {
      const formData = { name, email, hostel, room, password };
      if (IsValidate()) {
        console.log(formData);
        fetch("http://192.168.69.167:8000/student", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((res) => {
            console.log(res);
            toast.success("Registered successfully.");
            navigate("/login");
          })
          .catch((err) => {
            toast.error("Failed :" + err.message);
          });
      }
    }
    if (admin) {
      const formData = { name, email, hostel, password };
      if (IsValidate()) {
        console.log(formData);
        fetch("http://192.168.69.167:8000/admin", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((res) => {
            console.log(res);
            toast.success("Registered successfully.");
            navigate("/login");
          })
          .catch((err) => {
            toast.error("Failed :" + err.message);
          });
      }
    }
    // console.log(formData);
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
              <Link to="">
                <button
                  className="signup-button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </Link>
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
              <Link to="">
                <button
                  className="signup-button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}
        {/* Admin block */}
      </form>
    </div>
  );
};

export default Signup;
