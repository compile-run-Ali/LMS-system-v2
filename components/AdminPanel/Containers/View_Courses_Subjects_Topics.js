import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

export default function View_Courses_Subjects_Topics({
    courses,
    subjects,
    topics,
    selectedCourse,
    selectedSubject,
    selectedTopic,
    setSelectedCourse,
    setSelectedSubject,
    setSelectedTopic,
    error,
    setError
}){
    // const [topics, setTopics] = useState([])
    // const [subjects, setSubjects] = useState([])
    // const [error, setError] = useState("")
    // const [courses, setCourses] = useState([])
    // const [selectedCourse, setSelectedCourse] = useState("")
    // const [selectedSubject, setSelectedSubject] = useState("")
    // const [selectedTopic, setSelectedTopic] = useState("")

    // async function getCoursesList(){
    //     try{
    //         const coursesList = await axios.get("/api/courses_subjects_topics/get_courses")
    //         // console.log(coursesList.data)
    //         setCourses(coursesList.data.map((course) => {return course.name}))
    //         // console.log("courses: ", courses)
    //     }
    //     catch(error){
    //         console.log(error)
    //         setError("-- Can't fetch courses list --")
    //     }
    // }

    // async function getSubjectList(){
    //     console.log("selectedCourse in getSubjectList: ", selectedCourse)
    //     try{
    //         const subjectList = await axios.get("/api/courses_subjects_topics/get_subjects",{
    //             params:{
    //                 selectedCourse: selectedCourse
    //             }
    //         })
    //         // console.log("subjectList.data: ", subjectList.data)
    //         setSubjects(subjectList.data.map((subject) => {return subject.name}))
    //         // console.log("subjects in getSubjectList: ", subjects)
    //     }
    //     catch(error){
    //         console.log(error)
    //         setError("-- Can't fetch subjects list --")
    //     }
    // }

    // async function getTopicList(){
    //     // console.log("selectedCourse in getSubjectList: ", selectedCourse)
    //     try{
    //         const topicList = await axios.get("/api/courses_subjects_topics/get_topics",{
    //             params:{
    //                 selectedCourse: selectedCourse,
    //                 selectedSubject: selectedSubject
    //             }
    //         })
    //         console.log("topicList.data: ", topicList.data)
    //         setTopics(topicList.data.map((topic) => {return topic.name}))
    //         console.log("topics in gettopicsList: ", topics)
    //     }
    //     catch(error){
    //         console.log(error)
    //         setError("-- Can't fetch topic list --")
    //     }
    // }

    // useEffect(() => {
    //     getCoursesList()
    // }, [])

    // useEffect(() => {
    //     console.log("courses: ", courses)
    //     setSelectedCourse(courses[0])
    //     console.log("selectedCourse: ", selectedCourse)
    //     // getSubjectList()
    // }, [courses])
    
    // useEffect(() => {
    //     getSubjectList()
    // }, [selectedCourse])

    // useEffect(() => {
    //     console.log("subjects in useEffect: ", subjects)
    //     setSelectedSubject(subjects[0])
    // }, [subjects])

    // useEffect(() => {
    //     getTopicList()
    // }, [selectedSubject])

    // useEffect(() => {
    //     setSelectedTopic(topics[0])
    // }, [topics])

    function handleSelect(event){
        setError("")
        if(event.target.id === "Courses_List"){setSelectedCourse(event.target.value)}
        else if(event.target.id === "Subjects_List"){setSelectedSubject(event.target.value)}
        else if(event.target.id === "Topics_List"){setSelectedTopic(event.target.value)}
        // console.log("selectedCourse: ", selectedCourse)
    }

    return(
        <div className="flex flex-row mt-8 px-48">
            <div className="mb-5 w-1/3 mr-3">
                <label className="pl-1 font-bold block mb-2">Course</label>
                <select
                className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
                id="Courses_List"
                onChange={handleSelect}
                // onClick={getCoursesList}
                value={selectedCourse}
                >
                    {courses.map((course, index) => (
                        <option key={index} value={course}>{course}</option>
                    ))}
                </select>
            </div>
            <div className="mb-5 w-1/3 mx-3">
                <label className="pl-1 font-bold block mb-2">Subject</label>
                <select
                className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
                id="Subjects_List"
                onChange={handleSelect}
                value={selectedSubject}
                >
                    {subjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                    ))}
                </select>
            </div>
            <div className="mb-5 w-1/3 ml-3">
                <label className="pl-1 font-bold block mb-2">Topics</label>
                <select
                className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
                id="Topics_List"
                onChange={handleSelect}
                value={selectedTopic}
                >
                    {topics.map((topic, index) => (
                        <option key={index} value={topic}>{topic}</option>
                    ))}
                </select>
            </div>
            {error !== "" && <p className=" text-orange-700 text-sm">{error}</p>}
        </div>
    )
}