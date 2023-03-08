import AdminPanel from "@/components/AdminPanel";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */

export default function Index() {
  const [faculty_data, setFacultyData] = useState([]);
  const [courses_data, setCoursesData] = useState([]);
  const [student_data, setStudentData] = useState([]);
  const [exams_data, setExamsData] = useState([]);


  const fetchData = async () => {
    const faculty = await axios.get("/api/admin/faculty/get_faculty");
    const courses = await axios.get("/api/admin/course/get_courses");
    const student = await axios.get("/api/admin/student/get_student");

    const exams = await axios.get("/api/admin/get_exams");

    setFacultyData(faculty.data);
    setCoursesData(courses.data);
    setStudentData(student.data);
    setExamsData(exams.data);
  }


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <BaseLayout title={"Admin Panel"}>
      <DashboardLayout admin>
        {faculty_data && courses_data && student_data && exams_data &&
          <AdminPanel
            faculty_data={faculty_data}
            courses_data={courses_data}
            student_data={student_data}
            exams_data={exams_data}
          />
        }
      </DashboardLayout>
    </BaseLayout>
  );
}
