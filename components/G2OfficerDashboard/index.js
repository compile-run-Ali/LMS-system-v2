import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

const G2OfficerDashboard = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/paper/get_exams")
      .then((res) => {
        setExams(res.data.filter((exam) => exam.status === "Result Locked"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="px-10">
      <Table exams={exams} />
    </div>
  );
};

export default G2OfficerDashboard;
