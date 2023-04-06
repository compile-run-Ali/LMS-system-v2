import React from "react";

export default function Wizard({ active, setActive, items, paperName }) {
  return (
    <div className=" font-cabin flex items-center border-b border-primary-black border-opacity-20 w-full max-w-6xl ">
      {paperName && (
        <div className="p-6 border-r-primary-black border-opacity-20 border-r font-medium text-primary-black text-xl">
          {paperName}
        </div>
      )}
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`w-fit flex py-6 px-6 mx-2 cursor-pointer ${
            active === item.id ? "border-b-2 border-[#FEC703]" : ""
          }`}
        >
          <div
            className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center ${
              active === item.id
                ? "bg-blue-800"
                : "border border-primary-black border-opacity-30"
            }`}
          >
            <span
              className={`font-bold text-sm ${
                active === item.id ? "text-white" : "text-primary-black"
              }`}
            >
              {item.id}
            </span>
          </div>

          <span className={`font-medium text-primary-black`}>{item.title}</span>
        </div>
      ))}
    </div>
  );
}
