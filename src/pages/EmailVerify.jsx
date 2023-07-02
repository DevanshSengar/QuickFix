import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupNav from "../components/SignupNav";
import { toast } from "react-toastify";

const EmailVerify = () => {
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

  const email = localStorage.getItem("email");

  const handleVerification = async () => {
    try {
      const response = await fetch("http://192.168.69.167:8000/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      console.log(3, response);
      const result = await response.json();
      console.log(4, result);
      if (response.status === 200) {
        toast.success("Verification mail has been sent");
        return;
      }
      if (response.status === 404) {
        toast.error(result.detail);
        return;
      }
      if (response.status === 409) {
        toast.error(result.detail);
        return;
      }
      if (response.status === 422) {
        toast.error("Email not provided...Please register first.");
        return;
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      <SignupNav />
      <div
        className="home-container"
        style={{ maxWidth: "40rem", height: "22rem", padding: "3rem 3.5rem" }}
      >
        <p className="paragraph">
          A mail has been sent to your {email} for verification.
        </p>
        <div style={{ width: "100%", padding: "2rem 0 0 0" }}>
          <Link to={"/login"}>
            <button className="login-button">Log In</button>
          </Link>
          <p
            style={{
              fontSize: "1.2rem",
              textAlign: "start",
              padding: "1rem 0 0 1rem",
              cursor: "pointer",
            }}
            onClick={handleVerification}
          >
            Not Received? Resend!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
