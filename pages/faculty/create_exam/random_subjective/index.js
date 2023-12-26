import BaseLayout from '@/components/BaseLayout/BaseLayout'
import CreateExam from '@/components/CreateExam/CreateExam'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import React from 'react'
import { useRouter } from 'next/router'

export default function randomSubjective() {
    const router = useRouter();
    console.log("query to create random_subjective: ", router.query);

  return (
    <BaseLayout title={"Create Random Subjective Exam"}>
        <DashboardLayout>
            <CreateExam paperType={"Subjective/Objective"} />
        </DashboardLayout>
    </BaseLayout>
  )
}
