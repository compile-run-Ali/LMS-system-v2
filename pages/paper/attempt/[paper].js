import PaperContainer from "@/components/Paper/PaperContainer";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
export default function Paper() {
  return (
    <BaseLayout>
      <DashboardLayout>
        <PaperContainer />
      </DashboardLayout>
    </BaseLayout>
  );
}
