import axios from "axios"
import { useEffect, useState } from "react"

export default function Replace_Modal({mcqs, setMCQs, prevMCQsID, setPrevMCQsID, mcqIDs, setMcqIDs, question, addQuestion, setControl_3, setFocusQuestion, type}){
    console.log("question in replace_model: ", question)
    const [replace_Questions, SetReplace_Questions] = useState([])
    const specialSequence = "###"
    async function get_repalce_questions(){
        try{
            const res = await axios.get("/api/courses_subjects_topics/get_replace_questions", {
                params: {
                    course: question.course,
                    subject: question.subject,
                    topic: question.topic,
                    difficulty: question.difficulty,
                    type: type,
                    prevMCQsID: prevMCQsID
                }
            })
            console.log("replace_questions: ", res.data)
            SetReplace_Questions([...res.data])
        }
        catch(error){
            console.log("error in get_replace_questions: ", error)
        }
    }

    useEffect(() => {
        if(question){
            get_repalce_questions()
        }
    }, [question])

    function handleCancel(){
        setControl_3(false)
        setFocusQuestion(null)
    }

    async function delQuestion(){
        console.log("question in delQuestion: ", question)
        try{
            if(type === "objective"){
                const res = await axios.post("/api/faculty/remove_objective", {
                    btn_call: "Generate Random Paper",
                    oq_id: question.oq_id
                })
            }
            else if(type === "subjective"){
                const res = await axios.post("/api/faculty/remove_subjective", {
                    btn_call: "Generate Random Paper",
                    sq_id: question.sq_id
                })
            }
        }
        catch(error){
            console.log("error in delQuestions")
        }
    }

    async function handleSelect(event, new_question){
        console.log("question replace: ", question)
        console.log("prevMCQsID: ", prevMCQsID)
        console.log("mcqIDs: ", mcqIDs)
        let mcqs_array = [...mcqs]
        let index = mcqs_array.indexOf(question)
        console.log("index of replace question: ", index)
        let temp_question = addQuestion(null, new_question)
        mcqs_array[index] = await temp_question
        setMCQs(mcqs_array)
        
        let temp_prev_ids = [...prevMCQsID]
        let temp_mcqs_ids = [...mcqIDs]
        let temp_id = temp_mcqs_ids[index]
        temp_mcqs_ids[index] = new_question.id

        let index_2 = temp_prev_ids.indexOf(temp_id)
        temp_prev_ids[index_2] = new_question.id
        
        // if(type === "objective"){
        //     temp_mcqs_ids[index_2] = temp_question.oq_id
        // }
        // else if(type === "subbjective"){
        //     temp_mcqs_ids[index_2] = temp_question.sq_id
        // }
        setPrevMCQsID(temp_prev_ids)
        setMcqIDs(temp_mcqs_ids)
        console.log("index_2 = ", index_2)
        delQuestion(question)
        handleCancel()
    }

    return(
        <div className="w-screen h-screen inset-0 fixed bg-black/70 flex flex-col items-center justify-center">
            <div className="w-5/6 bg-white h-5/6 flex flex-col rounded overflow-y-scroll overscroll-contain px-7 py-4">
                <h1 className="font-bold text-center my-5">Replacement Questions</h1>
                <h1 className="text-xs mb-3">Select a question to replace.</h1>
                <table className="w-full">
                    <tr className="">
                        <th className="px-4 py-2 border border-gray-300">Question</th>
                        {type === "objective" && <th className="px-4 py-2 border border-gray-300">Options</th>}
                        {type === "objective" 
                        ? <th className="px-4 py-2 border border-gray-300">Correct Option</th>
                        : <th className="px-4 py-2 border border-gray-300">Answer</th>}
                        <th className="px-4 py-2 border border-gray-300">Difficulty</th>
                        <th className="px-4 py-2 border border-gray-300">Topic</th>
                        <th className="px-4 py-2 border border-gray-300">Authority</th>
                        <th className="px-4 py-2 border border-gray-300">Marks</th>
                        <th className="px-4 py-2 border border-gray-300">Select</th>
                    </tr>
                {replace_Questions.map((new_question, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2 border border-gray-300">{new_question.question}</td>
                        {type === "objective" && <td className="px-4 py-2 border border-gray-300">{new_question.answers}</td>}
                        {type === "objective" 
                        ? <td className="px-4 py-2 border border-gray-300">{new_question.correct_answer.replace(specialSequence, ",")}</td>
                        : <td className="px-4 py-2 border border-gray-300">{new_question.answer?.slice(0, 20)}</td>}
                        <td className="px-4 py-2 border border-gray-300">{new_question.difficulty}</td>
                        <td className="px-4 py-2 border border-gray-300">{new_question.topic}</td>
                        <td className="px-4 py-2 border border-gray-300">{new_question.authority}</td>
                        <td className="px-4 py-2 border border-gray-300 text-center">{new_question.marks}</td>
                        <td className="px-4 py-2 border border-gray-300 text-center">
                            <button className="text-sm bg-blue-800 text-white px-3 py-1 rounded" onClick={(event) => {handleSelect(event, new_question)}}>
                                Select
                            </button>
                        </td>
                    </tr>
                ))}
                </table>
                <button className="self-end mt-5 bg-blue-800 text-white rounded px-3 py-2" onClick={() => {handleCancel()}}>Cancel</button>
            </div>
        </div>
    )
}