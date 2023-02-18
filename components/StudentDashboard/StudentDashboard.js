import React from "react";
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
  const student = {
    phone_number: 1,
    name: "Student 1",
    email: "",
    phone_number: "1234567890",
    cgpa: 3.5,
    dob: "01/01/2000",
  };

  const previousExams = [
    {
      exam_id: 1,
      exam_name: "Exam 1",
      exam_type: "Objective",
      exam_date: "01/01/2021",
      exam_time: "10:00 AM",
      exam_duration: "1 hour",
    },
  ];

  return (
    <div>
      <div></div>
    </div>
  );
}
