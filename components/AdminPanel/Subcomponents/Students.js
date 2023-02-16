import React, { useState } from "react";
import { useRouter } from "next/router";
import StudentTable from "../Tables/StudentTable";
import DeleteModal from "./DeleteModal";

export default function Students({ students, setStudents }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const addStudents = () => {
    router.push("/admin/add_student");
  };
  return (
    <div>
      <DeleteModal setIsOpen={setOpen} isOpen={open} />
      <div className="mt-10 flex justify-end">
        <button
          onClick={addStudents}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Students
        </button>
      </div>
      <StudentTable setOpen={setOpen} students={students} />
    </div>
  );
}
