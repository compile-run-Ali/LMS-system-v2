import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Accordion from "./Accordion";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { useSession } from "next-auth/react";
import { convertDateTimeToStrings } from "@/lib/TimeCalculations";
import Spinner from "../Loader/Spinner";

export default function Exam({
  exam,
  subjectiveQuestions,
  objectiveQuestions,
  isEdit,
  setActive,
}) {
  const session = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState({
    show: false,
    message: "",
  });
  const [edit, setEdit] = useState(isEdit);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState();
  const [faculty, setFaculty] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [access, setAccess] = useState(null);

  useEffect(() => {
    setAccess(() => {
      if (session.status === "authenticated") {
        if (exam.status === "Pending Approval") {
          return exam.examofficer.faculty_id === session.data.user.id;
        } else if (exam.status === "Approved") {
          return false;
        } else if (exam.status === "Draft") {
          return true;
        }
      }
    });
  }, [session]);

  const getComments = async () => {
    const res = await axios.post("/api/paper/get_comments", {
      paper_id: exam.paper_id,
    });
    console.log("paper comments", res.data);

    // sort comment by date and time
    res.data.sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
      return dateA - dateB;
    });

    setComments(res.data);
  };

  const addFiveHoursToISOString = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 5);
    return date.toISOString();
  };

  const getFaculty = async () => {
    const res = await axios.get("/api/paper/get_faculty");
    setFaculty(
      res.data.filter(
        (faculty) => faculty.faculty_id !== session?.data?.user.id
      )
    );
  };

  useEffect(() => {
    if (!comments) {
      getComments();
    }
    if (edit) {
      getFaculty();
    }
  }, []);

  const editExam = () => {
    if (setActive) {
      setActive(1);
    }
    router.push({
      pathname: `/faculty/create_exam/${
        exam.paper_type === "Objective" ? "objective" : "subjective"
      }`,
      query: {
        ...exam,
      },
    });
  };

  const submitExam = async () => {
    if (!selectedFaculty) {
      alert("Please select a faculty to submit to");
      return;
    }

    setLoading({
      show: true,
      message: "Submitting Exam...",
    });
    const submitExam = await axios.post("/api/faculty/submit_exam", {
      paper_id: exam.paper_id,
      faculty_id: selectedFaculty,
      level: faculty.filter(
        (faculty) => faculty.faculty_id === selectedFaculty
      )[0].level,
    });
    if (submitExam.status === 200) {
      setLoading({
        show: false,
        message: "",
      });

      addComment({
        comment: `Exam Submitted by ${session.data.user.name} to ${
          faculty.filter((faculty) => faculty.faculty_id === selectedFaculty)[0]
            .name
        }`,
        faculty_id: session.data.user.id,
        paper_id: exam.paper_id,
      });
      generateNotification();
      router.push("/faculty");
    }
  };

  const approve = async () => {
    const approveExam = await axios.post("/api/faculty/update_exam_status", {
      paper_id: exam.paper_id,
      status: "Approved",
    });
    if (approveExam.status === 200) {
      addComment({
        comment: `Exam Approved by ${session.data.user.name}`,
        faculty_id: session.data.user.id,
        paper_id: exam.paper_id,
      });
      router.push("/faculty");
    }
  };

  const sendBack = async () => {
    const sendBack = await axios.post("/api/faculty/edit_paperapproval", {
      paper_id: exam.paper_id,
      examofficer: null,
    });
    if (sendBack.status === 200) {
      addComment({
        comment: `Exam Sent Back by ${session.data.user.name}`,
        faculty_id: session.data.user.id,
        paper_id: exam.paper_id,
      });
      router.push("/faculty");
    }
  };

  const sendForward = async () => {
    if (!selectedFaculty) {
      alert("Please select a faculty to send to");
      return;
    }
    const sendForward = await axios.post("/api/faculty/edit_paperapproval", {
      paper_id: exam.paper_id,
      examofficer: selectedFaculty,
      level: faculty.filter(
        (faculty) => faculty.faculty_id === selectedFaculty
      )[0].level,
    });
    if (sendForward.status === 200) {
      addComment({
        comment: `Exam Sent Forward by ${session.data.user.name} to ${
          faculty.filter((faculty) => faculty.faculty_id === selectedFaculty)[0]
            .name
        }`,
        faculty_id: session.data.user.id,
        paper_id: exam.paper_id,
      });
      console.log("Exam Sent Forward");
      generateNotification();
      router.push("/faculty");
    }
  };

  const generateNotification = async () => {
    const res = await axios.post("/api/faculty/generate_notification", {
      faculty_id: selectedFaculty,
      notification: `You have a new exam to approve by ${session.data.user.name}`,
    });
    if (res.status === 200) {
      console.log("Notification sent");
    }
  };

  const addComment = async ({ comment }) => {
    if (session.status === "authenticated") {
      const res = await axios.post("/api/faculty/add_comment", {
        paper_id: exam.paper_id,
        comment: comment,
        faculty_id: session.data.user.id,
      });

      if (res.status === 200) {
        setComments([...comments, res.data]);
        setComment("");
      }
      // setComments([...comments, new_comment])
    }
  };

  const handleSelectedFaculty = (e) => {
    setSelectedFaculty(e.target.value);
  };

  return (
    <>
      <Spinner show={loading.show} message={loading.message} />
      <div className="pr-10 pl-7 font-poppins w-full ">
        <div className="bg-gray-100 bg-opacity-50 pt-10 rounded-md">
          {access && (
            <div className="w-full flex justify-end pr-5 cursor-pointer">
              <div
                onClick={() => {
                  editExam();
                }}
                className="bg-white text-[#f5c51a]  p-2 rounded hover:bg-[#f5c51a] hover:text-white transition-colors"
              >
                <MdEdit />
              </div>
            </div>
          )}

          <div className="font-semibold text-center text-3xl mt-5 mb-10">
            Exam Details
          </div>

          <div className="grid grid-cols-3 gap-y-3">
            <div className="pl-20">
              <span className=" font-medium">Exam Name:</span>
              <span className="ml-2">{exam.paper_name}</span>
            </div>
            <div className="pl-20">
              <span className=" font-medium">Exam Type:</span>
              <span className="ml-2">{exam.paper_type}</span>
            </div>
            <div className="pl-20">
              <span className=" font-medium">Exam Date:</span>
              <span className="ml-2">
                {convertDateTimeToStrings(exam.date, true)}
              </span>
            </div>
            <div className="pl-20">
              <span className=" font-medium">Exam Time:</span>
              <span className="ml-2">
                {convertDateTimeToStrings(exam.date)}
              </span>
            </div>

            <div className="pl-20">
              <span className=" font-medium">Exam Duration:</span>
              <span className="ml-2">{exam.duration}</span>
            </div>
          </div>
          {exam.paper_type === "Objective" && (

          <div className="bg-gray-100 py-5 mt-5 px-5 border-b border-slate-400 border-opacity-50">
            <Accordion questions={objectiveQuestions} paperType={"Objective"} />
          </div>
        )}
          {exam.paper_type === "Subjective/Objective" && (
            <div className="bg-gray-100 py-5 px-5 border-b border-slate-400 border-opacity-50">
              <Accordion
                questions={subjectiveQuestions}
                paperType={"Subjective/Objective"}
              />
            </div>
          )}
        </div>
        <div className="mt-10 font-poppins">
          <span className=" text-lg font-medium ml-5">Comments</span>
          <div className="bg-gray-100 bg-opacity-50 px-10 py-5 ">
            {comments &&
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex justify-between mb-5 pb-4 border-b border-gray-600 border-opacity-20"
                >
                  <div className=" flex flex-col justify-center">
                    <span className="text-[#212121] font-medium">
                      {comment.comment}
                    </span>
                    <span className="text-sm mt-2 text-[#828282]">
                      By {comment.faculty?.name}
                    </span>
                  </div>
                  <div className="flex flex-col text-[#BDBDBD] text-right">
                    <span className="text-xs font-medium mt-1">
                      {convertDateTimeToStrings(
                        addFiveHoursToISOString(comment.time)
                      )}
                    </span>
                    <span className="text-xs font-medium mt-1">
                      {convertDateTimeToStrings(
                        addFiveHoursToISOString(comment.time),
                        true
                      )}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {edit && access && (
          <div>
            <div className="flex flex-col mt-5">
              <span className="text-lg pr-5 py-5 font-medium">
                Add Comments
              </span>
              <textarea
                className="p-5 bg-slate-100 border border-slate-300 rounded-md focus:outline-none active:outline-none"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
                onClick={() => {
                  if (!comment) {
                    alert("Please enter a comment");
                    return;
                  }
                  addComment({ comment });
                }}
              >
                Add Comment
              </button>
            </div>

            {exam.examofficer?.faculty_id === session.data.user.id ? (
              <div>
                <div className="flex justify-end">
                  <div className="mt-10 mb-10">
                    <select
                      className="bg-gray-100 border-2 border-gray-300 rounded-lg py-4 px-8"
                      onChange={handleSelectedFaculty}
                    >
                      <option value="">Submit to</option>
                      {faculty &&
                        faculty.map((faculty) => (
                          <option
                            key={faculty.faculty_id}
                            value={faculty.faculty_id}
                          >{`${faculty.name} (${faculty.department})`}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-x-5 justify-end">
                  <div className="mt-10 mb-10">
                    <button
                      type="submit"
                      className="bg-red-800 hover:bg-red-700 font-medium text-white rounded-lg py-4 px-8"
                      onClick={() => {
                        sendBack();
                      }}
                    >
                      Send Back
                    </button>
                  </div>
                  <div className="mt-10 pr-10 flex justify-end gap-x-5 mb-10">
                    <button
                      type="submit"
                      className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
                      onClick={() => {
                        sendForward();
                      }}
                    >
                      Send Forward
                    </button>
                  </div>
                  {exam.examofficer?.level > 2 && (
                    <div className="mt-10 pr-10 flex justify-end gap-x-5 mb-10">
                      <button
                        type="submit"
                        className="bg-green-800 hover:bg-green-700 font-medium text-white rounded-lg py-4 px-8"
                        onClick={() => {
                          approve();
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="mt-10 mb-10">
                  <select
                    className="bg-gray-100 border-2 border-gray-300 rounded-lg py-4 px-8"
                    onChange={handleSelectedFaculty}
                  >
                    <option value="">Submit to</option>
                    {faculty &&
                      faculty.map((faculty) => (
                        <option
                          key={faculty.faculty_id}
                          value={faculty.faculty_id}
                        >{`${faculty.name} (${faculty.department})`}</option>
                      ))}
                  </select>
                </div>
                <div className="flex justify-end gap-x-5">
                  {setActive && (
                    <div className="mt-10 mb-10">
                      <button
                        type="submit"
                        className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3.5 px-8"
                        onClick={() => {
                          setActive(exam.paper_type === "Objective" ? 2 : 3);
                        }}
                      >
                        Back
                      </button>
                    </div>
                  )}
                  <div className="mt-10 mb-10">
                    <button
                      type="submit"
                      className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
                      onClick={() => {
                        router.push("/faculty");
                      }}
                    >
                      Save Draft
                    </button>
                  </div>
                  <div className="mt-10 pr-10 flex justify-end gap-x-5 mb-10">
                    <button
                      type="submit"
                      className="bg-green-800 hover:bg-green-700 font-medium text-white rounded-lg py-4 px-8"
                      onClick={() => {
                        submitExam();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-10 pr-10 flex justify-start gap-x-5 mb-10">
          <button
            className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
            onClick={() => {
              router.push("/faculty/mark_exam/" + exam.paper_id);
            }}
          >
            Mark Exam
          </button>
        </div>
      </div>
    </>
  );
}
