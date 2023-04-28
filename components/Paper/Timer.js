import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "../Loader";

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
  const [startTimeString, setStartTimeString] = useState("");

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
    //update spa status to Attempted
    const timeCompleted = new Date();
    // get gmt offset in hours, and add that in startTime
    const gmtOffset = new Date().getTimezoneOffset();
    timeCompleted.setMinutes(timeCompleted.getMinutes() - gmtOffset);
    axios
      .post(`/api/student/paper/update_attempt_status`, {
        studentId: session.user.id,
        paperId: paper.paper_id,
        status: "Incomplete Submission",
        timeCompleted: timeCompleted.toISOString(),
      })
      .then((res) => {
        console.log("updated attempt status ", res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("Error 404, resending in 5 secs...");
          setTimeout(() => {
            updateStatus();
          }, 5000);
        } else {
          console.log("error in get_single_attempt", err);
        }
      });
  };

  const getPaperAttempt = () => {
    axios
      .get("/api/student/paper/get_single_attempt", {
        params: {
          p_number: session.user.id,
          paper_id: paper.paper_id,
        },
      })
      .then((res) => {
        const paperStartTime = res.data.timeStarted;
        if (paperStartTime) {
          setStartTimeString(paperStartTime);
          setStartTime(
            convertDateTimeToStrings(
              getPaperDateTime(paperStartTime, paper.duration).start
            )
          );
          setEndTime(
            convertDateTimeToStrings(
              getPaperDateTime(paperStartTime, paper.duration).end
            )
          );
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("Error 404, resending in 5 secs...");
          setTimeout(() => {
            getPaperAttempt();
          }, 5000);
        } else {
          console.log("error in get_single_attempt", err);
        }
      });
  };

  useEffect(() => {
    if (session?.user?.id && paper.paper_id) {
    }
  }, [session]);

  useEffect(() => {
    if (startTimeString) {
      const interval = setInterval(() => {
        setTimeLeft(
          getRemainingTime(
            getPaperDateTime(startTimeString, paper.duration).end
          )
        );
        console.log("start time string is", startTimeString);
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

  if (!timeLeft)
    return (
      <div className="flex justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-800"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

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
