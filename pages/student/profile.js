import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import StudentProfile from "@/components/StudentProfile/StudentProfile";

export default function Profile() {
  const { data: session, status } = useSession();
  const [student, setStudent] = useState(null);

  const getStudent = async () => {
    if (session) {
      await axios
        .get(`/api/student/details/${session.user.id}`)
        .then((res) => {
          setStudent(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    if (!session) return;

    getStudent();
  }, [session]);

  return (
    <BaseLayout title={"Profile"}>
      <DashboardLayout>
        <StudentProfile student={student} />
      </DashboardLayout>
    </BaseLayout>
  );
}
