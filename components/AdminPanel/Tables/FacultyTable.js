import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/router";
import axios from "axios";

const FacultyTable = ({ faculty, setSelectedFaculty, setOpen }) => {
  const router = useRouter();

  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    setFacultyData(faculty);
  }, [faculty]);

  const openModal = (index) => {
    setOpen(true);
    setSelectedFaculty(facultyData[index].faculty_id);
  };

  const handleEditFaculty = (index) => () => {
    // Implement this
    router.push({
      pathname: "/admin/add_faculty",
      query: {
        faculty_id: facultyData[index].faculty_id,
        name: facultyData[index].name,
        phone_number: facultyData[index].phone_number,
        level: facultyData[index].level,
        department: facultyData[index].department,
        email: facultyData[index].email,
        profile_picture: facultyData[index].profile_picture,
      },
    });
  };

  const handleDeleteFaculty = async (index) => {
    const deletedFaculty = await axios.post(
      "/api/admin/faculty/remove_faculty",
      {
        faculty_id: faculty[index].faculty_id,
      }
    );
    if (deletedFaculty.status === 200) {
      const newFaculty = [...facultyData];
      newFaculty.splice(index, 1);
      setFacultyData(newFaculty);
    }
  };

  return (
    <table className="table-auto mt-10 rounded-md font-poppins w-full text-left">
      <thead>
        <tr className="bg-blue-800 rounded-md text-white">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Phone Number</th>
          <th className="px-4 py-2">Level</th>
          <th className="px-4 py-2">Department</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2"></th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {facultyData.map((facultyMember, index) => (
          <tr key={index} className="bg-white">
            <td className=" px-4 py-2">{facultyMember.name}</td>
            <td className=" px-4 py-2">{facultyMember.phone_number}</td>
            <td className=" px-4 py-2">{facultyMember.level}</td>
            <td className=" px-4 py-2">{facultyMember.department}</td>
            <td className=" px-4 py-2">{facultyMember.email}</td>
            <td className="px-4 py-2">
              <button
                onClick={handleEditFaculty(index)}
                className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white transition-colors"
              >
                <MdEdit />
              </button>
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => {
                  openModal(index);
                }}
                className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FacultyTable;
