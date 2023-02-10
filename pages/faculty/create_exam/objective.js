import BaseLayout from '@/components/BaseLayout/BaseLayout'
import Wizard from '@/components/Common/Wizard/Wizard'
import MCQTable from '@/components/CreateObjective/ObjectiveExam'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import React from 'react'

export default function objective() {
  return (
    <BaseLayout title={"Create Objective Exam"}>
      <DashboardLayout>
        <div className='pl-8 mt-2'>
          <Wizard active={"Exam Questions"} />
          <div className='mt-10'>
            <MCQTable />
          </div>
        </div>
      </DashboardLayout>
    </BaseLayout>
  )
}
