import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import * as XLSX from "xlsx";

const StudentsTable = ({ students_data, exam_id, exam }) => {
  const [students, setStudents] = useState([]);
  const [classAverage, setClassAverage] = useState(null);
  const [highestMarks, setHighestMarks] = useState(null);
  const [marked, setMarked] = useState(false);
  const [noneAttempted, setNoneAttempted] = useState(false);

  const handleExport = () => {
    // Get a reference to the table element
    const table = document.getElementById("my-table");

    const clonedTable = table.cloneNode(true);
    const th = clonedTable.querySelector(".remove-col");
    th.colSpan = 4;
    const tbody = clonedTable.getElementsByTagName("tbody")[0];
    for (let i = 0; i < tbody.children.length; i++) {
      const row = tbody.children[i];
      row.removeChild(row.children[row.children.length - 1]);
    }
    // Create the worksheet from the cloned table
    const worksheet = XLSX.utils.table_to_sheet(clonedTable);
    // Create the workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // Export the workbook to a file
    XLSX.writeFile(workbook, `Result ${exam?.paper_name}.xlsx`);
  };

  const changeStatusTo = (status) => {
    console.log("Changing status to ", status);
    axios
      .put(`/api/faculty/update_exam_status`, {
        paper_id: exam_id,
        status: status,
      })
      .then((response) => {
        console.log("Exam status updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(students_data);
    if (students_data) {
      setStudents(students_data);

      const totalMarks = students_data.reduce(
        (sum, student) => sum + student.obtainedMarks,
        0
      );

      const totalAttempts = students_data.reduce(
        (count, student) =>
          student.status === "Marked"
            ? count + 1
            : student.status === "Not Attempted"
            ? count
            : count + 1,
        0
      );
      const classAverage = totalAttempts > 0 ? totalMarks / totalAttempts : 0;
      setClassAverage(classAverage);

      const highestMarks = students_data.reduce(
        (max, student) => Math.max(max, student.obtainedMarks),
        0
      );
      setHighestMarks(highestMarks);

      const isAllMarked = students_data.every(
        (student) =>
          student.status === "Marked" || student.status === "Not Attempted"
      );
      setMarked(isAllMarked);

      const isNoneAttempted = students_data.every(
        (student) =>
          student.status === "Not Attempted" || student.status === "Attempted"
      );
      setNoneAttempted(isNoneAttempted);
      if (
        isAllMarked &&
        !isNoneAttempted &&
        (exam.status !== "Marked" || exam.status !== "Result Locked")
      ) {
        /*
          If all students are marked and none of them are not attempted,
          then the status should be changed to "Marked"
        */
        changeStatusTo("Marked");
      } else if (!isAllMarked && exam.status === "Marked") {
        /* 
          If the exam is marked and some students are not marked,
          then the status should be changed to "Approved"
         */
        changeStatusTo("Approved");
      }
    }
  }, [students_data]);

  if (noneAttempted) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-poppins font-bold">
          No student has attempted this exam
        </h1>
      </div>
    );
  }

  return (
    <div>
      <table
        id="my-table"
        className="table-auto w-full mt-10 font-poppins text-left "
      >
        <thead>
          <tr className="bg-white text-black text-3xl font-normal font-sans">
            <th colSpan={5} className="px-4 py-2 text-center remove-col">
              {exam.paper_name} Class Result
            </th>
          </tr>
          <tr className="bg-blue-800 text-white font-medium ">
            <th className="px-4 py-2">Army Number</th>
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
              <td
                className={`px-4 py-2 border ${
                  index === students_data.length - 1 &&
                  "border-b-gray-300 border-b"
                }`}
              >
                {student.p_number}
              </td>
              <td
                className={`px-4 py-2 border ${
                  index === students_data.length - 1 &&
                  "border-b-gray-300 border-b"
                }`}
              >
                {student.name}
              </td>
              <td
                className={`px-4 py-2 border ${
                  index === students_data.length - 1 &&
                  "border-b-gray-300 border-b"
                }`}
              >
                {student.status}
              </td>
              <td
                className={`px-4 py-2 border ${
                  index === students_data.length - 1 &&
                  "border-b-gray-300 border-b"
                }`}
              >
                {student.status === "Marked"
                  ? student.obtainedMarks
                  : "Not Marked"}
              </td>
              <td
                className={`px-4 py-2 border ${
                  index === students_data.length - 1 &&
                  "border-b-gray-300 border-b"
                }`}
              >
                {student.status !== "Not Attempted" &&
                  exam.status !== "Result Locked" && (
                    <Link
                      href={`/faculty/mark_exam/${exam?.paper_id}/${student.p_number}`}
                    >
                      <button className="bg-blue-800 hover:bg-blue-700 text-white py-2 text-sm px-2 rounded ">
                        Check Answers
                      </button>
                    </Link>
                  )}
              </td>
            </tr>
          ))}

          {marked && (
            <>
              <tr
                className={
                  students_data.length % 2 ? "bg-gray-200" : "bg-gray-100"
                }
              >
                <td className="px-4 py-2 border-b border-l border-gray-300">
                  Class Average
                </td>
                <td className="px-4 py-2 border-b  border-r border-gray-300 text-right">
                  {classAverage}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  Highest Marks
                </td>
                <td className="px-4 py-2 border-b  border-r border-gray-300 text-right">
                  {highestMarks}
                </td>
                <td className="px-4 py-2 border-b border-r border-gray-300"></td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div className="flex justify-end py-4 space-x-4">
        <button
          className={`bg-blue-800 hover:bg-blue-700 text-white py-2 text-sm px-2 rounded`}
          onClick={handleExport}
        >
          Export to Excel
        </button>
        <button
          className={`bg-blue-800 hover:bg-blue-700 text-white py-2 text-sm px-2 rounded`}
          onClick={() => {
            if (exam.status === "Marked") {
              changeStatusTo("Result Locked");
            } else if (
              exam.paper_type === "Objective" &&
              exam.status === "Approved"
            ) {
              changeStatusTo("Result Locked");
            } else {
              alert(
                "You can't lock the result of this exam. Please mark the exam first. If the exam is objective type, you can lock the result only after the exam is approved."
              );
            }
          }}
        >
          Lock Result
        </button>
      </div>
    </div>
  );
};

export default StudentsTable;
