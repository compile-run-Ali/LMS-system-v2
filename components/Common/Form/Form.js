import React, { useState } from 'react'
import Input from './Input'
import axios from "axios"
import { useRouter } from 'next/router';

export default function Form({ setActive, setPaperId }) {
  const router = useRouter();
  const [paperName, setPaperName] = useState("");
  const [paperDuration, setPaperDuration] = useState(3);
  const [dateOfExam, setDateOfExam] = useState("");
  const [weightage, setWeightage] = useState();
  const [paperTime, setPaperTime] = useState("09:00:00");

  const handlePaperName = (e) => {
    setPaperName(e.target.value);
  }

  const handleDuration = (e) => {
    setPaperDuration(parseInt(e.target.value));
  }

  const handleDateOfExam = (e) => {
    setDateOfExam(e.target.value);
  }

  const handleWeightage = (e) => {
    setWeightage(parseInt(e.target.value));
  }

  const handlePaperTime = (e) => {
    setPaperTime(e.target.value);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    if (paperName === "" || dateOfExam === "" || weightage === "") {
      alert("Please fill all the fields");
      return;
    }
    const res = await axios.post("http://localhost:3000/api/faculty/paper_creation/new_paper", {
      paperName: paperName,
      paperTime: paperTime,
      date: new Date(dateOfExam),
      duration: paperDuration,
      weightage: weightage,
    })
    
    setPaperId(res.data.paper_id);
    setActive("Exam Questions");
  }

  return (
    <form>
      <div className='w-full grid grid-cols-2 pr-10 gap-x-5 mt-10 font-poppins'>

        <Input text={"Paper Name"} required={true} type={"text"} placeholder={"Ex: Mid-Term Exam"} onChange={handlePaperName} />
        <Input text={"Paper Duration (in hours)"} required={true}
          type={"number"} value={3} min={0} max={3} onChange={handleDuration} />

        <Input text={"Date of Exam"} required={true} type={"date"} onChange={handleDateOfExam} />

        <Input text={"Weightage"} required={true} type={"number"} placeholder={"Ex: 20%"} onChange={handleWeightage} />

        <Input text={"Paper Start Time"} required={true} type={"time"} onChange={handlePaperTime} value={"09:00:00"} />



      </div>
      <div className='mt-10 w-full pr-10 flex justify-end gap-x-5'>
        <button type='button' className='border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8'>
          Cancel
        </button>
        <button type='submit' className='bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8'
          onClick={submitForm}>
          Proceed
        </button>
      </div>
    </form>
  )
}
