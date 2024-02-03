import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import Spinner from "../Loader/Spinner";
import Loader from "../Loader";
import { useSession } from "next-auth/react";

const G2OfficerDashboard = () => {
  const session = useSession();

  const [exams, setExams] = useState([]);
  const [spinning, setSpinner] = useState({});
  const [loading, setLoading] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null); // [course_code, course_name
  const [courses, setCourses] = useState(null);
  
  useEffect(() => {
    if(selectedCourse !== "" && selectedCourse !== null && selectedCourse !== undefined){
      console.log("in get_exams pre: ", selectedCourse)
      setLoading(true);
      axios
        .get("/api/admin/paper/get_exams", {
          params:{
            faculty_id: session?.data?.user?.id,
            course_code: selectedCourse
          }
        })
        .then((res) => {
          setLoading(false);
          setExams(res.data.filter((exam) => exam.status === "Result Locked"));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setSpinner({
            error: "Error in loading exams.",
          });
        });
    }
  }, [selectedCourse]);

  useEffect(() => {
    axios
      .get("/api/admin/course/get_courses")
      .then((res) => {
        setCourses(res.data);
        setSelectedCourse(res.data[0].course_code);
      })
      .catch((err) => {
        console.log(err);
        setSpinner({
          error: "Error in loading courses.",
        });
      });
  }, []);

  if (loading) {
    return <Loader />;
  }
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div className="px-10">
      <select
        className="bg-white border rounded-md px-3 py-2"
        onChange={handleCourseChange}
        value={selectedCourse}
      >
        {/* {courses && courses.length > 0 ? (
          courses
            .sort((a, b) =>
              a.course.course_name.localeCompare(b.course.course_name)
            )
            .map((course, index) => (
              <option key={index} value={course.course_code}>
                {course.course_code} - {course.course_name}
              </option>
            ))
        ) : (
          <option value="">No Courses</option>
        )} */}

        {courses && courses.length > 0 ? (
          courses
            .sort((a, b) =>
              a.course_name.localeCompare(b.course_name)
            )
            .map((course, index) => (
              <option key={index} value={course.course_code}>
                {course.course_code} - {course.course_name}
              </option>
            ))
        ) : (
          <option value="">No Courses</option>
        )}

      </select>
      <Spinner loading={spinning} />
      <div className="text-4xl mt-10 mb-4 font-poppins">Print Results</div>
      <Table exams={exams} course = {selectedCourse} />
    </div>
  );
};

export default G2OfficerDashboard;
