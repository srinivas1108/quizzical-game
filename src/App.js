import React from "react";
import ReactLoading from "react-loading";

import Question from "./components/Question";
import Starter from "./components/starter";

function App() {
  const [data, setData] = React.useState([]);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [startGame, setStartGame] = React.useState(true);
  const [marks, setMarks] = React.useState(0);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function selectOption(index, selOption) {
    setData((prevData) => {
      return prevData.map((ques) => {
        if (ques.id === index) {
          return {
            ...ques,
            options: ques.options.map((option) => {
              if (option.value === selOption) {
                return { ...option, isHeld: "selected" };
              } else {
                return { ...option, isHeld: "options" };
              }
            }),
          };
        } else {
          return ques;
        }
      });
    });
  }

  function validate() {
    setData((prevData) => {
      return prevData.map((item) => {
        return {
          ...item,
          options: item.options.map((option) => {
            if (
              (option.isHeld === "selected" && option.correct_answer) ||
              (option.isHeld === "options" && option.correct_answer)
            ) {
              option.isHeld === "selected"
                ? setMarks((prev) => prev + 1)
                : setMarks((prev) => prev);

              return { ...option, isHeld: "correct" };
            } else if (option.isHeld === "selected" && !option.correct_answer) {
              return { ...option, isHeld: "wrong" };
            } else {
              return { ...option, isHeld: "options" };
            }
          }),
        };
      });
    });

    setIsCompleted(true);
  }
  function startPlay() {
    setStartGame((prev) => !prev);
    setMarks(0);
    setIsCompleted(false);
  }

  function setOption(answer, arr) {
    return arr.map((option) => ({
      value: option,
      isHeld: "options",
      correct_answer: answer === option,
    }));
  }
  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  function getNewQuestions(results) {
    return results.map((result, index) => {
      return {
        id: index,

        question: htmlDecode(result.question),
        answer: result.correct_answer,
        options: setOption(
          result.correct_answer,
          shuffleArray([result.correct_answer, ...result.incorrect_answers])
        ),
      };
    });
  }

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(getNewQuestions(data.results));
      });
  }, [startGame]);

  return (
    <div>
      {startGame ? (
        <Starter startPlay={startPlay} />
      ) : (
        <div className="App">
          <Question setData={setData} data={data} selectOption={selectOption} />
          <br></br>
          <div id="submit">
            {!isCompleted && (
              <button className="btn" type="submit" onClick={validate}>
                Check Answers
              </button>
            )}

            {isCompleted && (
              <>
                <h3>You have scored {marks} marks</h3>
                <button className="btn" onClick={startPlay}>
                  New Game
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
