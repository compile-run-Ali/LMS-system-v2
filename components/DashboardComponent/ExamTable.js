import { useRouter } from "next/router";
import React, { useState } from "react";

const ExamTable = () => {
  const router = useRouter();
  const [exams, setExams] = useState([
    { exam_id: 1, exam_type: "Objective", exam_name: "Mid-term Exam", exam_duration: "1 Hour", exam_date: "05/10/2023", exam_time: 100 },
    { exam_id: 2, exam_type: "Subjective/Objective", exam_name: "Final Exam", exam_duration: "2 Hours", exam_date: "10/12/2023", exam_time: 200 },
  ]);

  const handleExamClick = (exam_id) => {
    router.push(`/faculty/exam_details/${exam_id}`);
  };


  return (
    <table className="table-auto w-full mt-10 font-poppins text-left px-5">
      <thead>
        <tr className="bg-[#1e3c72] text-white font-medium ">
          <th className="px-4 py-2">Exam Name</th>
          <th className="px-4 py-2">Exam Type</th>
          <th className="px-4 py-2">Duration</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Total Marks</th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam, index) => (
            <tr key={exam.exam_id}
              className={`cursor-pointer bg-gray-${index % 2 === 0 ? 100 : 200}`}
              onClick={() => handleExamClick(exam.exam_id)}
            >
              <td className="border px-4 py-2">{exam.exam_name}</td>
              <td className="border px-4 py-2">{exam.exam_type}</td>
              <td className="border px-4 py-2">{exam.exam_duration}</td>
              <td className="border px-4 py-2">{exam.exam_date}</td>
              <td className="border px-4 py-2">{exam.exam_time}</td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExamTable;
