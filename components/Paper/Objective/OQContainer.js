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
  const [numSelected, setNumSelected] = useState(0);

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
      return correct === answered ? marks : 0;
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
  const maxNumSelected = correctAnswers.length;

  return (
    <div className="flex flex-col justify-between p-10 pt-0 w-full">
      {question ? (
        <>
          <div className="relative">
            <div className="  text-black absolute top-0 right-0" id="timer">
              {!freeFlow && (
                <CountdownTimer
                  timeAllowed={question.timeAllowed || 60}
                  currentQuestion={currentQuestion}
                  setCurrentQuestion={setCurrentQuestion}
                />
              )}
            </div>
            <p className="text-2xl justify-center h-32 flex items-center text-white">
              {currentQuestion + 1 + ". " + question.question}
            </p>
            <div className="flex justify-between mt-6 flex-col">
              {question.answers?.split(",").map((answer, index) => (
                <div
                  key={index}
                  className={`w-full flex my-3 rounded-lg p-4 text-black transition-all cursor-pointer items-center shadow-md shadow-black duration-200 ${
                    selectedAnswer.includes(answer)
                      ? "bg-zinc-300"
                      : "bg-white hover:bg-zinc-200 "
                  }`}
                  onClick={() => {
                    const input = document.querySelector(
                      `input[value='${answer}']`
                    );
                    if (selectedAnswer.includes(answer)) {
                      setSelectedAnswer(
                        selectedAnswer.filter((a) => a !== answer)
                      );
                      setNumSelected(numSelected - 1);
                      input.checked = false; // uncheck the checkbox
                    } else if (
                      numSelected < correctAnswers.length &&
                      numSelected < maxNumSelected
                    ) {
                      setSelectedAnswer([...selectedAnswer, answer]);
                      setNumSelected(numSelected + 1);
                      input.checked = true; // check the checkbox
                    }
                  }}
                >
                  <input
                    type={multipleAllowed ? "checkbox" : "radio"}
                    name="answer"
                    value={answer}
                    className="mr-4"
                    checked={selectedAnswer.includes(answer)} // set the checked attribute
                    readOnly // disable user input on this element
                  />
                  <span>{answer}</span>
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
                    setNumSelected(0);
                  } else {
                    alert("Please save your answer before proceeding");
                  }
                }}
              >
                Previous
              </button>
            )}
            {freeFlow && (
              <button
                className={` px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500
                ${
                  flags.includes(String(currentQuestion))
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : "bg-white hover:bg-zinc-300"
                }`}
                onClick={() => flagQuestion(String(currentQuestion))}
              >
                {flags.includes(String(currentQuestion)) ? "Remove" : "Review"}
              </button>
            )}
            <button
              className={` px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500
                ${saved ? "bg-green-600" : "bg-white hover:bg-zinc-300"}`}
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
                    setNumSelected(0);
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
            flags={flags}
            showModal={showModal}
            setShowModal={setShowModal}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            paper={paper}
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
