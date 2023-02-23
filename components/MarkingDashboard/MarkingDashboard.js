import React from "react";
import StudentsTable from "./StudentsTable";

const MarkingDashboard = ({ students_data }) => {
  return (
    <div>
      <h1 className="text-2xl font-poppins font-bold">Marking Dashboard</h1>
      <StudentsTable students={students_data} />
    </div>
  );
};

export default MarkingDashboard;
