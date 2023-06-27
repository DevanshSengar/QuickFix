import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";
import SignupNav from "../components/SignupNav.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [student, setStudent] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [type, setType] = useState("student");

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

  const usenavigate = useNavigate();

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
        const postResponse = await fetch("http://192.168.69.167:8000/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(inputObj),
        });
        console.log(1, postResponse);
        const json = await postResponse.json();
        console.log(2, json);

        if (postResponse.status === 200) {
          toast.success("Login Successful");
          const jwtToken = json.access_token;
          localStorage.setItem("jwtToken", jwtToken);

          const getResponse = await fetch(
            "http://192.168.69.167:8000/student/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          // console.log(3, getResponse);
          const data = await getResponse.json();
          const userId = data.id;

          localStorage.setItem("userId", userId);
          if (student) {
            usenavigate(`/student/${userId}`);
          } else {
            usenavigate(`/admin/${userId}`);
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
        toast.error("Login Failed due to :" + error.message);
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
          <p
            onClick={() => {
              alert("Yaad rakha kr na");
            }}
            className="forgot"
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
