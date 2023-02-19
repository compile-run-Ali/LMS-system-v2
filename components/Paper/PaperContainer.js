import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import OQContainer from "./Objective/OQContainer";
import SQContainer from "./Subjective/SQContainer";
import NavigationGrid from "./NavigationGrid";
import { compareDateTime, getPaperDateTime } from "@/lib/TimeCalculations";
import Timer from "./Timer";

export default function PaperContainer({}) {
  const router = useRouter();
  const { student, paper } = router.query;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [paperDetails, setPaperDetails] = useState({});
  /* 
    inside useeffect 
    fetch paper questions from backend
    and set them equal to a state
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

            axios
              .get(`/api/student/paper/${isObjective ? "oq" : "sq"}/${paper}`)
              .then((res) => {
                console.log("questions are", res.data);
                setQuestions(res.data);
              })
              .catch((err) => {
                console.log("error ", err.message);
              });
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
    <div>
      <div className="flex">
        <div className="w-2/3 bg-blue-700 flex flex-col justify-between">
          {paperDetails.paper_type === "Objective" ? (
            <OQContainer
              question={questions[currentQuestion]}
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              freeFlow={paperDetails.freeflow}
            />
          ) : (
            <SQContainer
              question={questions[currentQuestion]}
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              freeFlow={paperDetails.freeflow}
            />
          )}
        </div>
        <div className="w-1/3">
          <Timer paper={paperDetails} />
          {paperDetails.freeflow && (
            <NavigationGrid
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            />
          )}{" "}
        </div>
      </div>
    </div>
  );
}
