
import React, { useEffect, useState } from 'react'
import Courses from './Subcomponents/Courses';
import Faculty from './Subcomponents/Faculty';
import Tabs from './Subcomponents/Tabs'

export default function AdminPanel({faculty_data}) {    
    const [faculty, setFaculty] = useState([]);
    const [courses, setCourses] = useState([]);
    const [exams, setExams] = useState([]);
    const [active, setActive] = useState("Faculty");

    useEffect(() => {
        console.log(faculty_data)
        if (faculty_data !== undefined, faculty_data !== null) {
             setFaculty(faculty_data)
        }
    }, [faculty_data])
  return (
    <div className='w-full pr-10 mt-5 px-5'>
        <Tabs active={active} setActive={setActive} />

        {
            active === "Faculty" &&
            <div>
                <Faculty faculty={faculty} setFaculty={setFaculty} />
            </div>

        }
        {
            active === "Courses" &&
            <div>
            <Courses />
            </div>
        }
        {
            active === "Exams" &&
            <div>
            </div>
        }
    </div>
  )
}
