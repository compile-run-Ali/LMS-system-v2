import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const MarkPaper = ({
  objectiveAnswers,
  subjectiveAnswers,
  objectiveQuestions,
  subjectiveQuestions,
  isStudent = false,
}) => {
  const router = useRouter();
  const { p_number, exam_id } = router.query;
  const [obtainedMarks, setObtainedMarks] = useState(0);
  const [objectiveMarks, setObjectiveMarks] = useState(null);
  const [subjectiveMarks, setSubjectiveMarks] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    if (objectiveMarks && subjectiveMarks) {
      setObtainedMarks(objectiveMarks + subjectiveMarks);
    }
  }, [objectiveMarks, subjectiveMarks]);

  useEffect(() => {
    getTotalMarks();
  }, [objectiveQuestions, subjectiveQuestions]);

  useEffect(() => {
    getObjectiveMarks();
  }, [objectiveAnswers]);

  useEffect(() => {
    getSubjectiveMarks();
  }, [subjectiveAnswers]);

  const updateStatus = () => {
    axios
      .post("/api/student/paper/update_attempt_status", {
        studentId: p_number,
        paperId: exam_id,
        status: "Marked",
        obtainedMarks: obtainedMarks,
      })
      .then((res) => {
        if (res) {
          console.log("status updated successfully", res.data);
        }
      })
      .catch((err) => {
        console.log("error in updating status", err.message);
      });
  };

  const getTotalMarks = () => {
    let total = 0;
    objectiveQuestions.forEach((question) => {
      total += question.marks;
    });

    subjectiveQuestions.forEach((question) => {
      if (!question.parent_sq_id) {
        total += question.marks;
      }
    });
    setTotalMarks(total);
  };

  const getObjectiveMarks = () => {
    if (!objectiveAnswers) {
      return;
    }
    let marks = objectiveAnswers.reduce((total, answer) => {
      return answer ? total + answer.marksobtained : total;
    }, 0);

    setObjectiveMarks(marks);
  };

  const getSubjectiveMarks = async () => {
    if (!subjectiveAnswers) {
      return;
    }

    let marks = 0;
    for (let answer of subjectiveAnswers) {
      marks += answer.marksobtained;
    }

    setSubjectiveMarks(marks);
  };

  return (
    <div className="flex justify-between items-center my-10">
      <div>
        <h1 className="text-2xl ">
          <span className="font-bold">Marks: </span>
          {obtainedMarks.toFixed(2)} / {totalMarks.toFixed(2)}
        </h1>
      </div>
      {!isStudent && (
        <div>
          <button
            className="p-2 bg-blue-900 text-white rounded-lg"
            onClick={() => {
              updateStatus();
            }}
          >
            Save Marks
          </button>
          <Link
            href="/faculty/mark_exam/[exam_id]"
            as={`/faculty/mark_exam/${exam_id}`}
          >
            <button className="p-2 bg-yellow-500 text-white rounded-lg ml-4">
              Back to Results
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MarkPaper;
