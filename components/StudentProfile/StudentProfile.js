import React, { Fragment } from "react";

export default function StudentProfile({ student }) {
  return (
    <>
      {student ? (
        <div className="max-w-md mx-auto bg-white shadow-lg overflow-hidden font-poppins">
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
              <strong>CGPA:</strong> {student.cgpa}
            </p>
            <p className="mb-2">
              <strong>Date of Birth:</strong>{" "}
              {new Date(student.DOB).toDateString()}
            </p>
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
