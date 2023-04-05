import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CountdownTimer from "../CountdownTimer";
import SubmitModal from "../SubmitModal";
import Loader from "@/components/Loader";
import Spinner from "@/components/Loader/Spinner";

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
  const session = useSession();

  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [multipleAllowed, setMultipleAllowed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [savingAnswer, setSavingAnswer] = useState({
    show: false,
    message: "",
  });
  const saveAnswer = () => {
    console.log("SAVING ANSWER", currentQuestion);
    const attemptDone =
      numSelected === question.correct_answer.split(",").length;

    console.log(
      "selectedAnswer",
      selectedAnswer,
      "correctAnswers",
      correctAnswers,
      "attempted? ",
      attemptDone,
      "state of attempt",
      attempted
    );

    setSavingAnswer({
      show: true,
      message: "Saving answer...",
    });
    const score = markAnswer(
      question.correct_answer,
      selectedAnswer.join(","),
      question.marks
    );
    // mark answer right here
    axios
      .post(`/api/student/paper/oq/add_answer`, {
        p_number: session.data.user.id,
        current: currentQuestion,
        oq_id: question.oq_id,
        answer: selectedAnswer.join(","),
        marks: score,
        is_attempted: attemptDone,
      })
      .then((res) => {
        console.log("answer added successfully ", res.data);
        setAttempted(attemptDone);
        setSavingAnswer({
          show: false,
          message: "",
        });
        if (!freeFlow && attemptDone) {
          if (currentQuestion < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1);
          }
        }
      })
      .catch((err) => {
        console.log("error in adding answer", err.message);
      });
    setSaved(true);
    setChanged(false);
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
    console.log("CHANGED IS", changed);
    if (changed) {
      saveAnswer();
    }
  }, [selectedAnswer]);

  useEffect(() => {
    // correctanswer will be a string in form a1,a2
    // selectedanswer will be a string in form a1,a2
    // convert correctAnswer into an array
    if (question) {
      setLoading(true);
      axios
        .get("/api/student/paper/oq/get_answer", {
          params: {
            p_number: session.data.user.id,
            oq_id: question.oq_id,
          },
        })
        .then((res) => {
          if (res.data) {
            const fetchedAnswer =
              res.data.answer.split(",")[0] === ""
                ? []
                : res.data.answer.split(",");
            setSelectedAnswer(fetchedAnswer);
            console.log("exists ", fetchedAnswer);
            setNumSelected(
              res.data.answer.split(",")[0] === "" ? 0 : fetchedAnswer.length
            );
            setAttempted(
              res.data.answer.split(",")[0] === ""
                ? false
                : res.data.answer.split(",").length ===
                    question.correct_answer.split(",").length
            );
          } else {
            setAttempted(false);
            console.log(
              "answer does not exist, setting selectedAnswer to empty array"
            );
            setNumSelected(0);
            setSelectedAnswer([]);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.log("error in getting answer", err.message);
        });
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

  console.log("state of attempt", attempted);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-between p-10 pt-0 w-full">
      <Spinner show={savingAnswer.show} message={savingAnswer.message} />
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
                  className={`w-full flex my-3 rounded-lg p-4 text-black transition-all cursor-pointer items-center shadow-md shadow-black duration-200 hover:bg-zinc-200 
                    ${
                      attempted ? "bg-gray-200 pointer-events-none" : "bg-white"
                    }
                  `}
                  onClick={() => {
                    setChanged(selectedAnswer.includes(answer) ? false : true);
                    setSaved(selectedAnswer.includes(answer) ? true : false);
                    const input = document.querySelector(
                      `input[value='${answer}']`
                    );
                    if (!multipleAllowed) {
                      setSelectedAnswer([answer]);
                      setNumSelected(1);
                      input.checked = true; // check the checkbox
                    } else {
                      if (selectedAnswer.includes(answer)) {
                        setSelectedAnswer(
                          selectedAnswer.filter((a) => a !== answer)
                        );
                        setNumSelected(numSelected - 1);
                        input.checked = false;
                      } else {
                        if (numSelected < correctAnswers.length) {
                          setSelectedAnswer([...selectedAnswer, answer]);
                          setNumSelected(numSelected + 1);
                          input.checked = true;
                        } else {
                          // remove first element of selectAnswer, and add this option
                          setSelectedAnswer([
                            ...selectedAnswer.slice(1),
                            answer,
                          ]);
                          input.checked = true;
                        }
                      }
                    }
                  }}
                >
                  <input
                    type={multipleAllowed ? "checkbox" : "radio"}
                    name="answer"
                    value={answer}
                    className="mr-4 accent-blue-700"
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
            flex mt-16 text-black mx-auto
            ${freeFlow ? "w-full justify-between" : "w-1/2 justify-center"}
          `}
          >
            {freeFlow && (
              <>
                <button
                  className={
                    (currentQuestion > 0
                      ? "bg-white hover:bg-zinc-300"
                      : "bg-gray-400 cursor-not-allowed") +
                    " px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500"
                  }
                  onClick={() => {
                    currentQuestion > 0 &&
                      setCurrentQuestion(currentQuestion - 1);
                  }}
                >
                  Previous
                </button>
                <button
                  className={` px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500
              ${
                flags.includes(String(currentQuestion))
                  ? "bg-yellow-400 hover:bg-yellow-500"
                  : "bg-white hover:bg-zinc-300"
              }`}
                  onClick={() => flagQuestion(String(currentQuestion))}
                >
                  {flags.includes(String(currentQuestion))
                    ? "Remove"
                    : "Review"}
                </button>
              </>
            )}
            {currentQuestion < totalQuestions - 1 ? (
              <>
                {freeFlow && (
                  <button
                    className="bg-white hover:bg-zinc-300 px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500"
                    onClick={() => {
                      setCurrentQuestion(currentQuestion + 1);
                    }}
                  >
                    Next
                  </button>
                )}
              </>
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
        <Loader />
      )}
    </div>
  );
}
