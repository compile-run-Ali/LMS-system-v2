import React, { useState } from "react";
import SelectCourseModal from "./Modals/SelectCourseModal";

const CreateQuestionButton = ({ courses }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex justify-end font-poppins mt-10 ml-2">
      {showModal && (
        <SelectCourseModal
          courses={courses}
          isOpen={showModal}
          setIsOpen={setShowModal}
          btn_call_heading={"Create Question"}
        />
      )}

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-800 hover:bg-blue-700 transition-all text-white border rounded-md px-3 py-2"
      >
        Create Question
      </button>
    </div>
  );
};

export default CreateQuestionButton;
