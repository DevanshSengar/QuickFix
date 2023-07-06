import React, { useState } from "react";
import "../styles/complaint.css";
import Popup from "./Popup";

export default function Complaint({ objectProp }) {
  const { title, description, state, created, student } = objectProp;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const dateTime = new Date(created);
  // Extract the date and time components
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
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
    <div>
      {isOpen && (
        <Popup
          objectProp={objectProp}
          onClose={handleClosePopup}
          day={day}
          year={year}
          month={month}
          hours={hours}
          minutes={minutes}
        />
      )}
      <div className="com-component" onClick={handleOpenPopup}>
        <div className="comp-left">
          <div className="comp-state" style={{ backgroundColor }}></div>
          <div className="comp-description">
            <h1 className="comp-title">{title}</h1>
            <p className="comp-para">
              {description.length < 50
                ? description
                : description.slice(0, 50) + "..."}
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
    </div>
  );
}
