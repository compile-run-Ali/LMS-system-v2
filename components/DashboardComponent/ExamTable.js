import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDate, formatTime } from "@/utils/FormatDate";

const ExamTable = ({ exams_data }) => {
  const router = useRouter();
  const [exams, setExams] = useState([]);


  useEffect(() => {
    const currentDate = new Date();
    const updatedExams = exams_data
      .map((exam) => {
        const examDate = new Date(exam.date);
        if (examDate < currentDate && exam.status !== "Closed") {
          axios
            .put(`/api/faculty/update_exam_status`, {
              paper_id: exam.paper_id,
              status: "Closed",
            })
            .then((response) => {
              setExams((prevExams) =>
                prevExams.map((prevExam) => {
                  if (prevExam.paper_id === response.data.paper_id) {
                    return response.data;
                  }
                  return prevExam;
                })
              );
            })
            .catch((error) => {
              console.log(error);
            });
          return { ...exam, status: "Closed" };
        }
        return exam;
      })
      .sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();
        return aTime - bTime;
      })
    setExams(updatedExams);
  }, [exams_data]);

  const handleExamClick = (paper_id) => {
    router.push(`/faculty/exam_details/${paper_id}`);
  };

  return (
    <table className="table-auto w-full mt-10 font-poppins text-left px-5">
      <thead>
        <tr className="bg-blue-800 text-white font-medium ">
          <th className="px-4 py-2">Exam Name</th>
          <th className="px-4 py-2">Exam Type</th>
          <th className="px-4 py-2">Duration</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Time</th>
          <th className="px-4 py-2">Total Marks</th>
          <th className="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam, index) => (
          <tr
            key={exam.paper_id}
            className={`cursor-pointer bg-gray-${index % 2 === 0 ? 100 : 200}`}
            onClick={() => handleExamClick(exam.paper_id)}
          >
            <td className="border px-4 py-2">{exam.paper_name}</td>
            <td className="border px-4 py-2">{exam.paper_type}</td>
            <td className="border px-4 py-2">{exam.duration} Minutes</td>
            <td className="border px-4 py-2">{formatDate(exam.date)}</td>
            <td className="border px-4 py-2">{formatTime(exam.date)}</td>
            <td className="border px-4 py-2">{exam.weightage}</td>
            <td className="border px-4 py-2">{exam.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExamTable;
