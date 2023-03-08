import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import MarkingDashboard from "@/components/MarkingDashboard/MarkingDashboard";
import axios from "axios";
import { useRouter } from "next/router";

const MarkingPage = () => {
  const router = useRouter()
  const [students_data, setStudentsData] = useState([]);
  const {exam_id} = router.query;

  const fetchStudents = async () => {
    const students = await axios.post("/api/paper/marking/get_students", {
      paper_id: context.query.exam_id,
    });
  
    let students_data = [];
    if (students.data.course && students.data.course.students.length > 0) {
      students_data = students.data.course.students.map(
        (student) => student.student
      );
    }
    setStudentsData(students_data);
  }


  useEffect(() => {
    if (students !== undefined && students.length > 0 && students !== null) {
    }
  }, [students]);

  return (
    <BaseLayout title={"Mark Exam"}>
      <DashboardLayout>
        <MarkingDashboard students_data={students_data} exam_id={exam_id} />
      </DashboardLayout>
    </BaseLayout>
  );
};

export default MarkingPage;
