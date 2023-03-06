import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import OQContainer from "./Objective/OQContainer";
import SQContainer from "./Subjective/SQContainer";
import { useSession } from "next-auth/react";
import NavigationGrid from "./NavigationGrid";
import { compareDateTime, getPaperDateTime } from "@/lib/TimeCalculations";
import Timer from "./Timer";
import Submitted from "./Submitted";

export default function PaperContainer({}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { paper } = router.query;
  const [questions, setQuestions] = useState([]);
  const [student, setStudent] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [paperDetails, setPaperDetails] = useState({});
  const [objectiveCount, setObjectiveCount] = useState(0);
  const [flags, setFlags] = useState([]);

 
  useEffect(() => {
    if (paper) {
      let papers = JSON.parse(localStorage.getItem("papers") || "{}");
      if (papers[paper]?.current) {
        console.log("setting current", papers[paper].current);
        setCurrentQuestion(papers[paper].current);
      }
      
    }
  }, [paper]);

  useEffect(() => () => {
    if (status === "authenticated") {
      setStudent(session.user.id);
    }
  });
  [session];

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

  const setCurrentAndLocal = (newValue) => {
    let papers = JSON.parse(localStorage.getItem("papers") || "{}");

    setCurrentQuestion(newValue);
    papers[paper].current = newValue;
    localStorage.setItem("papers", JSON.stringify(papers));
  };

  useEffect(() => {
    if (student && paper) {
      // get paper here and if paper is live, only then set questions
      let papers = JSON.parse(localStorage.getItem("papers") || "{}");

      if (papers[paper]) {
        console.log(
          "paper exists in local storage, getting from there",
          papers[paper]
        );
        // paper exists
        setQuestions([
          ...(papers[paper].objectiveQuestions || []),
          ...(papers[paper].subjectiveQuestions || []),
        ]);
        setObjectiveCount(papers[paper].objectiveCount || 0);
        setFlags(papers[paper].flags || []);
        setPaperDetails(papers[paper]);
      } else {
        // do below logic
console.log(
          "paper does not exist in local storage, getting from server" 
)
        // get paper details
        axios
          .get(`/api/paper/${paper}`)
          .then((res) => {
            // push the paper id in papers index array
            const currentPaper = res.data;
            // if paper is live get paper
            if (currentPaper) {
              papers[paper] = currentPaper;
              localStorage.setItem("papers", JSON.stringify(papers));
              setPaperDetails(res.data);

              // get objective questions
              axios
                .get(`/api/student/paper/oq/${paper}`)
                .then((res) => {
                  const randomizedQuestions = shuffleArray(res.data);
                  // set objective questions in array and local current, both in value of the paper_id key
                  papers[paper].objectiveQuestions = randomizedQuestions;
                  papers[paper].current = 0;
                  papers[paper].objectiveCount = randomizedQuestions.length;
                  localStorage.setItem("papers", JSON.stringify(papers));
                  setObjectiveCount(randomizedQuestions.length);

                  // if paper is not objective
                  if (currentPaper.paper_type !== "Objective") {
                    // get subjective questions
                    axios
                      .get(`/api/student/paper/sq/${paper}`)
                      .then((res) => {
                        const subjectiveQuestions = res.data;
                        let subjectiveWithChild = [];
                        subjectiveQuestions.forEach((question) => {
                          if (question.parent_sq_id) {
                            const parent = subjectiveQuestions.find(
                              (q) => q.sq_id === question.parent_sq_id
                            );
                            let children = [];
                            if (parent) {
                              children = parent.children || [];
                              children.push(question);
                              parent.children = children;
                            }
                          } else {
                            subjectiveWithChild.push(question);
                          }
                        });
                        console.log("after sorting", subjectiveWithChild);
                        papers[paper].subjectiveQuestions = subjectiveWithChild;
                        localStorage.setItem("papers", JSON.stringify(papers));
                        setQuestions(
                          [
                            ...papers[paper].objectiveQuestions,
                            ...papers[paper].subjectiveQuestions,
                          ] || []
                        );
                      })
                      .catch((err) => {
                        console.log("error ", err.message);
                      });
                  }
                })
                .catch((err) => {
                  console.log("error ", err.message);
                });
            }
            // if paper is not live, push back to papers list
            else {
              router.push(`/student`);
            }
          })
          .catch((err) => {
            console.log("error ", err.message);
          });
      }
    }
  }, [paper, student]);

  return (
    <div className="flex justify-between shadow-lg max-w-5xl font-poppins mt-28 mx-20 xl:mx-auto pt-20 pb-10 px-10 gradient rounded-2xl shadow-3xl shadow-black">
      <div className="w-2/3  rounded-l-2xl">
        {currentQuestion === questions.length ? (
          <Submitted />
        ) : paperDetails.paper_type === "Objective" ? (
          <OQContainer
            question={questions[currentQuestion]}
            totalQuestions={questions.length}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentAndLocal}
            freeFlow={paperDetails.freeflow}
            flags={flags || []}
            setFlags={setFlags}
          />
        ) : (
          <>
            {currentQuestion < objectiveCount ? (
              <OQContainer
                question={questions[currentQuestion]}
                totalQuestions={questions.length}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentAndLocal}
                freeFlow={paperDetails.freeflow}
                flags={flags || []}
                setFlags={setFlags}
              />
            ) : (
              <SQContainer
                question={questions[currentQuestion]}
                totalQuestions={questions.length}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentAndLocal}
                freeFlow={paperDetails.freeflow}
                flags={flags || []}
                setFlags={setFlags}
              />
            )}
          </>
        )}
      </div>
      <div className="w-1/3 max-w-xs shadow-lg h-fit border-2 border-zinc-100 bg-white p-8 shadow-black">
        <Timer paper={paperDetails} />
        {(paperDetails.freeflow ||
          (paperDetails.paper_type !== "Objective" &&
            currentQuestion >= objectiveCount)) &&
          currentQuestion < questions.length && (
            <NavigationGrid
              totalQuestions={
                paperDetails.freeflow
                  ? questions.length
                  : questions.length - objectiveCount
              }
              currentQuestion={
                paperDetails.freeflow
                  ? currentQuestion
                  : currentQuestion - objectiveCount
              }
              freeFlow={paperDetails.freeflow}
              offset={objectiveCount}
              setCurrentQuestion={setCurrentAndLocal}
              flags={flags || []}
              setFlags={setFlags}
            />
          )}
      </div>
    </div>
  );
}
