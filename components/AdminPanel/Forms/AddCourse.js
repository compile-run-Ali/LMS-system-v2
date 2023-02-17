import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [department, setDepartment] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addCourse({ name, credit_hours: creditHours, department, course_code: courseCode });
    setName('');
    setCreditHours('');
    setDepartment('');
    setCourseCode('');
  };

  const addCourse = async (course) => {
    console.log(course);
    const new_course = await axios.post('http://localhost:3000/api/admin/course/add_courses', {
      ...course
    });
    console.log(new_course);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="course-code">
          Course Code
        </label>
        <input
          className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="department"
          type="text"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Course
        </button>
      </div>
    </form>
  );
};

export default AddCourse;

