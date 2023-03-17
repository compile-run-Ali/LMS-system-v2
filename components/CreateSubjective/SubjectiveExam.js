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
  const [subjectivesLocal, setSubjectivesLocal] =
    useState(subjective_questions);
  const [previousParent, setPreviousParent] = useState(null);
  const [longQuestion, setLongQuestion] = useState(true);

  const [currentSubjective, setCurrentQuestion] = useState({
    sq_id: "",
    question: "",
    parent_sq_id: "",
    long_question: longQuestion,
    marks: 1,
    questionnumber: subjectivesLocal.length + 1,
  });

  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleQuestionChange = (e) => {
    setCurrentQuestion({ ...currentSubjective, question: e.target.value });
  };

  const handleParentQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentSubjective,
      parent_sq_id: e.target.value || "",
    });
  };

  const handleQuestionNumberChange = (e) => {
    setCurrentQuestion({
      ...currentSubjective,
      questionnumber: parseInt(e.target.value),
    });
  };

  const validateQuestionData = () => {
    const isChild = currentSubjective.parent_sq_id ? true : false;

    if (
      !currentSubjective.question ||
      !currentSubjective.questionnumber ||
      !currentSubjective.marks
    ) {
      alert("Please fill all the fields");
      return false;
    }

    // if is child then check if part number already exists
    if (isChild) {
      const parentOfAdded = subjectivesLocal.find(
        (subjective) => subjective.sq_id === currentSubjective.parent_sq_id
      );
      if (!parentOfAdded.child_question) parentOfAdded.child_question = [];
      const partNumberExists = parentOfAdded.child_question.find(
        (subjective) =>
          subjective.questionnumber === currentSubjective.questionnumber &&
          subjective.sq_id !== currentSubjective.sq_id
      );
      if (partNumberExists) {
        alert("Part number already exists");
        return false;
      }
      // also check that child question marks cant exceed parent question marks
      let totalMarks = 0;
      parentOfAdded.child_question.forEach((child) => {
        if (child.sq_id !== currentSubjective.sq_id) totalMarks += child.marks;
      });

      if (totalMarks + currentSubjective.marks > parentOfAdded.marks) {
        alert(
          "Total marks of all parts of a question cannot exceed the total marks of the question"
        );
        return false;
      }
    } else {
      // if a question number already exists then it cant be current questions question number
      const questionNumberExists = subjectivesLocal.find(
        (subjective) =>
          subjective.questionnumber === currentSubjective.questionnumber &&
          subjective.sq_id !== currentSubjective.sq_id
      );
      if (questionNumberExists) {
        alert("Question number already exists");
        return false;
      }
    }
    return true;
  };

  const handleAddMCQ = async () => {
    // validate data
    const isValid = validateQuestionData();
    if (!isValid) return;

    const isChild = currentSubjective.parent_sq_id ? true : false;
    const newSubjective = await axios.post(
      "/api/faculty/paper_creation/add_subjective",
      {
        paper_id: paperId,
        question: currentSubjective.question,
        parent_sq_id: currentSubjective.parent_sq_id,
        long_question: currentSubjective.long_question,
        marks: currentSubjective.marks,
        questionnumber: currentSubjective.questionnumber,
      }
    );
    if (newSubjective.status === 200) {
      let updatedSubjectiveQuestions = [];
      // make sure to sort the newly added question according to questionnumber
      if (isChild) {
        // if question is child, add the child to parent's children and sort the child_question array of parent

        const parentOfAdded = subjectivesLocal.find(
          (subjective) => subjective.sq_id === currentSubjective.parent_sq_id
        );
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
      setCurrentQuestion({
        sq_id: "",
        question: "",
        parent_sq_id: "",
        marks: 1,
        long_question: longQuestion,
        questionnumber: subjectivesLocal.length + 1,
      });
      setAdding(false);
    } else {
      alert("Error adding question");
    }
  };

  const handleEditMCQ = (question) => () => {
    setEditing(!editing);
    setPreviousParent(question.parent_sq_id);
    setCurrentQuestion(question);
  };

  const handleUpdateMCQ = async (question) => {
    // variable to check if now has parent
    const isValid = validateQuestionData();
    if (!isValid) return;
    const nowHasParent = question.parent_sq_id ? true : false;
    // how to check if previously had parent?
    const previouslyHadParent = previousParent ? true : false;

    await axios
      .post("/api/faculty/edit_subjective", {
        sq_id: question.sq_id,
        question: currentSubjective.question,
        parent_sq_id: currentSubjective.parent_sq_id,
        questionnumber: currentSubjective.questionnumber,
        long_question: currentSubjective.long_question,
        marks: currentSubjective.marks,
      })
      .then((res) => {
        // case 1: previously had parent, now no parent
        // case 2: previously had no parent, now no parent
        // case 3: previously had no parent, now has parent
        // case 4: previously had parent, now has parent
        let updatedSubjectives = [];
        // case 1: previously had parent, now no parent
        if (previouslyHadParent && !nowHasParent) {
          console.log("case 1: previously had parent, now no parent");
          // remove child from parent question array and push it in general array in sorted array
          // remove child from parent's child_question array
          const parentOfRemoved = subjectivesLocal.find(
            (subjective) => subjective.sq_id === previousParent
          );
          const children = (parentOfRemoved.child_question || []).filter(
            (child) => child.sq_id !== question.sq_id
          );
          // edit parent's child in subjectives
          updatedSubjectives = subjectivesLocal.map((subjective) => {
            if (subjective.sq_id === parentOfRemoved.sq_id) {
              return { ...subjective, child_question: children };
            }
            return subjective;
          });
          // push in general array
          updatedSubjectives = [...updatedSubjectives, question].sort(
            (a, b) => a.questionnumber - b.questionnumber
          );
        }
        // case 2: previously had no parent, now no parent OR parent not changed
        else if (!previouslyHadParent && !nowHasParent) {
          console.log("case 2: previously had no parent, now no parent");
          // just sort the array
          updatedSubjectives = subjectivesLocal.map((subjective) => {
            if (subjective.sq_id === question.sq_id) {
              return question;
            }
            return subjective;
          });
          updatedSubjectives = updatedSubjectives.sort(
            (a, b) => a.questionnumber - b.questionnumber
          );
        }
        // case 3: previously had no parent, now has parent
        else if (!previouslyHadParent && nowHasParent) {
          // working
          // push in parent array, set parent field
          console.log("case 3: previously had no parent, now has parent");
          // add the question to the parent's child_question array
          const parentOfAdded = subjectivesLocal.find(
            (subjective) => subjective.sq_id === currentSubjective.parent_sq_id
          );
          const children = [
            ...(parentOfAdded.child_question || []),
            question,
          ].sort((a, b) => a.questionnumber - b.questionnumber);
          updatedSubjectives = subjectivesLocal.map((subjective) => {
            if (subjective.sq_id === parentOfAdded.sq_id) {
              return {
                ...subjective,
                child_question: children,
              };
            }
            return subjective;
          });
          updatedSubjectives = updatedSubjectives.filter(
            (subjective) => subjective.sq_id !== question.sq_id
          );
        }
        // case 4: previously had parent, now has parent
        else if (previouslyHadParent && nowHasParent) {
          // original questions parent id does not change
          console.log("case 4: previously had parent, now has parent");

          // if parent existss but not changed
          if (currentSubjective.parent_sq_id === previousParent) {
            // only edit the current child question of parent
            const parentOfEdited = subjectivesLocal.find(
              (subjective) =>
                subjective.sq_id === currentSubjective.parent_sq_id
            );

            const children = parentOfEdited.child_question
              .map((child_question) => {
                if (child_question.sq_id === question.sq_id) {
                  return question;
                }
                return child_question;
              })
              .sort((a, b) => a.questionnumber - b.questionnumber);

            updatedSubjectives = subjectivesLocal.map((subjective) => {
              if (subjective.sq_id === parentOfEdited.sq_id) {
                return { ...subjective, child_question: children };
              }
              return subjective;
            });
          } else {
            // remove the question from the previous parent's child_question array
            // add the question to the new parent's child_question array
            const parentOfDeleted = subjectivesLocal.find(
              (subjective) => subjective.sq_id === previousParent
            );
            const childrenAfterDeleting = parentOfDeleted.child_question.filter(
              (child) => child.sq_id !== question.sq_id
            );
            const parentOfAdded = subjectivesLocal.find(
              (subjective) =>
                subjective.sq_id === currentSubjective.parent_sq_id
            );
            const childrenAfterAdding = [
              ...(parentOfAdded.child_question || []),
              question,
            ].sort((a, b) => a.questionnumber - b.questionnumber);
            updatedSubjectives = subjectivesLocal.map((subjective) => {
              if (subjective.sq_id === parentOfDeleted.sq_id) {
                return { ...subjective, child_question: childrenAfterDeleting };
              }
              if (subjective.sq_id === parentOfAdded.sq_id) {
                return { ...subjective, child_question: childrenAfterAdding };
              }
              return subjective;
            });
          }
        }
        setSubjectivesLocal(updatedSubjectives);
        setSubjectiveQuestions(updatedSubjectives);
        setCurrentQuestion({
          sq_id: "",
          question: "",
          parent_sq_id: "",
          marks: 1,
          long_question: false,
          questionnumber: 1,
        });

        setEditing(false);
        setPreviousParent(null);
      })

      .catch((err) => {
        console.log("Error updating question", err);
      });
  };

  const handleDeleteSubjective = async (sq_id, parent, isChild = false) => {
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
            <th className="px-4">Q#</th>
            <th className="px-4">Part</th>
            <th className="px-4 py-2">Question</th>
            <th className="px-4 py-2">Parent Question</th>
            <th className="px-4 py-2">Marks</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {subjectivesLocal.map((subjective, index) => (
            <React.Fragment key={subjective.sq_id}>
              <tr
                className={` border
              ${
                subjective.child_question &&
                subjective.child_question.length > 0 &&
                "border border-b-0"
              }
              `}
              >
                <td className="px-6">{subjective.questionnumber}</td>
                <td className="px-6"></td>
                <td className="px-4 py-2">{subjective.question}</td>
                <td className="px-4 py-2">
                  {subjective.parent_sq_id?.question}
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
                <tr
                  key={child.sq_id}
                  className={`border-x ${
                    index === subjective.child_question.length - 1 && "border-b"
                  }`}
                >
                  <td className="pl-2"></td>
                  <td className="pl-2">{child.questionnumber}</td>
                  <td className="px-4 py-1">{child.question}</td>
                  <td className="px-4 py-1">{subjective.question}</td>
                  <td className="px-4 py-1">{child.marks}</td>
                  <td className="px-4 py-1">
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
            </React.Fragment>
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
                value={currentSubjective.parent_sq_id || ""}
                onChange={handleParentQuestionChange}
                className="bg-white p-2 rounded-lg border border-primary-black border-opacity-[0.15] w-full focus:outline-none focus:border-[#FEC703]"
              >
                <option value="">Select Parent Question</option>
                {subjectivesLocal
                  .filter(
                    (subjective) =>
                      !subjective.parent_sq_id &&
                      subjective.sq_id !== currentSubjective.sq_id
                  )
                  .map((subjective, index) => (
                    <option key={index} value={subjective.sq_id}>
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
                setCurrentQuestion({
                  ...currentSubjective,
                  marks: parseInt(e.target.value),
                })
              }
            />
            <Input
              // if parent exists the question number will be called part number other wise, question number
              text={
                currentSubjective.parent_sq_id
                  ? "Part Number"
                  : "Question Number"
              }
              type={"number"}
              required
              min={1}
              value={
                currentSubjective.parent_sq_id
                  ? 1
                  : currentSubjective.questionnumber
              }
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
                handleUpdateMCQ(currentSubjective);
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
          onClick={() => {
            // check if all parent question marks are equal to sum of their child question marks
            let allowProceed = true;
            subjectivesLocal.forEach((subjective) => {
              if (
                subjective.child_question &&
                subjective.child_question.length > 0
              ) {
                let sum = 0;
                subjective.child_question.forEach((child) => {
                  sum += child.marks;
                });
                if (sum !== subjective.marks) {
                  alert(
                    `Question ${subjective.questionnumber}'s marks are less than the sum of its marks.`
                  );
                  allowProceed = false;
                }
              }
            });

            if (allowProceed) setActive(4);
          }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SubjectiveExam;
