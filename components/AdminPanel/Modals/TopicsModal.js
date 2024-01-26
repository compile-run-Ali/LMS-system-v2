import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

export default function TopicModal({setActive}){
    const [topic, setTopic] = useState("")
    const [subjects, setSubjects] = useState([])
    const [error, setError] = useState("")
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedSubject, setSelectedSubject] = useState("")

    async function getCoursesList(){
        try{
            const coursesList = await axios.get("/api/courses_subjects_topics/get_courses")
            console.log(coursesList.data)
            setCourses(coursesList.data.map((course) => {return course.name}))
            console.log("courses: ", courses)
        }
        catch(error){
            console.log(error)
            setError("-- Can't fetch courses list --")
        }
    }

    async function getSubjectList(){
        console.log("selectedCourse in getSubjectList: ", selectedCourse)
        try{
            const subjectList = await axios.get("/api/courses_subjects_topics/get_subjects",{
                params:{
                    selectedCourse: selectedCourse
                }
            })
            console.log("subjectList.data: ", subjectList.data)
            setSubjects(subjectList.data.map((subject) => {return subject.name}))
            console.log("subjects in getSubjectList: ", subjects)
        }
        catch(error){
            console.log(error)
            setError("-- Can't fetch subjects list --")
        }
    }

    useEffect(() => {
        getCoursesList()
    }, [])

    useEffect(() => {
        console.log("courses: ", courses)
        setSelectedCourse(courses[0])
        console.log("selectedCourse: ", selectedCourse)
        // getSubjectList()
    }, [courses])
    
    useEffect(() => {
        getSubjectList()
    }, [selectedCourse])

    useEffect(() => {
        console.log("subjects in useEffect: ", subjects)
        setSelectedSubject(subjects[0])
    }, [subjects])

    function handleChange(event){
        setError("")
        setTopic(event.target.value)
    }

    function handleSelect(event){
        setError("")
        if(event.target.id === "Courses_List"){setSelectedCourse(event.target.value)}
        else if(event.target.id === "Subjects_List"){setSelectedSubject(event.target.value)}
        // console.log("selectedCourse: ", selectedCourse)
    }

    function handleCancel(){
        setActive(0)
        setTopic("")
    }

    async function handleSave(){
        if(selectedCourse === "" || selectedCourse === undefined){
            setError("-- No courses found in database --")
            return
        }

        if(selectedSubject === "" || selectedSubject === undefined){
            setError("-- No subjects found in database --")
            return
        }

        if (topic === ""){
            setError("-- Please enter topic name --")
            return
        }
        else{
            try{
                const res = await axios.post("/api/courses_subjects_topics/save_topic", {selectedCourse, selectedSubject, topic})
                setActive(0)
            }
            catch(error){
                console.log(error)
                setError("-- Error adding topic --")
            }
        }
    }

    return(
        <div className="shadow-lg border border-slate-400 rounded-md flex flex-col self-center w-2/6 px-3 py-3 my-9">
            <div className="mb-5">
                <label className="block mb-2">Select Course</label>
                <select
                className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
                id="Courses_List"
                onChange={handleSelect}
                value={selectedCourse}
                >
                    {courses.map((course, index) => (
                        <option key={index} value={course}>{course}</option>
                    ))}
                </select>
            </div>
                <div className="mb-5">
                    <label className="block mb-2">Select Subject</label>
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
            <div>
                <label className="block mb-2">Topic Name</label>
                <input type="text" id="subject" value={topic} onChange={handleChange}
                    className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 mb-2 py-2 w-full" />
            </div>
            {error !== "" && <p className=" text-orange-700 text-sm">{error}</p>}
            <div className="flex flex-row">
                <button className="w-1/2 bg-blue-800 hover:bg-blue-700 transition-all text-white border rounded-md px-5 mt-2 mb-1 py-2 mr-1"
                onClick={handleSave}>
                    Save
                </button>
                <button className="w-1/2 bg-blue-800 hover:bg-blue-700 transition-all text-white border rounded-md px-5 mt-2 mb-1 py-2 ml-1"
                onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    )
}