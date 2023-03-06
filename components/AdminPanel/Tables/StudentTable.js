import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";

export default function StudentTable({ setOpen, students }) {
  const openModal = () => {
    setOpen(true);
  };
  const editStudent = () => {
    console.log("Edit Student");
  };

  return (
    <div>
      <table className="table-auto mt-10 rounded-md font-poppins w-full text-left">
        <thead>
          <tr className="bg-blue-800 rounded-md text-white">
            <th className="px-4 py-2">P Number</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">CGPA</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">DOB</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="bg-white">
              <td className=" px-4 py-2">
                <Link
                  key={student.p_number}
                  href={`/student/profile`}
                >
                  {student.p_number}
                </Link>
              </td>
              <td className=" px-4 py-2">{student.name}</td>
              <td className=" px-4 py-2">{student.phone_number}</td>
              <td className=" px-4 py-2">{student.cgpa}</td>
              <td className=" px-4 py-2">{student.email}</td>
              <td className=" px-4 py-2">
                {new Date(student.DOB).toDateString()}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={editStudent(student.p_number)}
                  className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white"
                >
                  <MdEdit />
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={openModal}
                  className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
