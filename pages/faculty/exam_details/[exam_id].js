import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import Exam from "@/components/Exam/Exam";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ExamPage() {
  const router = useRouter();
  const { exam_id } = router.query;
  const [examDetails, setExamDetails] = useState(null);
  const [objectiveQuestions, setObjectiveQuestions] = useState(null);
  const [subjectiveQuestions, setSubjectiveQuestions] = useState(null);

  const fetchExam = async () => {
    const examDetails = await axios.post("/api/faculty/get_exam", {
      paper_id: exam_id,
    });

    setExamDetails(examDetails.data);

    const objectiveQuestions = await axios.post("/api/faculty/get_objective", {
      paper_id: exam_id,
    });

    setObjectiveQuestions(objectiveQuestions.data);

    let subjectiveQuestions = [];

    if (examDetails.data.paper_type === "Subjective/Objective") {
      const res = await axios.post("/api/faculty/get_subjective", {
        paper_id: exam_id,
      });
      subjectiveQuestions = res.data;
    }

    setSubjectiveQuestions(subjectiveQuestions);
  };

  useEffect(() => {
    if(exam_id) {

      fetchExam();
      console.log("exam details are", examDetails);
    }
  }, [exam_id]);
  return (
    <BaseLayout title={"Exam | " + examDetails?.paper_title}>
      <DashboardLayout>
        {examDetails && (
          <Exam
            exam={examDetails}
            objectiveQuestions={objectiveQuestions}
            subjectiveQuestions={subjectiveQuestions}
            isEdit={true}
          />
        )}
      </DashboardLayout>
    </BaseLayout>
  );
}
