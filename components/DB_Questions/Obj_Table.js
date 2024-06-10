import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Edit_MCQ_Form from "./Edit_MCQ_Form";
import Spinner from "../Loader/Spinner";

export default function Obj_Table(){
    const [mcqs, setMcqs] = useState([]);
    const [currentMCQ, setCurrentMCQ] = useState()
    const [editing, setEditing] = useState(false);
    const [index, setIndex] = useState(null);
    const [loading, setLoading] = useState({});
    const specialSequence="###"
    const btn_call = "Create Question"
    const [courses_subjects_topics, setCourses_subjects_topics] = useState([])

    const handleEditMCQ = (mcq, index) => () => {
        if (!editing) {
          setEditing(true);
          // setIndex(index);
          let mcq_index = mcqs.indexOf(mcq)
          console.log("mcq_index: ", mcq_index)
          // setCurrentMCQ(mcqs[index]);
          setIndex(mcq_index);
          setCurrentMCQ(mcqs[mcq_index]);
        //   setCurrentMCQ({...currentMCQ, options: currentMCQ.answers.split(",")})
          window.scrollTo(0, 0);
        } else {
          alert(
            "Please save or cancel the current edit or add operation before editing another question."
          );
        }
    };

    const handleDeleteMCQ = async (mcq, index) => {
        setLoading({
          message: "Deleting Question",
        });

        let mcq_index = mcqs.indexOf(mcq)
    
        const res = await axios.post("/api/faculty/remove_objective", {
          btn_call,
          oq_id: mcqs[mcq_index].oq_id,
          id: mcqs[mcq_index].id
        });
    
        if (res.status === 200) {
          setLoading({});
          const newMCQs = [...mcqs];
          newMCQs.splice(mcq_index, 1);
          setMcqs(newMCQs);
        //   btn_call === "Create Question" || btn_call === "Generate Random Paper" ? "" : setObjectiveQuestions(newMCQs);
          // setObjectiveQuestions(newMCQs);
        } else {
          setLoading({
            error: "Error in Deleting Question.",
          });
        }
    };
    

    async function getDBQuestions(){
        try{
            const res = await axios.get("/api/paper/get_all_DB_questions", {
                params: {
                    type: "objective"
                }
            })
            let DB_MCQs = res.data
            DB_MCQs = DB_MCQs.map((mcq) => {
                mcq.options = mcq.answers.split(",");
                return mcq;
            })
            setMcqs(DB_MCQs)
        }
        catch(error){
            console.log("error message in get_all_DB_questions: ", error)
        }
    }

    async function get_courses_subjects_topics(){
      try{
        const res = await axios.get("/api/courses_subjects_topics/get_courses_subjects_topics")
        console.log("courses_subjects_topics: ", res.data)
        setCourses_subjects_topics(res.data)
      }
      catch(error){
        console.log("error in getCourses: ", error)
      }
    }

    useEffect(() => {
        getDBQuestions()
        get_courses_subjects_topics()
    }, [])

    return(
        <div className="px-5 mt-6">
            <Spinner loading={loading} />

            <h1 className="text-2xl font-poppins font-bold bg-blue-800 text-white px-3 py-2 w-fit rounded-sm">Objective Questions in Databank</h1>
            
            <div className="mt-5 flex flex-row space-x-7 font-poppins">
              <div className="flex flex-row items-center space-x-1.5">
                <label htmlFor="search_course" className="block font-semibold font-poppins">Course: </label>
                <input type="text" id="search_course" className="bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"/>
              </div>
              <div className="flex flex-row items-center space-x-1.5">
                <label htmlFor="search_subject" className="block font-semibold font-poppins">Subject: </label>
                <input type="text" id="search_subject" className="bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"/>
              </div>
              <div className="flex flex-row items-center space-x-1.5">
                <label htmlFor="search_topic" className="block font-semibold font-poppins">Topic: </label>
                <input type="text" id="search_topic" className="bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"/>
              </div>
            </div>
            {editing === true && <Edit_MCQ_Form 
                currentMCQ={currentMCQ} 
                setCurrentMCQ={setCurrentMCQ}
                index={index} 
                setIndex={setIndex} 
                setEditing={setEditing}
                mcqs={mcqs}
                setMcqs={setMcqs}
            />}
            
            {courses_subjects_topics.map((course_subject_topic, index) => (
              <div className="my-12 border-b border-gray-900">
                <div className="flex flex-row space-x-4">
                  <h1 className="font-bold text-lg font-poppins">Course: <span className="ml-0.5 font-normal">{course_subject_topic.course}</span>,</h1>
                  <h1 className="font-bold text-lg font-poppins">Subject: <span className="ml-0.5 font-normal">{course_subject_topic.subject}</span>,</h1>
                  <h1 className="font-bold text-lg font-poppins">Topic: <span className="ml-0.5 font-normal">{course_subject_topic.topic}</span></h1>
                </div>
                <table className="table-auto w-full mt-3 font-poppins px-5">
                <thead>
                  <tr className="bg-blue-800 text-white font-medium">
                    <th className="px-4 py-2">SR#</th>
                    <th className="px-4 py-2 w-1/3">Question</th>
                    <th className="px-4 py-2">Correct Option</th>
                    <th className="px-4 py-2">Difficulty</th>
                    {/* <th className="px-4 py-2">Course</th>
                    <th className="px-4 py-2">Subject</th>
                    <th className="px-4 py-2">Topic</th> */}
                    <th className="px-4 py-2">Authority</th>
                    <th className="px-4 py-2">Marks</th>
                    <th className="px-4 py-2">Edit</th>
                    <th className="px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {mcqs.filter((mcq) => 
                  (
                    mcq.course === course_subject_topic.course && 
                    mcq.subject === course_subject_topic.subject &&
                    mcq.topic === course_subject_topic.topic
                  )).map((mcq, index) => (
                    <tr key={index} className={`bg-gray-${index % 2 === 0 ? 100 : 200}`}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{mcq.question}</td>
                      <td className="px-4 py-2 text-center">{mcq.correct_answer.replace(specialSequence, ",")}</td>
                      <td className="px-4 py-2 text-center">{mcq.difficulty}</td>
                      {/* <td className="px-4 py-2 text-center">{mcq.course}</td>
                      <td className="px-4 py-2 text-center">{mcq.subject}</td>
                      <td className="px-4 py-2 text-center">{mcq.topic}</td> */}
                      <td className="px-4 py-2 text-center">{mcq.authority}</td>
                      <td className="px-4 py-2 text-center">{mcq.marks}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={handleEditMCQ(mcq, index)}
                          className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
                        >
                          <MdEdit />
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => {
                            handleDeleteMCQ(mcq, index);
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
              {/* <hr  className="border-gray-400 mt-5 mb-7"/> */}
            </div>))}
        </div>
    )
}

{/* <table className="table-auto w-full mt-3 font-poppins px-5">
  <thead>
    <tr className="bg-blue-800 text-white font-medium">
      <th className="px-4 py-2">SR#</th>
      <th className="px-4 py-2 w-1/3">Question</th>
      <th className="px-4 py-2">Correct Option</th>
      <th className="px-4 py-2">Difficulty</th>
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
        <td className="px-4 py-2 text-center">{mcq.authority}</td>
        <td className="px-4 py-2 text-center">{mcq.marks}</td>
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
</table> */}