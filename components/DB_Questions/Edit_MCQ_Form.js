import { useState } from "react";
import { useEffect } from "react";
import MultiSelectDropdown from "../CreateObjective/MultiSelect";
import Input from "../Common/Form/Input";
import Spinner from "../Loader/Spinner";
import { ImCross } from "react-icons/im";
import axios from "axios";

export default function Edit_MCQ_Form({currentMCQ, setCurrentMCQ, index, setIndex, setEditing, mcqs, setMcqs}){
    // const [currentMCQ, setCurrentMCQ] = useState()
    const [multipleOptions, setMultipleOptions] = useState(false);
    const [loading, setLoading] = useState({});
    const specialSequence="###"
    const btn_call = "Create Question"
    const [difficultys, setDifficultys] = useState(["", "Easy", "Medium", "Hard"])
    const [selectedDifficulty, setSelectedDifficulty] = useState(currentMCQ.difficulty)

    function handleQuestionChange(event){
        setCurrentMCQ({...currentMCQ, question: event.target.value})
    }

    const handleOptionChange = (index) => (e) => {
        const newOptions = [...currentMCQ.options];
        newOptions[index] = e.target.value.replace(/,/g, specialSequence);
        //if edited mcq is correct anser, then we need to update correct answer
        if (currentMCQ.correct_answer === currentMCQ.options[index]) {
          setCurrentMCQ({
            ...currentMCQ,
            options: newOptions,
            correct_answer: e.target.value.replace(/,/g, specialSequence),
          });
        }
        else {
          setCurrentMCQ({
            ...currentMCQ,
            options: newOptions,
          });
        }
    };

    const handleOptionAddition = () => {
        setCurrentMCQ({ ...currentMCQ, options: [...currentMCQ.options, ""] });
    };

    const handleOptionDeletion = (index) => () => {
        const newOptions = [...currentMCQ.options];
        newOptions.splice(index, 1);
        setCurrentMCQ({ ...currentMCQ, options: newOptions });
    };

    useEffect(() => {
        if (
          currentMCQ.correct_answer &&
          currentMCQ.correct_answer.split(",").length > 1
        ) {
          const hasMultiple = currentMCQ.correct_answer.split(",").length > 1;
          setMultipleOptions(true);
        }
    }, [currentMCQ]);

    const handleMultipleOptionsChange = (e) => {
        setMultipleOptions(e.target.checked);
    };

    const handleCorrectOptionChange = (e) => {
        setCurrentMCQ({ ...currentMCQ, correct_answer: e.target.value });
    };

    const handleMarksChange = (e) => {
        setCurrentMCQ({ ...currentMCQ, marks: parseFloat(e.target.value) });
    };

    const handleTimeAllowedChange = (e) => {
        setCurrentMCQ({ ...currentMCQ, timeAllowed: parseInt(e.target.value) });
    };

    function handleNewQustionInputChange(event){
        const {id, value} = event.target
        setCurrentMCQ({...currentMCQ, [id]: value})
    }

    const handleUpdateMCQ = async (index) => {
        if (
            currentMCQ.question === "" ||
            currentMCQ.options.includes("") ||
            currentMCQ.correct_answer === "" ||
            currentMCQ.marks === "" ||
            currentMCQ.authority === "" ||
            currentMCQ.difficulty === "" ||
            currentMCQ.course === "" ||
            currentMCQ.subject === "" ||
            currentMCQ.topic === ""
        //   (!freeFlow && !currentMCQ.timeAllowed)
        ) {
          alert("Please fill all the fields");
          return;
        }

        if(currentMCQ.marks <= 0){
          alert("Marks should be greater than zero");
          return;
        }
    
        // if(btn_call === "Create Question"){
        //   if (
        //     currentMCQ.difficulty === "" ||
        //     currentMCQ.course === "" ||
        //     currentMCQ.subject === "" ||
        //     currentMCQ.topic === ""
        //   ) {
        //     alert("Please fill all the fields");
        //     return;
        //   }
        // }
    
        if (currentMCQ.options.length !== new Set(currentMCQ.options).size) {
          alert("Please remove duplicate options, and reselect correct option.");
          return;
        }
    
        setLoading({
          message: "Updating Question",
        });
    
        console.log("currentMCQ in edit question: ", currentMCQ );
        const newMCQ = await axios.post("/api/faculty/edit_objective", {
          btn_call,
          question_info:{
            oq_id: currentMCQ.oq_id,
            id: currentMCQ.id,
            question: currentMCQ.question,
            answers: currentMCQ.options.toString(),
            correct_answer: currentMCQ.correct_answer,
            marks: currentMCQ.marks,
            authority: currentMCQ.authority,
            timeAllowed: currentMCQ.timeAllowed || 60,
            difficulty: currentMCQ.difficulty,
            course: currentMCQ.course,
            subject: currentMCQ.subject,
            topic: currentMCQ.topic
          }
        });
    
        console.log(newMCQ.data, "newMCQ");
        console.log("index: ", index)
    
        if (newMCQ.status === 200) {
          setLoading({});
          const newMCQs = [...mcqs];
          if(btn_call !== "Generate Random Paper"){
            const newWithOptions = {
              options: newMCQ.data.answers.split(","),
              ...newMCQ.data,
            };
            newMCQs[index] = newWithOptions;
          }
          else if(btn_call === "Generate Random Paper"){
            newMCQs[index] = newMCQ.data;
          }
          setMcqs(newMCQs);
          setMultipleOptions(false);
          setCurrentMCQ({
            question: "",
            options: ["", "", "", ""],
            correct_answer: "",
            marks: 1,
            timeAllowed: currentMCQ.timeAllowed || 60,
            authority: "",
            difficulty: "",
            course: "",
            subject: "",
            topic: "",
            type: "objective",
            checked: false
          });
          setEditing(false);
          setIndex(null);
        } else {
          setLoading({
            error: "Error in Updating Question.",
          });
        }
    };

    function handleSelect(event) {
      console.log("event in handleSelect: ", event.target.value);
      if (event.target.id === "difficulty") {
        // setSelectedDifficulty(event.target.value);
        let temp_mcq = {...currentMCQ, ["difficulty"]: event.target.value}
        setCurrentMCQ(temp_mcq)
      }
    }

    return(
        <div className="w-full p-10 bg-slate-100 mt-6 rounded-2xl font-poppins">
          <Spinner loading={loading} />

          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">
              Edit MCQ
            </h2>
            <div className="rounded-full text-white bg-red-500 my-auto flex justify-between items-center p-2 cursor-pointer">
              <button
                onClick={() => {
                //   setCurrentMCQ({
                //     question: "",
                //     options: ["", "", "", ""],
                //     correct_answer: "",
                //     marks: 1,
                //     authority: "",
                //     timeAllowed: currentMCQ.timeAllowed || 60,
                //     difficulty: "",
                //     course: "",
                //     subject: "",
                //     topic: ""
                //   })
                  setIndex(null)
                  setEditing(false)
                }}>
                <ImCross />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="" className="block mb-2 font-poppins">Question</label>
            <input 
                className="mb-3 bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"
                required 
                value={currentMCQ.question}
                onChange={handleQuestionChange}
            />
            {/* <Input
              text={"Question"}
              required
              value={currentMCQ.question}
              onChange={handleQuestionChange}
            /> */}
          </div>
          <div className="">
            <label className="block mb-2 font-poppins">Options</label>
            <div className="grid grid-cols-3 w-full gap-x-5">
              {currentMCQ.options.map((option, index) => (
                <div key={index} className="mb-2 ">
                  <input
                    type="text"
                    value={option.replace(specialSequence, ",")}
                    onChange={handleOptionChange(index)}
                    className="bg-white border border-primary-black focus:outline-none focus:border-[#edbd12] border-opacity-[0.15] p-2 rounded-lg w-full"
                  />
                </div>
              ))}
            </div>

            <div className="my-6 flex space-x-8">
              <button
                onClick={handleOptionAddition}
                className="bg-[#FEC703] text-white p-2 rounded hover:bg-[#edbd12]"
              >
                Add Option
              </button>

              <button
                onClick={handleOptionDeletion(currentMCQ.options.length - 1)}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
              >
                Delete Option
              </button>
            </div>
          </div>
          <div className="flex items-center mt-10 mb-2 gap-x-3">
            <label className="block">Allow Multiple Correct Options</label>
            <input
              type="checkbox"
              checked={multipleOptions}
              className="accent-slate-100"
              onChange={handleMultipleOptionsChange}
            />
          </div>
          <div className="flex w-full gap-x-5">
            <div className="mb-10 w-full mt-6">
              <label className="block mb-2">Correct Option</label>
              {multipleOptions ? (
                <MultiSelectDropdown
                  options={currentMCQ.options}
                  setCurrentMCQ={setCurrentMCQ}
                  selected={currentMCQ.correct_answer}
                />
              ) : (
                <select
                  type="text"
                  value={currentMCQ.correct_answer}
                  onChange={handleCorrectOptionChange}
                  className="bg-white p-2 rounded-lg border border-primary-black border-opacity-[0.15] w-full focus:outline-none focus:border-[#FEC703]"
                >
                  <option value="" disabled>
                    Select Correct Option
                  </option>
                  {currentMCQ.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option.replace(specialSequence, ",")}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <Input
              text={"Marks"}
              type={"number"}
              required
              min={1}
              value={currentMCQ.marks}
              onChange={handleMarksChange}
            />
            {/* input for time allowed */}
            {/* {freeFlow ? null : (
              <Input
                text={"Time Allowed in Seconds"}
                type={"number"}
                required
                value={currentMCQ.timeAllowed || 60}
                onChange={handleTimeAllowedChange}
              />
            )} */}

            <div className="flex flex-col w-full mt-6">
              <label className="block mb-2">Difficulty Level</label>
              <select
                className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
                id="difficulty"
                onChange={handleSelect}
                value={currentMCQ.difficulty}
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
                value={currentMCQ.authority}
                onChange={handleNewQustionInputChange}
                className="mt-2 bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>
          <button onClick={() => {handleUpdateMCQ(index)}} className="bg-blue-800 text-white p-2 rounded hover:bg-blue-700">
            Update
          </button>
        </div>
    )
}