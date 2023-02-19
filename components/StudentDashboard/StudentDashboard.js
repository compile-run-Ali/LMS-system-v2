import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import PapersList from "../Paper/PapersList";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import {
  compareDateTime,
  getPaperDateTime,
} from "@/lib/TimeCalculations";
/* 
dashboard
              previous exams
                see details if allowed
              live exams
              objective type
                all options rendered,
              subjective type
                type answer
              both have different ui
*/
export default function StudentDashboard() {
  const router = useRouter();
  const { index } = router.query;
  const [student, setStudent] = useState(null);
  const [papers, setPapers] = useState([]);
  const [pastPapers, setPastPapers] = useState([]);
  const [livePapers, setLivePapers] = useState([]);
  const [upcomingPapers, setUpcomingPapers] = useState([]);

  // fetch course of student
  // then fetch papers of that course
  // for previous Papers
  // if the paper is clicked, and review is allowed, send to dynamic route of that paper
  //

  const getStudentAndSetPapers = async () => {
    await axios
      .get(`/api/student/details/${index}`)
      .then((res) => {
        // use pnumber to fetch papers
        setStudent(res.data);
        axios
          .get(`/api/student/paper/${res.data.p_number}`)
          .then((res) => {
            setPapers(res.data);
            console.log("papers ", res.data);
            // categorize papers here

            const past = [];
            const live = [];
            const upcoming = [];

            for (const paper of res.data) {
              if (
                compareDateTime(
                  getPaperDateTime(paper.date, paper.duration).start,
                  getPaperDateTime(paper.date, paper.duration).end
                ) === "past"
              ) {
                past.push(paper);
              } else if (
                compareDateTime(
                  getPaperDateTime(paper.date, paper.duration).start,
                  getPaperDateTime(paper.date, paper.duration).end
                ) === "live"
              ) {
                live.push(paper);
              } else if (
                compareDateTime(
                  getPaperDateTime(paper.date, paper.duration).start,
                  getPaperDateTime(paper.date, paper.duration).end
                ) === "upcoming"
              ) {
                upcoming.push(paper);
              }
            }
            setPastPapers(past);
            setLivePapers(live);
            setUpcomingPapers(upcoming);
          })
          .catch((err) => {
            console.log("error in fetching papers", err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (!router.isReady) return;
    getStudentAndSetPapers();
  }, [router.isReady]);

  return (
    <div>
      {/* {JSON.stringify(student)} student page */}
      *componenet that shows info about student*
      <h1 className="text-3xl">Past Papers</h1>
      <PapersList papers={pastPapers} />
      <h1 className="text-3xl">Live Papers</h1>
      <PapersList papers={livePapers} isLive={true} p_number={student?.p_number} />
      <h1 className="text-3xl">Upcoming Papers</h1>
      <PapersList papers={upcomingPapers} />
    </div>
  );
}
