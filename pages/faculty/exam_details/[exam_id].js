import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import Exam from '@/components/Exam/Exam'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const exams = [
  {
    exam_id: 1,
    exam_name: "Mid-term Exam",
    exam_type: "Objective",
    exam_duration: "1 hour",
    exam_date: "2021-05-01",
    exam_time: "10:00 AM",
  },
  {
    exam_id: 2,
    exam_name: "Final Exam",
    exam_type: "Subjective/Objective",
    exam_duration: "2 hours",
    exam_date: "2021-05-01",
    exam_time: "10:00 AM",
  },
]

export default function ExamPage() {
  const [exam, setExam] = useState();
  const router = useRouter()
  const { exam_id } = router.query;


  useEffect(() => {
    if (exam_id) {
      const exam = exams.find((exam) => exam.exam_id == exam_id);
      setExam(exam);
    }
  }, [exam_id]);


  return (
    
    <BaseLayout title={"Exam | " + exam_id}>
      <DashboardLayout>
      {exam && <Exam exam={exam} />}
      </DashboardLayout>
    </BaseLayout>
  )
}
