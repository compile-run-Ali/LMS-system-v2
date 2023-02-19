import React, { useState } from "react";
import Input from "@/components/Common/Form/Input";
import axios from "axios";

export default function AddStudent() {
  const [pNumber, setPNumber] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [DOB, setDob] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addStudent({
      p_number: pNumber,
      name,
      phone_number: phoneNumber,
      cgpa,
      DOB,
      email,
      password,
    });
    console.log(DOB, typeof DOB);
    setPNumber("");
    setName("");
    setPhoneNumber("");
    setCgpa("");
    setDob("");
    setEmail("");
    setPassword("");
  };

  const addStudent = async (student) => {
    const new_student = await axios.post(
      "/api/admin/student/add_student",
      {
        ...student,
      }
    );
    console.log(new_student);
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="p-4 grid grid-cols-2 gap-x-8 px-10">
        <div className="mb-4">
          <Input
            text="P Number"
            type="text"
            value={pNumber}
            onChange={(event) => setPNumber(event.target.value)}
            required
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
            text="CGPA"
            type="text"
            value={cgpa}
            onChange={(event) => setCgpa(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Date of Birth"
            type="date"
            value={DOB}
            onChange={(event) => setDob(event.target.value)}
            required
          />
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
          <label className="block mb-2  text-primary-black" for="file_input">
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
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Student
        </button>
      </div>
    </form>
  );
}
