import { useRouter } from "next/router";
import React, { useState } from "react";
import CourseTable from "../Tables/CourseTable";
import DeleteModal from "./DeleteModal";
import AssignFacultyModal from "./AssignFacultyModal";
import axios from "axios";

export default function Courses({ courses, setCourses, faculty }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [assignFacultyOpen, setAssignFacultyOpen] = useState(false);
  const addCourses = () => {
    router.push("/admin/add_course");
  };
  const handleDelete = async () => {
    const deletedCourse = await axios.post("/api/admin/course/remove_course", {
      course_code: selectedCourse,
    });
    if (deletedCourse.status === 200) {
      const newCourses = courses.filter(
        (course) => course.course_code !== selectedCourse
      );
      setCourses(newCourses);
      setOpen(false);
    }
  };

  const handleAssignFaculty = async (faculty) => {
    const assignedFaculty = await axios.post(
      "/api/admin/assign_faculty_to_courses",
      {
        course_code: selectedCourse,
        faculty_id: faculty,
      }
    );
    if (assignedFaculty.status === 200) {
      const newCourses = courses.map((course) => {
        if (assignedFaculty.data.course.course_code === course.course_code) {
          return {
            ...course,
            faculty: [...course.faculty, assignedFaculty.data.faculty],
          };
        }
        return course;
      });
      setCourses(newCourses);
      setAssignFacultyOpen(false);
    }
    router.reload();
  };
  return (
    <div>
      <DeleteModal
        setIsOpen={setOpen}
        isOpen={open}
        handleDelete={handleDelete}
      />
      <AssignFacultyModal
        setIsOpen={setAssignFacultyOpen}
        isOpen={assignFacultyOpen}
        faculty={faculty}
        handleAssignment={handleAssignFaculty}
      />
      <div className="mt-10 flex justify-end">
        <button
          onClick={addCourses}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Courses
        </button>
      </div>
      <CourseTable
        setOpen={setOpen}
        courses={courses}
        setAssignFacultyOpen={setAssignFacultyOpen}
        faculty={faculty}
        setSelectedCourse={setSelectedCourse}
      />
    </div>
  );
}
