import AdminPanel from "@/components/AdminPanel";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */

export default function Index() {
  const [faculty_data, setFacultyData] = useState([]);
  const [courses_data, setCoursesData] = useState([]);
  const [student_data, setStudentData] = useState([]);
  const [exams_data, setExamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    axios
      .get("/api/admin/faculty/get_faculty")
      .then((res) => {
        setFacultyData(res.data);
        setLoading(false);
      })
      .catch((facultyError) => {
        console.log(
          "error in api: /api/admin/faculty/get_faculty",
          facultyError
        );
      });

    try {
      const courses = await axios.get("/api/admin/course/get_courses");
      setCoursesData(courses.data);
    } catch (coursesError) {
      console.log("error in api: /api/admin/course/get_courses", coursesError);
    }

    try {
      const student = await axios.get("/api/admin/student/get_student");
      setStudentData(student.data);
    } catch (studentError) {
      console.log(
        "error in api: /api/admin/student/get_students",
        studentError
      );
    }

    try {
      const exams = await axios.get("/api/admin/paper/get_exams");
      setExamsData(exams.data);
    } catch (examsError) {
      console.log("error in api: /api/admin/paper/get_exams", examsError);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BaseLayout title={"Admin Panel"}>
      <DashboardLayout admin>
        {loading ? (
          <Loader />
        ) : (
          <AdminPanel
            faculty_data={faculty_data}
            courses_data={courses_data}
            student_data={student_data}
            exams_data={exams_data}
          />
        )}
      </DashboardLayout>
    </BaseLayout>
  );
}
