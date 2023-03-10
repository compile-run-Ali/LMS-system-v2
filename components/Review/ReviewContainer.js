import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { compareDateTime, getPaperDateTime } from "@/lib/TimeCalculations";
import ObjectiveReview from "./ObjectiveReview";
import PaperDetails from "./PaperDetails";
import { useSession } from "next-auth/react";

export default function ReviewContainer() {
  const router = useRouter();
  const { paper } = router.query;
  const { data: session, status } = useSession();
  const [student, setStudent] = useState(null);
  const [objectiveAnswers, setObjectiveAnswers] = useState([]);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState([]);
  const [objectiveQuestions, setObjectiveQuestions] = useState([]);
  const [paperDetails, setPaperDetails] = useState({});

  useEffect(() => {
    if (status === "authenticated") {
      setStudent(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    console.log("student and paper are ", student, paper);
    if (student && paper) {
      console.log("inside if");
      axios
        .get(`/api/student/paper/${student}`)
        .then((res) => {
          const requestedPaper = res.data.find(
            (paperObj) => paperObj.paper_id === paper
          );
          setPaperDetails(requestedPaper);
          if (requestedPaper) {
            // paper exists
            const paperDateTime = getPaperDateTime(
              requestedPaper.date,
              requestedPaper.duration
            );
            const paperStatus = compareDateTime(
              paperDateTime.start,
              paperDateTime.end
            );
            if (paperStatus === "past") {
              // paper is past
              const isObjective = requestedPaper.paper_type === "Objective";
              // get all the OBJECTIVE questions of that paper
              axios
                .get(`/api/student/paper/oq/${paper}`)
                .then((res) => {
                  const receivedQuestions = res.data;
                  setObjectiveQuestions(receivedQuestions);
                  // for each question, fetch an answer of the student
                  receivedQuestions.forEach((question) => {
                    axios
                      .get(
                        `/api/student/paper/oq/get/${student}/${question.oq_id}`,
                        {
                          params: {
                            p_number: student,
                            oq_id: question.oq_id,
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data) {
                          setObjectiveAnswers((prev) => {
                            if (prev.indexOf(response.data) === -1) {
                              return [...prev, response.data];
                            }
                            return prev;
                          });
                        }
                      })
                      .catch((error) => {
                        console.log("error in fetching answer", error.message);
                      });
                  });
                })
                .catch((err) => {
                  console.log("error in fetching questions", err.message);
                });

              if (!isObjective) {
                // get all the SUBJECTIVE questions of that paper
                // axios.get(
                //   `/api/student/paper/sq/${paper}`
                // ).then(
                //   (res) => {
                //     const receivedQuestions = res.data;
                //     setObjectiveQuestions(receivedQuestions);
                //     // for each question, fetch an answer of the student
                //     receivedQuestions.forEach((question) => {
                //       axios
                //         .get(
                //           `/api/student/paper/${
                //             isObjective ? "oq" : "sq"
                //           }/get/${student}/${question.oq_id}`,
                //           {
                //             params: {
                //               p_number: student,
                //               oq_id: question.oq_id,
                //             },
                //           }
                //         )
                //         .then((response) => {
                //           if (response.data) {
                //             setObjectiveAnswers((prev) => {
                //               if (prev.indexOf(response.data) === -1) {
                //                 return [...prev, response.data];
                //               }
                //               return prev;
                //             });
                //           }
                //         })
                //         .catch((error) => {
                //           console.log("error in fetching answer", error.message);
                //         });
                //     });
                //   }
                // )
              }
            } else router.push(`/student`);
            // setRedirect404(true);
          } else router.push(`/student`);
        })
        .catch((err) => {
          console.log("error in fetching paper ", err);
        });
    }
  }, [paper, student]);

  return (
    <div className="w-full mx-auto  max-w-6xl">
      <h1 className=" font-bold text-3xl  mt-10 mb-4">Paper Review</h1>
      <PaperDetails paper={paperDetails} />
      <ObjectiveReview
        questions={objectiveQuestions}
        answers={objectiveAnswers}
      />
      {!paper?.paper_type === "Objective" && <>subjective review here</>}
    </div>
  );
}
