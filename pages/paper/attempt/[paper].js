import { useState } from "react";
import PaperContainer from "@/components/Paper/PaperContainer";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
export default function Paper() {
  const [startOfPage, setStartOfPage] = useState(new Date());
  return (
    <BaseLayout>
      <DashboardLayout>
        <PaperContainer
          startOfPage={startOfPage}
        />
      </DashboardLayout>
    </BaseLayout>
  );
}
