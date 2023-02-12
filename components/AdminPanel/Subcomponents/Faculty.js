import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FacultyTable from '../Tables/FacultyTable'
import DeleteModal from './DeleteModal'

export default function Faculty({faculty, setFaculty}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const addFaculty = () => {
    router.push('/admin/add_faculty')
  }
  return (
    <div>
      <DeleteModal setIsOpen={setOpen} isOpen={open} />
      <div className='mt-10 flex justify-end'>
        <button
          onClick={addFaculty}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Faculty
        </button>
      </div>
      <FacultyTable setOpen={setOpen} faculty={faculty} />
    </div>
  )
}