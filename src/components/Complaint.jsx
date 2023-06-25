import React from "react";
import "../styles/complaint.css";

export default function Complaint() {
  //   const paragraph = "Lorem ipsum dolor sit amet.";
  const paragraph =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum ipsum ac lectus efficitur fringilla. Nullam condimentum consequat velit, non sagittis ipsum consequat nec. Fusce auctor leo sit amet malesuada laoreet. Nam ultricies enim in enim dapibus, nec fermentum mauris laoreet. Sed condimentum facilisis magna, ut facilisis orci tincidunt sit amet. Sed vulputate tellus nec lectus aliquam, nec rutrum neque accumsan. In hac habitasse platea dictumst.";
  return (
    <div className="com-component">
      <div className="comp-left">
        <div className="comp-state"></div>
        <div className="comp-description">
          <h1 className="comp-title">Title</h1>
          <p className="comp-para">
            {paragraph.length < 50 ? paragraph : paragraph.slice(0, 50) + "..."}
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
