import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CountdownTimer from "../CountdownTimer";
import { Dialog, Transition } from "@headlessui/react";
import SubmitModal from "../SubmitModal";

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
  const { paper } = router.query;
  const { data: session, status } = useSession();
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [multipleAllowed, setMultipleAllowed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [remainingTime, setRemainingTime] = useState({});
  const [showModal, setShowModal] = useState(false);

  console.log(showModal);

  const saveAnswer = () => {
    const score = markAnswer(
      question.correct_answer,
      selectedAnswer.join(","),
      question.marks
    );
    // mark answer right here
    axios
      .post(`/api/student/paper/oq/add_answer`, {
        p_number: session.user.id,
        oq_id: question.oq_id,
        answer: selectedAnswer.join(","),
        marks: score,
      })
      .then((res) => {
        console.log("answer added successfully ", res.data);
      })
      .catch((err) => {
        console.log("error ", err.message);
      });
    setSaved(true);
  };

  const markAnswer = (correct, answered, marks) => {
    if (correct?.split(",").length > 1) {
      let score;
      const correctAnswers = correct?.split(",");
      const selectedAnswers = answered?.split(",") || [];
      if (correctAnswers.length >= selectedAnswers.length) {
        // count how many of the answers are correct
        let count = 0;
        correctAnswers.forEach(
          (correctAnswer) => selectedAnswers.includes(correctAnswer) && count++
        );
        score = count / correctAnswers.length;
      } else if (correctAnswers.length < selectedAnswers.length) {
        // count wrong answers and subtract that from total answers
        let wrongCount = 0;
        selectedAnswers.forEach(
          (selectedAnswer) =>
            !correctAnswers.includes(selectedAnswer) && wrongCount++
        );
        const m = (correctAnswers.length - wrongCount) / selectedAnswers.length;
        score = m >= 0 ? m : 0;
      }
      const final = score * marks;
      return final;
    } else {
      return correct === answered ? 1 : 0;
    }
  };

  const flagQuestion = (current) => {
    let f = flags;
    console.log("flags", f);
    f.includes(current)
      ? (f = f.filter((flags) => flags !== current))
      : (f = [...flags, current]);
    setFlags(f);
    const papers = JSON.parse(localStorage.getItem("papers"));
    papers[paper].flags = f;
    localStorage.setItem("papers", JSON.stringify(papers));
    console.log(
      "flagged",
      JSON.parse(localStorage.getItem("papers"))[paper].flags
    );
  };
  useEffect(() => {
    // correctanswer will be a string in form a1,a2
    // selectedanswer will be a string in form a1,a2
    // convert correctAnswer into an array
    if (question) {
      // set freeFlow to NOT
      setSelectedAnswer([]);
      const answers = question.correct_answer?.split(",") || [];
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
    <div className="flex flex-col justify-between p-10 pt-0 w-full">
      {question ? (
        <>
          <div className="relative">
            <div
              className="  text-black absolute top-0 right-0"
              id="timer"
            >
              {
                <CountdownTimer
                  timeAllowed={60}
                  currentQuestion={currentQuestion}
                  setCurrentQuestion={setCurrentQuestion}
                />
              }
            </div>
            <p className="text-2xl justify-center h-32 flex items-center text-white">
              {currentQuestion + 1 + ". " + question.question}
            </p>
            <div className="flex justify-between mt-6 flex-col">
              {question.answers?.split(",").map((answer, index) => (
                <div
                  key={index}
                  className={`
                  w-full flex my-3 rounded-lg p-4  text-black transition-all cursor-pointer items-center shadow-md shadow-black duration-200
                  ${
                    selectedAnswer.includes(answer)
                      ? "bg-zinc-300"
                      : "bg-white hover:bg-zinc-200 "
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
                    className="w-6 h-6 ring-offset-gray-700 focus:ring-offset-gray-700 bg-gray-600 border-gray-500 pointer-events-none accent-blue-900"
                    type={multipleAllowed ? "checkbox" : "radio"}
                    name={question.oq_id}
                    value={answer}
                    readOnly={selectedAnswer.includes(answer) ? false : true}
                    checked={selectedAnswer.includes(answer)}
                  />
                  <label
                    htmlFor="list-radio-license"
                    className="w-full py-3 ml-2 text-sm font-medium cursor-pointer"
                  >
                    {answer}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`
            flex mt-16 text-black mx-auto justify-between
            ${freeFlow ? "w-full" : "w-1/2"}
          `}
          >
            {freeFlow && (
              <button
                className={
                  (currentQuestion > 0
                    ? "bg-white hover:bg-zinc-300"
                    : "bg-gray-400 cursor-not-allowed") +
                  " px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500"
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
              className={` px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500
                ${
                  flags.includes(String(currentQuestion))
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : "bg-white hover:bg-zinc-300"
                }`}
              onClick={() => flagQuestion(String(currentQuestion))}
            >
              {flags.includes(String(currentQuestion)) ? "Unflag" : "Flag"}
            </button>
            <button
              className={` px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500
                ${saved ? "bg-green-500" : "bg-white hover:bg-zinc-300"}`}
              onClick={saveAnswer}
            >
              {saved ? "Saved" : "Save"}
            </button>
            {currentQuestion < totalQuestions - 1 ? (
              <button
                className="bg-white hover:bg-zinc-300 px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500"
                onClick={() => {
                  // if opt not selected OR saved
                  if (selectedAnswer.length === 0 || saved) {
                    setCurrentQuestion(currentQuestion + 1);
                  } else {
                    alert("Please save your answer before proceeding");
                  }
                }}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500"
                onClick={() => {
                  // open modal
                  setShowModal(true);
                }}
              >
                Submit
              </button>
            )}
          </div>
          <SubmitModal
            showModal={showModal}
            setShowModal={setShowModal}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        </>
      ) : (
        <div>
          <h1>loading</h1>
        </div>
      )}
    </div>
  );
}
