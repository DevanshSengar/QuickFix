import React from "react";
import { Link } from "react-router-dom";
import SignupNav from "../components/SignupNav";

const EmailVerify = () => {
  return (
    <div>
      <SignupNav />
      <div className="home-container" style={{ maxWidth: "35rem" }}>
        <p className="paragraph">
          A mail has been sent to your email for verification.
        </p>
        <Link to={"/login"} style={{ width: "100%", padding: "0 1.5rem" }}>
          <button className="login-button">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default EmailVerify;
