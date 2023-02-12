import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md"
import Input from "../Common/Form/Input";

const SubjectiveExam = ({ paperId }) => {
    const [multipleOptions, setMultipleOptions] = useState(false);
    const [index, setIndex] = useState(null);
    const [subjectives, setSubjectives] = useState([
        {
            question: "What is the capital of France?",
            parentQuestion: "",
            marks: 1,
        },
    ]);

    const [currentSubjective, setCurrentMCQ] = useState({
        question: "",
        parentQuestion: "",
        marks: 1,
    });

    const [editing, setEditing] = useState(false);
    const [adding, setAdding] = useState(false);


    const handleQuestionChange = (e) => {
        setCurrentMCQ({ ...currentSubjective, question: e.target.value });
    };

    const handleParentQuestionChange = (e) => {
        setCurrentMCQ({ ...currentSubjective, parentQuestion: e.target.value });
    };

    const handleMarksChange = (e) => {
        setCurrentMCQ({ ...currentSubjective, marks: parseInt(e.target.value) });
    }

    const handleAddMCQ = () => {
        setSubjectives([...subjectives, currentSubjective]);
        setCurrentMCQ({
            question: "",
            options: [],
            parentQuestion: "",
            marks: 1,
        });
        setAdding(false);
    };

    const handleEditMCQ = (index) => () => {
        setEditing(true);
        setIndex(index);
        setCurrentMCQ(subjectives[index]);
    };

    const handleUpdateMCQ = (index) => () => {
        const newMCQs = [...subjectives];
        newMCQs[index] = currentSubjective;
        setSubjectives(newMCQs);
        setCurrentMCQ({
            question: "",
            options: [],
            parentQuestion: "",
            marks: 1,
        });
        setEditing(false);
        setIndex(null);
    };

    const handleDeleteMCQ = (index) => () => {
        const newMCQs = [...subjectives];
        newMCQs.splice(index, 1);
        setSubjectives(newMCQs);
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
                            <td className="px-4 py-2">{subjective.parentQuestion}</td>
                            <td className="px-4 py-2">{subjective.marks}</td>
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
                                    onClick={handleDeleteMCQ(index)}
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
                    Add Subjective
                </button>
            </div>
            {(editing || adding) &&
                <div className="w-full mt-6">
                    <h2 className="text-xl font-bold mb-4">
                        {editing ? "Edit" : "Add"} Subjective Question
                    </h2>

                    <div className="mb-4">
                        <Input text={"Question"} required value={currentSubjective.question} onChange={handleQuestionChange} />
                    </div>


                    <div className="flex w-full gap-x-5">
                        <div className="mb-10 w-full mt-6">
                            <label className="block mb-2">Parent Question</label>


                            <select
                                type="text"
                                value={currentSubjective.parentQuestion}
                                onChange={handleParentQuestionChange}
                                className="bg-white p-2 rounded-lg border border-primary-black border-opacity-[0.15] w-full focus:outline-none focus:border-[#FEC703]">
                                <option value="" disabled>Select Correct Option</option>
                                {subjectives.map((subjective, index) => (
                                    <option key={index} value={subjective.question}>{subjective.question}</option>
                                ))}
                            </select>

                        </div>

                        <Input text={"Marks"} type={"number"} required value={currentSubjective.marks} onChange={handleMarksChange} />
                    </div>
                    {editing ? (
                        <button
                            onClick={handleUpdateMCQ(index)}
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
            }
        </div>
    );
};

export default SubjectiveExam;
