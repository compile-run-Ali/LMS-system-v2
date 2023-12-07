import React, { useState } from "react";
import Modal from "./Subcomponents/Modal";

const DashboardButton = ({courseCode, btn_text}) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    //throw notification if no course is selected
    if (courseCode === "") {
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
        {btn_text}
        </button>
    </div>
  );
};

export default DashboardButton;
