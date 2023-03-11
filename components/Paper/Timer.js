import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";

import {
  convertDateTimeToStrings,
  getPaperDateTime,
  getRemainingTime,
} from "@/lib/TimeCalculations";

export default function Timer({ paper }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const clearPaperFromLocal = () => {
    const papers = JSON.parse(localStorage.getItem("papers")) || {};
    delete papers[paper];
    localStorage.setItem("papers", JSON.stringify(papers));
    console.log(
      "papers after deleting",
      JSON.parse(localStorage.getItem("papers"))
    );
  };

  const updateStatus = () => {
    axios
      .post(`/api/student/paper/update_attempt_status`, {
        studentId: session.user.id,
        paperId: paper.paper_id,
        status: "Incomplete Submission",
      })
      .then((res) => {
        console.log("updated attempt status ", res.data);
      })
      .catch((err) => {
        console.log("error updating attempt status", err);
      });
  };

  useEffect(() => {
    if (paper.date) {
      const interval = setInterval(() => {
        setTimeLeft(
          getRemainingTime(getPaperDateTime(paper.date, paper.duration).end)
        );
        if (timeLeft === "00:00:00") {
          clearPaperFromLocal();
          updateStatus();
          // set status to time ended
          router.push(`/student`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    if (paper.date) {
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
    <div className="flex flex-col justify-center text-lg">
      <div>
        Start Time:
        {" " + startTime}
      </div>
      <div>End Time:{" " + endTime}</div>
      <div>Time Left:{" " + timeLeft}</div>
    </div>
  );
}
