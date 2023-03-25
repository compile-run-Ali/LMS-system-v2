import { Fragment } from "react";

const Spinner = ({ show, message = "Loading..." }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      style={{ height: "calc(100vh + 200px)" }}
      className="fixed top-0 left-0 w-full h-screen   flex items-center justify-center z-50 bg-black bg-opacity-25"
    >
      <div className="bg-white bg-opacity-100 rounded-lg p-8 pb-6">
        <div
          className="animate-spin rounded-full aspect-square w-16 border-t-2 border-b-2 border-blue-900"
          style={{ animationDuration: "2s" }}
        ></div>
        <div className="text-xs text-black text-center mt-4 w-16">{message}</div>
      </div>
    </div>
  );
};

export default Spinner;
