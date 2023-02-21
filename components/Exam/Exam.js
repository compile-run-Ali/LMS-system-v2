import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Accordion from './Accordion'
import { MdEdit } from 'react-icons/md'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function Exam({ exam, subjectiveQuestions, objectiveQuestions, isEdit, setActive }) {
    const session = useSession();
    const router = useRouter()
    const [totalMarks, setTotalMarks] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [edit, setEdit] = useState(isEdit)
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState();
    const [faculty, setFaculty] = useState();
    const [selectedFaculty, setSelectedFaculty] = useState();

    const checkAccess = () => {
        if (session.status === "authenticated") {
            if (exam.status === "Pending Approval") {
                return exam.examofficer.faculty_id === session.data.user.id ? true : false
            } else if (exam.status === "Approved") {
                return false
            } else if (exam.status === "Draft") {
                return true
            }
        }
    }

    const [access, setAccess] = useState(checkAccess())
    const getComments = async () => {
        const res = await axios.post("/api/paper/get_comments", {
            paper_id: exam.paper_id
        })
        console.log(res.data)
        setComments(res.data)
    }

    const getFaculty = async () => {
        const res = await axios.get("/api/paper/get_faculty")
        setFaculty(res.data.filter(faculty => faculty.faculty_id !== session.data.user.id))
    }

    useEffect(() => {
        if (!comments) {
            getComments()
        }
        if (edit) {
            getFaculty()
        }
    }, [])


    const editExam = () => {
        router.push({
            pathname: `/faculty/create_exam/${exam.paper_type === 'Objective' ? 'objective' : 'subjective'}`,
            query: {
                ...exam
            },
        })
    }

    const submitExam = async () => {
        console.log(selectedFaculty)
        console.log(exam.paper_id)
        const submitExam = await axios.post("/api/faculty/submit_exam", {
            paper_id: exam.paper_id,
            faculty_id: selectedFaculty,
            level: faculty.filter(faculty => faculty.faculty_id === selectedFaculty)[0].level
        })
        if (submitExam.status === 200) {
            router.push("/faculty")
        }
    }

    const addComment = async () => {
        if (session.status === "authenticated") {
            const res = await axios.post("/api/faculty/add_comment", {
                paper_id: exam.paper_id,
                comment: comment,
                faculty_id: session.data.user.id
            })

            if (res.status === 200) {
                setComments([...comments, res.data])
                setComment("")
            }
            // setComments([...comments, new_comment])

        }
    }

    const handleSelectedFaculty = (e) => {
        setSelectedFaculty(e.target.value)
    }

    return (
        <div className='pr-10 pl-7 font-poppins w-full '>

            <div className='bg-gray-100 bg-opacity-50 pt-10 rounded-md'>
                {
                    !edit && access &&
                    (<div className='w-full flex justify-end pr-5'>
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
            <div className='mt-10 font-poppins'>
                <span className=' text-lg font-medium ml-5'>
                    Comments
                </span>
                <div className='bg-gray-100 bg-opacity-50 px-10 py-5 '>
                    {comments && comments.map((comment) => (
                        <div key={comment.pc_id} className="flex justify-between mb-5 pb-4 border-b border-gray-600 border-opacity-20">
                            <div className=' flex flex-col justify-center'>
                                <span className='text-[#212121] font-medium'>
                                    {comment.comment}
                                </span>
                                <span className='text-sm mt-2 text-[#828282]'>
                                    By {comment.faculty?.name}
                                </span>
                            </div>
                            <div className='flex flex-col text-[#BDBDBD] text-right'>
                                <span className='text-xs font-medium mt-1'>
                                    {comment.time.split("T")[1].split(".")[0]}
                                </span>
                                <span className='text-xs font-medium mt-1'>

                                    {comment.time.split("T")[0]}
                                </span>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {
                edit && access && (
                    <div>
                        <div className='flex flex-col mt-5'>
                            <span className='text-lg pr-5 py-5 font-medium'>
                                Add Comments
                            </span>
                            <textarea className='p-5 bg-slate-100 border border-slate-300 rounded-md focus:outline-none active:outline-none'
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}    
                            />
                        </div>
                        <div className='flex justify-end mt-5'>
                            <button className='bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8'
                                onClick={addComment}>
                                Add Comment
                            </button>
                        </div>
                        <div className='flex justify-end'>
                            <div className='mt-10 mb-10'>
                                <select className='bg-gray-100 border-2 border-gray-300 rounded-lg py-4 px-8' onChange={handleSelectedFaculty}>
                                    <option value=''>Submit to</option>
                                    {
                                        faculty && faculty.map((faculty) => (
                                            <option key={faculty.faculty_id} value={faculty.faculty_id}>{`${faculty.name} (${faculty.department})`}</option>
                                        ))
                                    }
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
