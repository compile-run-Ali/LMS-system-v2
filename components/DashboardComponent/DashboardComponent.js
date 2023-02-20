import { useSession } from 'next-auth/react';
import React, { useState, useEffect} from 'react'
import ExamTable from './ExamTable';
import Modal from './Subcomponents/Modal'

export default function DashboardComponent({exams_data}) {
  const user = useSession();
  const [open, setOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  useEffect(() => {
    if (exams_data !== undefined, exams_data !== null) {
      setCourses(exams_data)
      setExams(exams_data[0].course.paper)
      setSelectedCourse(exams_data[0].course.course_code)
    }
  }, [exams_data])

  const toggleModal = () => {
    setOpen(!open);
  }

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value)
    const course = courses.find(course => course.course.course_code === e.target.value)
    setExams(course.course.paper)
  }

  return (
    <div>
      <div className='ml-6'>
        <h1 className='text-2xl font-poppins font-bold'>Courses List:</h1>
        <select className='bg-white border rounded-md px-3 py-2' onChange={handleCourseChange}>
          {courses.map((course, index) => (
            <option key={index} value={course.course.course_code}>{course.course.course_code} - {course.course.course_name}</option>
          ))}
        </select>
      </div>
      <div className='flex w-full justify-end pr-10 font-poppins'>
        <button onClick={toggleModal} className="bg-blue-900 text-white border rounded-md px-3 py-2">
          Create Paper
        </button>
      </div>
      <Modal open={open} setOpen={setOpen} courseCode={selectedCourse}/>

      <div className='pr-10 pl-5'>
        <ExamTable exams_data={exams} setExamsData={setExams} />
      </div>
    </div>
  )
}
