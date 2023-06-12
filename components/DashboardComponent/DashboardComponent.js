import React, { useState, useEffect } from "react";
import ExamTable from "./ExamTable";
import Modal from "./Subcomponents/Modal";
import { useSession } from "next-auth/react";

export default function DashboardComponent({
  exams_data,
  paperapproval_data,
  level,
}) {
  const [open, setOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [paperapproval, setPaperApproval] = useState([]);
  const session = useSession();
  const facultyId = session.data.user.id;

  useEffect(() => {
    if (
      exams_data !== undefined &&
      exams_data !== null &&
      exams_data.length > 0
    ) {
      const sortedExams = exams_data.sort((a, b) =>
        a.course.course_name.localeCompare(b.course.course_name)
      );
      setCourses(sortedExams);
      setSelectedCourse(sortedExams[0].course.course_code);
      setExams(sortedExams[0].course.paper);
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
          {courses && courses.length > 0 ? (
            courses
              .sort((a, b) =>
                a.course.course_name.localeCompare(b.course.course_name)
              )
              .map((course, index) => (
                <option key={index} value={course.course.course_code}>
                  {course.course.course_code} - {course.course.course_name}
                </option>
              ))
          ) : (
            <option value="">No Courses</option>
          )}
        </select>
      </div>
      {courses.length > 0 && level < 3 && (
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
        </div>
      )}
      {paperapproval_data && paperapproval_data.length > 0 && (
        <div className="pr-10 pl-5 my-10">
          <h1 className="text-2xl font-poppins font-bold">To Approve:</h1>
          <ExamTable
            approve_row={true}
            exams_data={paperapproval.filter(
              (paper) => paper.status === "Pending Approval"
            )}
          />
        </div>
      )}
      {
        <div>
          <div className="pr-10 pl-5 mt-10">
            <h1 className="text-2xl font-poppins font-bold">
              {level < 3 ? "Previous" : "Approved"} Exams of {selectedCourse}
            </h1>
            <ExamTable
              isPrevious={true}
              exams_data={exams.filter(
                (paper) =>
                  (level < 3 &&
                    paper.status !== "Pending Approval" &&
                    paper.status !== "Draft") ||
                  (level > 2 && paper.status === "Approved")
              )}
            />
          </div>

          {level < 2 && (
            <div className="pr-10 pl-5 mt-10">
              <h1 className="text-2xl font-poppins font-bold">
                Open Exams of {selectedCourse}
              </h1>
              <ExamTable
                exams_data={exams.filter(
                  (paper) =>
                    (facultyId !== paper.examofficer?.faculty_id &&
                      paper.status === "Pending Approval") ||
                    paper.status === "Draft"
                )}
              />
            </div>
          )}
        </div>
      }
    </div>
  );
}
