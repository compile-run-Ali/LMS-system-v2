import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import CreateWordButton from "../CreateWordButton";
import GenerateRandomPaperButton from "../GenerateRandomPaperButton";
import CreateQuestionButton from "../CreateQuestionButton";
import ExamTable from "../Tables/ExamTable";
import DeleteModal from "../Modals/DeleteModal";
import Spinner from "@/components/Loader/Spinner";

const ExamContainer = ({ courses, exams, setExams, faculty }) => {
  const [selectedForDeletion, setSelectedForDeletion] = useState(null);
  const [loading, setLoading] = useState({});
  const [open, setOpen] = useState(false);
  const session = useSession()

  const handleDelete = () => {
    setLoading({
      message: "Deleting Exam...",
    });
    axios
      .post("/api/admin/paper/delete_exam", {
        paper_id: selectedForDeletion,
      })
      .then((res) => {
        console.log(res);
        setLoading({});
        console.log("Exam Deleted Successfully", exams);
        setExams(exams.filter((exam) => exam.paper_id !== res.data.paper_id));
        setOpen(false);
      })
      .catch((err) => {
        setLoading({ error: "Error in deleting exam." });
        console.log(err);
      });
  };

  useEffect(() => {
    if(session) console.log("session.user: ", session.data.user.level)
  }, [session])

  return (
    <div>
      <Spinner loading={loading} />
      <DeleteModal
        setIsOpen={setOpen}
        isOpen={open}
        handleDelete={handleDelete}
      />
      {(session.data.user.level !== 3 && session.data.user.level !== 4) 
      && <div className="flex flex-row justify-end">
        <CreateQuestionButton courses={courses}/>
        <GenerateRandomPaperButton courses={courses} />
        <CreateWordButton courses={courses} />
      </div>}
      <ExamTable
        exams_data={exams}
        faculty={faculty}
        setOpen={setOpen}
        setSelectedForDeletion={setSelectedForDeletion}
      />
    </div>
  );
};

export default ExamContainer;
