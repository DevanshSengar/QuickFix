import React, { useState, useEffect } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    sessionStorage.clear();
  }, []);

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

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = { email: email, password: password, type: type };
      console.log(inputobj);

      fetch("http://192.168.69.167:8000/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error("Login failed, invalid credentials");
          } else {
            toast.success("Login Successful");
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("jwttoken", resp.jwtToken);
            if (student) {
              usenavigate("/user-student");
            } else {
              usenavigate("/user-admin");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  return (
    <div>
      {/* Navigation-bar */}
      <SignupNav />
      {/* Navigation-bar */}

      <form className="login-container">
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
      </form>
    </div>
  );
};

export default Login;
