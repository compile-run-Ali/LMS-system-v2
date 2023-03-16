import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/router";

const ExamTable = ({ exams_data }) => {
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
          <th className="px-4 py-2"></th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam, index) => (
          <tr key={index} className="bg-white ">
            <td className=" px-4 py-3">{`${exam.paper_name} -  ${exam.course.course_name} (${exam.course.course_code})`}</td>

            <td className="px-4">
              <button
                onClick={() => {
                  router.push({
                    pathname: `/faculty/create_exam/${
                      exam.paper_type === "Objective"
                        ? "objective"
                        : "subjective"
                    }`,
                    query: {
                      ...exam,
                    },
                  });
                }}
                className="hover:bg-blue-800 hover:text-white p-2 rounded-md transition-colors "
              >
                <MdEdit />
              </button>
            </td>
            <td>
              <button className="text-red-600 p-2 hover:text-white hover:bg-red-600 rounded-md transition-colors">
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
