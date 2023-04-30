import React, { useEffect, useState } from "react";

const MultiSelectDropdown = ({ options, setCurrentMCQ, selected }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    selected ? selected.split(",") : []
  );
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setCurrentMCQ((prev) => {
        return {
          ...prev,
          correct_answer: selectedOptions.join(","),
        };
      });
    }
  }, [setCurrentMCQ, selectedOptions]);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-white p-2 px-5 rounded-lg border border-primary-black border-opacity-[0.15] w-full focus:outline-none focus:border-[#FEC703] text-left"
        onClick={() => setDropdown(!dropdown)}
      >
        {selectedOptions.length ? selectedOptions.join(",") : "Select options"}
      </button>
      {dropdown && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded border border-primary-black border-opacity-[0.15]">
          <ul className="list-reset">
            {options.map((option) => (
              <li
                key={option}
                className={`p-2 cursor-pointer hover:bg-blue-800 hover:text-white ${
                  selectedOptions.includes(option)
                    ? "bg-[#FEC703] text-white"
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
