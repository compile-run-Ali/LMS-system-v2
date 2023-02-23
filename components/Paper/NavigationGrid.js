import React from "react";

export default function NavigationGrid({
  totalQuestions,
  currentQuestion,
  setCurrentQuestion,
}) {
  return (
    <div className="mt-6 border-blue-800 ">
      <h1 className="text-3xl mb-4 font-poppins">Navigate</h1>
      <div className="grid grid-cols-5 max-w-[250px]">
        {[...Array(totalQuestions)].map((_, index) => (
          <div
            onClick={() => setCurrentQuestion(index)}
            key={index}
            className={`min-w-[20px] max-w-[50px] transition-colors cursor-pointer border border-blue-800 w-full aspect-square flex justify-center items-center
          ${
            currentQuestion === index
              ? "bg-blue-800 text-white"
              : "bg-white text-black hover:bg-blue-500 hover:text-white "
          }
            `}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
