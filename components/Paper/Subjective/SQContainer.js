import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import SubmitModal from "../SubmitModal";

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
  const session = useSession();

  const { paper } = router.query;
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const saveAnswer = () => {
    if (!answers) {
      alert("Your answer is empty. Please type anything to continue.");
      return;
    }

    for (let question_id in answers) {
      console.log(`Key: ${question_id}, Value: ${answers[question_id]}`);
      axios
        .post(`/api/student/paper/sq/add_answer`, {
          p_number: session?.data?.user?.id,
          sq_id: question_id,
          answer: answers[question_id],
        })
        .then((res) => {
          console.log("answer added successfully ", res.data);
        })
        .catch((err) => {
          console.log("error ", err.message);
        });
    }

    setSaved(true);
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
    if (question) {
      setAnswers("");
      setSaved(false);
    }
  }, [question]);

  useEffect(
    () => () => {
      setSaved(false);
    },
    [answers]
  );

  console.log("answer ", answers);

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
                        value={answers[childQuestion.questionnumber]}
                        rows={childQuestion.long_question ? 10 : 2}
                        onChange={(e) => {
                          setAnswers({
                            ...answers,
                            [childQuestion.sq_id]: e.target.value,
                          });
                          console.log("answer", answers);
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="pb-4 rounded-lg space-y-2">
                  <label className="">
                    Answer
                    {!question.long_question && (
                      <span className="text-gray-200 text-sm">
                        (Max 50 characters)
                      </span>
                    )}
                  </label>
                  <textarea
                    className="border bg-white rounded-md p-2 w-full text-black border-black focus:outline-yellow-500"
                    maxLength={question.long_question ? 100000 : 50}
                    value={answers[question.questionnumber]}
                    rows={question.long_question ? 10 : 2}
                    onChange={(e) => {
                      setAnswers({
                        ...answers,
                        [question.sq_id]: e.target.value,
                      });
                      console.log("answer", answers);
                    }}
                  />
                </div>
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
                  if (!answers || saved) {
                    currentQuestion > 0 &&
                      setCurrentQuestion(currentQuestion - 1);
                  } else {
                    alert("Please save your answer before proceeding.");
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
              {flags.includes(String(currentQuestion)) ? "Remove" : "Review"}
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
                  if (!answers || saved) {
                    currentQuestion < totalQuestions &&
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
            flags={flags}
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
