import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import StudentDashboard from "@/components/StudentDashboard/StudentDashboard";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
    } else {
      router.push("/");
    }
  }, [session]);

  return (
    <BaseLayout title={"Dashboard"}>
      <DashboardLayout>
        <StudentDashboard session={session} />
      </DashboardLayout>
    </BaseLayout>
  );
}
