import React from "react";
import ObjectiveQuestion from "./ObjectiveQuestion";

export default function ObjectiveReview({ questions, answers }) {
  console.log(answers, questions);

  const questionWithAnswers = (questions, answers) =>
    questions.map((question) => {
      const answer = answers.find((answer) => answer.oq_id === question.oq_id);

      const marks = markAnswer(
        question.correct_answer,
        answer?.answer || "",
        question.marks
      );
      return {
        ...question,
        selected_answers: answer ? answer.answer : null,
        obtained_marks: marks,
      };
    });

  const format = (num) => {
    const decimalPlaces = num % 1 !== 0 ? 2 : 0; // check if number has decimals
    return num.toFixed(decimalPlaces);
  };

  const markAnswer = (correct, answered, marks) => {
    if (correct.split(", ").length > 1) {
      let score;
      const correctAnswers = correct.split(", ");
      const selectedAnswers = answered?.split(", ") || [];
      if (correctAnswers.length >= selectedAnswers.length) {
        // count how many of the answers are correct
        let count = 0;
        correctAnswers.forEach(
          (correctAnswer) => selectedAnswers.includes(correctAnswer) && count++
        );
        score = count / correctAnswers.length;
      } else if (correctAnswers.length < selectedAnswers.length) {
        // count wrong answers and subtract that from total answers
        let wrongCount = 0;
        selectedAnswers.forEach(
          (selectedAnswer) =>
            !correctAnswers.includes(selectedAnswer) && wrongCount++
        );
        const m = (correctAnswers.length - wrongCount) / selectedAnswers.length;
        score = m >= 0 ? m : 0;
      }
      const final = score * marks;
      return format(final);
    } else {
      return correct === answered ? 1 : 0;
    }
  };

  return (
    <div className="w-full ">
      {questionWithAnswers(questions, answers).map((question, index) => (
        <>
          <ObjectiveQuestion
            key={index}
            qNumber={index + 1}
            question={question}
          />
        </>
      ))}
      <div>
        <p className="text-xl font-bold">Total Marks: </p>
        <p className="text-xl font-bold">
            {questionWithAnswers(questions, answers)
                .map((question) => question.obtained_marks)
                .reduce((a, b) => a + b, 0)}{" "}
            out of{" "}
            {questionWithAnswers(questions, answers)
                .map((question) => question.marks)
                .reduce((a, b) => a + b, 0)}
        </p>
      </div>
    </div>
  );
}
