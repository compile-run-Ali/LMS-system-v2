import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AddCourse = () => {
  const router = useRouter();

  const [edit, setEdit] = useState(router.query.course_code ? true : false);
  const [name, setName] = useState(edit ? router.query.course_name : '');
  const [creditHours, setCreditHours] = useState(edit ? router.query.credit_hours : '');
  const [department, setDepartment] = useState(edit ? router.query.department : '');
  const [courseCode, setCourseCode] = useState(edit ? router.query.course_code : '');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addCourse({ name, credit_hours: creditHours, department, course_code: courseCode });
    setName('');
    setCreditHours('');
    setDepartment('');
    setCourseCode('');
  };

  const addCourse = async (course) => {
    const new_course = await axios.post(`http://localhost:3000/api/admin/course/${edit ? "edit_course" : "add_courses"}`, {
      course_code: edit ? router.query.course_code : null,
      ...course
    });
    if (new_course.status === 200) {
      router.push("/admin")
    }
    console.log(new_course);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="course-code">
          Course Code
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="course-code"
          type="text"
          value={courseCode}
          onChange={(event) => setCourseCode(event.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Course Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="credit-hours">
          Credit Hours
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="credit-hours"
          type="text"
          value={creditHours}
          onChange={(event) => setCreditHours(event.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="department">
          Department
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="department"
          type="text"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Course
        </button>
      </div>
    </form>
  );
};

export default AddCourse;

