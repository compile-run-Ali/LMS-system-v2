import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "@/components/Common/Form/Input";
const AddCourse = () => {
  const router = useRouter();

  const [edit, setEdit] = useState(router.query.course_code ? true : false);
  const [name, setName] = useState(edit ? router.query.course_name : "");
  const [creditHours, setCreditHours] = useState(
    edit ? router.query.credit_hours : ""
  );
  const [department, setDepartment] = useState(
    edit ? router.query.department : ""
  );
  const [courseCode, setCourseCode] = useState(
    edit ? router.query.course_code : ""
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addCourse({
      name,
      credit_hours: creditHours,
      department,
      course_code: courseCode,
    });
    setName("");
    setCreditHours("");
    setDepartment("");
    setCourseCode("");
  };

  const addCourse = async (course) => {
    const new_course = await axios.post(
      `http://localhost:3000/api/admin/course/${edit ? "edit_course" : "add_courses"}`,
      {
        course_code: edit ? router.query.course_code : null,
        ...course,
      }
    );
    if (new_course.status === 200) {
      router.push("/admin");
    }
  };

  return (
    <div className="flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className=" bg-white py-6 rounded-lg shadow-xl w-2/3 px-10 "
      >
        <div className="mb-4">
          <Input
            text="Course Code"
            id="course-code"
            type="text"
            value={courseCode}
            onChange={(event) => setCourseCode(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Course Name"
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Credit Hours"
            id="credit-hours"
            type="text"
            value={creditHours}
            onChange={(event) => setCreditHours(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Department"
            id="department"
            type="text"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className=" font-poppins mt-8 bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
