import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

const MCQTable = ({objective_questions}) => {
    const [mcqs, setMCQs] = useState([]);

    useEffect(() => {
        setMCQs(objective_questions);
    }, [objective_questions]);

    return (
        <div className="w-full font-poppins mt-10 rounded-lg">
            <div className="flex justify-end my-5">
                <button className="bg-[#f5c51a] text-white border rounded-md px-3 py-2 flex items-center gap-2">
                    Edit <MdEdit />
                </button>
            </div>
            <table className="table-auto w-full bg-white rounded-lg">
                <thead>
                    <tr className="text-blue-800">
                        <th className=" px-4 py-2">Sr. No.</th>
                        <th className=" px-4 py-2">Question</th>
                        <th className=" px-4 py-2">Options</th>
                        <th className=" px-4 py-2">Correct Option</th>
                        <th className=" px-4 py-2">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {mcqs.map((mcq, index) => (
                        <tr key={index} className="text-center">
                            <td className=" px-4 py-2">{index + 1}</td>
                            <td className=" px-4 py-2">{mcq.question}</td>
                            <td className=" px-4 py-2">{mcq.answers}</td>
                            <td className=" px-4 py-2">{mcq.correct_answer}</td>
                            <td className=" px-4 py-2">{mcq.marks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MCQTable;