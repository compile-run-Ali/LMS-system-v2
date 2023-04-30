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
import CommentBox from "@/components/Review/CommentBox";

const Index = () => {
  const router = useRouter();
  const [subjectiveQuestions, setSubjectiveQuestions] = useState([]);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState([]);
  const [paperDetails, setPaperDetails] = useState({});
  const [objectiveQuestions, setObjectiveQuestions] = useState([]);
  const [objectiveAnswers, setObjectiveAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bottom, setBottom] = useState(false);

  const { exam_id, p_number } = router.query;

  useEffect(() => {
    setTimeout(() => {
      if (router.isReady) {
        if (router.query.action) {
          console.log("scrolling to bottom", router.query.action);
          setBottom(true);
        }
      }
    }, 500); // wait 500ms before executing the function
  }, [router]);
  useEffect(() => {
    if (bottom) {
      scrollToBottom();
    }
  }, [bottom]);
  const scrollToBottom = () => {
    const height = document.documentElement.scrollHeight; // use documentElement instead of body
    window.scrollBy({
      top: height,
      behavior: "smooth",
    });
  };

  const fetchObjectiveAttempts = async () => {
    let questions = objectiveQuestions.map((question) => question.oq_id);
    const res = await axios.post(`/api/student/paper/oq/get_questions`, {
      p_number: p_number,
      questions: questions,
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
        console.log("paper details fetched successfully");
        setLoading(false);

        setPaperDetails(res.data);
        setObjectiveQuestions(res.data.objective_questions);
        if (paperDetails.paper_type !== "Objective") {
          setSubjectiveQuestions(res.data.subjective_questions);
        }
      })
      .catch((err) => {
        console.log("error in fetching paper details", err.message);
      });
  };

  useEffect(() => {
    if (exam_id && p_number) {
      fetchPaperDetails();
    }
  }, [exam_id, p_number, router]);

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

              <CommentBox student={p_number} paper={exam_id} />

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
