
import React, { useEffect, useState } from 'react'
import ExamTable from './Tables/ExamTable';
import Courses from './Subcomponents/Courses';
import Faculty from './Subcomponents/Faculty';
import Tabs from './Subcomponents/Tabs'
import AssignedTable from './Tables/AssignedTable';

export default function AdminPanel({faculty_data, courses_data, exams_data}) {    
    const [faculty, setFaculty] = useState([]);
    const [courses, setCourses] = useState([]);
    const [exams, setExams] = useState([]);
    const [active, setActive] = useState("Faculty");

    useEffect(() => {
        if (faculty_data !== undefined, faculty_data !== null) {
             setFaculty(faculty_data)
        }
        if (courses_data !== undefined, courses_data !== null) {
            setCourses(courses_data)
        }
        if (exams_data !== undefined, exams_data !== null) {
            setExams(exams_data)
        }
    }, [faculty_data, courses_data, exams_data])
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
                <Courses courses={courses} setCourses={setCourses } faculty={faculty} />
            </div>
        }
        {
            active === "Assigned" &&
                <div>
                    <AssignedTable course_data={courses}/>
                </div>
          }
          {
              active === "Exams" &&
                <div>
                      <ExamTable exams_data={exams}/>
                </div>
          }
    </div>
  )
}
