import { useSession } from 'next-auth/react';
import React, { useState, useEffect} from 'react'
import ExamTable from './ExamTable';
import Modal from './Subcomponents/Modal'

export default function DashboardComponent({exams_data}) {
  const user = useSession();
  const [open, setOpen] = useState(false);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    if (exams_data !== undefined, exams_data !== null) {
      setExams(exams_data)
    }
  }, [exams_data])

  const toggleModal = () => {
    setOpen(!open);
  }

  return (
    <div>
      <div className='flex w-full justify-end pr-10 font-poppins'>
        <button onClick={toggleModal} className="bg-blue-900 text-white border rounded-md px-3 py-2">
          Create Paper
        </button>
      </div>
      <Modal open={open} setOpen={setOpen} />

      <div className='pr-10 pl-5'>
        <ExamTable exams={exams} setExams={setExams} />
      </div>
    </div>
  )
}
