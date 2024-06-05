export default function NewQuestionInput({label, options, id, handleChange, value, btn_call}){
    // const isMultiple = (id === "course" || btn_call === "Create Question") ? false : true
    const isMultiple = btn_call === "Create Question" ? false : true
    // console.log("in NewQuestionInput: id", id)
    // console.log("in NewQuestionInput: isMultiple", isMultiple)
    console.log("options: ", options)
    return(
        <div className={btn_call === "Generate Random Paper" ? "w-4/12" : "w-4/12"}>
            <label className="block mb-2">{label}</label>
            <select
            className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
            id={id}
            onChange={handleChange}
            value={value}
            multiple={isMultiple}
            >
                {id === "topic" ? 
                options.map((option, index) => (
                    <option key={index} disabled={option === "" ? true : false} value={`${option.name}-${option.course}`}>{option === "" ? "Select option" : option.name}</option>
                )) : 
                options.map((option, index) => (
                    <option key={index} disabled={option === "" ? true : false} value={option}>{option === "" ? "Select option" : option}</option>
                ))}
            </select>
        </div>
    )
}