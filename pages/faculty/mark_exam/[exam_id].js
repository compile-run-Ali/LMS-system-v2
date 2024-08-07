import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import MarkingDashboard from "@/components/MarkingDashboard/MarkingDashboard";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const MarkingPage = () => {
  const router = useRouter();
  const [studentsData, setStudentsData] = useState([]);
  const [exam, setExam] = useState({});
  const [loading, setLoading] = useState(true);

  const { exam_id,selectedCourse } = router.query;
  console.log(selectedCourse,"selectedCourse")

  const fetchStudents = async () => {
    // first fetch students
    const course=localStorage.getItem("selectedCourse");
    console.log(course, "course")
    const studentsPromise = axios.post("/api/paper/marking/get_student_by_course", {
      paper_id: router.query.exam_id,
      course_code: course
    });
    const promises = [studentsPromise];
    const [students] = await Promise.all(promises);

    // now fetch spa and join it with students
    const studentSpaPromise = axios.post(
      "/api/student/paper/get_attempt_by_paper",
      {
        paperId: exam_id,
        selectedCourse: selectedCourse,
      }
    );

    const promises2 = [studentSpaPromise];
    const [studentSpa] = await Promise.all(promises2);

    // now join the two
    console.log(students)
    students.data.forEach((student) => {
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
      } else {
        student.student = {
          ...student.student,
          status: "Not Attempted",
          obtainedMarks: 0,
        };
      }
    });
    console.log(students, "students")

    setStudentsData(students.data);
    setLoading(false);
  };

  const fetchExamDetails = () => {
    axios
      .post("/api/faculty/get_exam", {
        paper_id: exam_id,
      })
      .then((response) => {
        setExam(response.data);
      })
      .catch((error) => {
        console.log("Error in get_exams", error);
      });
  };

  useEffect(() => {
    if (exam_id) {
      fetchStudents();
      fetchExamDetails();
    }
  }, [exam_id]);
  console.log(studentsData, "studentsData")
  return (
    <BaseLayout title={"Mark Exam"}>
      <DashboardLayout>
        {loading && !selectedCourse ? (
          <Loader />
        ) : (
          <MarkingDashboard
            students_data={studentsData}
            exam_id={exam_id}
            exam={exam}
            selectedCourse={selectedCourse}
          />
        )}
      </DashboardLayout>
    </BaseLayout>
  );
};

export default MarkingPage;
