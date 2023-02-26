import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  compareDateTime,
  getPaperDateTime,
  convertDateTimeToStrings,
} from "@/lib/TimeCalculations";

export default function ViewContainer() {
  const router = useRouter();
  const { paper } = router.query;
  const { data: session, status } = useSession();
  const [paperDetails, setPaperDetails] = useState({});
  const [student, setStudent] = useState(null);

  useEffect(
    () => () => {
      if (status === "authenticated") {
        setStudent(session.user.id);
      }
    },
    [session]
  );

  useEffect(() => {
    if (student && paper) {
      axios
        .get(`/api/student/paper/${student}`)

        .then((res) => {
          const requestedPaper = res.data.find(
            (paperObj) => paperObj.paper_id === paper
          );
          setPaperDetails(requestedPaper);
          if (requestedPaper) {
            // paper exists

            const paperDateTime = getPaperDateTime(
              requestedPaper.date,
              requestedPaper.duration
            );
            const paperStatus = compareDateTime(
              paperDateTime.start,
              paperDateTime.end
            );
            if (paperStatus !== "upcoming") {
              router.push(`/student`);
            }
          }
        });
    }
  }, [student, paper]);

  return (
    <div className="p-4 border rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{paperDetails.paper_name}</h2>
      <p className="text-gray-600 mb-1">
        Course Code: {paperDetails.course_code}
      </p>
      <p className="text-gray-600 mb-1">
        Paper Type: {paperDetails.paper_type}
      </p>
      <p className="text-gray-600 mb-1">
        Freeflow: {paperDetails.freeflow ? "Yes" : "No"}
      </p>
      <p className="text-gray-600 mb-1">
        Date: {convertDateTimeToStrings(paperDetails.date, true)}
      </p>
      <p className="text-gray-600 mb-1">
        Time: {convertDateTimeToStrings(paperDetails.date, false)}
      </p>
      <p className="text-gray-600 mb-1">
        Duration: {paperDetails.duration} hours
      </p>
      <p className="text-gray-600 mb-1">Weightage: {paperDetails.weightage}%</p>
      <p className="text-gray-600 mb-1">
        Remarks: {paperDetails.remarks || "N/A"}
      </p>
    </div>
  );
}
