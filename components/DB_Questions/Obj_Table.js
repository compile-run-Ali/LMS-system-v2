import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Obj_Table(){
    const [mcqs, setMcqs] = useState([]);
    const specialSequence="###"

    async function getDBQuestions(){
        try{
            const res = await axios.get("/api/paper/get_all_DB_questions", {
                params: {
                    type: "objective"
                }
            })
            setMcqs(res.data)
        }
        catch(error){
            console.log("error message in get_all_DB_questions: ", error)
        }
    }

    useEffect(() => {
        getDBQuestions()
    }, [])

    return(
        <div className="px-5 mt-6">
            <h1 className="text-2xl font-poppins font-bold">Objective Questions in DB</h1>
            <table className="table-auto w-full mt-3 font-poppins px-5">
            <thead>
              <tr className="bg-blue-800 text-white font-medium">
                <th className="px-4 py-2">SR#</th>
                <th className="px-4 py-2 w-1/2">Question</th>
                <th className="px-4 py-2">Correct Option</th>
                <th className="px-4 py-2">Difficulty</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Topic</th>
                <th className="px-4 py-2">Authority</th>
                <th className="px-4 py-2">Marks</th>
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {mcqs.map((mcq, index) => (
                <tr key={index} className={`bg-gray-${index % 2 === 0 ? 100 : 200}`}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{mcq.question}</td>
                  <td className="px-4 py-2 text-center">{mcq.correct_answer.replace(specialSequence, ",")}</td>
                  <td className="px-4 py-2 text-center">{mcq.difficulty}</td>
                  <td className="px-4 py-2 text-center">{mcq.course}</td>
                  <td className="px-4 py-2 text-center">{mcq.subject}</td>
                  <td className="px-4 py-2 text-center">{mcq.topic}</td>
                  <td className="px-4 py-2 text-center">{mcq.authority}</td>
                  <td className="px-4 py-2 text-center">{mcq.marks}</td>
                  <td className="px-4 py-2">
                    <button
                    //   onClick={handleEditMCQ(index)}
                      className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
                    >
                      <MdEdit />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                    //   onClick={() => {
                    //     handleDeleteMCQ(index);
                    //   }}
                      className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}