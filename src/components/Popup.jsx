import React from "react";
import "../styles/popup.css";

const Popup = ({ objectProp, onClose, day, month, year, hours, minutes }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="popup"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="popup-left">
          <h1 className="popup-title">{objectProp.title}</h1>
          <li className="name-time">
            <ul>{objectProp.student.name}</ul>
          </li>
          <li className="name-time">
            <ul>
              {day}/{month}/{year} {hours}:{minutes}
            </ul>
          </li>
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
              <li>{localStorage.getItem("userHostel")}</li>
              <li>Type</li>
              <li>Category</li>
            </ul>
          </div>
        </div>
        <div className="popup-right">
          <button onClick={onClose} className="close-btn">
            x
          </button>
          {/* image */}
        </div>
      </div>
    </div>
  );
};

export default Popup;
