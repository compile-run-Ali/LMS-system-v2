import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function SubmitModal({
  showModal,
  setShowModal,
  currentQuestion,
  setCurrentQuestion,
  flags,
  paper,
}) {
  //call api and create attempt on the paper
  const { data: session, status } = useSession();

  const createAttempt = () => {
    axios
      .post(`/api/student/paper/attempt_status`, {
        studentId: session.user.id,
        paperId: paper,
        status: "submitted",
      })
      .then((res) => {
        console.log("attempt created successfully ", res.data);
      })
      .catch((err) => {
        console.log("error ", err.message);
      });
  }
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setShowModal(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <p className="text-lg font-bold mb-4">
                Are you sure you want to submit?
                {
                  // if there are any flags, show which questions are flagged
                  flags.length > 0 && (
                    <span className="text-red-500">
                      {" "}
                      (You have flagged question number{" "}
                      {flags.map((flag) => Number(flag) + 1) + ' '}
                    </span>
                  )
                }
              </p>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-600 px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500 mr-4"
                  onClick={() => setShowModal(false)} // close the modal when cancel is clicked
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 px-3 py-2 w-24 rounded-lg shadow-md shadow-black duration-500"
                  onClick={() => {
                    // submit form
                    setShowModal(false);
                    console.log("submitted");
                    // make a function that will call api to create an entry of submit attempt SPA
                    setCurrentQuestion(currentQuestion + 1);
                    createAttempt();
                    localStorage.clear();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
