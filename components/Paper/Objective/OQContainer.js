import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function OQContainer({
  question,
  currentQuestion,
  setCurrentQuestion,
  totalQuestions,
  freeFlow,
  flags,
  setFlags,
}) {
  const router = useRouter();
  const { student } = router.query;
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [multipleAllowed, setMultipleAllowed] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveAnswer = () => {
    if (selectedAnswer.length === 0) {
      alert(
        "You have not selected any answer. Please select an answer to continue."
      );
      return;
    }
    axios
      .post(`/api/student/paper/oq/add_answer`, {
        p_number: student,
        oq_id: question.oq_id,
        answer: selectedAnswer.join(","),
      })
      .then((res) => {
        console.log("answer added successfully ", res.data);
      })
      .catch((err) => {
        console.log("error ", err.message);
      });
    setSaved(true);
  };

  const flagQuestion = () => {
    const current = String(currentQuestion);
    let f = flags;
    f.includes(current)
      ? (f = f.filter((flags) => flags !== current))
      : (f = [...flags, current]);
    setFlags(f);
    localStorage.setItem("flags", JSON.stringify(f));
    console.log(localStorage.getItem("flags"));
  };
  useEffect(() => {
    // correctanswer will be a string in form a1,a2
    // selectedanswer will be a string in form a1,a2
    // convert correctAnswer into an array
    if (question) {
      setSelectedAnswer([]);
      const answers = question.correct_answer.split(",");
      setCorrectAnswers(answers);
      if (answers.length > 1) {
        setMultipleAllowed(true);
      } else {
        setMultipleAllowed(false);
      }
    }
  }, [question]);

  useEffect(
    () => () => {
      setSaved(false);
    },
    [selectedAnswer]
  );

  return (
    <div className="flex flex-col justify-between p-10 pt-0 max-w-4xl">
      {question ? (
        <>
          <div>
            <p className="text-2xl justify-center h-32 flex items-center">
              {currentQuestion + 1 + ". " + question.question}
            </p>
            <div className="flex justify-between mt-6 flex-col">
              {question.answers.split(",").map((answer, index) => (
                <div
                  key={index}
                  className={`
                  w-full flex  my-3 rounded-lg p-4 hover:bg-blue-700 transition-all cursor-pointer items-center shadow-xl shadow-blue-200
                  ${
                    selectedAnswer.includes(answer)
                      ? "bg-blue-700"
                      : "bg-blue-400"
                  }
                  `}
                  onClick={() => {
                    const input = document.querySelector(
                      `input[value='${answer}']`
                    );
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event("change"));
                    if (multipleAllowed) {
                      setSelectedAnswer(
                        selectedAnswer.includes(answer)
                          ? selectedAnswer.filter((a) => a !== answer)
                          : [...selectedAnswer, answer]
                      );
                    } else setSelectedAnswer([answer]);
                  }}
                >
                  <input
                    className="w-6 h-6 ring-offset-gray-700 focus:ring-offset-gray-700 bg-gray-600 border-gray-500 pointer-events-none accent-white"
                    type={multipleAllowed ? "checkbox" : "radio"}
                    name={question.oq_id}
                    value={answer}
                    readOnly={selectedAnswer.includes(answer) ? false : true}
                    checked={selectedAnswer.includes(answer)}
                  />
                  <label
                    htmlFor="list-radio-license"
                    className="w-full py-3 ml-2 text-sm font-medium text-white cursor-pointer"
                  >
                    {answer}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`
            flex mt-6 text-white mx-auto justify-between
            ${freeFlow ? "w-full" : "w-1/2"}
          `}
          >
            {freeFlow && (
              <button
                className={
                  (currentQuestion > 0
                    ? "bg-blue-700 hover:bg-blue-800"
                    : "bg-gray-400") + " px-3 py-2 w-24 rounded-lg"
                }
                onClick={() => {
                  if (selectedAnswer.length === 0 || saved) {
                    currentQuestion > 0 &&
                      setCurrentQuestion(currentQuestion - 1);
                  } else {
                    alert("Please save your answer before proceeding");
                  }
                }}
              >
                Previous
              </button>
            )}
            <button
              className={` px-3 py-2 w-24 rounded-lg
                ${
                  flags.includes(String(currentQuestion))
                    ? "bg-gray-400 hover:bg-gray-600"
                    : "bg-yellow-400 hover:bg-yellow-500"
                }`}
              onClick={flagQuestion}
            >
              {flags.includes(String(currentQuestion)) ? "Unflag" : "Flag"}
            </button>
            <button
              className={` px-3 py-2 w-24 rounded-lg
                ${
                  saved
                    ? "bg-gray-400 hover:bg-gray-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              onClick={saveAnswer}
            >
              Save
            </button>
            <button
              className={
                (currentQuestion < totalQuestions - 1
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-green-500 hover:bg-green-600") +
                " px-3 py-2 w-24 rounded-lg"
              }
              onClick={() => {
                // if opt not selected OR saved
                if (selectedAnswer.length === 0 || saved) {
                  currentQuestion < totalQuestions &&
                    setCurrentQuestion(currentQuestion + 1);
                } else {
                  alert("Please save your answer before proceeding");
                }
              }}
            >
              {
                {
                  0: "Next",
                  1: "Submit",
                }[currentQuestion === totalQuestions - 1 ? 1 : 0]
              }
            </button>
          </div>
        </>
      ) : (
        <div>
          <h1>loading</h1>
        </div>
      )}
    </div>
  );
}
