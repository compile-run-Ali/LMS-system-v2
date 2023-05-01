import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Submitted() {
  const router = useRouter();
  const { paper } = router.query;
  const session = useSession();

  const updateAttempt = () => {

    //update spa status to Attempted
    const timeCompleted = new Date();
    // get gmt offset in hours, and add that in startTime
    const gmtOffset = new Date().getTimezoneOffset();
    timeCompleted.setMinutes(timeCompleted.getMinutes() - gmtOffset);
   axios
     .post(`/api/student/paper/update_attempt_status`, {
       studentId: session.data.user.id,
       paperId: paper,
       status: "Submitted",
       timeCompleted: timeCompleted.toISOString(),
     })
     .then((res) => {
       console.log("attempt created successfully ", res.data);
     })
     .catch((err) => {
       console.log("error ", err.message);
     });
 };

 const clearPaperFromLocal = () => {
   localStorage.removeItem(`paper ${paper}`);
 };

  const handleGoBack = () => {
    updateAttempt();
    clearPaperFromLocal();
    router.push("/student");
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg">
      <h1 className="text-4xl font-bold text-zinc-100">Paper Submitted</h1>
      <button
        className="bg-zinc-100 text-blue-900 font-bold py-2 px-4 rounded mt-6"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </div>
  );
}
