import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

const SubjectiveTable = ({subjective_questions}) => {
    const [subjectives, setSubjectives] = useState([]);

    useEffect(() => {
        setSubjectives(subjective_questions);
    }, [subjective_questions]);

    return (
        <div className="w-full font-poppins mt-10 rounded-lg">
            <table className="table-auto w-full bg-white rounded-lg">
                <thead>
                    <tr className="text-blue-800">
                        <th className=" px-4 py-2">Sr. No.</th>
                        <th className=" px-4 py-2">Question</th>
                        <th className=" px-4 py-2">Parent Question</th>
                        <th className=" px-4 py-2">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {subjectives.map((question, index) => (
                        <tr key={index} className="text-center">
                            <td className=" px-4 py-2">{index + 1}</td>
                            <td className=" px-4 py-2">{question.question}</td>
                            <td className=" px-4 py-2">{question.parent_question?.question}</td>
                            <td className=" px-4 py-2">{question.marks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubjectiveTable;