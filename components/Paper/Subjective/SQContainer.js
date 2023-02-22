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

  const saveAnswer = () => {
    console.log(question);
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
            <p className="text-2xl justify-center h-32 flex items-center">
              {currentQuestion + 1 + ". " + question.question + " "}
              <span className="font-bold"> ({question.marks})</span>
            </p>
            <div className="">
              <label>
                Answer
                {!question.long_question && (
                  <span className="text-gray-500 text-sm">
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
              className="bg-blue-700 hover:bg-blue-800 px-3 py-2 w-24 rounded-lg"
              onClick={saveAnswer}
            >
              Save
            </button>
            <button
              className={
                (currentQuestion < totalQuestions - 1
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-gray-400") + " px-3 py-2 w-24 rounded-lg"
              }
              onClick={() => {
                currentQuestion < totalQuestions - 1 &&
                  setCurrentQuestion(currentQuestion + 1);
              }}
            >
              Next
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
