import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import NavigationGrid from "./NavigationGrid";
import SQContainer from "./Subjective/SQContainer";
import NewTimer from "./NewTimer";

export default function SubjectivePaper({
  submitted,
  questions,
  isfreeFlow,
  attemptTime,
  paper,
  startTime,
  studentId,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [flags, setFlags] = useState([]);

  const setCurrentAndLocal = (newValue) => {
    setCurrentQuestion(newValue);
  };

  useEffect(() => {
    console.log("submited", submitted);
  }, [submitted]);

  useEffect(() => {
    if (paper) {
      const currentPaper = JSON.parse(localStorage.getItem(`paper ${paper}`));
      console.log(currentPaper);
      setFlags(currentPaper.flags || []);
    }
  }, [questions, paper]);

  if (!questions) {
    return <Loader />;
  }
  return (
    <div className="flex justify-between shadow-lg max-w-5xl font-poppins mt-28 mx-20 xl:mx-auto pt-20 pb-10 px-10 gradient rounded-2xl shadow-3xl shadow-black">
      <div className="w-2/3  rounded-l-2xl">
        <SQContainer
          studentId={studentId}
          question={questions[currentQuestion]}
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentAndLocal}
          freeFlow={isfreeFlow}
          flags={flags || []}
          setFlags={setFlags}
        />
      </div>
      {currentQuestion !== questions.length && (
        <div className="w-1/3 max-w-xs shadow-lg h-fit border-2 border-zinc-100 bg-white p-8 shadow-black">
          <NewTimer time={attemptTime} startTime={startTime} />

          <NavigationGrid
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
            freeFlow={true}
            offset={questions.length}
            setCurrentQuestion={setCurrentAndLocal}
            flags={flags || []}
            setFlags={setFlags}
          />
        </div>
      )}
    </div>
  );
}
