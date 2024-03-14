import React, { useState } from "react";
import Modal from "./Subcomponents/Modal";

const DashboardButton = ({courseCode, btn_text}) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    if (btn_text === "Create Question" || btn_text === "Generate Random Paper" && courseCode === null){
      setOpen(!open);
    }
    //throw notification if no course is selected
    else if (courseCode === "") {
      alert("Please select a course first");
      return;
    }
    else{
      setOpen(!open);
    }
  };

  return (
    <div className="flex justify-end font-poppins ml-2">
      <Modal open={open} setOpen={setOpen} courseCode={courseCode} btn_call={btn_text}/>

      <button
      onClick={toggleModal}
      className="bg-blue-800 hover:bg-blue-700 transition-all text-white border rounded-md px-3 py-2"
      >
      {btn_text === "Generate Random Paper" ? "Auto Generate Paper" : btn_text}
      </button>
    </div>
  );
};

export default DashboardButton;
