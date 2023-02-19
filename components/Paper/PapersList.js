import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  compareDateTime,
  getPaperDateTime,
  convertDateTimeToStrings,
} from "@/lib/TimeCalculations";

export default function PapersList({ papers, isLive, p_number }) {
  const [sortedPapers, setSortedPapers] = useState([]);

  useEffect(() => {
    const newSortedPapers = papers.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    setSortedPapers(newSortedPapers);
  }, [papers]);

  const MapPapers = (paper) => {
    const { start, end } = getPaperDateTime(paper.date, paper.duration);
    const status = isLive ? "live" : compareDateTime(start, end);
    const time =
      convertDateTimeToStrings(start) + " to " + convertDateTimeToStrings(end);
    return (
      <div className="my-2 border-2 border-black flex justify-between">
        <div className="w-1/12">{paper.paper_name}</div>
        <div className="w-1/3">
          paper is {status} and {paper.paper_type}
        </div>
        <div className="w-1/2">{time}</div>
      </div>
    );
  };

  return (
    <div>
      {sortedPapers.map((paper) => {
        return (
          // add Link tag to live papers only
          <div key={paper.paper_id}>
            {isLive ? (
              <Link href={`/paper/attempt/${p_number}/${paper.paper_id}`}>
                {MapPapers(paper)}
              </Link>
            ) : (
              MapPapers(paper)
            )}
          </div>
        );
      })}
    </div>
  );
}
