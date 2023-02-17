import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AssignedTable = ({course_data}) => {
    const router = useRouter();

    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        setCourseData(course_data);
    }, [course_data]);

  const handleMultipleFaculty = (faculty) => {
    let facultyString = '';
    faculty.forEach((faculty, index) => {
      if (index === faculty.length - 1) {
        facultyString += ` ${faculty.name} - ${faculty.department}`;
      } else {
        facultyString += ` ${faculty.name} - ${faculty.department}, `;
      }
    });
    return facultyString;
  };
  
    return (
        <table className="table-auto mt-10 rounded-md font-poppins w-full text-left">
            <thead>
                <tr className="bg-blue-800 rounded-md text-white">
                    <th className="px-4 py-2">Course</th>
                    <th className="px-4 py-2">Assigned to:</th>
                </tr>
            </thead>
            <tbody>
                {courseData.map((course, index) => (
                    <tr key={index} className="bg-white">
                        <td className=" px-4 py-2">{`${course.course_code} - ${course.course_name} (${course.department})`}</td>
                    <td className=" px-4 py-2">{handleMultipleFaculty(course.faculty)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AssignedTable;
