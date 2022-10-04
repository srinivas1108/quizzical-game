import React from "react";

export default function Starter(props) {
  return (
    <div className="starter">
      {" "}
      <h1 className="title">Quizzical</h1>
      <h3 className="sub-title">Let's QuiZzo </h3>
      <button className="start" onClick={props.startPlay}>
        Start Quiz
      </button>{" "}
    </div>
  );
}
