import React, { useState } from "react";

export default function ObjectiveQuestion({ question, qNumber }) {
  const correctArray = question.correct_answer.split(",");
  const answerArray = question.answers.split(",");
  const multipleAllowed = correctArray.length > 1;

  return (
    <div className="mx-auto my-10 pt-2 border-t border-blue-900 text-black">
      <div>
        <p className="text-xl">{qNumber + ". " + question.question}</p>
        <div className="grid gap-y-3">
          {answerArray.map((answer, index) => (
            <div
              key={index}
              className="w-full flex rounded-lg px-2 transition-all items-center shadow-md shadow-gray-500"
            >
              <input
                // ${correctArray.includes(answer) ? "accent-green-500" : "accent-red-500"}
                className={`w-3 h-3 pointer-events-none 
                accent-blue-900
                `}
                type={multipleAllowed ? "checkbox" : "radio"}
                // disabled
                defaultChecked={question?.selected_answers
                  ?.split(",")
                  .includes(answer)}
              />
              <label
                htmlFor="list-radio-license"
                className="w-full py-3 ml-2 text-sm font-medium"
              >
                {answer}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1 bg-blue-900 w-full p-2 px-4 rounded-lg flex flex-col">
          <p className="text-sm text-white">
            <span className="font-bold">Correct Answer: </span>
            { question.correct_answer}
          </p>
          <p className="text-sm text-white">
            <span className="font-bold"> Marks: </span>
            {question.marksobtained?.toFixed(2) || '0.00'} out of {question.marks.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
