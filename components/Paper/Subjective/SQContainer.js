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

  return (
    <>
      {question ? (
        <div>
          <div>
            <div className="">
              {question.question}
              <span className="w-10 font-bold"> ({question.marks})</span>
            </div>
            <div className="p-2">
              <label>Answer</label>
              <textarea
                class="border border-gray-300 bg-white rounded-md p-2 w-full"
                maxlength="50"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            {freeFlow && (
              <button
                onClick={() => {
                  currentQuestion > 0 &&
                    setCurrentQuestion(currentQuestion - 1);
                }}
              >
                Previous
              </button>
            )}
            <button onClick={saveAnswer}>Save</button>
            <button
              onClick={() => {
                currentQuestion < totalQuestions - 1 &&
                  setCurrentQuestion(currentQuestion + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <>loading</>
      )}
    </>
  );
}
