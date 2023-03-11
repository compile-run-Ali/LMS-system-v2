import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { compareDateTime, getPaperDateTime } from "@/lib/TimeCalculations";
import ObjectiveReview from "./ObjectiveReview";
import PaperDetails from "./PaperDetails";
import { useSession } from "next-auth/react";
import AnswersTable from "../MarkingDashboard/AnswersTable";

export default function ReviewContainer() {
  const router = useRouter();
  const { paper } = router.query;
  const { data: session, status } = useSession();
  const [student, setStudent] = useState(null);
  const [objectiveAnswers, setObjectiveAnswers] = useState([]);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState([]);
  const [objectiveQuestions, setObjectiveQuestions] = useState([]);
  const [subjectiveQuestions, setSubjectiveQuestions] = useState([]);
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
                axios.get(`/api/student/paper/sq/${paper}`).then((res) => {
                  const receivedQuestions = res.data;
                  setSubjectiveQuestions(receivedQuestions);
                  // for each question, fetch an answer of the student
                  receivedQuestions.forEach((question) => {
                    axios
                      .get("/api/paper/marking/get_student_attempts", {
                        params: {
                          sq_id: question.sq_id,
                          p_number: student,
                        },
                      })
                      .then((res) => {
                        if (res) {
                          setSubjectiveAnswers((prev) => {
                            if (prev.indexOf(res.data) === -1) {
                              return [...prev, res.data];
                            }
                            return prev;
                          });
                        }
                      })
                      .catch((err) => {
                        console.log(
                          "error in fetching subjective attempts",
                          err.message
                        );
                      });
                  });
                });
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

  console.log("subjective answer are", subjectiveAnswers);
  console.log("subjective qs are", subjectiveQuestions);

  return (
    <div className="w-full mx-auto  max-w-5xl font-poppins">
      <h1 className=" font-bold text-3xl  mt-10 mb-4">Paper Review</h1>
      <PaperDetails paper={paperDetails} />
      <ObjectiveReview
        questions={objectiveQuestions}
        answers={objectiveAnswers}
      />

      {paper.paper_type !== "Objective" && (
        <AnswersTable
          questions={subjectiveQuestions}
          answers={subjectiveAnswers}
          isStudent={true}
        />
      )}
    </div>
  );
}
