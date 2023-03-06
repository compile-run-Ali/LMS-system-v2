import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getPaperDateTime,
  convertDateTimeToStrings,
} from "@/lib/TimeCalculations";

export default function PapersList({ papers, status }) {
  const [sortedPapers, setSortedPapers] = useState([]);
  const isLive = status === "Live Papers";
  const isPast = status === "Past Papers";

  useEffect(() => {
    const newSortedPapers = papers.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    setSortedPapers(newSortedPapers);
  }, [papers]);

  const getRow = (paper) => {
    const { start, end } = getPaperDateTime(paper.date, paper.duration);
    const startDate = convertDateTimeToStrings(start, true);
    const startTime = convertDateTimeToStrings(start);
    const endDate = convertDateTimeToStrings(end);
    return (
      // <div className="mb-4 flex justify-between bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-4 items-center hover:-translate-y-0.5 hover:to-blue-800 hover:from-blue-800 transition-all">
      <>
        <td className="px-4 py-2">{paper.paper_name}</td>
        <td className="px-4 py-2">{paper.paper_type}</td>
        <td className="px-4 py-2">{startDate}</td>
        <td className="px-4 py-2">{startTime}</td>
        <td className="px-4 py-2">{endDate}</td>
        <td className="px-4 py-2">
          <Link
            href={
              `/paper/` +
              `${isLive ? "attempt" : isPast ? "review" : "view"}` +
              `/${paper.paper_id}`
            }
          >
            <button
              className={`bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded
              ${isPast && !paper.review && "hidden"}
            `}
            >
              {isLive ? "Attempt" : isPast ? "Review" : "View"}
            </button>
          </Link>
        </td>
      </>
    );
  };

  return (
    <div>
      <table className="table-auto rounded-md mt-2 mb-4 font-poppins w-full text-left">
        <thead>
          <tr className="bg-blue-800 rounded-md text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {/* href={`/paper/attempt/${p_number}/${paper.paper_id}`} */}
          {sortedPapers.map((paper) => {
            return (
              // add Link tag to live papers only
              <tr key={paper.paper_id}>{getRow(paper)}</tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
