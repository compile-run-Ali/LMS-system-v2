import Obj_Table from "./Obj_Table"
import Sub_Table from "./Sub_Table"
import { useState } from "react"

export default function DB_Questions(){
    const [control, setControl] = useState(true) //False for sub and True for obj questions

    return(
        <div className="mt-9">
            <div className="flex flex-row justify-end pr-6 font-poppins">
                {/* <button onClick={() => {setControl(0)}} className="ml-2 bg-blue-800 hover:bg-blue-700 transition-all text-white border rounded-md px-3 py-2">
                    Subjective Questions
                </button> */}
                <button onClick={() => {setControl(!control)}} className="ml-2 bg-blue-800 hover:bg-blue-700 transition-all text-white border rounded-md px-3 py-2">
                    {control === true ? "Subjective Questions" : "Objective Questions"}
                </button>
            </div>
            {control === false && <Sub_Table />}
            {control === true && <Obj_Table />}
        </div>
    )
}