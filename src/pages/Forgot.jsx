import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginNav from "../components/LoginNav";
import OtpInput from "../components/OTPinput";
import { toast } from "react-toastify";

const Forgot = () => {
  const [sendOtp, setSendOtp] = useState(true);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [last, setLast] = useState(false);

  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [student, setStudent] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [type, setType] = useState("student");
  const [passwordToken, setPasswordToken] = useState("");

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

  let finalOtp = "";
  const handleOtpComplete = (otp) => {
    finalOtp = otp;
    // console.log(finalOtp);
  };

  const handleResendOTP = async () => {
    try {
      const postResponse = await fetch(
        "http://192.168.69.167:8000/password/send-otp",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: email, type: type }),
        }
      );
      if (postResponse.status === 200) {
        toast.success("OTP has been sent again.");
        return;
      }
      if (postResponse.status === 404) {
        toast.warning("Account with this email does not exists");
        return;
      }
      if (postResponse.status === 422) {
        toast.warning("Invalid Email");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (email === "" || email === null) {
      toast.warning("Please enter the email.");
      return;
    }
    try {
      const postResponse = await fetch(
        "http://192.168.69.167:8000/password/send-otp",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: email, type: type }),
        }
      );
      if (postResponse.status === 200) {
        toast.success("OTP has been sent to your email.");
        setSendOtp(false);
        setVerifyOtp(true);
        return;
      }
      if (postResponse.status === 404) {
        toast.warning("Account with this email does not exists");
        return;
      }
      if (postResponse.status === 422) {
        toast.warning("Invalid Email");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (finalOtp === "" || finalOtp === null) {
      toast.warning("Please enter the OTP.");
      return;
    }
    try {
      const postResponse = await fetch(
        "http://192.168.69.167:8000/password/verify-otp",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: email, type: type, otp: finalOtp }),
        }
      );
      // console.log(1, postResponse);
      if (postResponse.status === 200) {
        toast.success("OTP Verified");
        const json = await postResponse.json();
        // console.log(2, json);
        setPasswordToken(json.password_token);
        // console.log(3, passwordToken);
        setVerifyOtp(false);
        setChangePassword(true);
        return;
      }
      if (postResponse.status === 404) {
        toast.warning("OTP Expired");
        return;
      }
      if (postResponse.status === 406 || postResponse.status === 422) {
        toast.warning("Invalid OTP");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newpassword === null || newpassword === "") {
      toast.warning("Please enter the Password.");
      return;
    }
    if (newpassword.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }
    if (newpassword !== password2) {
      setNewpassword("");
      setPassword2("");
      toast.warning("Passwords do not match");
      return;
    }
    try {
      console.log(passwordToken);
      const postResponse = await fetch("http://192.168.69.167:8000/password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          newPassword: newpassword,
          token: passwordToken,
        }),
      });

      // console.log(1, postResponse);
      if (postResponse.status === 200) {
        toast.success("Password changed successfully");
        // const json = await postResponse.json();
        // console.log(2, json);
        setChangePassword(false);
        setLast(true);
        return;
      }
      if (postResponse.status === 401) {
        toast.error("Token Expired");
        return;
      }
      if (postResponse.status === 404) {
        toast.warning("Invalid Credentials");
        return;
      }
      if (postResponse.status === 422) {
        toast.warning("Invalid Input Format");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <LoginNav />
      {sendOtp && (
        <div
          className="login-container"
          style={{
            maxWidth: "36rem",
            padding: "2.8rem 3.5rem",
            marginTop: "15rem",
          }}
        >
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
            <button
              onClick={handleSendOTP}
              className="login-button"
              type="submit"
            >
              Send OTP
            </button>
          </div>
        </div>
      )}

      {/* OTP Verification */}
      {verifyOtp && (
        <div
          className="login-container"
          style={{
            maxWidth: "36rem",
            padding: "2rem 2.5rem",
            marginTop: "15rem",
          }}
        >
          <div style={{ margin: "2rem 0" }}>
            <p>An OTP has been sent to your email.</p>
          </div>

          <div style={{ marginBottom: "0.5rem" }}>
            <OtpInput numInputs={5} onOtpComplete={handleOtpComplete} />
          </div>

          <div className="login-group" style={{ padding: "0 2rem" }}>
            <button
              onClick={handleVerifyOTP}
              className="login-button"
              type="submit"
            >
              Submit
            </button>
            <p
              className="forgot"
              style={{ cursor: "pointer" }}
              onClick={handleResendOTP}
            >
              Resend OTP
            </p>
          </div>
        </div>
      )}
      {/* Password Change Component */}
      {changePassword && (
        <div
          className="login-container"
          style={{
            maxWidth: "36rem",
            padding: "3rem 4rem",
            marginTop: "15rem",
          }}
        >
          <div className="login-group">
            <input
              type="password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              placeholder="New Password"
              required
            />
          </div>

          <div className="login-group">
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="login-group">
            <button
              onClick={handleChangePassword}
              className="login-button"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {/* Last page */}
      {last && (
        <div
          className="login-container"
          style={{
            maxWidth: "36rem",
            padding: "3rem 4rem",
            marginTop: "15rem",
          }}
        >
          <div style={{ paddingBottom: "2rem" }}>
            <p>Password Reset Successfully</p>
          </div>
          <div style={{ width: "100%" }}>
            <Link to={"/login"}>
              <button className="login-button">Log In</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgot;
