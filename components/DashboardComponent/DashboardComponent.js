import React, {useState} from 'react'
import Modal from './Subcomponents/Modal'
export default function DashboardComponent() {
  const [open, setOpen] = useState(false);

  const toggleModal = ()=>{
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
    </div>
)}
