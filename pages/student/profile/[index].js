import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import StudentProfile from "@/components/StudentProfile/StudentProfile";

export default function Profile() {
  const router = useRouter();
  const { index } = router.query;
  const [student, setStudent] = useState(null);

  const getStudent = async () => {
    await axios
      .get(`/api/student/details/${index}`)
      .then((res) => {
        console.log(
          "Student data fetched successfully from get_student.js",
          res.data
        );
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (!router.isReady) return;

    getStudent();
  }, [router.isReady]);

  return (
    <BaseLayout title={"Profile"}>
      <DashboardLayout>
        <StudentProfile student={student} />
      </DashboardLayout>
    </BaseLayout>
  );
}
