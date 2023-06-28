import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ numInputs, onOtpComplete }) => {
  const [otp, setOtp] = useState(Array(numInputs).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Move focus to the next input field
    if (value !== "" && index < numInputs - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      // Move focus to the previous input field on Backspace key press
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    // Check if all OTP fields are filled
    const isOtpComplete = otp.every((digit) => digit !== "");

    if (isOtpComplete) {
      // Pass the final OTP value to the parent component
      onOtpComplete(otp.join(""));
    }
  }, [otp, onOtpComplete]);

  return (
    <div>
      {otp.map((digit, index) => (
        <input
          style={{ maxWidth: "4rem", margin: "0.7rem", textAlign: "center" }}
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
