import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import AnswersTable from "@/components/MarkingDashboard/AnswersTable";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  const [attempts, setAttempts] = React.useState([]);
  const { exam_id, p_number } = router.query;

  const fetchAttempts = async () => {
    const attempts = await axios.post("/api/paper/marking/get_student_attempts", {
      paper_id: exam_id,
      p_number: p_number,
    });
    setAttempts(attempts.data);
  }

  useEffect(() => {
    fetchAttempts();
  }, []);
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
