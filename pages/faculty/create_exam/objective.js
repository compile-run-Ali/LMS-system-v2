import BaseLayout from '@/components/BaseLayout/BaseLayout'
import MCQTable from '@/components/CreateObjective/ObjectiveExam'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import React from 'react'

export default function objective() {
  return (
    <BaseLayout title={"Create Objective Exam"}>
        <DashboardLayout>
            <MCQTable />
        </DashboardLayout>
    </BaseLayout>
  )
}
