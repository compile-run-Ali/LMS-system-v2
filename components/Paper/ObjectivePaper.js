import React, { useEffect, useState } from "react";
import axios from "axios";

import OQContainer from "./Objective/OQContainer";
import Loader from "../Loader";
import NavigationGrid from "./NavigationGrid";
import NewTimer from "./NewTimer";

export default function ObjectivePaper({
  questions,
  isfreeFlow,
  setSolveObjective,
  paper,
  attemptTime,
  startTime,
  submit,
  studentId,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [flags, setFlags] = useState([]);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);

  useEffect(() => {
    if (questions && paper) {
      setRandomizedQuestions(shuffleArray(questions));
      const currentPaper = JSON.parse(localStorage.getItem(`paper ${paper}`));
      setFlags(currentPaper ? currentPaper.flags : []);
    }
  }, [questions, paper]);

  const setCurrentAndLocal = (newValue) => {
    setCurrentQuestion(newValue);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  if (!questions) {
    return <Loader />;
  }

  return (
    <div className="flex justify-between shadow-lg max-w-5xl font-poppins mt-28 mx-20 xl:mx-auto pt-20 pb-10 px-10 gradient rounded-2xl shadow-3xl shadow-black">
      <div className="w-2/3  rounded-l-2xl">
        <OQContainer
        studentId={studentId}
          submit={submit}
          paper={paper}
          question={randomizedQuestions[currentQuestion]}
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentAndLocal}
          freeFlow={isfreeFlow}
          flags={flags || []}
          setFlags={setFlags}
          setSolveObjective={setSolveObjective}
        />
      </div>
      <div className="w-1/3 max-w-xs shadow-lg h-fit border-2 border-zinc-100 bg-white p-8 shadow-black">
        <NewTimer time={attemptTime} startTime={startTime} />
        {isfreeFlow && (
          <NavigationGrid
            totalQuestions={questions.length}
            currentQuestion={isfreeFlow && currentQuestion}
            freeFlow={isfreeFlow}
            offset={questions.length}
            setCurrentQuestion={setCurrentAndLocal}
            flags={flags || []}
            setFlags={setFlags}
          />
        )}
      </div>
    </div>
  );
}
