import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ExamTable = ({exams_data}) => {
    const router = useRouter();

    const [exams, setExams] = useState([]);

    useEffect(() => {
        setExams(exams_data);
    }, [exams_data]);
  
    return (
        <table className="table-auto mt-10 rounded-md font-poppins w-full text-left">
            <thead>
                <tr className="bg-blue-800 rounded-md text-white">
                    <th className="px-4 py-2">Exams</th>
                    <th className="px-4 py-2">Assigned to:</th>
            
                </tr>
            </thead>
            <tbody>
                {exams.map((exam, index) => (
                    <tr key={index} className="bg-white">
                        <td className=" px-4 py-2">{`${exam.paper_name} (${exam.course.course_code} (${exam.course.course_name})`}</td>
                    {exam.paperapproval !== null ?
                      (
                        <td className=" px-4 py-2">{exam.paperapproval.faculty.name}</td>
                      ) : (
                        <button className="bg-blue-800 text-white px-4 py-2 rounded-md">Assign</button>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExamTable;
