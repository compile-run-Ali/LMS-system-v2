import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function StudentProfile({ student }) {
  const router = useRouter();

  const handleChangePassword = () => {
    router.push({
      pathname: "/change_password",
      query: {
        student_id: student.id,
        recovery: false,
        name: student.name,
      },
    });
  };

  return (
    <>
      {student ? (
        <div className="max-w-lg mx-auto bg-white shadow-lg overflow-hidden font-poppins relative">
          <h1 className="text-2xl font-bold text-white p-4 bg-blue-700">
            Student Details
          </h1>
          <div className="p-4">
            <p className="mb-2">
              <strong>Name:</strong> {student.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {student.email || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Phone Number:</strong> {student.phone_number}
            </p>
            <p className="mb-2">
              <strong>Rank:</strong> {student.rank}
            </p>
            <p className="mb-2">
              <strong>Date of Birth:</strong>{" "}
              {new Date(student.DOB).toDateString()}
            </p>
            <p
              className="mb-2 underline font-bold cursor-pointer"
              onClick={handleChangePassword}
            >
              Change password
            </p>
          </div>

          <div className="w-40 aspect-square rounded-full border border-blue-900 absolute top-[76px] right-6">
            <Image
              src={`/uploads/${student.image ? student.image : "noface.jpeg"}`}
              fill
              className="rounded-full object-cover object-center"
              alt="user"
            />
          </div>
        </div>
      ) : (
        <div>
          <h1>Student not found</h1>
        </div>
      )}
    </>
  );
}
