import React from "react";
import "../styles/popup.css";
import cbtn from "../assets/closeButton.png";

const Popup = ({ objectProp, onClose, day, month, year, timeString }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="popup"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <img
            src={cbtn}
            alt="Close_btn"
            onClick={onClose}
            className="close-btn"
          />
          <div style={{ padding: "2rem 3rem" }}>
            <h1 className="popup-title">{objectProp.title}</h1>
            <ul className="name-time">
              <li>{objectProp.student.name}</li>
              <li>
                {day}-{month}-{year}&nbsp;&nbsp; {timeString}
              </li>
            </ul>
            <p className="desc">{objectProp.description}</p>
            <div className="desc-list">
              <ul className="desc-list-left">
                <li>Object</li>
                <li>Location</li>
                <li>Type</li>
                <li>Category</li>
              </ul>
              <ul className="desc-list-right">
                <li>{objectProp.title}</li>
                <li>{objectProp.location}</li>
                <li>{objectProp.type}</li>
                <li>{objectProp.category}</li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ width: "40%", height: "100%" }}>{/* image */}</div>
      </div>
    </div>
  );
};

export default Popup;
