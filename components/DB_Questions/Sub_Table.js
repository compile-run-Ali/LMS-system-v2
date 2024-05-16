import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../Loader/Spinner";
import Edit_Sub_Form from "./Edit_Sub_Form";

export default function Sub_Table(){
    const [subs, setSubs] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState()
    const [editing, setEditing] = useState(false);
    const [index, setIndex] = useState(null);
    const [loading, setLoading] = useState({});
    const btn_call = "Create Question"
    const [courses_subjects_topics, setCourses_subjects_topics] = useState([])

    const handleEditsub = (sub, index) => () => {
        if (!editing) {
          setEditing(true);
          // setIndex(index);
          let sub_index = subs.indexOf(sub)
          setIndex(sub_index);
          setCurrentQuestion(subs[sub_index]);
          window.scrollTo(0, 0);
        } else {
          alert(
            "Please save or cancel the current edit or add operation before editing another question."
          );
        }
    };

    const handleDeletesub = async (sub, index) => {
        let sub_index = subs.indexOf(sub)
        
        setLoading({
          message: "Deleting Question",
        });
    
        const res = await axios.post("/api/faculty/remove_subjective", {
          btn_call,
          oq_id: subs[sub_index].oq_id,
          id: subs[sub_index].id
        });
    
        if (res.status === 200) {
          setLoading({});
          const newSubs = [...subs];
          newSubs.splice(sub_index, 1);
          setSubs(newSubs);
        } else {
          setLoading({
            error: "Error in Deleting Question.",
          });
        }
    };

    async function getDBQuestions(){
        try{
            const res = await axios.get("/api/paper/get_all_DB_questions", {
                params: {type: "subjective"}
            })
            setSubs(res.data)
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

            <h1 className="text-2xl font-poppins font-bold bg-blue-800 text-white px-3 py-2 w-fit rounded-sm">Subjective Questions in Databank</h1>

            <div className="mt-5 flex flex-row space-x-7 font-poppins">
              <div className="flex flex-row items-center space-x-1.5">
                <label htmlFor="search_course" className="block font-semibold font-poppins">Course: </label>
                <input type="text" id="search_course" className="bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"/>
              </div>
              <div className="flex flex-row items-center space-x-1.5">
                <label htmlFor="search_course" className="block font-semibold font-poppins">Subject: </label>
                <input type="text" id="search_course" className="bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"/>
              </div>
              <div className="flex flex-row items-center space-x-1.5">
                <label htmlFor="search_course" className="block font-semibold font-poppins">Topic: </label>
                <input type="text" id="search_course" className="bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"/>
              </div>
            </div>

            {editing === true && <Edit_Sub_Form 
                currentQuestion={currentQuestion} 
                setCurrentQuestion={setCurrentQuestion}
                index={index} 
                setIndex={setIndex} 
                setEditing={setEditing}
                subs={subs}
                setSubs={setSubs}
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
                      <th className="px-4 py-2">Answer</th>
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
                    {
                    subs.filter((sub) => (
                      sub.course === course_subject_topic.course && 
                      sub.subject === course_subject_topic.subject &&
                      sub.topic === course_subject_topic.topic
                    ))
                    .map((sub, index) => (
                      <tr key={index} className={`bg-gray-${index % 2 === 0 ? 100 : 200}`}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{sub.question}</td>
                        <td className="px-4 py-2 text-center">{sub.answer?.slice(0, 20)}...</td>
                        <td className="px-4 py-2 text-center">{sub.difficulty}</td>
                        {/* <td className="px-4 py-2 text-center">{sub.course}</td>
                        <td className="px-4 py-2 text-center">{sub.subject}</td>
                        <td className="px-4 py-2 text-center">{sub.topic}</td> */}
                        <td className="px-4 py-2 text-center">{sub.authority}</td>
                        <td className="px-4 py-2 text-center">{sub.marks}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={handleEditsub(sub, index)}
                            className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
                          >
                            <MdEdit />
                          </button>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => {
                              handleDeletesub(sub, index);
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
              </div>
            ))}
        </div>
    )
}