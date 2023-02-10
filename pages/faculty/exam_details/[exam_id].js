import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import Exam from '@/components/Exam/Exam'
import { useRouter } from 'next/router'
import React from 'react'

export default function ExamPage() {
    const router = useRouter()
    const { exam_id } = router.query

  return (
    <BaseLayout title={"Exam | " + exam_id }>
        <DashboardLayout>
            <Exam />
        </DashboardLayout>
    </BaseLayout>
  )
}
