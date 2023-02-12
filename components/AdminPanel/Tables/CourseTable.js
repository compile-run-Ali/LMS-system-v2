import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const CourseTable = ({setOpen}) => {
    const [courses, setCourses] = useState([
        { name: 'Maths', code: 'CS101', credit_hours: '3', department: 'Computer Science' },
        { name: 'Programming', code: 'CS102', credit_hours: '3', department: 'Computer Science' },
    ]);

    const openModal = () => {
        setOpen(true);
    };

    const handleEditMCQ = (index) => () => {
        // Implement this
    };

    const handleDeleteMCQ = (index) => () => {
        // Implement this
        
    };

    return (
        <table className="table-auto mt-10 rounded-md font-poppins w-full text-left">
            <thead>
                <tr className="bg-blue-800 rounded-md text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Course Code</th>
          <th className="px-4 py-2">Credit Hours</th>
          <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course, index) => (
                    <tr key={index} className="bg-white">
                    <td className="border px-4 py-2">{course.name}</td>
                    <td className="border px-4 py-2">{course.code}</td>
            <td className="border px-4 py-2">{course.credit_hours}</td>
            <td className="border px-4 py-2">{course.department}</td>
                        <td className="px-4 py-2">
                            <button
                                onClick={handleEditMCQ(index)}
                                className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white"
                            >
                                <MdEdit />
                            </button>
                        </td>
                        <td className="px-4 py-2">
                            <button
                                onClick={openModal}
                                className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white"
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
