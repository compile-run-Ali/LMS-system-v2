import React, { useState } from 'react'
import ExamTable from './ExamTable';
import Modal from './Subcomponents/Modal'

export default function DashboardComponent() {
  const [open, setOpen] = useState(false);
  const [exams, setExams] = useState([
    { exam_id: 1, exam_type: "Objective", exam_name: "Mid-term Exam", exam_duration: "1 Hour", exam_date: "05/10/2023", exam_time: 100 },
    { exam_id: 2, exam_type: "Subjective/Objective", exam_name: "Final Exam", exam_duration: "2 Hours", exam_date: "10/12/2023", exam_time: 200 },
  ]);

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
