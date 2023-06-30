import React, { useState } from "react";
import ProfileNav from "../components/ProfileNav.jsx";
import "../styles/newComplaint.css";
import im6 from "../assets/uploadImage.png";

const RegisterComplaint = () => {
  const hostel = localStorage.getItem("userHostel");
  const room = localStorage.getItem("userRoom");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "auto",
      }}
    >
      <ProfileNav />
      <h1 className="reg-head">Register Complaint</h1>
      <div className="container-r">
        {/* First block */}
        <div className="choices-r">
          <div className="drop">
            <p>Category</p>
            <select
              className="drop-down"
              // value={}
              // onChange={}
            >
              <option value="bh1">Carpentary</option>
              <option value="bh2">Electrical</option>
              <option value="bh3">Plumbing</option>
            </select>
          </div>

          <div className="drop">
            <p>Object</p>
            <select
              className="drop-down"
              // value={}
              // onChange={}
            >
              <option value="bh1">Carpentary</option>
              <option value="bh2">Electrical</option>
              <option value="bh3">Plumbing</option>
            </select>
          </div>

          <div className="drop">
            <p>Location</p>
            <button className="drop-down" value="bh1">
              {hostel === "bh1" && <div>BH-1</div>}
              {hostel === "bh2" && <div>BH-2</div>}
              {hostel === "bh3" && <div>BH-3</div>}
              {hostel === "gh" && <div>GH</div>}
            </button>
          </div>

          <div className="drop">
            <p>Room</p>
            <button className="drop-down">{room}</button>
          </div>
        </div>

        {/* Second block */}
        <form className="com-r">
          <div style={{ width: "50%" }}>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title*"
            />
          </div>
          <div>
            <textarea
              style={{ width: "100%", fontWeight: 500 }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description*"
              name="description"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "50%",
              padding: "0 0.5rem",
            }}
          >
            <p style={{ fontSize: "1.7rem" }}>Type</p>
            <label style={{ display: "flex" }}>
              <input type="radio" />
              <p>Personal</p>
            </label>

            <label style={{ display: "flex" }}>
              <input type="radio" />
              <p>Common</p>
            </label>
          </div>

          <div style={{ width: "50%" }}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password*"
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                backgroundColor: "#19c37d",
                width: "40%",
              }}
            >
              <p>Submit</p>
            </button>
          </div>
        </form>

        {/* Third block */}
        <div className="uploadImage">
          <div className="upload">
            <img
              style={{ height: "18rem" }}
              onClick={(e) => {
                e.preventDefault();
              }}
              src={im6}
              alt="Upload pic"
            />
          </div>
          <button
            style={{
              backgroundColor: "#425fc6",
              width: "60%",
            }}
          >
            <p>Upload Image</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplaint;
