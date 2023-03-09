import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import AnswersTable from "@/components/MarkingDashboard/AnswersTable";
import PaperDetails from "@/components/Review/PaperDetails";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const [attempts, setAttempts] = useState([]);
  const [paperDetails, setPaperDetails] = useState({});

  const { exam_id, p_number } = router.query;

  const fetchAttempts = async () => {
    const attempts = await axios.post(
      "/api/paper/marking/get_student_attempts",
      {
        paper_id: exam_id,
        p_number: p_number,
      }
    );
    setAttempts(attempts.data);
  };

  const fetchPaperDetails = () => {
    const { data: paper } = axios
      .get("/api/paper/get_paper", {
        params: {
          paper_id: exam_id,
        },
      })
      .then((res) => {
        setPaperDetails(res.data[0]);
      })
      .catch((err) => {
        console.log("error in fetching paper details", err.message);
      });
  };

  useEffect(() => {
    if (exam_id && p_number) {
      fetchAttempts();
      fetchPaperDetails();
    }
  }, [exam_id, p_number]);
  return (
    <div>
      <BaseLayout title={"Mark Exam"}>
        <DashboardLayout>
          <PaperDetails paper={paperDetails} isFaculty={true} />
          <pre>{JSON.stringify(paperDetails, null, 2)}</pre>
          show
          <AnswersTable attempts_data={attempts} />
        </DashboardLayout>
      </BaseLayout>
    </div>
  );
};

export default Index;
