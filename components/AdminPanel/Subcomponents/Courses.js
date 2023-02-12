import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CourseTable from '../Tables/CourseTable'
import DeleteModal from './DeleteModal'

export default function Courses() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const addCourses = () => {
    router.push('/admin/add_course')
  }
  return (
    <div>
      <DeleteModal setIsOpen={setOpen} isOpen={open} />
      <div className='mt-10 flex justify-end'>
        <button
          onClick={addCourses}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Courses
        </button>
      </div>
      <CourseTable setOpen={setOpen} />
    </div>
  )
}