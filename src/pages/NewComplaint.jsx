import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileNav from "../components/ProfileNav.jsx";
import "../styles/newComplaint.css";
import { toast } from "react-toastify";
import im6 from "../assets/uploadImage.png";

const RegisterComplaint = () => {
  const hostel = localStorage.getItem("userHostel");
  const room = localStorage.getItem("userRoom");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const [category, setCategory] = useState("");
  const [object, setObject] = useState("");
  const [image, setImage] = useState(null);
  // const [password, setPassword] = useState("");
  const usenavigate = useNavigate();

  const isTokenExpired = () => {
    try {
      const expirationTime = Number(localStorage.getItem("expDate"));
      const currentTime = Date.now();
      if (
        expirationTime < currentTime ||
        localStorage.getItem("jwtToken") === null
      ) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  useEffect(() => {
    if (isTokenExpired()) {
      toast.error("Session Expired");
      localStorage.clear();
      usenavigate("/");
    }
  }, [usenavigate]);

  const inputRef = useRef(null);

  const handleImageUpload = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              value={object}
              onChange={(e) => setObject(e.target.value)}
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
              rows="8"
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
              <input type="radio" name="type" />
              <p>Personal</p>
            </label>

            <label style={{ display: "flex" }}>
              <input type="radio" name="type" />
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
                width: "30%",
              }}
            >
              <p>Submit</p>
            </button>
          </div>
        </form>

        {/* Third block */}
        <div className="uploadImage">
          <div className="upload" onClick={handleImageUpload}>
            {image ? (
              <img
                style={{
                  height: "19rem",
                  maxWidth: "19rem",
                  alignSelf: "center",
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
                src={URL.createObjectURL(image)}
                alt="Upload Pic"
              />
            ) : (
              <img style={{ height: "18rem" }} src={im6} alt="Upload Pic" />
            )}
            <input
              style={{ display: "none" }}
              onChange={handleImageChange}
              type="file"
              ref={inputRef}
            />
          </div>

          <button
            style={{
              backgroundColor: "#425fc6",
              width: "60%",
              fontSize: "1.3rem",
            }}
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplaint;
