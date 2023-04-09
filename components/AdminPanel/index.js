import Students from "./Subcomponents/Students";
import React, { useEffect, useState } from "react";
import ExamTable from "./Tables/ExamTable";
import Courses from "./Subcomponents/Courses";
import Faculty from "./Subcomponents/Faculty";
import Tabs from "./Subcomponents/Tabs";
import AssignedTable from "./Tables/AssignedTable";
import Loader from "../Loader";

export default function AdminPanel({
  faculty_data,
  courses_data,
  exams_data,
  student_data,
  loading,
  error,
}) {
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [active, setActive] = useState("Faculty");

  useEffect(() => {
    if ((faculty_data !== undefined, faculty_data !== null)) {
      setFaculty(faculty_data);
    }
    if ((courses_data !== undefined, courses_data !== null)) {
      setCourses(courses_data);
    }
    if ((exams_data !== undefined, exams_data !== null)) {
      setExams(exams_data);
    }
    if ((student_data !== undefined, student_data !== null)) {
      setStudents(student_data);
    }
  }, [faculty_data, courses_data, exams_data, student_data]);

  return (
    <div className="w-full pr-10 mt-5 px-5">
      <Tabs active={active} setActive={setActive} />

      {active === "Faculty" && (
        <>
          {loading.faculty ? (
            <Loader />
          ) : (
            <Faculty faculty={faculty} setFaculty={setFaculty} />
          )}
        </>
      )}

      {active === "Students" && (
        <>
          {loading.student ? (
            <Loader />
          ) : (
            <Students students={students} setStudents={setStudents} />
          )}
        </>
      )}

      {active === "Courses" && (
        <>
          {loading.courses ? (
            <Loader />
          ) : (
            <Courses
              courses={courses}
              setCourses={setCourses}
              faculty={faculty}
            />
          )}
        </>
      )}

      {active === "Assigned" && (
        <>
          {loading.courses ? (
            <Loader />
          ) : (
            <AssignedTable course_data={courses} />
          )}
        </>
      )}

      {active === "Exams" && (
        <>
          {loading.exams ? (
            <Loader />
          ) : (
            <ExamTable exams_data={exams} faculty={faculty} />
          )}
        </>
      )}
    </div>
  );
}
