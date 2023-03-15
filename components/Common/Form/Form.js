import React, { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useRouter } from "next/router";

export default function Form({
  setActive,
  setPaperId,
  examDetails,
  paperType,
  setFreeFlowGlobal,
}) {
  const router = useRouter();
  const [edit, setEdit] = useState(examDetails ? true : false);
  const [paperName, setPaperName] = useState(
    edit ? examDetails.paper_name : ""
  );

  const [paperDuration, setPaperDuration] = useState(
    edit ? Number(examDetails.duration) : 180
  );
  const [weightage, setWeightage] = useState(edit ? examDetails.weightage : "");

  const [dateOfExam, setDateOfExam] = useState(
    edit ? new Date(examDetails.date).toISOString().substr(0, 10) : ""
  );
  const [paperTime, setPaperTime] = useState(
    edit ? new Date(examDetails.date).toISOString().substr(11, 5) : "09:00"
  );
  const [freeflow, setFreeflow] = useState(
    edit ? examDetails.freeflow === "true" : false
  );
  const [review, setReview] = useState(
    edit ? examDetails.review === "true" : false
  );

  const handlePaperName = (e) => {
    setPaperName(e.target.value);
  };

  const handleReview = (e) => {
    setReview(e.target.checked);
  };

  const handleDuration = (e) => {
    setPaperDuration(parseInt(e.target.value));
  };

  const handleDateOfExam = (e) => {
    setDateOfExam(e.target.value);
  };

  const handleWeightage = (e) => {
    setWeightage(parseInt(e.target.value));
  };

  const handlePaperTime = (e) => {
    setPaperTime(e.target.value);
  };

  const handleFreeflow = (e) => {
    setFreeflow(e.target.checked);
    setFreeFlowGlobal(e.target.checked);
  };

  const formatDate = (examDate, examTime) => {
    const date = new Date(examDate);
    const dateString =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    const timeString = examTime;
    return dateString + "T" + timeString + "Z";
  };
  
  console.log("date is", formatDate(dateOfExam, paperTime));
  const submitForm = async (e) => {
    e.preventDefault();
    if (paperName === "" || dateOfExam === "") {
      alert("Please fill all the fields");
      return;
    }


    const res = await axios.post(
      `/api/faculty/paper_creation/${edit ? "edit_paper" : "new_paper"}`,
      {
        paper_id: examDetails ? examDetails.paper_id : null,
        course_code: router.query.course_code ? router.query.course_code : null,
        paper_name: paperName,
        date: formatDate(dateOfExam, paperTime),
        duration: paperDuration,
        weightage: parseInt(weightage),
        paper_type: paperType,
        freeflow: freeflow,
        review: review,
      }
    );
    if (res) {
      console.log("paper made ", res.data);
    }

    setPaperId(res.data.paper_id);
    setActive(2);
  };

  const setEditTrue = () => {
    setEdit(true);
    setPaperName(examDetails.paper_name);
    setPaperDuration(Number(examDetails.duration));
    setWeightage(examDetails.weightage);
    setDateOfExam(new Date(examDetails.date).toISOString().substr(0, 10));
    setPaperTime(new Date(examDetails.date).toISOString().substr(11, 5));
    setFreeflow(examDetails.freeflow === "true");
    setReview(examDetails.review === "true");
  };

  useEffect(() => {
    if (Object.keys(router.query).length > 1) {
      setEditTrue();
    }
  }, [examDetails]);

  return (
    <form>
      <div className="w-full grid grid-cols-2 pr-10 gap-x-5 mt-10 font-poppins">
        <Input
          text={"Paper Name"}
          required={true}
          type={"text"}
          placeholder={"Ex: Mid-Term Exam"}
          onChange={handlePaperName}
          value={paperName}
        />
        <Input
          text={"Paper Duration (in minutes)"}
          required={true}
          type={"number"}
          value={paperDuration}
          min={0}
          max={180}
          onChange={handleDuration}
        />

        <Input
          text={"Date of Exam"}
          required={true}
          type={"date"}
          onChange={handleDateOfExam}
          value={dateOfExam}
        />
        <Input
          text={"Weightage"}
          required={false}
          type={"number"}
          min={0}
          placeholder={"Ex: 20%"}
          value={weightage}
          onChange={handleWeightage}
        />

        <Input
          text={"Paper Start Time"}
          required={true}
          type={"time"}
          onChange={handlePaperTime}
          value={paperTime}
        />

        <div className="flex items-center gap-x-3 mt-14 ml-2">
          <label className="block">Freeflow?</label>
          <input
            type="checkbox"
            className="accent-slate-100"
            checked={freeflow}
            onChange={handleFreeflow}
          />
        </div>

        <div className="flex items-center gap-x-3 mt-14 ml-2">
          <label className="block">Allow review?</label>
          <input
            type="checkbox"
            className="accent-slate-100"
            checked={review}
            onChange={handleReview}
          />
        </div>
      </div>
      <div className="mt-10 w-full pr-10 flex justify-end gap-x-5">
        <button
          type="button"
          className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
          onClick={submitForm}
        >
          Proceed
        </button>
      </div>
    </form>
  );
}
