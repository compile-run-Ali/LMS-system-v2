import React, { useState, useEffect } from "react";
import ExamTable from "./ExamTable";
import Modal from "./Subcomponents/Modal";

export default function DashboardComponent({ exams_data, paperapproval_data }) {
  const [open, setOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [paperapproval, setPaperApproval] = useState([]);

  useEffect(() => {
    if (
      exams_data !== undefined &&
      exams_data !== null &&
      exams_data.length > 0
    ) {
      setCourses(exams_data);
      setSelectedCourse(exams_data[0].course.course_code);
      setExams(exams_data[0].course.paper);
    }
    if (
      paperapproval_data !== undefined &&
      paperapproval_data !== null &&
      paperapproval_data.length > 0
    ) {
      setPaperApproval(paperapproval_data.map((paper) => paper.paper));
    }
  }, [exams_data, paperapproval_data]);

  const toggleModal = () => {
    //throw notification if no course is selected
    if (selectedCourse === "") {
      alert("Please select a course first");
      return;
    }
    setOpen(!open);
  };

  const handleCourseChange = (e) => {
    if (e.target.value === "") {
      setExams([]);
      return;
    }
    setSelectedCourse(e.target.value);
    const course = courses.find(
      (course) => course.course.course_code === e.target.value
    );
    setExams(course.course.paper);
  };

  return (
    <div>
      <div className="ml-6">
        <h1 className="text-2xl font-poppins font-bold">Courses List:</h1>
        <select
          className="bg-white border rounded-md px-3 py-2"
          onChange={handleCourseChange}
        >
          {/* <option value="" >
            Select Course
          </option> */}
          {courses.map((course, index) => (
            <option key={index} value={course.course.course_code}>
              {course.course.course_code} - {course.course.course_name}
            </option>
          ))}
        </select>
      </div>
      {courses.length > 0 && (
        <div>
          <div className="flex w-full justify-end pr-10 font-poppins">
            <button
              onClick={toggleModal}
              className="bg-blue-900 text-white border rounded-md px-3 py-2"
            >
              Create Paper
            </button>
          </div>
          <Modal open={open} setOpen={setOpen} courseCode={selectedCourse} />

          <div className="pr-10 pl-5">
            <ExamTable exams_data={exams} setExamsData={setExams} />
          </div>
        </div>
      )}

      {paperapproval_data !== undefined &&
        paperapproval_data !== null &&
        paperapproval_data.length > 0 && (
          <div className="pr-10 pl-5 mt-10">
            <h1 className="text-2xl font-poppins font-bold">
              Submitted For Approval:
            </h1>
            <ExamTable exams_data={paperapproval} />
          </div>
        )}
    </div>
  );
}
