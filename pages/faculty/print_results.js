import React from "react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";

const Print = () => {
  return (
    <BaseLayout>
      <DashboardLayout>
        <h1>Only level 0 should access this</h1>
      </DashboardLayout>
    </BaseLayout>
  );
};

export default Print;
