import React from 'react'
import Input from './Input'

export default function Form() {
  return (
    <div className='w-full mt-10 font-poppins'>
      <Input text={"Paper Name"} required={true} type={"text"} placeholder={"Ex: Mid-Term Exam"} />
      <Input text={"Total Time (in hours)"} required={true}
        type={"number"} value={3} min={0} max={3} />

      <Input text={"Date of Exam"} required={true} type={"date"} />

      <Input text={"Weightage"} required={true} type={"text"} placeholder={"Ex: 20%"} />


      <div className='mt-10 w-1/2 flex justify-end gap-x-5'>
        <button className='border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8'>
          Cancel
        </button>
        <button className='bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8'>
          Proceed
        </button>
      </div>
    </div>
  )
}
