import React from "react";
import { useRouter } from "next/router";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import StudentDashboard from "@/components/StudentDashboard/StudentDashboard";

export default function Dashboard() {
  const router = useRouter();
  const { index } = router.query;

  return (
    <BaseLayout title={"Dashboard"}>
      <DashboardLayout>
        <StudentDashboard />

        {/* 

            dashboard
              previous Papers
                see details if allowed
              live Papers
              
              
            objective type
                all options rendered,
                
            subjective type
                type answer
              both have different ui
            


            previous paper details ONLY IF ALLOWED
              subjective attempt
              objective attempt

            student profile          DONE
            student registration    DONE

            questions ki attempt ko database me save
            har attempt me sath k sath save
              update if editted
            if sequential
              then cant navigate around questions
          */}
      </DashboardLayout>
    </BaseLayout>
  );
}
