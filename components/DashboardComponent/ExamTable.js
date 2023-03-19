import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { convertDateTimeToStrings } from "@/lib/TimeCalculations";
import { useSession } from "next-auth/react";

const ExamTable = ({ exams_data }) => {
  const router = useRouter();
  const [exams, setExams] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const currentDate = new Date();
    const updatedExams = exams_data.map((exam) => {
      const examDate = new Date(exam.date);
      if (
        examDate < currentDate &&
        exam.status !== "Closed" &&
        exam.status !== "Marked"
      ) {
        return axios
          .put(`/api/faculty/update_exam_status`, {
            paper_id: exam.paper_id,
            status: "Closed",
          })
          .then((response) => {
            return { ...exam, status: "Closed" };
          })
          .catch((error) => {
            console.log(error);
            return exam;
          });
      }
      return Promise.resolve(exam); // Return a resolved promise for exams that don't need updating
    });

    Promise.all(updatedExams).then((updatedExams) => {
      const sortedExams = updatedExams.sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();
        return aTime - bTime;
      });

      setExams(sortedExams);

      const closedExam = updatedExams.find((exam) => exam.status === "Closed");

      if (closedExam) {
        console.log("closed exam: ", closedExam);
        axios
          .post(`/api/faculty/generate_notification`, {
            notification: closedExam.paper_name + " has been closed",
            faculty_id: session.user.id,
          })
          .then((response) => {
            console.log("Notification sent successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, [exams_data]);

  const handleExamClick = (paper_id) => {
    router.push(`/faculty/exam_details/${paper_id}`);
  };

  console.log(exams);

  if (!exams_data || (exams_data && exams_data.length === 0)) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="text-2xl font-poppins font-bold">No Exams Found</h1>
      </div>
    );
  }

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
            <td className="border px-4 py-2">
              {convertDateTimeToStrings(exam.date, true)}
            </td>
            <td className="border px-4 py-2">
              {convertDateTimeToStrings(exam.date)}
            </td>
            <td className="border px-4 py-2">{exam.weightage}</td>
            <td className="border px-4 py-2">{exam.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExamTable;
