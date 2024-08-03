import Link from "next/link"
import NewQuestionInput from "./NewQuestionInput"

export default function Info_Modal({courses, subjects, topics, handleSelect, selectedCourse, selectedSubject, selectedTopic, btn_call, setModalControl}){
    console.log("course in info modal: ", courses)
    console.log("subjects in info modal: ", subjects)
    console.log("topics in info modal: ", topics)

    function proceed(){
        if(btn_call === "Create Question"){
            if (
            //   selectedDifficulty === "" ||
              selectedCourse === "" ||
              selectedSubject === "" ||
              selectedTopic === ""
            ) {
              alert("Please select all the fields");
              return;
            }
            else{
                setModalControl(false)
            }
          }
    }

    return(
        <div className="p-10 rounded-lg bg-white flex flex-col items-end justify-center">
            <div className="mb-10 gap-x-4 flex justify-between">
                {/* <NewQuestionInput label={"Difficulty Level"} options={difficultys} id={"difficulty"} handleChange={(e)=>handleSelect(e)} value={selectedDifficulty} btn_call={btn_call}/> */}
                <NewQuestionInput label={"Course"} options={courses} id={"course"} handleChange={(e)=>handleSelect(e)} value={selectedCourse} btn_call={btn_call}/>
                <NewQuestionInput label={"Subject"} options={subjects} id={"subject"} handleChange={(e)=>handleSelect(e)} value={selectedSubject} btn_call={btn_call}/>
                <NewQuestionInput label={"Topic"} options={topics} id={"topic"} handleChange={(e)=>handleSelect(e)} value={selectedTopic} btn_call={btn_call}/>
            </div>
            <div className="flex space-x-5">
                <Link 
                    href="/faculty"
                    type="button" 
                    className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8">
                        Back
                </Link>
                <button 
                    onClick={proceed}
                    type="button" 
                    className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8">
                        Proceed
                </button>
            </div>
        </div>
    )
}