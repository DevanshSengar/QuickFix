import React from "react";
import "../styles/popup.css";

const Popup = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="overlay"></div>
      <div className="popup">
        <div className="popup-left">
          <h1 className="popup-title">title</h1>
          <li className="name-time">
            <ul>name</ul>
          </li>
          <li className="name-time">
            <ul>created</ul>
          </li>
          <p>description</p>
          <div className="desc-list">
            <ul className="desc-list-left">
              <li>Object</li>
              <li>Location</li>
              <li>Type</li>
              <li>Category</li>
            </ul>
            <ul className="desc-list-right">
              <li>Title</li>
              <li>Location</li>
              <li>Type</li>
              <li>Category</li>
            </ul>
          </div>

          <div className="popup-right">{/* image */}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
