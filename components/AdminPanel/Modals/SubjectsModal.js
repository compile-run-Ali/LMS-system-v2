import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

export default function SubjectModal({setActive, getSubjectList}){
    const [subject, setSubject] = useState("")
    const [error, setError] = useState("")
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState("")

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
    useEffect(() => {
        getCoursesList()
    }, [])

    useEffect(() => {
        console.log("courses: ", courses)
        setSelectedCourse(courses[0])
    }, [courses])

    function handleChange(event){
        setError("")
        setSubject(event.target.value)
    }

    function handleSelect(event){
        setError("")
        setSelectedCourse(event.target.value)
        // console.log("selectedCourse: ", selectedCourse)
    }

    function handleCancel(){
        setActive(0)
        setSubject("")
    }

    async function handleSave(){
        if(selectedCourse === "" || selectedCourse === undefined){
            setError("-- No courses found in database --")
            return
        }

        if (subject === ""){
            setError("-- Please enter subject name --")
            return
        }
        else{
            try{
                const res = await axios.post("/api/courses_subjects_topics/save_subject", {selectedCourse, subject})
                setActive(0)
                console.log("res in save subject: ", res)
                // window.location.reload()
                getSubjectList()
            }
            catch(error){
                console.log("error: ", error.response.data.error.meta.target)
                if (error.response.data.error.meta.target === "DbSubject_name_key"){
                    setError("-- Subject with the same name is already registered --")
                }
                if(error.response.data.error.meta.target === "DbSubject_name_course_key"){
                    setError("-- Subject with the same name is already registered with this course --")
                }
                else{
                    setError("-- Error adding subject --")
                }
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
            <div>
                <label className="block mb-2">Subject Name</label>
                <input type="text" id="subject" value={subject} onChange={handleChange}
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