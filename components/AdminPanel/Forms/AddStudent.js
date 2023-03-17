import React, { useState, useEffect } from "react";
import Input from "@/components/Common/Form/Input";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddStudent() {
  const router = useRouter();
  const [pNumber, setPNumber] = useState(router.query.p_number? router.query.p_number : "");
  const [edit, setEdit] = useState(router.query.p_number ? true : false);
  const [name, setName] = useState(router.query.name? router.query.name : "");
  const [phoneNumber, setPhoneNumber] = useState(router.query.phone_number? router.query.phone_number : "");
  const [cgpa, setCgpa] = useState(router.query.cgpa? router.query.cgpa : "");
  const [DOB, setDob] = useState(router.query.DOB? router.query.DOB : "");
  const [email, setEmail] = useState(router.query.email? router.query.email : "");
  const [password, setPassword] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(router.query.course_code? router.query.course_code : "");
  const [courses, setCourses] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
    console.log(event.target.files[0])
  };

  useEffect(() => {
    axios
      .get("/api/admin/course/get_courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("p_number", pNumber);
    formData.append("name", name);
    formData.append("phone_number", phoneNumber);
    formData.append("cgpa", cgpa);
    formData.append("DOB", DOB);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("course_code", selectedCourse);
    formData.append("profile_picture", profilePicture);
    console.log(profilePicture)

    if (edit) {
      formData.append("student_id", router.query.student_id);
      editStudent(formData);
    } else {
      addStudent(formData);
    }

  
    // setPNumber("");
    // setName("");
    // setPhoneNumber("");
    // setCgpa("");
    // setDob("");
    // setEmail("");
    // setPassword("");
    // setProfilePicture(null);
  };
    

const addStudent = async (student) => {
  axios
    .post(`/api/admin/student/add_student`, student, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("student added successfully", res.data);
      // add course and student to SRC table
      axios
        .post(`/api/student/register`, {
          p_number: pNumber,
          course_code: selectedCourse,
        })
        .then((res) => {
          console.log("course added successfully", res.data);
        })
        .catch((err) =>
          console.log("Error in registering student to course", err)
        );
    })
    .catch((err) => console.log("Error in registering student", err));
  router.push("/admin");
};

const editStudent = async (student) => {
  axios
    .post(`/api/admin/student/edit_student`, student, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("student edited successfully", res.data);
    })
    .catch((err) => console.log("Error in editing student", err));
  router.push("/admin");
};

  return (
    <form onSubmit={handleSubmit} className="px-4 font-poppins">
      <div className="p-4 grid grid-cols-2 gap-x-8 px-10">
        <div className="mb-4">
          <Input
            text="PA Number"
            type="text"
            value={pNumber}
            onChange={(event) => setPNumber(event.target.value)}
            required
            disabled={edit}
          />
        </div>
        <div className="mb-4">
          <Input
            text="Name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Phone Number"
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            text="Date of Birth"
            type="date"
            onChange={(event) => setDob(event.target.value)}
            required
            value={DOB ? new Date(DOB).toISOString().substr(0, 10) : ''}
            />
        </div>
        <div className="mt-6 form-group">
          <label htmlFor="Courses">Courses</label>

          <select
            className="form-control block w-full mt-2 px-3 py-2.5 text-sm font-normal text-gray-700 
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
        <div className="mb-4">
          <Input
            text="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="font-poppins mt-[22px]">
          <label className="block mb-2  text-primary-black" htmlFor="file_input">
            Upload Profile Pic{" "}
            <span
              className="mt-1 pl-1 text-xs text-black-100 "
              id="file_input_help"
            >
              (SVG, PNG, JPG or GIF (MAX. 800x400px).)
            </span>
          </label>
          <input
            className="block w-full text-sm text-gray-900 h-11 border border-primary-black border-opacity-[0.15] rounded-md cursor-pointer bg-white  focus:outline-none"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Add Student
        </button>
      </div>
    </form>
  );
}
