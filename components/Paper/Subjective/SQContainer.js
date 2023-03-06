import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SQContainer({
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
  const [answer, setAnswer] = useState({});
  const [saved, setSaved] = useState(false);

  const saveAnswer = () => {
    if (!answer) {
      alert("Your answer is empty. Please type anything to continue.");
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
    if (question) {
      setAnswer("");
      setSaved(false);
    }
  }, [question]);

  useEffect(
    () => () => {
      setSaved(false);
    },
    [answer]
  );

  return (
    <div className="flex flex-col justify-between p-10 pt-0 max-w-4xl text-white">
      {question ? (
        <>
          <div>
            <div className="text-2xl mb-4">
              <div className="flex justify-between items-center">
                <p>{question.questionnumber + ". " + question.question}</p>
                <p className="text-base font-bold">({question.marks} Marks)</p>
              </div>
            </div>
            <div className="py-4 rounded-lg space-y-2 ">
              {question.children ? (
                question.children.map((childQuestion, index) => (
                  <div key={childQuestion.questionnumber}>
                    <div className="text-xl">
                      <div className="flex justify-between items-center ">
                        <p>
                          {childQuestion.questionnumber +
                            ". " +
                            childQuestion.question}
                        </p>
                        <p className="text-base">
                          ({childQuestion.marks} Marks)
                        </p>
                      </div>
                    </div>
                    <div className="pb-4 rounded-lg space-y-2">
                      <label className="">
                        Answer
                        {!childQuestion.long_question && (
                          <span className="text-gray-200 text-sm">
                            {" "}
                            (Max 50 characters)
                          </span>
                        )}
                      </label>
                      <textarea
                        className="border bg-white rounded-md p-2 w-full text-black border-black focus:outline-yellow-500"
                        maxLength={childQuestion.long_question ? 100000 : 50}
                        value={answer[childQuestion.questionnumber]}
                        rows={childQuestion.long_question ? 10 : 2}
                        onChange={(e) => {
                          setAnswer({
                            ...answer,
                            [childQuestion.questionnumber]: e.target.value,
                          });
                          console.log("answer", answer);
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <>textarea here for q with no parts</>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-20 text-black">
            {(freeFlow || question.questionnumber !== 1) && (
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
            )}
            <button
              className={` px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500
                ${
                  flags.includes(String(currentQuestion))
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : "bg-white hover:bg-zinc-300"
                }`}
              onClick={flagQuestion}
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
            <button
              className={
                (currentQuestion < totalQuestions - 1
                  ? "bg-white hover:bg-zinc-300 "
                  : "bg-green-500 hover:bg-green-600") +
                " px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500"
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
