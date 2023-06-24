import React from "react";
import "../styles/complaint.css";

export default function Complaint() {
  return (
    <div className="com-component">
      <div className="comp-left">
        <div className="comp-state"></div>
        <div className="comp-description">
          <h1 className="comp-title">Title</h1>
          <p className="comp-para">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe,
            quas.
          </p>
        </div>
      </div>
      <div className="comp-right">
        <div className="dnt">12:48 02/06/2023</div>
        <div className="comp-name">Devansh Sengar</div>
      </div>
    </div>
  );
}
