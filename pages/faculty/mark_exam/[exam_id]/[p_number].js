import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import AnswersTable from "@/components/MarkingDashboard/AnswersTable";
import PaperDetails from "@/components/Review/PaperDetails";
import axios from "axios";
import ObjectiveReview from "@/components/Review/ObjectiveReview";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MarkPaper from "@/components/MarkingDashboard/MarkPaper";

const Index = () => {
  const router = useRouter();
  const [subjectiveQuestions, setSubjectiveQuestions] = useState([]);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState([]);

  const [paperDetails, setPaperDetails] = useState({});
  const [objectiveQuestions, setObjectiveQuestions] = useState([]);
  const [objectiveAnswers, setObjectiveAnswers] = useState([]);

  const { exam_id, p_number } = router.query;

  const fetchObjectiveAttempts = () => {
    objectiveQuestions.forEach((question) => {
      axios
        .get(`/api/student/paper/oq/get/${p_number}/${question.oq_id}`, {
          params: {
            p_number: p_number,
            oq_id: question.oq_id,
          },
        })
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
  };

  const fetchSubjectiveAttempts = () => {
    subjectiveQuestions.forEach((question) => {
      axios
        .get("/api/paper/marking/get_student_attempts", {
          params: {
            sq_id: question.sq_id,
            p_number: p_number,
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
          console.log("error in fetching subjective attempts", err.message);
        });
    });
  };

  const fetchPaperDetails = async () => {
    await axios
      .get("/api/paper/get_paper", {
        params: {
          paper_id: exam_id,
        },
      })
      .then((res) => {
        setPaperDetails(res.data[0]);
        setObjectiveQuestions(res.data[0].objective_questions);
        setSubjectiveQuestions(res.data[0].subjective_questions);
      })
      .catch((err) => {
        console.log("error in fetching paper details", err.message);
      });
  };

  useEffect(() => {
    if (exam_id && p_number) {
      fetchPaperDetails();
    }
  }, [exam_id, p_number]);

  useEffect(() => {
    fetchObjectiveAttempts();
    fetchSubjectiveAttempts();
  }, [objectiveQuestions, subjectiveQuestions]);

  return (
    <div>
      <BaseLayout title={"Mark Exam"}>
        <DashboardLayout>
          <div className="px-20">
            <PaperDetails
              paper={paperDetails}
              isFaculty={true}
              studentId={p_number}
            />
            <ObjectiveReview
              questions={objectiveQuestions}
              answers={objectiveAnswers}
            />
            <AnswersTable
              questions={subjectiveQuestions}
              answers={subjectiveAnswers}
            />
            <MarkPaper
              objectiveAnswers={objectiveAnswers}
              subjectiveAnswers={subjectiveAnswers}
              objectiveQuestions={objectiveQuestions}
              subjectiveQuestions={subjectiveQuestions}
            />
          </div>
        </DashboardLayout>
      </BaseLayout>
    </div>
  );
};

export default Index;
