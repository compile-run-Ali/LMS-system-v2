import { use, useEffect, useState } from "react";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import ObjectivePaper from "@/components/Paper/ObjectivePaper";
import SubjectivePaper from "@/components/Paper/SubjectivePaper";


export default function Paper() {
  const router = useRouter();
  const { paper } = router.query;
  const [paperDetails, setPaperDetails] = useState(null); // paper details
  const [attemptTime, setAttemptTime] = useState(null); // time left to attempt the paper
  const session = useSession();
  const [solveObjective, setSolveObjective] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [paperAttempt, setPaperAttempt] = useState(null);
  const [timeIsReady, setTimeIsReady] = useState(false);

  const fetchPaper = async () => {
    console.log("Fetch paper called")
    // fetch paper details from api
    const res = await axios.get(`/api/paper/${paper}`);
    localStorage.setItem(`paper ${paper}`, JSON.stringify(res.data));
    setPaperDetails(res.data);
    console.log(res.data.duration)

    if (!attemptTime) {
      setAttemptTime(res.data.duration * 60);
      setTimeIsReady(true);
    }
    console.log(res.data);
  }


  const getTimeCookie = () => {
    if (document.cookie.includes("timeLeft")) {
      const timeLeft = document.cookie.split(";").filter((item) => item.includes("timeLeft"))[0].split("=")[1];
      setAttemptTime(timeLeft);
      setTimeIsReady(true);
    }
  }



  const fetchAttemptOrCreateAttempt = async () => {
    let getAttempt;
    try {
      getAttempt = await axios.get("/api/student/paper/get_single_attempt", {
        params: {
          p_number: session.data.user.id,
          paper_id: paper
        },
      })
      setSolveObjective(!getAttempt.data.objectiveSolved);
      setStartTime(getAttempt.data.timeStarted);
      if (getAttempt.data.status === "Attempted") {
        getTimeCookie();
      }
      if (localStorage.getItem(`paper ${paper}`)) {
        setPaperDetails(JSON.parse(localStorage.getItem(`paper ${paper}`)));
      } else {
        fetchPaper();
      }
    } catch (err) {
      console.log(err)
    }
  }


  const handleSolveObjective = async () => {
    setSolveObjective(false);

    await axios.post("/api/student/paper/update_attempt_status", {
      studentId: session.data.user.id,
      paperId: paper,
      objectiveSolved: true,
    })
  }


  useEffect(() => {
    if (session.status === "authenticated" && paper) {
      if (!paperAttempt) {
        setPaperAttempt(true);
        fetchAttemptOrCreateAttempt();
      }
    }
  }, [session, paper]);

  const clearPaperFromLocal = () => {
    localStorage.removeItem(`paper ${paper}`);
  };



  const updateStatus = () => {
    //update spa status to Attempted
    const timeCompleted = new Date();
    // get gmt offset in hours, and add that in startTime
    const timeCompletedString = `${timeCompleted.getHours()}:${timeCompleted.getMinutes()}`;
    axios
      .post(`/api/student/paper/update_attempt_status`, {
        studentId: session.data.user.id,
        paperId: paper.paper_id,
        status: "Incomplete Submission",
        timeCompleted: timeCompletedString,
      })
      .then((res) => {
        console.log("updated attempt status ", res.data);
      })
      .catch((err) => {
        console.log("error updating attempt status", err);
      });
  };

  useEffect(() => {
    if (timeIsReady) {
      if (attemptTime > 0) {
        setTimeout(() => {
          setAttemptTime(attemptTime - 1);
          var now = new Date();
          now.setTime(now.getTime() + 1 * 3600 * 1000);
          document.cookie = `timeLeft=${attemptTime}; expires=${now.toUTCString()}; path=/`;
        }, 800);
      } else if (attemptTime && attemptTime <= 0) {
        console.log("attempt time is very high ", attemptTime);
        // clearPaperFromLocal();
        // updateStatus();
        // router.push(`/student`);
      }
    }
    console.log("timeIsReady", timeIsReady)
  }, [timeIsReady, attemptTime]);


  if (!paperDetails) {
    return <Loader />
  }

  return (
    <BaseLayout>
      <DashboardLayout>
        {(paperDetails && solveObjective) ?
          <ObjectivePaper questions={paperDetails.objective_questions} isfreeFlow={paperDetails.freeflow}
            setSolveObjective={handleSolveObjective} paper={paper} attemptTime={attemptTime} startTime={startTime} />
          : <SubjectivePaper questions={paperDetails.subjective_questions} isfreeFlow={paperDetails.freeflow} attemptTime={attemptTime} paper={paper} startTime={startTime} />
        }
      </DashboardLayout>
    </BaseLayout>
  );
}
