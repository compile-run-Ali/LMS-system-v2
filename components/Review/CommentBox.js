import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentBox = ({ student, paper, isStudent }) => {
  const [comment, setComment] = useState("");
  const [studentPaperAttempt, setStudentPaperAttempt] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCommentChange = (e) => {
    if (isStudent) setComment(e.target.value);
  };

  const fetchAttemptDetails = async () => {
    await axios
      .get("/api/student/paper/get_single_attempt", {
        params: {
          p_number: student,
          paper_id: paper,
        },
      })
      .then((res) => {
        setComment(res.data.studentComment);
        setStudentPaperAttempt(res.data);
      })
      .catch((err) => {
        console.log("error in fetching attempt details", err.message);
      });
  };

  const submitComment = () => {
    axios
      .post("/api/student/paper/update_attempt_status", {
        studentId: student,
        paperId: paper,
        studentComment: comment,
      })
      .then((res) => {
        console.log("comment submitted successfully", res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log("error in submitting comment", err.message);
      });
  };

  useEffect(() => {
    if (student && paper) {
      fetchAttemptDetails();
    }
  }, [student, paper]);

  if (
    isStudent &&
    studentPaperAttempt &&
    studentPaperAttempt.status !== "Marked"
  ) {
    return (
      <div className="text-2xl font-bold mb-10 mx-auto w-full">
        Not yet marked.
      </div>
    );
  }
  return (
    <div className=" mb-10">
      <div className="text-2xl font-bold">
        Comment
        {!isStudent ? " by Student" : " to Teacher"}
      </div>
      <div className="my-2 p-6 bg-blue-900 rounded-md">
        <textarea
          className={`
          border rounded-md p-2 w-full
          ${isStudent ? "bg-white text-black" : "bg-gray-200 text-gray-700"}
          `}
          value={comment}
          onChange={(e) => handleCommentChange(e)}
          disabled={!isStudent}
        />
      </div>
      <div className="flex justify-end">
        {isStudent && (
          <button
            className="bg-blue-900 text-white px-4 py-2 rounded-md"
            onClick={comment.length > 0 ? () => submitComment() : () => {}}
          >
            {submitted ? "Submitted" : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
