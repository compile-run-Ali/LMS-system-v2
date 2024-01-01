export default function NoOfQuestions({label, id, handleChange, value}){
    return(
        <div className="w-4/12">
            <label className="block mb-2">{label}</label>
            <input type="number"
            className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
            id={id}
            onChange={handleChange}
            value={value}
            />
            {/* <select
            className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
            id={id}
            onChange={handleChange}
            value={value}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>{option === "" ? "Select option" : option}</option>
                ))}
            </select> */}
        </div>
    )
}