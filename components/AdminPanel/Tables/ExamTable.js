import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";
import { convertDateTimeToStrings } from "@/lib/TimeCalculations";

const ExamTable = ({ exams_data }) => {
  const router = useRouter();

  const [exams, setExams] = useState([]);

  useEffect(() => {
    setExams(exams_data);
  }, [exams_data]);

  const handleExamEdit = (exam) => {
    router.push({
      pathname: `/faculty/create_exam/${
        exam.paper_type === "Objective" ? "objective" : "subjective"
      }`,
      query: {
        ...exam,
      },
    });
  };

  const handleExamDelete = (exam) => {
    // delete modal to be added
    console.log(exam.paper_id);
    axios
      .post("/api/admin/paper/delete_exam", {
        paper_id: exam.paper_id,
      })
      .then((res) => {
        console.log(res);
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <table className="table-auto mt-10 rounded-md font-poppins w-full text-left">
      <thead>
        <tr className="bg-blue-800 rounded-md text-white">
          <th className="px-4 py-2">Exam Name</th>
          <th className="px-4 py-2">Course</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Time</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2"></th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {exams.sort(
          (a, b) =>
            - new Date(a.date).getTime() + new Date(b.date).getTime()
        ).map((exam, index) => (
          <tr key={index} className="bg-white ">
            <td className=" px-4 py-3">{exam.paper_name}</td>
            <td className=" px-4 py-3">{exam.course.course_name}</td>
            <td className=" px-4 py-3">{exam.paper_type}</td>
            <td className=" px-4 py-3">
              {convertDateTimeToStrings(exam.date, true)}
            </td>
            <td className=" px-4 py-3">
              {convertDateTimeToStrings(exam.date)}
            </td>
            <td className=" px-4 py-3">{exam.status}</td>
            <td>
              <button
                onClick={() => handleExamEdit(exam)}
                className="hover:bg-blue-800 text-blue-800 hover:text-white p-2 rounded-md transition-colors "
              >
                <MdEdit />
              </button>
            </td>
            <td>
              <button
                onClick={() => handleExamDelete(exam)}
                className="text-red-600 p-2 hover:text-white hover:bg-red-600 rounded-md transition-colors"
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

export default ExamTable;
