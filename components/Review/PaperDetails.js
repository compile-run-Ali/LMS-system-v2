import React from "react";
import {
  getPaperDateTime,
  convertDateTimeToStrings,
} from "@/lib/TimeCalculations";

export default function PaperDetails({ paper }) {
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
    <div className="rounded-lg mt-4 mb-10">
      <table className="w-full text-2xl table-fixed">
        <thead className="text-left">
          <tr>
            <th className="bg-blue-900 text-white border-black px-4 py-2 border ">Paper</th>
            <td className="bg-zinc-200 border-black px-4 py-2 border ">
              {paper.paper_name}
            </td>
          </tr>
          <tr>
            <th className="bg-blue-900 text-white border-black px-4 py-2 border ">Type</th>
            <td className="bg-zinc-200 border-black px-4 py-2 border ">
              {paper.paper_type}
            </td>
          </tr>
          <tr>
            <th className="bg-blue-900 text-white border-black px-4 py-2 border ">
              Navigation allowed
            </th>
            <td className="bg-zinc-200 border-black px-4 py-2 border ">
              {paper.freeflow ? " Yes" : "No"}
            </td>
          </tr>
          <tr>
            <th className="bg-blue-900 text-white border-black px-4 py-2 border ">Duration</th>
            <td className="bg-zinc-200 border-black px-4 py-2 border ">
              {paper.duration}
            </td>
          </tr>
          <tr>
            <th className="bg-blue-900 text-white border-black px-4 py-2 border ">Start Time</th>
            <td className="bg-zinc-200 border-black px-4 py-2 border ">{start}</td>
          </tr>
          <tr>
            <th className="bg-blue-900 text-white border-black px-4 py-2 border ">End Time</th>
            <td className="bg-zinc-200 border-black px-4 py-2 border ">{end}</td>
          </tr>
        </thead>
      </table>
    </div>
  );
}
