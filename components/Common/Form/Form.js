import React, { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "@/components/Loader/Spinner";

export default function Form({
  setActive,
  setPaperId,
  examDetails,
  paperType,
  setFreeFlowGlobal,
  setExam,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState({});
  const [edit, setEdit] = useState(examDetails ? true : false);
  const [paperName, setPaperName] = useState("");
  const [paperDuration, setPaperDuration] = useState(180);
  const [weightage, setWeightage] = useState("");
  const [dateOfExam, setDateOfExam] = useState(null);
  const [paperTime, setPaperTime] = useState(
    router.query.is_edit === "true" ? null : "09:00"
  );
  const [freeflow, setFreeflow] = useState(false);
  const [review, setReview] = useState(false);

  useEffect(() => {
    if (edit) {
      setLoading({
        message: "Loading Exam Details...",
      });
      axios
        .post("/api/faculty/get_exam", {
          paper_id: examDetails.paper_id,
        })
        .then((res) => {
          setPaperName(res.data.paper_name);
          setPaperDuration(res.data.duration);
          setWeightage(res.data.weightage);
          setDateOfExam(new Date(res.data.date).toISOString().substr(0, 10));
          setPaperTime(new Date(res.data.date).toISOString().substr(11, 5));
          setFreeflow(res.data.freeflow);
          setReview(res.data.review);
          setLoading({});
        })
        .catch((err) => {
          console.log(err);
          setLoading({
            error: "Error in Loading Exam Details.",
          });
        });
    }
  }, [edit]);

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

  const submitForm = async (e) => {
    e.preventDefault();
    if (paperName === "" || dateOfExam === "") {
      alert("Please fill all the fields");
      return;
    }
    setLoading({
      message: edit ? "Updating Paper Details" : "Creating Paper",
    });

    try {
      const res = await axios.post(
        `/api/faculty/paper_creation/${edit ? "edit_paper" : "new_paper"}`,
        {
          paper_id: examDetails ? examDetails.paper_id : null,
          course_code: router.query.course_code
            ? router.query.course_code
            : null,
          paper_name: paperName,
          date: formatDate(dateOfExam, paperTime),
          duration: paperDuration,
          weightage: parseInt(weightage),
          paper_type: paperType,
          freeflow: freeflow,
          review: review,
        }
      );
      if (res.status === 200) {
        setLoading({});
        setExam((prevExam) => ({
          ...prevExam,
          ...res.data,
        }));
        console.log("paper made ", res.data);

        setPaperId(res.data.paper_id);
        setActive(2);
      }
    } catch (err) {
      console.log(err);
      setLoading({
        error: "Error in Creating Paper",
      });
    }
  };

  const setEditTrue = () => {
    setEdit(true);
  };

  useEffect(() => {
    if (Object.keys(router.query).length > 1) {
      setEditTrue();
    }
  }, [examDetails]);

  return (
    <form>
      <Spinner loading={loading} />
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
          text={"Paper Live Time"}
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
          onClick={() => router.push("/")}
          className="border-2 border-[#FEC703] hover:bg-[#FEAF03] hover:text-white font-medium text-primary-black rounded-lg py-3 px-8"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 font-medium text-white rounded-lg py-4 px-8"
          onClick={(e) => submitForm(e)}
        >
          Save and Proceed
        </button>
      </div>
    </form>
  );
}
