import BaseLayout from '@/components/BaseLayout/BaseLayout'
import CreateExam from '@/components/CreateExam/CreateExam'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import React from 'react'
import { useRouter } from 'next/router'

export default function randomObjective() {
    const router = useRouter();
    console.log("query to create random_objective: ", router.query);

  return (
    <BaseLayout title={"Create Random Objective Exam"}>
        <DashboardLayout>
            <CreateExam paperType={"Objective"} />
        </DashboardLayout>
    </BaseLayout>
  )
}
