import React from "react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import DashboardComponent from "@/components/DashboardComponent/DashboardComponent";
export default function dashboard() {
  return (
    <BaseLayout title={"Dashboard"}>
      <DashboardLayout>
        {/* 

            dashboard
            previous exam details
            subjective attempt
            objective attempt
            student profile
            
            previous exams
            see details if allowed

            live exams
            objective type
              all options rendered,
            subjective type
              type answer
            both have different ui
            student registratiion
            student result display

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
