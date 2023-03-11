import React, { useState, useEffect } from "react";
import {
  getPaperDateTime,
  convertDateTimeToStrings,
} from "@/lib/TimeCalculations";

export default function PaperDetails({
  paper: initialPaper,
  isFaculty = false,
}) {
  const [paper, setPaper] = useState(initialPaper);

  useEffect(() => {
    setPaper(initialPaper);
  }, [initialPaper]);

  if (Object.keys(paper).length === 0) {
    return <div>loading paper</div>;
  }
  const paperDateTime = getPaperDateTime(paper.date, paper.duration);
  const start =
    convertDateTimeToStrings(paperDateTime.start, false) +
    ", " +
    convertDateTimeToStrings(paperDateTime.start, true);
  const end =
    convertDateTimeToStrings(paperDateTime.end, false) +
    ", " +
    convertDateTimeToStrings(paperDateTime.end, true);

  return (
    <div className="mt-4 mb-10">
      <table className="w-full text-lg table-fixed bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border px-4 py-2">Course Code</th>
            <td className="border px-4 py-2">{paper.course_code}</td>
          </tr>
          <tr className="bg-blue-900 text-white">
            <th className="border px-4 py-2">Paper</th>
            <td className="border px-4 py-2">{paper.paper_name}</td>
          </tr>
          <tr className="bg-blue-900 text-white">
            <th className="border px-4 py-2">Type</th>
            <td className="border px-4 py-2">{paper.paper_type}</td>
          </tr>
          <tr className="bg-blue-900 text-white">
            <th className="border px-4 py-2">Navigation allowed</th>
            <td className="border px-4 py-2">
              {paper.freeflow ? "Yes" : "No"}
            </td>
          </tr>
          {isFaculty && (
            <>
              <tr className="bg-blue-900 text-white">
                <th className="border px-4 py-2">Review allowed</th>
                <td className="border px-4 py-2">
                  {paper.review ? "Yes" : "No"}
                </td>
              </tr>
              <tr className="bg-blue-900 text-white">
                <th className="border px-4 py-2">Weightage</th>
                <td className="border px-4 py-2">{paper.weightage}</td>
              </tr>
            </>
          )}
          <tr className="bg-blue-900 text-white">
            <th className="border px-4 py-2">Duration</th>
            <td className="border px-4 py-2">{paper.duration} Minutes</td>
          </tr>
          <tr className="bg-blue-900 text-white">
            <th className="border px-4 py-2">Start Time</th>
            <td className="border px-4 py-2">{start}</td>
          </tr>
          <tr className="bg-blue-900 text-white">
            <th className="border px-4 py-2">End Time</th>
            <td className="border px-4 py-2">{end}</td>
          </tr>
        </thead>
      </table>
    </div>
  );
}
