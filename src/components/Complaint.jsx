import React from "react";
import "../styles/complaint.css";

export default function Complaint({ objectProp }) {
  const { title, description, created, student } = objectProp;

  const paragraph = description;
  const dateTime = new Date(created);
  // Extract the date and time components
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Adding 1 because months are zero-based(0-11)
  const day = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  return (
    <div className="com-component">
      <div className="comp-left">
        <div className="comp-state"></div>
        <div className="comp-description">
          <h1 className="comp-title">{title}</h1>
          <p className="comp-para">
            {paragraph.length < 50 ? paragraph : paragraph.slice(0, 50) + "..."}
          </p>
        </div>
      </div>
      <div className="comp-right">
        <div className="dnt">
          {`${hours}:${minutes}  `} {`${day}-${month}-${year}`}
        </div>
        <div className="comp-name">{student && student.name}</div>
      </div>
    </div>
  );
}
