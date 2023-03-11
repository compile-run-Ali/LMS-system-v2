import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const MarkPaper = ({
  objectiveAnswers,
  subjectiveAnswers,
  objectiveQuestions,
  subjectiveQuestions,
}) => {
  const router = useRouter();
  const { p_number, exam_id } = router.query;
  const [obtainedMarks, setObtainedMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    getTotalMarks();
  }, [objectiveQuestions, subjectiveQuestions]);

  useEffect(() => {
    markExam();
  }, [subjectiveAnswers, objectiveAnswers]);

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
      total += question.marks;
    });
    setTotalMarks(total);
  };

  const markExam = async () => {
    let marks = 0;
    const objectiveMarks = objectiveAnswers.reduce((total, answer) => {
      return answer ? total + answer.marksobtained : total;
    }, 0);
    marks += objectiveMarks;

    const subjectiveMarks = await Promise.all(
      subjectiveAnswers.map(async (answer, index) => {
        if (answer) {
          try {
            const res = await axios.get(
              "/api/paper/marking/get_student_attempts",
              {
                params: {
                  sq_id: answer.sq_id,
                  p_number: p_number,
                },
              }
            );
            return res.data.marksobtained;
          } catch (err) {
            console.log("error in fetching marks", err.message);
            return 0;
          }
        } else {
          return 0;
        }
      })
    );
    const totalSubjectiveMarks = subjectiveMarks.reduce((total, mark) => {
      return total + mark;
    }, 0);
    marks += totalSubjectiveMarks;
    setObtainedMarks(marks);
  };

  return (
    <div className="flex justify-between items-center my-10">
      <div>
        <h1 className="text-2xl ">
          <span className="font-bold">Marks: </span>
          {obtainedMarks.toFixed(2)} / {totalMarks.toFixed(2)}
        </h1>
      </div>
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
    </div>
  );
};

export default MarkPaper;
