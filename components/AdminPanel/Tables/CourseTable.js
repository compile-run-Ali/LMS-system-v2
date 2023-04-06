import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { useRouter } from "next/router";

const CourseTable = ({
  setOpen,
  courses,
  setAssignFacultyOpen,
  setSelectedCourse,
}) => {
  const router = useRouter();

  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    setCoursesData(courses);
  }, [courses]);

  const openModal = (index) => {
    setOpen(true);
    setSelectedCourse(coursesData[index].course_code);
  };

  const handleEditMCQ = (index) => () => {
    // Implement this
    router.push({
      pathname: "/admin/add_course",
      query: {
        course_id: coursesData[index].course_id,
        course_name: coursesData[index].course_name,
        course_code: coursesData[index].course_code,
        credit_hours: coursesData[index].credit_hours,
      },
    });
  };

  const handleDeleteMCQ = async (index) => {
    // Implement this
    const deletedCourse = await axios.post("/api/admin/course/remove_course", {
      course_code: courses[index].course_code,
    });
    if (deletedCourse.status === 200) {
      const newCourses = [...coursesData];
      newCourses.splice(index, 1);
      setCoursesData(newCourses);
    }
  };

  return (
    <table className="table-auto mt-10 rounded-md font-poppins w-full text-left">
      <thead>
        <tr className="bg-blue-800 rounded-md text-white">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Course Code</th>
          <th className="px-4 py-2">Credit Hours</th>
          <th className="px-4 py-2"></th>
          <th className="px-4 py-2"></th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {coursesData.map((course, index) => (
          <tr key={index} className="bg-white">
            <td className="px-4 py-2">{course.course_name}</td>
            <td className="px-4 py-2">{course.course_code}</td>
            <td className="px-4 py-2">{course.credit_hours}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => {
                  setSelectedCourse(course.course_code);
                  setAssignFacultyOpen(true);
                }}
                className="bg-white text-green-600 p-2 rounded hover:bg-green-600 hover:text-white transition-colors"
              >
                <FaExchangeAlt />
              </button>
            </td>
            <td className="px-4 py-2">
              <button
                onClick={handleEditMCQ(index)}
                className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
              >
                <MdEdit />
              </button>
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => {
                  openModal(index);
                }}
                className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
