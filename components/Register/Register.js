import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [inputs, setInputs] = useState([""]);
  const [paNumber, setPaNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/course/get_courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addInput = () => {
    if (inputs.length < 6) setInputs([...inputs, ""]);
  };

  const handleChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const registerStudent = async () => {
    if (
      !paNumber ||
      !fullName ||
      !email ||
      !dob ||
      !cgpa ||
      !phoneNumber ||
      !password ||
      !cPassword
    ) {
      return alert("Please fill all fields");
    }

    const student = {
      p_number: paNumber,
      name: fullName,
      phone_number: phoneNumber,
      cgpa,
      DOB: dob,
      email,
      password,
    };

    // add student to student table
    axios
      .post(`/api/admin/student/add_student`, { ...student })
      .then((res) => {
        console.log("student added successfully", res.data);
        // add course and student to SRC table
        axios
          .post(`/api/student/register`, {
            p_number: paNumber,
            course_code: selectedCourse,
          })
          .then((res) => {
            console.log("course added successfully", res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

      router.push("/login");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-3/4 h-[90%] flex">
        <div className="w-1/2 font-poppins">
          <div className="block p-6 rounded-tl-lg rounded-bl-lg shadow-lg bg-white h-full">
            <div>
              <h1 className="text-blue-900 text-2xl font-semibold mb-3">
                Register yourself
              </h1>
            </div>
            <form>
              <div className="grid grid-cols-2 gap-5">
                <div className="form-group mb-5">
                  <label
                    htmlFor="PA number"
                    className="text-blue-900 font-medium text-sm"
                  >
                    PA Number
                  </label>
                  <input
                    value={paNumber}
                    onChange={(e) => setPaNumber(e.target.value)}
                    type="text"
                    className="form-control block
                  w-full px-3 py-1.5 text-sm font-normal text-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="PA number"
                    aria-describedby="emailHelp123"
                  />
                </div>
                <div className="form-group mb-5">
                  <label
                    htmlFor="Full Name"
                    className="text-blue-900 font-medium text-sm"
                  >
                    Full Name
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    className="form-control
              block
              w-full
              px-3
              py-1.5
              text-sm
              font-normal
              text-blue-900
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-blue-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="Full Name"
                    aria-describedby="emailHelp123"
                  />
                </div>
              </div>

              <div className="form-group mb-5 grid grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="Email"
                    className="text-blue-900 font-medium text-sm"
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control block
                  w-full
                  px-3
                  py-1.5
                  text-sm
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-blue-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Phone Number"
                    className="text-blue-900 font-medium text-sm"
                  >
                    Phone Number
                  </label>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="text"
                    className="form-control block
                  w-full px-3 py-1.5 text-sm font-normal text-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="Phone number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="form-group mb-5">
                  <label
                    htmlFor="Password"
                    className="text-blue-900 font-medium text-sm"
                  >
                    Date of Birth
                  </label>
                  <input
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    type="date"
                    className="form-control block w-full px-3 py-1.5 text-sm font-normal
                    text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded transition ease-in-out m-0 
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none dateSelectorColor"
                    id="dob"
                  />
                </div>
                <div className="form-group mb-5">
                  <label
                    htmlFor="cgpa"
                    className="text-blue-900 font-medium text-sm"
                  >
                    CGPA
                  </label>
                  <input
                    value={cgpa}
                    onChange={(e) => setCgpa(Number(e.target.value))}
                    type="number"
                    min={0}
                    max={4}
                    step={0.01}
                    className="form-control block
            w-full
            px-3
            py-1.5
            text-sm
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="cgpa"
                  />
                </div>
              </div>

              <div className="form-group mb-6">
                <label
                  htmlFor="Courses"
                  className="text-blue-900 font-medium text-sm"
                >
                  Courses
                </label>

                <select
                  className="form-control block w-full px-3 py-1.5 my-2 text-sm font-normal text-gray-700 
                  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="Courses"
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                  }}
                >
                  <option value={""}>Select a course</option>
                  {courses?.map((course) => (
                    <option key={course.course_code} value={course.course_code}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="form-group mb-6">
                  <label
                    htmlFor="Password"
                    className="text-blue-900 font-medium text-sm"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control block
            w-full
            px-3
            py-1.5
            text-sm
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700  focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="Password"
                  />
                </div>
                <div className="form-group  ">
                  <label
                    htmlFor="cPassword"
                    className="text-blue-900 font-medium text-sm"
                  >
                    Confirm Password
                  </label>
                  <input
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    type="password"
                    className="form-control block
                      w-full px-3 py-1.5 text-sm font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="cPassword"
                  />
                </div>
              </div>
              <div>
                {!passwordMatch && (
                  <p className="text-red-500 text-sm">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                className=" w-full px-6 py-2.5 bg-blue-900 text-white font-medium text-xs
                  uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg 
                  transition  duration-150 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  if (password === cPassword) {
                    setPasswordMatch(true);
                    registerStudent();
                  } else {
                    setPasswordMatch(false);
                  }
                }}
              >
                Sign up
              </button>
              <div className="mt-4 text-left">
                <span> Already registered? </span>
                <Link href={"/"}>
                  <span className="text-blue-800 hover:text-blue-700 font-medium">
                    Login here
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className=" !font-poppins w-1/2 h-full rounded-tr-lg rounded-br-lg shadow-lg blue-div bg-blue-900">
          <div className="w-full h-full backdrop-blur-sm">
            <div className="pt-16 px-5">
              <label
                className="block mb-2 text-sm font-medium text-white"
                htmlFor="file_input"
              >
                Upload Profile Pic
              </label>
              <input
                className="block w-full text-sm text-gray-900 h-8 border border-gray-300 rounded-md cursor-pointer bg-gray-50  focus:outline-none"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
              />
              <p
                className="mt-1 pl-2 text-sm text-gray-100 "
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>
            <div className="flex gap-x-2 items-end w-full font-poppins pr-5">
              <div className="w-full mt-5">
                <span className="px-5 block mb-2  text-sm font-medium text-white">
                  Previous Courses
                </span>
                {inputs.map((input, index) => (
                  <div key={index} className="flex px-5  mt-3 gap-x-5">
                    <div className="w-full">
                      <label className="text-white text-sm font-medium">
                        Course
                      </label>
                      <select
                        className=" focus:outline-none bg-white active:outline-none outline-blue-800 p-1.5 rounded-md w-full "
                        onChange={(event) => handleChange(index, event)}
                      >
                        <option className="">Select course</option>
                        <option className="">Staff College</option>
                        <option className="">Defense Economy</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <label className="text-white text-sm font-medium">
                        Grade
                      </label>
                      <select
                        className=" focus:outline-none bg-white  active:outline-none outline-blue-800 p-1.5 rounded-md w-full "
                        onChange={(event) => handleChange(index, event)}
                      >
                        <option className="">D</option>
                        <option className="">A</option>
                        <option className="">B+</option>
                        <option className="">BH</option>
                        <option className="">BA</option>
                        <option className="">BL</option>
                        <option className="">B-</option>
                        <option className="">C</option>
                        <option className="">F</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <AiOutlinePlusCircle
                fontSize={38}
                className="text-white  hover mt-2 hover:text-[#FEC703] text-bold  cursor-pointer "
                onClick={addInput}
              ></AiOutlinePlusCircle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
