import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Input from "../Common/Form/Input";
import axios from "axios";

const SubjectiveExam = ({
  paperId,
  setActive,
  subjective_questions,
  setSubjectiveQuestions,
}) => {
  const [index, setIndex] = useState(null);
  const [subjectives, setSubjectives] = useState(subjective_questions);
  const [longQuestion, setLongQuestion] = useState(true);
  //len of subjectives
  console.log(subjectives.length);

  useEffect(() => {
    console.log(subjectives);
  }, [subjectives]);

  const [currentSubjective, setCurrentMCQ] = useState({
    sq_id: "",
    question: "",
    parent_question: "",
    long_question: longQuestion,
    marks: 1,
    questionnumber: 1,
  });

  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleQuestionChange = (e) => {
    setCurrentMCQ({ ...currentSubjective, question: e.target.value });
  };

  const handleParentQuestionChange = async (e) => {
    const parent_question = subjectives.find(
      (subjective) => subjective.question === e.target.value
    );
    if (!parent_question) {
      setCurrentMCQ({ ...currentSubjective, parent_question: "" });
      return;
    } else {
      setCurrentMCQ({
        ...currentSubjective,
        parent_question: parent_question.sq_id,
      });
    }
  };

  const handleMarksChange = (e) => {
    setCurrentMCQ({ ...currentSubjective, marks: parseInt(e.target.value) });
  };
  const handleQuestionNumberChange = (e) => {
    setCurrentMCQ({
      ...currentSubjective,
      questionnumber: parseInt(e.target.value),
    });
  };

  const handleLongQuestion = (e) => {
    setLongQuestion(e.target.checked);
  };

  const handleAddMCQ = async () => {
    console.log(currentSubjective);
    if (!currentSubjective.questionnumber) {
      alert("Please set the question number/part number");
      return;
    }
    // Check if the new question is a child and validate its marks
    if (currentSubjective.parent_question) {
      const parent = subjectives.find(
        (subjective) => subjective.sq_id === currentSubjective.parent_question
      );
      const children = subjectives.filter(
        (subjective) =>
          subjective.parent_question === currentSubjective.parent_question &&
          subjective.sq_id !== currentSubjective.sq_id // exclude the current question being added/edited
      );
      const totalMarks = children.reduce((acc, cur) => acc + cur.marks, 0);
  
      if (!parent || totalMarks + currentSubjective.marks > parent.marks) {
        alert("Invalid marks for child question");
        return;
      }
    } else { // Check if the new question is a parent and validate its marks
      const children = subjectives.filter(
        (subjective) =>
          subjective.parent_question === currentSubjective.sq_id // include only its immediate children
      );
      const totalMarks = children.reduce((acc, cur) => acc + cur.marks, 0);
  
      if (totalMarks > currentSubjective.marks) {
        alert("Invalid marks for parent question");
        return;
      }
    }
  
    const newSubjective = await axios.post(
      "/api/faculty/paper_creation/add_subjective",
      {
        paper_id: paperId,
        question: currentSubjective.question,
        parent_question: currentSubjective.parent_question,
        long_question: currentSubjective.long_question,
        marks: currentSubjective.marks,
        questionnumber: currentSubjective.questionnumber,
      }
    )
    if (newSubjective.status === 200) {
      setSubjectives([...subjectives, newSubjective.data]);
      setSubjectiveQuestions([...subjectives, newSubjective.data]);
      setCurrentMCQ({
        sq_id: "",
        question: "",
        parent_question: "",
        marks: 1,
        long_question: longQuestion,
      });
      setAdding(false);
    }
  };
  

  const handleEditMCQ = (index) => () => {
    setEditing(true);
    setIndex(index);
    setCurrentMCQ(subjectives[index]);
  };

  const handleUpdateMCQ = async (index) => {
    const updatedSubjective = await axios.post("/api/faculty/edit_subjective", {
      sq_id: subjectives[index].sq_id,
      paper_id: paperId,
      question: currentSubjective.question,
      parent_question: currentSubjective.parent_question,
      long_question: currentSubjective.long_question,
      marks: currentSubjective.marks,
    });
    if (updatedSubjective.status === 200) {
      const newMCQs = [...subjectives];
      newMCQs[index] = updatedSubjective.data;
      setSubjectives(newMCQs);
      setSubjectiveQuestions(newMCQs);
      setCurrentMCQ({
        sq_id: "",
        question: "",
        parent_question: "",
        marks: 1,
        long_question: false,
      });
      setEditing(false);
      setIndex(null);
    }
  };

  const handleDeleteMCQ = async (index) => {
    const deletedSubjective = await axios.post(
      "/api/faculty/remove_subjective",
      {
        sq_id: subjectives[index].sq_id,
      }
    );
    if (deletedSubjective.status === 200) {
      const newMCQs = [...subjectives];
      newMCQs.splice(index, 1);
      setSubjectives(newMCQs);
      setSubjectiveQuestions(newMCQs);
    }
  };

  return (
    <div className="flex font-poppins flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Subjective Question</h1>
      <table className="w-full mt-6 text-left table-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">SR#</th>
            <th className="px-4 py-2">Question</th>
            <th className="px-4 py-2">Parent Question</th>
            <th className="px-4 py-2">Marks</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {subjectives.map((subjective, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{subjective.question}</td>
              <td className="px-4 py-2">
                {subjective.parent_question?.question}
              </td>
              <td className="px-4 py-2">{subjective.marks}</td>
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
          Add Subjective
        </button>
      </div>
      {(editing || adding) && (
        <div className="w-full mt-6">
          <h2 className="text-xl font-bold mb-4">
            {editing ? "Edit" : "Add"} Subjective Question
          </h2>

          <div className="mb-4">
            <Input
              text={"Question"}
              required
              value={currentSubjective.question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="flex w-full gap-x-5">
            <div className="mb-10 w-full mt-6">
              <label className="block mb-2">Parent Question</label>

              <select
                type="text"
                value={currentSubjective.parent_question?.sq_id}
                onChange={handleParentQuestionChange}
                className="bg-white p-2 rounded-lg border border-primary-black border-opacity-[0.15] w-full focus:outline-none focus:border-[#FEC703]"
              >
                <option value="">Select Parent Question</option>
                {subjectives
                  .filter((subjective) => !subjective.parent_question)
                  .map((subjective, index) => (
                    <option key={index} value={subjective.question}>
                      {subjective.question}
                    </option>
                  ))}
              </select>
            </div>

            <Input
              text={"Marks"}
              type={"number"}
              required
              min={1}
              value={currentSubjective.marks}
              onChange={handleMarksChange}
            />
            <Input
              // if parent exists the question number will be called part number other wise, question number
              text={
                currentSubjective.parent_question
                  ? "Part Number"
                  : "Question Number"
              }
              type={"number"}
              required
              min={subjectives.length + 1}
              value={currentSubjective.questionnumber}
              onChange={handleQuestionNumberChange}
            />
          </div>
          <div className="flex items-center gap-x-3 ml-2">
            <label className="block">Long Question?</label>
            <input
              type="checkbox"
              className="accent-slate-100"
              onChange={handleLongQuestion}
              checked={longQuestion}
            />
          </div>
          <div className="text-sm ml-2 mb-10">
            {" "}
            (If not checked, max 50 characters will be allowed)
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
      <div className=" w-full pr-10 flex justify-end gap-x-5">
        <button
          type="button"
          className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8"
          onClick={() => setActive(2)}
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
          onClick={() => setActive(4)}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SubjectiveExam;
