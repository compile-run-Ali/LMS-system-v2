import { useEffect, useState } from "react";

import BaseLayout from "@/components/BaseLayout/BaseLayout";
import Login from "@/components/Login/Login";
import LoginAlternative from "@/components/Login/LoginAlternative";
import LoginTopbar from "@/components/Login/LoginTopbar";
import { useSession } from "next-auth/react";
import DashboardComponent from "@/components/DashboardComponent/DashboardComponent";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";

export default function Home() {
  const router = useRouter();
  const [facultyLogin, setFacultyLogin] = useState(false);
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      session.data.user.role === "student"
        ? router.push("/student")
        : session.data.user.level === 5 ? router.push("/admin") : router.push("/faculty")
    }
  }, [session]);

  if (session.status === "authenticated") {
    return (
      <BaseLayout title={"Dashboard"}>
        <DashboardLayout>
          <DashboardComponent />
        </DashboardLayout>
      </BaseLayout>
    );
  }
  return (
    <BaseLayout title={"Login"}>
      <LoginTopbar
        facultyLogin={facultyLogin}
        setFacultyLogin={setFacultyLogin}
      />
      <Login facultyLogin={facultyLogin} setFacultyLogin={setFacultyLogin} />
    </BaseLayout>
  );
}
