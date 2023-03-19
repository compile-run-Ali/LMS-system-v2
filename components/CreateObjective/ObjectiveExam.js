import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Input from "../Common/Form/Input";
import MultiSelectDropdown from "./MultiSelect";
import { useRouter } from "next/router";

const MCQTable = ({
  exam,
  paperId,
  setActive,
  objective_questions,
  setObjectiveQuestions,
  freeFlow,
}) => {
  const [multipleOptions, setMultipleOptions] = useState(false);
  const [index, setIndex] = useState(null);
  const [mcqs, setMCQs] = useState(
    objective_questions.map((mcq) => {
      mcq.options = mcq.answers.split(",");
      return mcq;
    })
  );

  const [currentMCQ, setCurrentMCQ] = useState({
    question: "",
    options: ["", "", "", ""],
    correct_answer: "",
    marks: 1,
    timeAllowed: 60,
  });

  useEffect(() => {
    if (mcqs.length === 0) {
      setMCQs(
        objective_questions.map((mcq) => {
          mcq.options = mcq.answers.split(",");
          return mcq;
        })
      );
    }
  }, [objective_questions]);

  const router = useRouter();

  const editExam = () => {
    console.log("pushing back");
    router.push({
      pathname: `/faculty/create_exam/${
        exam.paper_type === "Objective" ? "objective" : "subjective"
      }`,
      query: {
        ...exam,
      },
    });
  };

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
    setCurrentMCQ({ ...currentMCQ, timeAllowed: parseInt(e.target.value) });
  };
  const handleAddMCQ = async () => {
    if (
      currentMCQ.question === "" ||
      currentMCQ.options.includes("") ||
      currentMCQ.correct_answer === "" ||
      currentMCQ.marks === "" ||
      (!freeFlow && !currentMCQ.timeAllowed)
    ) {
      alert("Please fill all the fields");
      return;
    }

    const newMCQ = await axios.post(
      "/api/faculty/paper_creation/add_objective",
      {
        paper_id: paperId,
        question: currentMCQ.question,
        answers: currentMCQ.options.toString(),
        correct_answer: currentMCQ.correct_answer,
        marks: currentMCQ.marks,
        timeAllowed: currentMCQ.timeAllowed || 60,
      }
    );
    newMCQ.data.options = newMCQ.data.answers.split(",");
    setMultipleOptions(false);
    setMCQs([...mcqs, newMCQ.data]);
    setObjectiveQuestions([...mcqs, newMCQ.data]);
    setCurrentMCQ({
      question: "",
      options: ["", "", "", ""],
      correct_answer: "",
      marks: 1,
      timeAllowed: 60,
    });
    setAdding(false);
  };

  const handleEditMCQ = (index) => () => {
    setEditing(true);
    setIndex(index);
    setCurrentMCQ(mcqs[index]);
  };

  const handleUpdateMCQ = async (index) => {
    console.log(currentMCQ);
    if (
      currentMCQ.question === "" ||
      currentMCQ.options.includes("") ||
      currentMCQ.correct_answer === "" ||
      currentMCQ.marks === "" ||
      (!freeFlow && !currentMCQ.timeAllowed)
    ) {
      alert("Please fill all the fields");
      return;
    }
    const newMCQ = await axios.post("/api/faculty/edit_objective", {
      oq_id: mcqs[index].oq_id,
      paper_id: paperId,
      question: currentMCQ.question,
      answers: currentMCQ.options.toString(),
      correct_answer: currentMCQ.correct_answer,
      marks: currentMCQ.marks,
      timeAllowed: currentMCQ.timeAllowed || 60,
    });

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
        timeAllowed: 60,
      });
      setEditing(false);
      setIndex(null);
    }
  };

  const handleDeleteMCQ = async (index) => {
    const res = await axios.post("/api/faculty/remove_objective", {
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
                <td className="px-4 py-2">{mcq.timeAllowed}</td>
              )}
              <td className="px-4 py-2">
                <button
                  onClick={handleEditMCQ(index)}
                  className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
                >
                  <MdEdit />
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    handleDeleteMCQ(index);
                  }}
                  className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
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
                value={currentMCQ.timeAllowed || 60}
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
          onClick={() => {
            setActive(1);
            editExam();
          }}
        >
          Back
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
