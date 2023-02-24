import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SQContainer({
  question,
  currentQuestion,
  setCurrentQuestion,
  totalQuestions,
  freeFlow,
}) {
  const router = useRouter();
  const { student } = router.query;
  const [answer, setAnswer] = useState("");
  const [saved, setSaved] = useState(false);

  const saveAnswer = () => {
    if (!answer) {
      alert(
        "Your answer is empty. Please type anything to continue."
      );
      return;
    }
    axios
      .post(`/api/student/paper/sq/add_answer`, {
        p_number: student,
        sq_id: question.sq_id,
        answer,
      })
      .then((res) => {
        console.log("answer added successfully ", res.data);
      })
      .catch((err) => {
        console.log("error ", err.message);
      });
    setSaved(true);
  };

  useEffect(() => {
    if (question) {
      setAnswer("");
    }
  }, [question]);

  return (
    <div className="flex flex-col justify-between p-10 pt-0 max-w-4xl">
      {question ? (
        <>
          <div>
            <div className="text-2xl mb-4">
              <p>{currentQuestion + 1 + ". " + question.question}</p>
              <p className="text-base font-bold"> ({question.marks} Marks)</p>
            </div>
            <div className="p-4 bg-blue-400 rounded-lg space-y-2">
              <label className="text-white">
                Answer
                {!question.long_question && (
                  <span className="text-gray-200 text-sm">
                    {" "}
                    (Max 50 characters)
                  </span>
                )}
              </label>
              <textarea
                className="border border-gray-300 bg-white rounded-md p-2 w-full "
                maxLength={question.long_question ? 100000 : 50}
                value={answer}
                rows={question.long_question ? 10 : 2}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between mt-6 text-white">
            {freeFlow && (
              <button
                className={
                  (currentQuestion > 0
                    ? "bg-blue-700 hover:bg-blue-800"
                    : "bg-gray-400") + " px-3 py-2 w-24 rounded-lg"
                }
                onClick={() => {
                  currentQuestion > 0 &&
                    setCurrentQuestion(currentQuestion - 1);
                }}
              >
                Previous
              </button>
            )}
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
                  : "bg-green-500 hover:bg-green-600") + " px-3 py-2 w-24 rounded-lg"
              }
              onClick={() => {
                // if opt not selected OR saved
                if (!answer || saved) {
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
