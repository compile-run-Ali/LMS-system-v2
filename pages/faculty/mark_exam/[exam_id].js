import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import MarkingDashboard from "@/components/MarkingDashboard/MarkingDashboard";
import axios from "axios";

const MarkingPage = ({ students, exam_id }) => {
  const [students_data, setStudentsData] = useState([]);

  useEffect(() => {
    if (students !== undefined && students.length > 0 && students !== null) {
      setStudentsData(students);
    }
  }, [students]);

  return (
    <BaseLayout title={"Mark Exam"}>
      <DashboardLayout>
        <MarkingDashboard students_data={students} exam_id={exam_id} />
      </DashboardLayout>
    </BaseLayout>
  );
};

export const getServerSideProps = async (context) => {
  const students = await axios.post(
    "http://localhost:3000/api/paper/marking/get_students",
    {
      paper_id: context.query.exam_id,
    }
  );

  let students_data = [];
  if (students.data.course && students.data.course.students.length > 0) {
    students_data = students.data.course.students.map(
      (student) => student.student
    );
  }
  return {
    props: {
      students: students_data,
      exam_id: context.query.exam_id,
    },
  };
};

export default MarkingPage;
