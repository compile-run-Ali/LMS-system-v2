import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import MarkingDashboard from "@/components/MarkingDashboard/MarkingDashboard";
import axios from "axios";

const MarkingPage = ({ students }) => {
  const [students_data, setStudentsData] = useState([]);

  useEffect(() => {
    if (students !== undefined && students.length > 0 && students !== null) {
      setStudentsData(students);
    }
  }, [students]);

  return (
    <BaseLayout title={"Mark Exam"}>
      <DashboardLayout>
        <MarkingDashboard students_data={students} />
      </DashboardLayout>
    </BaseLayout>
  );
};

export const getServerSideProps = async (context) => {
  const students = await axios.post(
    "http://localhost:3000/api/paper/marking/get_students",
    {
      paper_id: context.query.paper_id,
    }
  );
  return {
    props: {
      students: students.data,
    },
  };
};

export default MarkingPage;
