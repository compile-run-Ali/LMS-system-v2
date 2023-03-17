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
  const [questionToBeEdited, setQuestionToBeEdited] = useState({});
  const [subjectivesLocal, setSubjectivesLocal] =
    useState(subjective_questions);
  const [longQuestion, setLongQuestion] = useState(true);
  //len of subjectives

  useEffect(() => {
    console.log(subjectivesLocal);
  }, [subjectivesLocal]);

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
    const parent_question = subjectivesLocal.find(
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

  const handleQuestionNumberChange = (e) => {
    setCurrentMCQ({
      ...currentSubjective,
      questionnumber: parseInt(e.target.value),
    });
  };

  const handleAddMCQ = async () => {
    const isChild = currentSubjective.parent_question ? true : false;
    console.log("adding", currentSubjective);

    // if (!currentSubjective.questionnumber) {
    //   alert("Please set the question number/part number");
    //   return;
    // }
    // // Check if the new question is a child and validate its marks
    // if (currentSubjective.parent_question) {
    //   const parent = subjectives.find(
    //     (subjective) => subjective.sq_id === currentSubjective.parent_question
    //   );
    //   const children = subjectives.filter(
    //     (subjective) =>
    //       subjective.parent_question === currentSubjective.parent_question &&
    //       subjective.sq_id !== currentSubjective.sq_id // exclude the current question being added/edited
    //   );
    //   const totalMarks = children.reduce((acc, cur) => acc + cur.marks, 0);

    //   if (!parent || totalMarks + currentSubjective.marks > parent.marks) {
    //     alert("Invalid marks for child question");
    //     return;
    //   }
    // } else {
    //   // Check if the new question is a parent and validate its marks
    //   const children = subjectives.filter(
    //     (subjective) => subjective.parent_question === currentSubjective.sq_id // include only its immediate children
    //   );
    //   const totalMarks = children.reduce((acc, cur) => acc + cur.marks, 0);

    //   if (totalMarks > currentSubjective.marks) {
    //     alert("Invalid marks for parent question");
    //     return;
    //   }
    // }

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
    );
    console.log("new question", newSubjective);
    if (newSubjective.status === 200) {
      let updatedSubjectiveQuestions = [];
      // make sure to sort the newly added question according to questionnumber
      if (isChild) {
        // if question is child, add the child to parent's children and sort the child_question array of parent

        const parentOfAdded = subjectivesLocal.find(
          (subjective) => subjective.sq_id === currentSubjective.parent_question
        );
        console.log("parent of added", parentOfAdded);
        // edit parent's child in subjectives
        const children = [
          ...(parentOfAdded.child_question || []),
          newSubjective.data,
        ].sort((a, b) => a.questionnumber - b.questionnumber);

        updatedSubjectiveQuestions = subjectivesLocal.map((subjective) => {
          if (subjective.sq_id === parentOfAdded.sq_id) {
            return { ...subjective, child_question: children };
          }
          return subjective;
        });
      } else {
        // if question is parent, add the parent to subjectives and resort the questions
        updatedSubjectiveQuestions = [
          ...subjectivesLocal,
          newSubjective.data,
        ].sort((a, b) => a.questionnumber - b.questionnumber);
      }

      setSubjectivesLocal(updatedSubjectiveQuestions);
      setSubjectiveQuestions(updatedSubjectiveQuestions);
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

  const handleEditMCQ =
    (question) =>
    () => {
      setEditing(true);
      setQuestionToBeEdited(question);
      setCurrentMCQ(question);
    };

  const handleUpdateMCQ = async (question) => {
    const isChild = question.parent_question ? true : false;

    const updatedSubjective = await axios.post("/api/faculty/edit_subjective", {
      sq_id: question.sq_id,
      question: currentSubjective.question,
      parent_sq_id: currentSubjective.parent_question,
      questionnumber: currentSubjective.questionnumber,
      long_question: currentSubjective.long_question,
      marks: currentSubjective.marks,
    });
    if (updatedSubjective.status === 200) {
      // updatedSUbjective will be the parent question
      console.log(
        "updated subjective",
        updatedSubjective.data,
      );
      /*  api is working, write logic to update state array, 
       make sure to:
        1. if question is child, edit the child in parent's child_question array
        2. if question had a parent previously then remove this question from that question's array
        3. if question is parent, edit the parent
        
         */
      // if (isChild) {
      //   // if question is child, edit the subje
      //   const parentOfDeleted = subjectivesLocal.find(
      //     (subjective) => subjective.sq_id === question.sq_id
      //   ).parent_question;
      //   // edit parent's child in subjectives
      //   const updatedSubjectives = subjectivesLocal.map((subjective) => {
      //     if (subjective.sq_id === parentOfDeleted) {
      //       return updatedSubjective.data;
      //     }
      //     return subjective;
      //   });
      //   setSubjectivesLocal(updatedSubjectives);
      //   setSubjectiveQuestions(updatedSubjectives);
      // } else {
      //   // if question is parent, edit the parent
      //   const updatedSubjectives = subjectivesLocal.map((subjective) => {
      //     if (subjective.sq_id === question.sq_id) {
      //       return updatedSubjective.data;
      //     }
      //     return subjective;
      //   });
      //   setSubjectivesLocal(updatedSubjectives);
      //   setSubjectiveQuestions(updatedSubjectives);
      // }

      // const newMCQs = [...subjectives];
      // newMCQs[index] = updatedSubjective.data;
      // setSubjectives(newMCQs);
      // setSubjectiveQuestions(newMCQs);
      setCurrentMCQ({
        sq_id: "",
        question: "",
        parent_question: "",
        marks: 1,
        long_question: false,
      });
      setEditing(false);
      setQuestionToBeEdited(null);
    }
  };

  const handleDeleteSubjective = async (sq_id, parent, isChild = false) => {
    console.log("delete subjective", sq_id, "parent is", parent);
    const deletedSubjective = await axios.post(
      "/api/faculty/remove_subjective",
      {
        sq_id: sq_id,
      }
    );
    if (deletedSubjective.status === 200) {
      if (isChild) {
        // we have parent of deleted question, access the parent question, and delete its child from there
        const newMCQs = [...subjectivesLocal];
        const childrenAfterDeleting = parent.child_question.filter(
          (child) => child.sq_id !== sq_id
        );
        parent.child_question = childrenAfterDeleting;
        const index = newMCQs.findIndex(
          (subjective) => subjective.sq_id === parent.sq_id
        );
        newMCQs[index] = parent;
        setSubjectivesLocal(newMCQs);
        setSubjectiveQuestions(newMCQs);
      } else {
        const newMCQs = [...subjectivesLocal];
        const index = newMCQs.findIndex(
          (subjective) => subjective.sq_id === sq_id
        );
        newMCQs.splice(index, 1);
        setSubjectivesLocal(newMCQs);
        setSubjectiveQuestions(newMCQs);
      }
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
          {subjectivesLocal.map((subjective, index) => (
            <>
              {" "}
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{subjective.questionnumber}</td>
                <td className="px-4 py-2">{subjective.question}</td>
                <td className="px-4 py-2">
                  {subjective.parent_question?.question}
                </td>
                <td className="px-4 py-2">{subjective.marks}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={handleEditMCQ(subjective)}
                    className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
                  >
                    <MdEdit />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      handleDeleteSubjective(subjective.sq_id);
                    }}
                    className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
              {subjective.child_question?.map((child, index) => (
                <tr key={child.sq_id} className="border-l">
                  <td className="px-4 py-2 pl-12">{child.questionnumber}</td>
                  <td className="px-4 py-2">{child.question}</td>
                  <td className="px-4 py-2">{subjective.question}</td>
                  <td className="px-4 py-2">{child.marks}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={handleEditMCQ(child)}
                      className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
                    >
                      <MdEdit />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        handleDeleteSubjective(child.sq_id, subjective, true);
                      }}
                      className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </>
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
                {subjectivesLocal
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
              onChange={(e) =>
                setCurrentMCQ({
                  ...currentSubjective,
                  marks: parseInt(e.target.value),
                })
              }
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
              min={subjectivesLocal.length + 1}
              value={currentSubjective.questionnumber}
              onChange={handleQuestionNumberChange}
            />
          </div>
          <div className="flex items-center gap-x-3 ml-2">
            <label className="block">Long Question?</label>
            <input
              type="checkbox"
              className="accent-slate-100"
              onChange={(e) => setLongQuestion(e.target.checked)}
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
                handleUpdateMCQ(questionToBeEdited);
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
