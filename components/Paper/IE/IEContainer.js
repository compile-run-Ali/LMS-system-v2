import React from "react";
import axios from "axios";

export default function IEContainer({ IeFiles }) {
  const handleDownload = async (fileId) => {
    try {
      const response = await axios.get(`/api/paper/get_downloadIE`, {
        params: {
            fileId: fileId,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", true);

      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="flex justify-between shadow-lg max-w-5xl font-poppins mt-28 mx-20 xl:mx-auto pt-20 pb-10 px-10 gradient rounded-2xl shadow-3xl shadow-black">
      <div className="flex justify-center w-full">IE Container</div>
      <div className="flex flex-col gap-2">
        {IeFiles?.ie_questions.map((question, index) => (
          <div key={index} className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDownload(question.ie_id)}
            >
              Download {question.fileName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
