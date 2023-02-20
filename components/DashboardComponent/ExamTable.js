import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ExamTable = ({exams_data}) => {
  const router = useRouter();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    if (exams_data !== null) {
      setExams(exams_data);
    }
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
        </tr>
      </thead>
      <tbody>
        {exams.map((exam, index) => (
            <tr key={exam.paper_id}
              className={`cursor-pointer bg-gray-${index % 2 === 0 ? 100 : 200}`}
              onClick={() => handleExamClick(exam.paper_id)}
            >
              <td className="border px-4 py-2">{exam.paper_name}</td>
              <td className="border px-4 py-2">{exam.paper_type}</td>
              <td className="border px-4 py-2">{exam.duration} hours</td>
              <td className="border px-4 py-2">{exam.date}</td>
              <td className="border px-4 py-2">{exam.time}</td>
              <td className="border px-4 py-2">{exam.weightage}</td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExamTable;
