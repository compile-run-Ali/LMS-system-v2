import React, { useState } from "react";

const MCQTable = () => {
  const [mcqs, setMCQs] = useState([
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin"],
      correctOption: "Paris",
    },
  ]);

  const [currentMCQ, setCurrentMCQ] = useState({
    question: "",
    options: [],
    correctOption: "",
  });

  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleQuestionChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, question: e.target.value });
  };

  const handleOptionChange = (index) => (e) => {
    const newOptions = [...currentMCQ.options];
    newOptions[index] = e.target.value;
    setCurrentMCQ({ ...currentMCQ, options: newOptions });
  };

  const handleCorrectOptionChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, correctOption: e.target.value });
  };

  const handleOptionAddition = () => {
    setCurrentMCQ({ ...currentMCQ, options: [...currentMCQ.options, ""] });
  };

  const handleAddMCQ = () => {
    setMCQs([...mcqs, currentMCQ]);
    setCurrentMCQ({
      question: "",
      options: [],
      correctOption: "",
    });
  };

  const handleEditMCQ = (index) => () => {
    setEditing(true);
    setCurrentMCQ(mcqs[index]);
  };

  const handleUpdateMCQ = (index) => () => {
    const newMCQs = [...mcqs];
    newMCQs[index] = currentMCQ;
    setMCQs(newMCQs);
    setCurrentMCQ({
      question: "",
      options: [],
      correctOption: "",
    });
    setEditing(false);
  };

  const handleDeleteMCQ = (index) => () => {
    const newMCQs = [...mcqs];
    newMCQs.splice(index, 1);
    setMCQs(newMCQs);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">MCQ Table</h1>
      <table className="w-full mt-6 text-left table-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">Question</th>
            <th className="px-4 py-2">Options</th>
            <th className="px-4 py-2">Correct Option</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {mcqs.map((mcq, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{mcq.question}</td>
              <td className="px-4 py-2">{mcq.options.join(", ")}</td>
              <td className="px-4 py-2">{mcq.correctOption}</td>
              <td className="px-4 py-2">
                <button
                  onClick={handleEditMCQ(index)}
                  className="bg-blue-900 text-white p-2 rounded hover:bg-blue-800"
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={handleDeleteMCQ(index)}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center mt-10">
        <button
          onClick={() => setAdding(true)}
          className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800"
        >
          Add MCQ
        </button>
      </div>
      {(editing || adding) &&
        <div className="w-full mt-6">
          <h2 className="text-xl font-bold mb-4">
            {editing ? "Edit" : "Add"} MCQ

          </h2>
          <div className="mb-4">
            <label className="block font-bold mb-2">Question</label>
            <input
              type="text"
              value={currentMCQ.question}
              onChange={handleQuestionChange}
              className="bg-gray-200 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Options</label>
            {currentMCQ.options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={handleOptionChange(index)}
                  className="bg-gray-200 p-2 rounded w-full"
                />
              </div>
            ))}
            <button
              onClick={handleOptionAddition}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
            >
              Add Option
            </button>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Correct Option</label>
            <select
              type="text"
              value={currentMCQ.correctOption}
              onChange={handleCorrectOptionChange}
              className="bg-gray-200 p-2 rounded w-full">
              <option value="" disabled>Select Correct Option</option>
              {currentMCQ.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          {editing ? (
            <button
              onClick={handleUpdateMCQ(mcqs.indexOf(currentMCQ))}
              className="bg-blue-900 text-white p-2 rounded hover:bg-blue-800"
            >
              Update
            </button>
          ) : (

            <button
              onClick={handleAddMCQ}
              className="bg-blue-900 text-white p-2 rounded hover:bg-blue-800"
            >
              Add
            </button>
          )}
        </div>
      }
    </div>
  );
};

export default MCQTable;

