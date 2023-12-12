export default function NewQuestionInput({label, options, id, handleChange, value}){
    console.log({value})
    return(
        <div className="w-3/12">
            <label className="block mb-2">{label}</label>
            <select
            className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
            id={id}
            onChange={handleChange}
            value={value}
            >
                {options.map((option) => (
                    <option value={option}>{option === "" ? "Select option" : option}</option>
                ))}
            </select>
        </div>
    )
}