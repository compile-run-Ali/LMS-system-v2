import { useState } from "react";
import { useEffect } from "react";
import TextArea from "../Common/Form/TextArea";
import Input from "../Common/Form/Input";
import Spinner from "../Loader/Spinner";
import { ImCross } from "react-icons/im";
import axios from "axios";

export default function Edit_Sub_Form({currentQuestion, setCurrentQuestion, index, setIndex, setEditing, subs, setSubs}){
    const [multipleOptions, setMultipleOptions] = useState(false);
    const [loading, setLoading] = useState({});
    const btn_call = "Create Question"
    const [difficultys, setDifficultys] = useState(["", "Easy", "Medium", "Hard"])
    const [selectedDifficulty, setSelectedDifficulty] = useState(currentQuestion.difficulty)

    const handleQuestionChange = (e) => {
        setCurrentQuestion({ ...currentQuestion, question: e.target.value });
    };

    const handleAnswerChange = (e) => {
        setCurrentQuestion(btn_call === "Create Question" ? { ...currentQuestion, correct_answer: e.target.value } : { ...currentQuestion, answer: e.target.value });
    };

    const handleUpdateSubjective = async (question) => {
        if (
          question.question === "" ||
          question.correct_answer === "" ||
          question.marks === "" ||
          question.authority === "" ||
          question.difficulty === "" ||
          question.course === "" ||
          question.subject === "" ||
          question.topic === ""
        ) {
          alert("Please fill all the fields");
          return;
        }

        if(question.marks <= 0){
            alert("Marks should be greater than zero");
            return;
        }

        setLoading({
          message: "Updating Question",
        })
    
        try{
          const res = await axios.post("/api/faculty/edit_subjective",
          {
            btn_call,
            id: question.id,
            question: question.question,
            correct_answer: question.correct_answer,
            marks: question.marks,
            authority: question.authority,
            difficulty: question.difficulty,
            course: question.course,
            subject: question.subject,
            topic: question.topic
          })
        
          setLoading({
            show: false,
            message: "",
          });
          
          let updatedSubjectives = []
          updatedSubjectives = [...subs]
          updatedSubjectives[index] = res.data
    
          setSubs(updatedSubjectives);
    
        //   setCurrentQuestion({
        //     sq_id: "",
        //     question: "",
        //     parent_sq_id: "",
        //     marks: 1,
        //     answer:"",
        //     authority: "",
        //     long_question: true,
        //     questionnumber: subjectivesLocal.length + 1,
        //     difficulty: selectedDifficulty,
        //     course: selectedCourse,
        //     subject: selectedSubject,
        //     topic: selectedTopic,
        //     type: "subjective",
        //     checked: false
        //   });
    
          setEditing(false);
          setIndex(null)
        }
        catch (err) {
          setLoading({error: "Error updating question."});
          console.log("Error updating question: ", err);
        }
    }

    function handleNewQustionInputChange(event){
        const {id, value} = event.target
        setCurrentQuestion({...currentQuestion, [id]: value})
    }

    function handleSelect(event) {
        console.log("event in handleSelect: ", event.target.value);
        if (event.target.id === "difficulty") {
            // setSelectedDifficulty(event.target.value);
            let temp_mcq = {...currentQuestion, ["difficulty"]: event.target.value}
            setCurrentQuestion(temp_mcq)
        }
    }
    

    return(
        <div className="w-full bg-slate-100 rounded-2xl font-poppins">
          <Spinner loading={loading} />

          <div className="w-full p-10 bg-slate-100 mt-6 rounded-2xl">
            <div className="w-full justify-between flex">
                <h2 className="text-xl font-bold mb-4"> Edit Subjective Question </h2>
                <div
                onClick={() => {
                    setEditing(false);
                    setIndex(null)
                    // setCurrentQuestion({
                    // sq_id: "",
                    // question: "",
                    // parent_sq_id: "",
                    // marks: 1,
                    // authority: "",
                    // answer:"",
                    // long_question: true,
                    // questionnumber: subjectivesLocal.length + 1,
                    // });
                }}
                className="rounded-full text-white bg-red-500 my-auto flex justify-between items-center p-2 cursor-pointer"
                >
                <button>
                    <ImCross />
                </button>
                </div>
            </div>

            <div className="mb-4">
                <TextArea
                text={"Question"}
                required
                value={currentQuestion.question}
                onChange={handleQuestionChange}
                />
            </div>
            <div className="mb-4">
                <TextArea
                text={"Answer"}
                required
                value={btn_call === "Create Question" ? currentQuestion.correct_answer : currentQuestion.answer}
                onChange={handleAnswerChange}
                />
            </div>
            <div className="flex w-full gap-x-5 pb-10">
                {/* {btn_call !== "Create Question" && <div className="mb-10 w-full mt-6">
                <label className="block mb-2">Parent Question</label>

                <select
                    type="text"
                    value={currentQuestion.parent_sq_id || ""}
                    onChange={handleParentQuestionChange}
                    className="bg-white p-2 rounded-lg border border-primary-black border-opacity-[0.15] w-full focus:outline-none focus:border-[#FEC703]"
                >
                    <option value="">Select Parent Question</option>
                    {subjectivesLocal
                    .filter(
                        (subjective) =>
                        !subjective.parent_sq_id &&
                        subjective.sq_id !== currentQuestion.sq_id
                    )
                    .map((subjective, index) => (
                        <option key={index} value={subjective.sq_id}>
                        {subjective.question}
                        </option>
                    ))}
                </select>
                </div>} */}

                <Input
                text={"Marks"}
                type={"number"}
                required
                min={0.5}
                value={currentQuestion.marks}
                onChange={(e) =>
                    setCurrentQuestion({
                    ...currentQuestion,
                    marks: parseFloat(e.target.value),
                    })
                }
                />

            <div className="flex flex-col w-full mt-6">
              <label className="block mb-2">Difficulty Level</label>
              <select
                className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
                id="difficulty"
                onChange={handleSelect}
                value={currentQuestion.difficulty}
              >
                {difficultys.map((option, index) => (
                  <option
                    key={index}
                    disabled={option === "" ? true : false}
                    value={option}
                  >
                    {option === "" ? "Select option" : option}
                  </option>
                ))}
              </select>
            </div>

                <div className="flex flex-col w-full mt-6">
                <label htmlFor="authority">Authority</label>
                <input 
                    type="text"
                    id="authority"
                    value={currentQuestion.authority}
                    onChange={handleNewQustionInputChange}
                    className="mt-2 bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
                />
                </div>

                {/* {!currentQuestion.parent_sq_id && btn_call !== "Create Question" && (
                <Input
                    // if parent exists the question number will be called part number other wise, question number
                    text={
                    currentQuestion.parent_sq_id
                        ? "Part Number"
                        : "Question Number"
                    }
                    type={"number"}
                    required
                    min={1}
                    value={
                    currentQuestion.questionnumber
                    // abc
                    }
                    onChange={handleQuestionNumberChange}
                />
                )} */}
            </div>

            <button onClick={() => {handleUpdateSubjective(currentQuestion)}} className="bg-blue-800 text-white p-2 rounded hover:bg-blue-700">
                Update
            </button>
            </div>
        </div>
    )
}