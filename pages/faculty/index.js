import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import DashboardComponent from "@/components/DashboardComponent/DashboardComponent";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const session = useSession();
  const [exams, setExams] = useState(null);
  const [paperapproval, setPaperApproval] = useState(null);

  const fetchExams = async () => {
    const res = await axios.post("http://localhost:3000/api/faculty/get_exams", {
      faculty_id: session.data.user.id,
    });
    setExams(res.data.courses);
    setPaperApproval(res.data.paperapproval);
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchExams();
    }
  }, [session]);
  return (
    <BaseLayout title={"Dashboard"}>
      <DashboardLayout>
        <DashboardComponent
          exams_data={exams}
          paperapproval_data={paperapproval}
        />
      </DashboardLayout>
    </BaseLayout>
  );
}
