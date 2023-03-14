import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import MarkingDashboard from "@/components/MarkingDashboard/MarkingDashboard";
import axios from "axios";
import { useRouter } from "next/router";

const MarkingPage = () => {
  const router = useRouter();
  const [students_data, setStudentsData] = useState([]);
  const { exam_id } = router.query;

  const fetchStudents = async () => {
    // first fetch students
    const studentsPromise = axios.post("/api/paper/marking/get_students", {
      paper_id: router.query.exam_id,
    });
    const promises = [studentsPromise];
    const [students] = await Promise.all(promises);

    console.log("exam id", exam_id);
    // now fetch spa and join it with students
    const studentSpaPromise = axios.post(
      "/api/student/paper/get_attempt_by_paper",
      {
        paperId: exam_id,
      }
    );

    const promises2 = [studentSpaPromise];
    const [studentSpa] = await Promise.all(promises2);
    console.log(
      "students data before joining with spa",
      studentSpa.data
    )

    // now join the two
    students.data.course.students.forEach((student) => {
      if (
        studentSpa.data.find(
          (spa) => spa.studentId === student.student.p_number
        )
      ) {
        student.student = {
          ...student.student,
          ...studentSpa.data.find(
            (spa) => spa.studentId === student.student.p_number
          ),
        };
      }
      else {
        student.student = {
          ...student.student,
          status: "Not Attempted",
          obtainedMarks: 0,
        };
      }
    });

    console.log(
      "students data after joining with spa",
      students.data.course.students
    );

    let students_data = [];
    if (students.data.course && students.data.course.students.length > 0) {
      students_data = students.data.course.students.map(
        (student) => student.student
      );
    }
    setStudentsData(students_data);
  };

  useEffect(() => {
    if (exam_id) {
      fetchStudents();
    }
  }, [exam_id]);

  return (
    <BaseLayout title={"Mark Exam"}>
      <DashboardLayout>
        <MarkingDashboard students_data={students_data} exam_id={exam_id} />
      </DashboardLayout>
    </BaseLayout>
  );
};

export default MarkingPage;
