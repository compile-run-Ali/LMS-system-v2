import React, { useState } from "react";

const ExamTable = () => {
  const [exams, setExams] = useState([
    {  examType:"Objective" ,examName: "Mid-term Exam", duration: "1 Hour", date: "05/10/2023", totalMarks: 100 },
    { examType: "Subjective/Objective" ,examName:"Final Exam", duration: "2 Hours", date: "10/12/2023", totalMarks: 200 },
  ]);

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
          <tr
            key={index}
            className={`bg-gray-${index % 2 === 0 ? 100 : 200}`}
          >
              <td className="border px-4 py-2">{exam.examName}</td>
            <td className="border px-4 py-2">{exam.examType}</td>
            <td className="border px-4 py-2">{exam.duration}</td>
            <td className="border px-4 py-2">{exam.date}</td>
            <td className="border px-4 py-2">{exam.totalMarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExamTable;
