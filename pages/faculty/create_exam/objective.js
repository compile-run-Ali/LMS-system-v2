import BaseLayout from '@/components/BaseLayout/BaseLayout'
import Wizard from '@/components/Common/Wizard/Wizard'
import MCQTable from '@/components/CreateObjective/ObjectiveExam'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import React from 'react'

export default function objective() {
  return (
    <BaseLayout title={"Create Objective Exam"}>
      <DashboardLayout>
        <Wizard active={"Exam Questions"} />
        <div className='mt-16'>
          <MCQTable />
        </div>
      </DashboardLayout>
    </BaseLayout>
  )
}
