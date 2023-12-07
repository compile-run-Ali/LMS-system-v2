import React, { useState } from "react";
import SelectCourseModal from "./Modals/SelectCourseModal";

const GenerateRandomPaperButton = ({ courses }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex justify-end font-poppins mt-10 ml-2">
      {showModal && (
        <SelectCourseModal
          courses={courses}
          isOpen={showModal}
          setIsOpen={setShowModal}
          btn_call_heading={"Generate Random Paper"}
        />
      )}

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-800 hover:bg-blue-700 transition-all text-white border rounded-md px-3 py-2"
      >
        Generate Random Paper
      </button>
    </div>
  );
};

export default GenerateRandomPaperButton;
