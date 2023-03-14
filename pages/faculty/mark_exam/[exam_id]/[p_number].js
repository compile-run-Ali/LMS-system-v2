import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import AnswersTable from "@/components/MarkingDashboard/AnswersTable";
import PaperDetails from "@/components/Review/PaperDetails";
import axios from "axios";
import ObjectiveReview from "@/components/Review/ObjectiveReview";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MarkPaper from "@/components/MarkingDashboard/MarkPaper";
import Loader from "@/components/Loader";

const Index = () => {
  const router = useRouter();
  const [subjectiveQuestions, setSubjectiveQuestions] = useState([]);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState([]);
  const [paperDetails, setPaperDetails] = useState({});
  const [objectiveQuestions, setObjectiveQuestions] = useState([]);
  const [objectiveAnswers, setObjectiveAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { exam_id, p_number } = router.query;

  const fetchObjectiveAttempts = async () => {
    let question = objectiveQuestions.map((question) => question.oq_id);
    const res = await axios.post(`/api/student/paper/oq/get_questions`, {
      p_number: p_number,
      question: question,
    });

    setObjectiveAnswers(res.data);
  };

  const fetchSubjectiveAttempts = async () => {
    let question = subjectiveQuestions.map((question) => question.sq_id);
    const res = await axios.post("/api/paper/marking/get_student_attempts", {
      question: question,
      p_number: p_number,
    });

    setSubjectiveAnswers(res.data);
  };

  const fetchPaperDetails = async () => {
    await axios
      .get("/api/paper/get_paper", {
        params: {
          paper_id: exam_id,
        },
      })
      .then((res) => {
        console.log("paper details fetched successfully", res.data);
        setLoading(false);

        setPaperDetails(res.data);
        setObjectiveQuestions(res.data.objective_questions);
        if (paperDetails.paper_type !== "Objective") {
          setSubjectiveQuestions(res.data.subjective_questions);
        }
        console.log("paper details fetched successfully", res.data);
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
          {loading ? (
            <Loader />
          ) : (
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
              {paperDetails.paper_type !== "Objective" && (
                <AnswersTable
                  questions={subjectiveQuestions}
                  answers={subjectiveAnswers}
                />
              )}

              <MarkPaper
                objectiveAnswers={objectiveAnswers}
                subjectiveAnswers={subjectiveAnswers}
                objectiveQuestions={objectiveQuestions}
                subjectiveQuestions={subjectiveQuestions}
              />
            </div>
          )}
        </DashboardLayout>
      </BaseLayout>
    </div>
  );
};

export default Index;
