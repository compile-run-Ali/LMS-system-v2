import Input from "@/components/Common/Form/Input";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { headers } from "@/next.config";

const AddFaculty = () => {
  const router = useRouter();
  const [edit, setEdit] = useState(router.query.faculty_id ? true : false);
  const [name, setName] = useState(edit ? router.query.name : "");
  const [phoneNumber, setPhoneNumber] = useState(
    edit ? router.query.phone_number : ""
  );
  const [level, setLevel] = useState(edit ? router.query.level : "");
  const [department, setDepartment] = useState(
    edit ? router.query.department : ""
  );
  const [email, setEmail] = useState(edit ? router.query.email : "");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone_number", phoneNumber);
    formData.append("level", level);
    formData.append("department", department);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_picture", profilePicture);

    await addFaculty(formData);
  };
  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const addFaculty = async (faculty) => {
    const new_faculty = await axios.post(
      `/api/admin/faculty/add_faculty`,
      faculty,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (new_faculty.status === 200) {
      router.push("/admin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="p-4 grid grid-cols-2 gap-x-8 px-10">
        <div className="mb-4 ">
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
        <div className="mb-4">
          <Input
            text="Department"
            type="text"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            text="Level"
            type="text"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            required
          />
        </div>

        <div className="font-poppins mt-4">
          <label
            className="block mb-2  text-primary-black"
            htmlFor="file_input"
          >
            Upload Profile Pic
          </label>
          <input
            className="block w-full text-sm text-gray-900 h-11 border border-primary-black border-opacity-[0.15] rounded-md cursor-pointer bg-white  focus:outline-none"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
          />
          <p className="mt-1 pl-1 text-sm text-black-100 " id="file_input_help">
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>
      </div>

      <div className="flex justify-left ml-10 ">
        <button
          className="bg-blue-800 hover:bg-blue-700 text-lg mt-4 font-poppins text-white font-semibold py-2 px-10 rounded focus:outline-none focus:shadow-outline "
          type="submit"
        >
          Add Faculty
        </button>
      </div>
    </form>
  );
};

export default AddFaculty;
