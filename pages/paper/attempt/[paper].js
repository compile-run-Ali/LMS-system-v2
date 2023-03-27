import { useEffect, useState } from "react";
import PaperContainer from "@/components/Paper/PaperContainer";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


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
