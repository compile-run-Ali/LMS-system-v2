import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import OQContainer from "./Objective/OQContainer";
import SQContainer from "./Subjective/SQContainer";
import NavigationGrid from "./NavigationGrid";
import { compareDateTime, getPaperDateTime } from "@/lib/TimeCalculations";
import Timer from "./Timer";
import Submitted from "./Submitted";

export default function PaperContainer({}) {
  const router = useRouter();
  const { student, paper } = router.query;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [paperDetails, setPaperDetails] = useState({});
  /* 
    inside useeffect 
    fetch paper questions from backend
    shuffle them for each student, and store them in local storage
    and set them equal to a state
    */

  useEffect(() => {
    if (localStorage.getItem("localCurrent")) {
      console.log(`local current is ${localStorage.getItem("localCurrent")}`);
      setCurrentQuestion(parseInt(localStorage.getItem("localCurrent")));
    }
  }, []);

  const shuffleArray = (array) => {
    // Create a copy of the original array
    const shuffledArray = [...array];
    // Shuffle the array using the Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // function to store the currentQuestion value in local storage on change
  const setCurrentAndLocal = (newValue) => {
    setCurrentQuestion(newValue);
    localStorage.setItem("localCurrent", newValue);
    console.log(
      `current question is ${newValue} and local current is ${localStorage.getItem(
        "localCurrent"
      )}`
    );
  };

  /* 
    first load
    local storage is empty
    get questions from api, shuffle them, and store them in local storage

    not first load
    local storage is not empty
    get questions from local storage,

    to check whether a random load is first or not
    check if local storage is empty or not

    if local storage is empty, then it is first load
    if local storage is not empty, then it is not first load
   */

  useEffect(() => {
    if (student && paper) {
      // get paper here and if paper is live, only then set questions
      axios
        .get(`/api/paper/${paper}`)
        .then((res) => {
          console.log(res.data);
          // if (compareDateTime(res.data.date, res.data.duration) === "live") {
          if (
            compareDateTime(
              res.data.date,
              getPaperDateTime(res.data.date, res.data.duration).end
            ) === "live"
          ) {
            setPaperDetails(res.data);
            let isObjective;
            res.data.paper_type === "Objective"
              ? (isObjective = true)
              : (isObjective = false);

            // apply checks here, and then call apis

            if (localStorage.getItem("paperQuestions")) {
              // not first time
              const storedQuestions = JSON.parse(
                localStorage.getItem("paperQuestions")
              );
              setQuestions(storedQuestions);
              console.log(
                `not the first time, stored questions are `,
                storedQuestions
              );
            } else {
              // first time
              axios
                .get(`/api/student/paper/${isObjective ? "oq" : "sq"}/${paper}`)
                .then((res) => {
                  console.log("questions are", res.data);
                  const randomizedQuestions = shuffleArray(res.data);
                  localStorage.setItem(
                    "paperQuestions",
                    JSON.stringify(randomizedQuestions)
                  );
                  localStorage.setItem("localCurrent", 0);
                  setQuestions(randomizedQuestions);
                  console.log(
                    `first time, randomized questions are `,
                    randomizedQuestions
                  );
                })
                .catch((err) => {
                  console.log("error ", err.message);
                });
            }
            // axios
            //   .get(`/api/student/paper/${isObjective ? "oq" : "sq"}/${paper}`)
            //   .then((res) => {
            //     console.log("questions are", res.data);
            //     setQuestions(randomizedQuestions);
            //   })
            //   .catch((err) => {
            //     console.log("error ", err.message);
            //   });
          } else {
            router.push(`/student/${student}`);
          }
        })
        .catch((err) => {
          console.log("error ", err.message);
        });
    }
  }, [paper]);

  return (
    <div className="flex justify-center mx-auto w-3/4 font-poppins mt-28 space-x-20">
      <div className="w-2/3">
        {currentQuestion === questions.length ? (
          <Submitted />
        ) : paperDetails.paper_type === "Objective" ? (
          <OQContainer
            question={questions[currentQuestion]}
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentAndLocal}
            freeFlow={paperDetails.freeflow}
          />
        ) : (
          <SQContainer
            question={questions[currentQuestion]}
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentAndLocal}
            freeFlow={paperDetails.freeflow}
          />
        )}
      </div>
      <div className="w-1/3 max-w-fit shadow-lg h-fit border-2 border-zinc-100 rounded-md p-10">
        <Timer paper={paperDetails} />
        {paperDetails.freeflow && currentQuestion < questions.length && (
          <NavigationGrid
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentAndLocal}
          />
        )}
      </div>
    </div>
  );
}
