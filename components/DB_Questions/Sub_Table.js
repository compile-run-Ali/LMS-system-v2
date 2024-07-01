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

    const [topics, setTopics] = useState([""])
    const [subjects, setSubjects] = useState([""])
    const [courses, setCourses] = useState([""])
    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedSubject, setSelectedSubject] = useState("")
    const [selectedTopic, setSelectedTopic] = useState("")
    const [query, SetQuery] = useState({course: "", subject: "", topic: ""})
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

    async function getCoursesList(){
      try{
          const coursesList = await axios.get("/api/courses_subjects_topics/get_courses")
          let courses_names = coursesList.data.map((course) => {return course.name})
          console.log("courses_names: ", [...courses_names])
          setCourses(["", ...courses_names])
      }
      catch(error){
          console.log(error)
      }
    }

    useEffect(() => {
      getCoursesList()
    }, [])

    async function getSubjectList(){
      console.log("selectedCourse in getSubjectList: ", selectedCourse)
      try{
          const subjectList = await axios.get("/api/courses_subjects_topics/get_subjects_single",{
              params:{
                  selectedCourse: selectedCourse
              }
          })
          let subjects_names = subjectList.data.map((subject) => {return subject.name})
          setSubjects(["", ...subjects_names])
      }
      catch(error){
          console.log(error)
      }
    }

    useEffect(() => {
      if(selectedCourse && selectedCourse !== ""){
        getSubjectList()
      }
      else if(selectedCourse === ""){
        setSubjects([""])
      }
    }, [selectedCourse])

    async function getTopicList(){
      console.log("selectedSubject in getSubjectList: ", selectedSubject)
      try{
          const topicList = await axios.get("/api/courses_subjects_topics/get_topics_single",{
              params:{
                  selectedCourse: selectedCourse,
                  selectedSubject: selectedSubject
              }
          })
          let topics_names = []
          topics_names = topicList.data.map((topic) => {return topic.name})
          setTopics(["", ...topics_names])
      }
      catch(error){
          console.log(error)
      }
    }

    useEffect(() => {
      if(selectedSubject && selectedSubject !== ""){
        getTopicList()
      }
      else if(selectedSubject === ""){
        setTopics([""])
      }
    }, [selectedSubject])

    function handleSelect(event){
      if(event.target.id === "search_course"){
        setSelectedCourse(event.target.value)
        setSelectedSubject("")
        setSelectedTopic("")
        let temp_query = {...query, "course": event.target.value, "subject": "", "topic": ""}
        SetQuery(temp_query)
      }
      else if(event.target.id === "search_subject"){
        setSelectedSubject(event.target.value)
        setSelectedTopic("")
        let temp_query = {...query, "subject": event.target.value, 'topic': ""}
        SetQuery(temp_query)
      }
      else if(event.target.id === "search_topic"){
        setSelectedTopic(event.target.value)
        let temp_query = {...query, "topic": event.target.value}
        SetQuery(temp_query)
      }
    }

    return(
        <div className="px-5 mt-6">
            <Spinner loading={loading} />

            <h1 className="text-2xl font-poppins font-bold bg-blue-800 text-white px-3 py-2 w-fit rounded-sm">Subjective Questions in Databank</h1>

            <div className="w-4/6 mt-5 flex flex-row space-x-7 font-poppins">
              <div className="w-1/3 flex flex-row items-center space-x-1.5">
                <label htmlFor="search_course" className="block font-semibold font-poppins">Course: </label>
                <select value={selectedCourse} onChange={handleSelect} id="search_course" className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full">
                  {courses.map((course, index) => (
                    <option ket={index} value={course}>{course === "" ? "None" : course}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/3 flex flex-row items-center space-x-1.5">
                <label htmlFor="search_subject" className="block font-semibold font-poppins">Subject: </label>
                <select value={selectedSubject} onChange={handleSelect} id="search_subject" className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full">
                  {subjects.map((subject, index) => (
                    <option ket={index} value={subject}>{subject === "" ? "None" : subject}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/3 flex flex-row items-center space-x-1.5">
                <label htmlFor="search_topic" className="block font-semibold font-poppins">Topic: </label>
                <select value={selectedTopic} onChange={handleSelect} id="search_topic" className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full">
                  {topics.map((topic, index) => (
                    <option ket={index} value={topic}>{topic === "" ? "None" : topic}</option>
                  ))}
                </select>
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

            {courses_subjects_topics.filter(pair => {
              if(query.course === "" && query.subject === "" && query.topic === ""){
                return pair
              }
              else if(query.course !== "" && query.course === pair.course && query.subject === ""){
                return pair
              }
              else if(query.course !== "" && query.course === pair.course && query.subject !== "" && query.subject === pair.subject && query.topic === ""){
                return pair
              }
              else if(query.course !== "" && query.course === pair.course && query.subject !== "" && query.subject === pair.subject && query.topic !== "" && query.topic === pair.topic){
                return pair
              }
            }).map((course_subject_topic, index) => (
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