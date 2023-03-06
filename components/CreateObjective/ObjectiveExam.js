import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Input from "../Common/Form/Input";
import MultiSelectDropdown from "./MultiSelect";

const MCQTable = ({
  paperId,
  setActive,
  objective_questions,
  setObjectiveQuestions,
  freeFlow,
}) => {
  const [multipleOptions, setMultipleOptions] = useState(false);
  const [index, setIndex] = useState(null);
  const [paper, setPaper] = useState({});
  const [mcqs, setMCQs] = useState(
    objective_questions.map((mcq) => {
      mcq.options = mcq.answers.split(",");
      return mcq;
    })
  );
  //console log the paper from the id using a get request
  console.log(freeFlow);

  const [currentMCQ, setCurrentMCQ] = useState({
    question: "",
    options: ["", "", "", ""],
    correct_answer: "",
    marks: 1,
    time_allowed: null,
  });

  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleMultipleOptionsChange = (e) => {
    setMultipleOptions(e.target.checked);
  };

  const handleQuestionChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, question: e.target.value });
  };

  const handleOptionChange = (index) => (e) => {
    const newOptions = [...currentMCQ.options];
    newOptions[index] = e.target.value.replace(/,/g, " ");
    setCurrentMCQ({ ...currentMCQ, options: newOptions });
  };

  const handleMultipleCorrectOptionChange = (val) => {
    setCurrentMCQ({ ...currentMCQ, correct_answer: val });
  };

  const handleCorrectOptionChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, correct_answer: e.target.value });
  };

  const handleMarksChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, marks: parseInt(e.target.value) });
  };

  const handleOptionAddition = () => {
    setCurrentMCQ({ ...currentMCQ, options: [...currentMCQ.options, ""] });
  };

  const handleOptionDeletion = (index) => () => {
    const newOptions = [...currentMCQ.options];
    newOptions.splice(index, 1);
    setCurrentMCQ({ ...currentMCQ, options: newOptions });
  };

  const handleTimeAllowedChange = (e) => {
    setCurrentMCQ({ ...currentMCQ, time_allowed: parseInt(e.target.value) });
  };

  const handleAddMCQ = async () => {
    const newMCQ = await axios.post(
      "http://localhost:3000/api/faculty/paper_creation/add_objective",
      {
        paper_id: paperId,
        question: currentMCQ.question,
        answers: currentMCQ.options.toString(),
        correct_answer: currentMCQ.correct_answer,
        marks: currentMCQ.marks,
        time_allowed: currentMCQ.time_allowed,
      }
    );
    console.log(newMCQ.data);
    newMCQ.data.options = newMCQ.data.answers.split(",");
    setMCQs([...mcqs, newMCQ.data]);
    setObjectiveQuestions([...mcqs, newMCQ.data]);
    setCurrentMCQ({
      question: "",
      options: ["", "", "", ""],
      correct_answer: "",
      marks: 1,
      time_allowed: null,
    });
    setAdding(false);
  };

  const handleEditMCQ = (index) => () => {
    setEditing(true);
    setIndex(index);
    setCurrentMCQ(mcqs[index]);
  };

  const handleUpdateMCQ = async (index) => {
    const newMCQ = await axios.post("http://localhost:3000/api/faculty/edit_objective", {
      oq_id: mcqs[index].oq_id,
      paper_id: paperId,
      question: currentMCQ.question,
      answers: currentMCQ.options.toString(),
      correct_answer: currentMCQ.correct_answer,
      marks: currentMCQ.marks,
      time_allowed: currentMCQ.time_allowed,
    });

    console.log(newMCQ);

    if (newMCQ.status === 200) {
      const newMCQs = [...mcqs];
      newMCQs[index] = currentMCQ;
      setMCQs(newMCQs);
      setObjectiveQuestions(newMCQs);
      setCurrentMCQ({
        question: "",
        options: [],
        correct_answer: "",
        marks: 1,
        time_allowed: null,
      });
      setEditing(false);
      setIndex(null);
    }
  };

  const handleDeleteMCQ = async (index) => {
    const res = await axios.post("http://localhost:3000/api/faculty/remove_objective", {
      oq_id: mcqs[index].oq_id,
    });
    if (res.status === 200) {
      const newMCQs = [...mcqs];
      newMCQs.splice(index, 1);
      setMCQs(newMCQs);
      setObjectiveQuestions(newMCQs);
    }
  };

  return (
    <div className="flex font-poppins flex-col items-center p-6">
      <h1 className="text-2xl font-bold">MCQ Question</h1>
      <table className="w-full mt-6 text-left table-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">SR#</th>
            <th className="px-4 py-2">Question</th>
            <th className="px-4 py-2">Options</th>
            <th className="px-4 py-2">Correct Option</th>
            <th className="px-4 py-2">Marks</th>
            {freeFlow ? null : <th className="px-4 py-2">Time Allowed</th>}
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {mcqs.map((mcq, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{mcq.question}</td>
              <td className="px-4 py-2">{mcq.options.join(",")}</td>
              <td className="px-4 py-2">{mcq.correct_answer}</td>
              <td className="px-4 py-2">{mcq.marks}</td>
              {freeFlow ? null : (
                <td className="px-4 py-2">{mcq.time_allowed}</td>
              )}
              <td className="px-4 py-2">
                <button
                  onClick={handleEditMCQ(index)}
                  className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white"
                >
                  <MdEdit />
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    handleDeleteMCQ(index);
                  }}
                  className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center mt-10">
        <button
          onClick={() => setAdding(true)}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add MCQ
        </button>
      </div>
      {(editing || adding) && (
        <div className="w-full mt-6">
          <h2 className="text-xl font-bold mb-4">
            {editing ? "Edit" : "Add"} MCQ
          </h2>

          <div className="mb-4">
            <Input
              text={"Question"}
              required
              value={currentMCQ.question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="">
            <label className="block mb-2">Options</label>
            <div className="grid grid-cols-3 w-full gap-x-5">
              {currentMCQ.options.map((option, index) => (
                <div key={index} className="mb-2 ">
                  <input
                    type="text"
                    value={option}
                    onChange={handleOptionChange(index)}
                    className="bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleOptionAddition}
              className="bg-[#FEC703] text-white p-2 rounded hover:bg-[#edbd12]"
            >
              Add Option
            </button>

            <button
              onClick={handleOptionDeletion(currentMCQ.options.length - 1)}
              className="bg-red-600 ml-5 text-white p-2 rounded hover:bg-red-700"
            >
              Delete Option
            </button>
          </div>
          <div className="flex items-center mt-10 mb-2 gap-x-3">
            <label className="block">Allow Multiple Correct Options</label>
            <input
              type="checkbox"
              className="accent-slate-100"
              onChange={handleMultipleOptionsChange}
            />
          </div>
          <div className="flex w-full gap-x-5">
            <div className="mb-10 w-full mt-6">
              <label className="block mb-2">Correct Option</label>
              {multipleOptions ? (
                <MultiSelectDropdown
                  options={currentMCQ.options}
                  onChange={handleMultipleCorrectOptionChange}
                />
              ) : (
                <select
                  type="text"
                  value={currentMCQ.correct_answer}
                  onChange={handleCorrectOptionChange}
                  className="bg-white p-2 rounded-lg border border-primary-black border-opacity-[0.15] w-full focus:outline-none focus:border-[#FEC703]"
                >
                  <option value="" disabled>
                    Select Correct Option
                  </option>
                  {currentMCQ.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <Input
              text={"Marks"}
              type={"number"}
              required
              value={currentMCQ.marks}
              onChange={handleMarksChange}
            />
            {/* input for time allowed */}
            {freeFlow ? null : (
              <Input
                text={"Time Allowed in Seconds"}
                type={"number"}
                required
                value={currentMCQ.time_allowed}
                onChange={handleTimeAllowedChange}
              />
            )}
          </div>
          {editing ? (
            <button
              onClick={() => {
                handleUpdateMCQ(index);
              }}
              className="bg-blue-800 text-white p-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddMCQ}
              className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add
            </button>
          )}
        </div>
      )}
      <div className="mt-10 w-full pr-10 flex justify-end gap-x-5">
        <button
          type="button"
          className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
          onClick={() => setActive(3)}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default MCQTable;
