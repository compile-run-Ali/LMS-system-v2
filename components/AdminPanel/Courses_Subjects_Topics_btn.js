export default function Courses_Subjects_Topics_btn({btn_name, setActive}){
    function choose_Modal(){
        if (btn_name === "Add Courses"){
            setActive(1)
        }
        else if (btn_name === "Add Subjects"){
            setActive(2)
        }
        else if (btn_name === "Add Topics"){
            setActive(3)
        }
    }
    
    return(
        <button
        onClick={choose_Modal}
        className="bg-blue-800 hover:bg-blue-700 transition-all text-white border rounded-md px-5 mx-2 py-2">
            {btn_name}
        </button>
    )
}