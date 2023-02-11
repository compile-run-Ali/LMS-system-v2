import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Accordion from './Accordion'

export default function Exam({ exam }) {
    const router = useRouter()
    const [totalMarks, setTotalMarks] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)

    const editExam = () => {
        router.push({
            pathname: '/faculty/create_exam/objective',
            query: { 
                ...exam
             },
        })
    }

    return (
        <div className='pr-10 pl-7 font-poppins w-full '>
            <div className='bg-gray-100 bg-opacity-50 pt-10 rounded-md'>
                <div className='font-semibold text-center text-3xl mt-5 mb-10'>
                    Exam Details
                </div>
                <div onClick={() => {editExam()}}>
                    Edit
                </div>

                <div className='grid grid-cols-3 gap-y-3'>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Exam Name:
                        </span>
                        <span className='ml-2'>
                            {exam.exam_name}
                        </span>
                    </div>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Exam Type:
                        </span>
                        <span className='ml-2'>
                            {exam.exam_type}
                        </span>
                    </div>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Exam Date:
                        </span>
                        <span className='ml-2'>
                            {exam.exam_date}
                        </span>
                    </div>
                    <div className='pl-20'>
                        <span className=' font-medium'>
                            Exam Time:
                        </span>
                        <span className='ml-2'>
                            {exam.exam_time}
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
                            {exam.exam_duration}
                        </span>
                    </div>

                </div>

                <div className='bg-gray-100 py-5 mt-5 px-5'>
                    <Accordion />
                </div>
            </div>
        </div>
    )
}
