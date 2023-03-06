import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import Exam from "@/components/Exam/Exam";
import React, { useEffect } from "react";
import axios from "axios";

export default function ExamPage({
  examDetails,
  objectiveQuestions,
  subjectiveQuestions,
}) {
  useEffect(() => {
    console.log(examDetails);
  }, []);
  return (
    <BaseLayout title={"Exam | " + examDetails.paper_name}>
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

export const getServerSideProps = async (context) => {
  const exam_id = context.params.exam_id;
  const examDetails = await axios.post("/api/faculty/get_exam", {
    paper_id: exam_id,
  });

  const objectiveQuestions = await axios.post("/api/faculty/get_objective", {
    paper_id: exam_id,
  });

  let subjectiveQuestions = [];

  if (examDetails.data.paper_type === "Subjective/Objective") {
    const res = await axios.post("/api/faculty/get_subjective", {
      paper_id: exam_id,
    });
    subjectiveQuestions = res.data;
  }

  return {
    props: {
      examDetails: examDetails.data,
      objectiveQuestions: objectiveQuestions.data,
      subjectiveQuestions: subjectiveQuestions,
    },
  };
};
