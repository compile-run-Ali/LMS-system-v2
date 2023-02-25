import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  convertDateTimeToStrings,
  getPaperDateTime,
  getRemainingTime,
} from "@/lib/TimeCalculations";

export default function Timer({ paper }) {
  const router = useRouter();
  const { student } = router.query;
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (paper.date) {
      const interval = setInterval(() => {
        setTimeLeft(
          getRemainingTime(getPaperDateTime(paper.date, paper.duration).end)
        );
        if (timeLeft === "00:00:00") {
          router.push(`/student`);
          localStorage.clear();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    if (paper.date) {
      console.log("paper ", paper);
      setStartTime(
        convertDateTimeToStrings(
          getPaperDateTime(paper.date, paper.duration).start
        )
      );
      setEndTime(
        convertDateTimeToStrings(
          getPaperDateTime(paper.date, paper.duration).end
        )
      );
    }
  }, [paper]);

  return (
    <div className="flex flex-col justify-center text-xl">
      <div>
        Start Time:
        {" " + startTime}
      </div>
      <div>End Time:{" " +endTime}</div>
      <div>Time Left:{" " +timeLeft}</div>
    </div>
  );
}
