import React from "react";

export default function Question(props) {
  const questions = props.data.map((item, index) => {
    return (
      <div>
        <h3 className="question">{item.question}</h3>
        <div>
          {item.options.map((option) => (
            <button
              className={option.isHeld}
              onClick={() => props.selectOption(item.id, option.value)}
            >
              {option.value}
            </button>
          ))}
        </div>
        <hr></hr>
      </div>
    );
  });

  return <div>{questions}</div>;
}
