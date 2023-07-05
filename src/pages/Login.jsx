import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";
import SignupNav from "../components/SignupNav.jsx";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [student, setStudent] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [type, setType] = useState("student");

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
    setType("student");
  }

  function handleAdmin() {
    setAdmin(true);
    setStudent(false);
    setType("admin");
  }

  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please Enter Email");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  const proceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      let inputObj = { email: email, password: password, type: type };
      try {
        const postResponse = await fetch(
          "https://quickfix-fuql.onrender.com/login",
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(inputObj),
          }
        );
        // console.log(1, postResponse);
        const json = await postResponse.json();
        // console.log(2, json);

        if (postResponse.status === 200) {
          toast.success("Login Successful");
          const jwtToken = json.access_token;
          localStorage.setItem("jwtToken", jwtToken);
          const min = json.exp;
          const currentDate = new Date();
          const expDate = currentDate.setMinutes(
            currentDate.getMinutes() + min
          );
          localStorage.setItem("expDate", expDate);

          let getResponse = null;
          try {
            getResponse = await fetch(
              "https://quickfix-fuql.onrender.com/student/me",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (getResponse.status !== 200) {
              toast.error("Unexpected error occurred");
              return;
            }
            // console.log(3, getResponse);
          } catch (err) {
            console.log(err);
            toast.error("Failed to fetch user data.");
            return;
          }
          const data = await getResponse.json();

          localStorage.setItem("userId", data.id);
          localStorage.setItem("userName", data.name);
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("userHostel", data.hostel);
          localStorage.setItem("userRoom", data.room);

          if (student) {
            // console.log("hello");
            usenavigate(`/student/${data.id}`);
          } else {
            usenavigate(`/admin/${data.id}`);
          }
        }
        if (postResponse.status === 401) {
          toast.warning("Email is not verified.");
          return;
        }
        if (postResponse.status === 403 || postResponse.status === 422) {
          toast.warning("Invalid Credentials");
          return;
        }
      } catch (error) {
        console.log(error);
        toast.error("Login Failed: " + error.message);
      }
    }
  };

  return (
    <div>
      {/* Navigation-bar */}
      <SignupNav />
      {/* Navigation-bar */}
      <div className="login-container">
        <div className="selection login-group">
          <button
            onClick={handleAdmin}
            className={admin ? "selectedUserLogin" : ""}
          >
            Admin
          </button>

          <button
            onClick={handleStudent}
            className={student ? "selectedUserLogin" : ""}
          >
            Student
          </button>
        </div>

        <div className="login-group">
          <input
            type="email"
            name="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="login-group">
          <button onClick={proceedLogin} className="login-button" type="submit">
            Log In
          </button>
          <Link to={"/forgotPassword"}>
            <p className="forgot">Forgot Password?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
