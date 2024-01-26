import axios from "axios"
import { useState } from "react"

export default function CourseModal({setActive}){
    const [course, setCourse] = useState("")
    const [error, setError] = useState("")

    function handleChange(event){
        setError("")
        setCourse(event.target.value)
    }

    function handleCancel(){
        setActive(0)
        setCourse("")
    }

    async function handleSave(){
        if (course === ""){
            setError("-- Please enter course name --")
            return
        }
        else{
            try{
                const res = await axios.post("/api/courses_subjects_topics/save_course", {course})
                setActive(0)
            }
            catch(error){
                console.log(error)
                setError("-- Error adding course --")
            }
        }
    }

    return(
        <div className="shadow-lg border border-slate-400 rounded-md flex flex-col self-center w-2/6 px-3 py-3 my-9">
            <label className="block mb-2">Course Name</label>
            <input type="text" id="course" value={course} onChange={handleChange}
                   className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 mb-2 py-2"/>
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