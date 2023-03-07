import React, { useState, useEffect } from "react";
import AttempContainer from "./AttempContainer";

const AnswersTable = ({ attempts_data }) => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    if (attempts_data !== undefined && attempts_data.length > 0) {
      setAttempts(attempts_data);
    }
  }, [attempts_data]);
  return (
    <div className="flex flex-col">
      {attempts.length > 0 ? (
        attempts.map((attempt, index) => (
          <div key={attempt.ssa_id}>
            <AttempContainer
              question={attempt.subjective_question}
              answer={attempt.answer}
              ssa_id={attempt.ssa_id}
              marksobtained={attempt.marksobtained}
            />
          </div>
        ))
      ) : (
        <div>
          <span>No Questions Attempted by this student</span>
        </div>
      )}
    </div>
  );
};

export default AnswersTable;
