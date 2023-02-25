import React from "react";
import StudentsTable from "./StudentsTable";

const MarkingDashboard = ({ students_data, exam_id }) => {
  return (
    <div>
      <h1 className="text-2xl font-poppins font-bold">Marking Dashboard</h1>
      <StudentsTable students_data={students_data} exam_id={exam_id} />
    </div>
  );
};

export default MarkingDashboard;
