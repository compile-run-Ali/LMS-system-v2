import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const StudentsTable = ({ students_data, exam_id }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    console.log(students_data);
    if (students_data) {
      setStudents(students_data);
      const isAllMarked = students_data.every(
        (student) =>
          student.status === "Marked" || student.status === "Not Attempted"
      );
      if (isAllMarked) {
         axios.put(`/api/faculty/update_exam_status`, {
            paper_id: exam_id,
            status: "Marked",
          })
          .then((response) => {
            console.log("Exam status updated successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [students_data]);

  return (
    <table className="table-auto w-full mt-10 font-poppins text-left">
      <thead>
        <tr className="bg-blue-800 text-white font-medium ">
          <th className="px-4 py-2">P Number</th>
          <th className="px-4 py-2">Student Name</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Marks</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr
            key={student.p_number}
            className={`cursor-pointer h-12 bg-gray-${
              index % 2 === 0 ? 100 : 200
            }`}
          >
            <td className="border px-4 py-2">{student.p_number}</td>
            <td className="border px-4 py-2">{student.name}</td>
            <td className="border px-4 py-2">{student.status}</td>
            <td className="border px-4 py-2">{
              student.status === "Marked" ? student.obtainedMarks : "Not Marked"
            }</td>
            <td className="border px-4 py-2 text-center">
              {student.status !== "Not Attempted" && (
                <Link
                  href={`/faculty/mark_exam/${exam_id}/${student.p_number}`}
                >
                  <button className="bg-blue-800 hover:bg-blue-700 text-white py-2 text-sm px-2 rounded ">
                    Check Answers
                  </button>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentsTable;
