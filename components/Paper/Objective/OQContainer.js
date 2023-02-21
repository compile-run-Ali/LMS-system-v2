import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function OQContainer({
  question,
  currentQuestion,
  setCurrentQuestion,
  totalQuestions,
  freeFlow,
}) {
  const router = useRouter();
  const { student } = router.query;
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [multipleAllowed, setMultipleAllowed] = useState(false);
  const selectAnswer = (e) => {
    if (multipleAllowed) {
      if (selectedAnswer.includes(e.target.value)) {
        const index = selectedAnswer.indexOf(e.target.value);
        selectedAnswer.splice(index, 1);
        setSelectedAnswer([...selectedAnswer]);
      } else {
        setSelectedAnswer([...selectedAnswer, e.target.value]);
      }
    } else {
      setSelectedAnswer([e.target.value]);
    }
  };

  const saveAnswer = () => {
    axios
      .post(`/api/student/paper/oq/add_answer`, {
        p_number: student,
        oq_id: question.oq_id,
        answer: selectedAnswer.join(", "),
      })
      .then((res) => {
        console.log("answer added successfully ", res.data);
      })
      .catch((err) => {
        console.log("error ", err.message);
      });
  };

  useEffect(() => {
    // correctanswer will be a string in form a1,a2
    // selectedanswer will be a string in form a1,a2
    // convert correctAnswer into an array
    if (question) {
      const answers = question.correct_answer.split(", ");
      setCorrectAnswers(answers);
      if (answers.length > 1) {
        setMultipleAllowed(true);
      } else {
        setMultipleAllowed(false);
      }
    }
  }, [question]);

  return (
    <>
      {question ? (
        <>
          <div>
            <div key={question.oq_id}>
              <p>{currentQuestion + 1 + ". " + question.question}</p>
              <div className="flex justify-between">
                {question.answers.split(",").map((answer, index) => (
                  <div key={index}>
                    <input
                      type={multipleAllowed ? "checkbox" : "radio"}
                      name={question.oq_id}
                      value={answer}
                      onChange={selectAnswer}
                    />
                    <label>{answer}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            {freeFlow && (
              <button
                onClick={() => {
                  currentQuestion > 0 &&
                    setCurrentQuestion(currentQuestion + 1);
                }}
              >
                Previous
              </button>
            )}
            <button onClick={saveAnswer}>Save</button>
            <button
              onClick={() => {
                currentQuestion < totalQuestions - 1 && setCurrentQuestion(c);
              }}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div>
          <h1>loading</h1>
        </div>
      )}
    </>
  );
}
