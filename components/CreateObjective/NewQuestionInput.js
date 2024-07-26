export default function NewQuestionInput({
    label,
    options,
    id,
    handleChange,
    value,
    btn_call,
  }) {
    const isMultiple = btn_call === "Create Question" ? false : true;
  
    return (
      <div className={btn_call === "Generate Random Paper" ? "w-4/12" : "w-4/12"}>
        <label className="block mb-2">{label}</label>
        <select
          className="bg-white focus:outline-none focus:border-[#FEC703] border rounded-md px-3 py-2 w-full"
          id={id}
          onChange={handleChange}
          value={value}
          multiple={isMultiple}
        >
          {Array.isArray(options) && options.length > 0 ? (
            id === "topic" || id === "subject" ? (
              typeof options.find(option => option) === "object" ? (
                // Array of objects
                options.map((option, index) => (
                  <option
                    key={index}
                    disabled={option === "" ? true : false}
                    value={
                      id === "topic"
                        ? `${option.name}-${option.course}-${option.subject || ""}`
                        : `${option.name}-${option.course}`
                    }
                  >
                    {option === "" ? "Select option" : option.name}
                  </option>
                ))
              ) : (
                // Array of strings
                options.map((option, index) => (
                  <option
                    key={index}
                    disabled={option === "" ? true : false}
                    value={option}
                  >
                    {option === "" ? "Select option" : option}
                  </option>
                ))
              )
            ) : (
              options.map((option, index) => (
                <option
                  key={index}
                  disabled={option === "" ? true : false}
                  value={option}
                >
                  {option === "" ? "Select option" : option}
                </option>
              ))
            )
          ) : null}
        </select>
      </div>
    );
  }
  