import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import StudentProfile from "@/components/StudentProfile/StudentProfile";

export default function Profile() {
  const { data: session, status } = useSession();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (session) {
      setStudent(session?.user);
    }
  }, [session]);

  return (
    <BaseLayout title={"Profile"}>
      <DashboardLayout>
        <StudentProfile student={student} />
      </DashboardLayout>
    </BaseLayout>
  );
}
