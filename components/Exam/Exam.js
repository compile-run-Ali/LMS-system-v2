import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Accordion from './Accordion'
import { MdEdit } from 'react-icons/md'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function Exam({ exam, subjectiveQuestions, objectiveQuestions, isEdit, setActive }) {
    const user = useSession();
    const router = useRouter()
    const [totalMarks, setTotalMarks] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [edit, setEdit] = useState(isEdit)


    const editExam = () => {
        router.push({
            pathname: `/faculty/create_exam/${exam.paper_type === 'Objective' ? 'objective' : 'subjective'}`,
            query: {
                ...exam
            },
        })
    }

    const submitExam = async () => {
        const submitExam = await axios.post("/api/faculty/submit_exam", {
            paper_id: exam.paper_id
        })
        if (submitExam.status === 200) {
            router.push("/faculty/exams")
        }
    }

    const addComment = async (comment) => {
        if (user.status === "authenticated") {
            const res = await axios.post("/api/faculty/add_comment", {
                paper_id: exam.paper_id,
                comment: comment,
                faculty_id: user.user.faculty_id
            })
        }
    }

    return (
        <div className='pr-10 pl-7 font-poppins w-full '>

            <div className='bg-gray-100 bg-opacity-50 pt-10 rounded-md'>
                {
                    !edit && (<div className='w-full flex justify-end pr-5'>
                        <div onClick={() => { editExam() }}
                            className="bg-white text-[#f5c51a]  p-2 rounded hover:bg-[#f5c51a] hover:text-white"
                        >
                            <MdEdit />
                        </div>
                    </div>
                    )
                }

                <div className='font-semibold text-center text-3xl mt-5 mb-10'>
                    Exam Details
                </div>


                <div className='grid grid-cols-3 gap-y-3'>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Exam Name:
                        </span>
                        <span className='ml-2'>
                            {exam.paper_name}
                        </span>
                    </div>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Exam Type:
                        </span>
                        <span className='ml-2'>
                            {exam.paper_type}
                        </span>
                    </div>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Exam Date:
                        </span>
                        <span className='ml-2'>
                            {exam.date}
                        </span>
                    </div>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Exam Time:
                        </span>
                        <span className='ml-2'>
                            {exam.time}
                        </span>
                    </div>


                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Total Marks:
                        </span>
                        <span className='ml-2'>
                            {totalMarks}
                        </span>
                    </div>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Total Questions:
                        </span>
                        <span className='ml-2'>
                            {totalQuestions}
                        </span>
                    </div>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Exam Duration:
                        </span>
                        <span className='ml-2'>
                            {exam.duration}
                        </span>
                    </div>

                </div>

                <div className='bg-gray-100 py-5 mt-5 px-5 border-b border-slate-400 border-opacity-50'>
                    <Accordion questions={objectiveQuestions} paperType={"Objective"} />
                </div>
                {
                    exam.paper_type === 'Subjective/Objective' && (
                        <div className='bg-gray-100 py-5 px-5 border-b border-slate-400 border-opacity-50'>
                            <Accordion questions={subjectiveQuestions} paperType={"Subjective/Objective"} />
                        </div>
                    )
                }
            </div>
            {
                edit && (
                    <div>
                        <div className='flex flex-col mt-5'>
                            <span className='text-lg pr-5 py-5 font-medium'>
                                Add Comments
                            </span>
                            <textarea className='p-5 bg-slate-100 border border-slate-300 rounded-md focus:outline-none active:outline-none' />
                        </div>
                        <div className='flex justify-end mt-5'>
                            <button className='bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8'
                                onClick={addComment}>
                                Add Comment
                            </button>
                        </div>
                        <div className='flex justify-end'>
                            <div className='mt-10 mb-10'>
                                <select className='bg-gray-100 border-2 border-gray-300 rounded-lg py-4 px-8'>
                                    <option value=''>Submit to</option>

                                    <option value=''>Exam 1</option>
                                    <option value=''>Exam 2</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-end gap-x-5'>
                            <div className='mt-10 mb-10'>
                                <button type='submit' className='bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8'
                                    onClick={() => { router.push('/faculty') }}
                                >
                                    Save Draft
                                </button>
                            </div>
                            <div className='mt-10 pr-10 flex justify-end gap-x-5 mb-10'>
                                <button type='submit' className='bg-green-800 hover:bg-green-700 font-medium text-white rounded-lg py-4 px-8'
                                    onClick={() => { submitExam() }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
