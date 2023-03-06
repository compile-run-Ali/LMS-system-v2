import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import AnswersTable from "@/components/MarkingDashboard/AnswersTable";
import axios from "axios";
import React from "react";

const Index = ({ attempts }) => {
  console.log(attempts);

  return (
    <div>
      <BaseLayout title={"Mark Exam"}>
        <DashboardLayout>
          <AnswersTable attempts_data={attempts} />
        </DashboardLayout>
      </BaseLayout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { exam_id, p_number } = context.params;

  const attempts = await axios.post("/api/paper/marking/get_student_attempts", {
    paper_id: exam_id,
    p_number: p_number,
  });
  return {
    props: {
      paper: exam_id,
      p_number: p_number,
      attempts: attempts.data,
    },
  };
}

export default Index;
