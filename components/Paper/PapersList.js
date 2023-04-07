import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getPaperDateTime,
  convertDateTimeToStrings,
} from "@/lib/TimeCalculations";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function PapersList({ papers, status }) {
  const [sortedPapers, setSortedPapers] = useState([]);
  const [attemptStatus, setAttemptStatus] = useState([]);
  const [updatedPapers, setUpdatedPapers] = useState([]);
  const isLive = status === "Live Papers";
  const isPast = status === "Past Papers";
  const { data: session } = useSession();

  useEffect(() => {
    const newSortedPapers = papers.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    setSortedPapers(newSortedPapers);
  }, [papers]);

  useEffect(() => {
    const getAttemptStatus = async () => {
      const res = await axios.get(`/api/student/paper/get_attempt_status`, {
        params: {
          studentId: session.user.id,
        },
      });
      setAttemptStatus(res.data);
    };
    getAttemptStatus();
  }, [session]);

  useEffect(() => {
    const newUpdatedPapers = sortedPapers.map((paper) => {
      // console.log(attemptStatus);
      const attempt = attemptStatus.find(
        (attempt) => attempt.paperId === paper.paper_id
      );

      if (attempt) {
        return { ...paper, attemptStatus: true };
      } else {
        return { ...paper, attemptStatus: false };
      }
    });

    // console.log("newUpdatedPapers", newUpdatedPapers);
    setUpdatedPapers(newUpdatedPapers);
  }, [attemptStatus]);

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
          {updatedPapers.map((paper, index) => {
            return (
              // add Link tag to live papers only and those with attempt status empty
              <tr key={paper.paper_id}>
                <PaperRow
                  paper={paper}
                  attemptStatus={paper.attemptStatus}
                  status={status}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const PaperRow = ({ paper, attemptStatus, status }) => {
  const { start, end } = getPaperDateTime(paper.date, paper.duration);
  const startDate = convertDateTimeToStrings(start, true);
  const startTime = convertDateTimeToStrings(start);
  const endDate = convertDateTimeToStrings(end);
  const isLive = status === "Live Papers";
  const isPast = status === "Past Papers";
  return (
    <>
      <td className="px-4 py-2">{paper.paper_name}</td>
      <td className="px-4 py-2">{paper.paper_type}</td>
      <td className="px-4 py-2">{startDate}</td>
      <td className="px-4 py-2">{startTime}</td>
      <td className="px-4 py-2">{endDate}</td>
      <td className="px-4 py-2">
        {/* if paper is live and is submitted, show submitted button, else show attempt button */}
        {/* if paper is past and review is allowed, show review button, else show review not allowed button */}
        {/* else show view button */}
        {isLive ? (
          !attemptStatus ? (
            <Link
              href={`/paper/attempt/${paper.paper_id}`}
              className={`bg-blue-800 hover:bg-blue-700 cursor-pointer text-white py-2 px-4 rounded`}
            >
              Attempt
            </Link>
          ) : (
            <button className="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed">
              Attempted
            </button>
          )
        ) : isPast ? (
          paper.review && paper.status !== "Result Locked" ? (
            <Link
              href={`/paper/review/${paper.paper_id}`}
              className="bg-blue-800 hover:bg-blue-700 cursor-pointer text-white py-2 px-4 rounded"
            >
              Review
            </Link>
          ) : (
            <button className="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed">
              Review Not Allowed
            </button>
          )
        ) : (
          <Link
            href={`/paper/view/${paper.paper_id}`}
            className="bg-blue-800 hover:bg-blue-700 cursor-pointer text-white py-2 px-4 rounded"
          >
            View
          </Link>
        )}
      </td>
    </>
  );
};
