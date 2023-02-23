import React, { useState } from "react";

export default function ObjectiveQuestion({ question, qNumber }) {
  const correctArray = question.correct_answer.split(", ");
  const answerArray = question.answers.split(",");
  const multipleAllowed = correctArray.length > 1;

  return (
    <div className="w-3/4 mx-auto my-6 bg-zinc-200 rounded-lg py-5 px-10">
      <div>
        <p className="text-xl">{qNumber + ". " + question.question}</p>
        <div className="grid grid-cols-2 gap-2">
          {answerArray.map((answer, index) => (
            <div
              key={index}
              className="w-full flex rounded-lg px-2 transition-all items-center bg-blue-400"
            >
              <input
                // ${correctArray.includes(answer) ? "accent-green-500" : "accent-red-500"}
                className={`w-3 h-3 pointer-events-none 
                accent-white
                `}
                type={multipleAllowed ? "checkbox" : "radio"}
                // disabled
                defaultChecked={question?.selected_answers
                  ?.split(", ")
                  .includes(answer)}
              />
              <label
                htmlFor="list-radio-license"
                className="w-full py-3 ml-2 text-sm font-medium text-white"
              >
                {answer}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-2 space-y-1 bg-blue-700 w-full p-2 px-4 rounded-lg flex flex-col">
          <p className="text-sm text-white">
            <span className="font-bold">Correct Answer: </span>
            {question.correct_answer}
          </p>
          <p className="text-sm text-white">
            <span className="font-bold"> Marks: </span>
            {question.obtained_marks} out of {question.marks}
          </p>
        </div>
      </div>
    </div>
  );
}
