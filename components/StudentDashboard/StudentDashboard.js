import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import PapersList from "../Paper/PapersList";
import { compareDateTime, getPaperDateTime } from "@/lib/TimeCalculations";

export default function StudentDashboard() {
  const router = useRouter();
  const { index } = router.query;
  const [student, setStudent] = useState(null);
  const [pastPapers, setPastPapers] = useState([]);
  const [livePapers, setLivePapers] = useState([]);
  const [upcomingPapers, setUpcomingPapers] = useState([]);

  const papers = [
    {
      title: "Past Papers",
      papers: pastPapers,
    },
    {
      title: "Live Papers",
      papers: livePapers,
    },
    {
      title: "Upcoming Papers",
      papers: upcomingPapers,
    },
  ];

  // fetch course of student
  // then fetch papers of that course
  // for previous Papers
  // if the paper is clicked, and review is allowed, send to dynamic route of that paper

  const getStudentAndSetPapers = async () => {
    await axios
      .get(`/api/student/details/${index}`)
      .then((res) => {
        // use pnumber to fetch papers
        setStudent(res.data);
        axios
          .get(`/api/student/paper/${res.data.p_number}`)
          .then((res) => {
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
    <div className="px-8 py-4">
      <div className="flex justify-between mb-8 px-4 bg-blue-100 bg-opacity-40 text-black font-poppins py-4 items-center">
        <Link key={index} href={`/student/profile/${index}`}>
          <div className="text-2xl">{student?.name}</div>
        </Link>
        <div className="text-lg">{student?.email}</div>
      </div>
      {papers.map(
        (paper) =>
          paper.papers.length > 0 && (
            <div key={paper.title}>
              <div>
                <p className="text-3xl font-bold mb-0">{paper.title}</p>
              </div>
              <div className="font-poppins">
                <PapersList
                  papers={paper.papers}
                  status={paper.title}
                  p_number={student?.p_number}
                />
              </div>
            </div>
          )
      )}
    </div>
  );
}
