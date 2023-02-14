import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

const MCQTable = ({mcqs}) => {
    return (
        <div className="w-full font-poppins mt-10 rounded-lg">
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
                            <td className=" px-4 py-2">{index+1}</td>
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