import React from "react";
import "../styles/complaint.css";

export default function Complaint({ objectProp }) {
  const { title, description, state, created, student } = objectProp;

  const paragraph = description;
  const dateTime = new Date(created);
  // Extract the date and time components
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Adding 1 because months are zero-based(0-11)
  let day = dateTime.getDate();
  if (day < 10) day = "0" + String(day);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  let backgroundColor = "#d9d9d9";
  if (state === "accepted") backgroundColor = "#425FC6";
  else if (state === "rejected") backgroundColor = "#C31919";
  else if (state === "done") backgroundColor = "#19C37D";
  else if (state === "closed") backgroundColor = "#205e4e";

  return (
    <div className="com-component">
      <div className="comp-left">
        <div className="comp-state" style={{ backgroundColor }}></div>
        <div className="comp-description">
          <h1 className="comp-title">{title}</h1>
          <p className="comp-para">
            {paragraph.length < 50 ? paragraph : paragraph.slice(0, 50) + "..."}
          </p>
        </div>
      </div>
      <div className="comp-right">
        <div className="dnt">
          {hours}:{minutes} &nbsp;&nbsp; {day}-{month}-{year}
        </div>
        <div className="comp-name">{student && student.name}</div>
      </div>
    </div>
  );
}
