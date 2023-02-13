import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import MCQTable from "./McqTable";


const Accordion = ({mcqs}) => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleAccordionClick = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <div>
            <div
                className="bg-transparent rounded-lg  p-4 mb-4 cursor-pointer"
                
            >
                <div className="flex items-center" onClick={() => handleAccordionClick(1)}>
                    <h2 className="text-xl font-bold mr-4">Objective Question</h2>
                    <MdArrowDropDown fontSize={28} className="fill-blue-800" />
                </div>
                {activeIndex === 1 && (
                    <MCQTable mcqs={mcqs}/>
                )}
            </div>
        </div>
    );
};

export default Accordion;