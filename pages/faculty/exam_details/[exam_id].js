import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import Exam from '@/components/Exam/Exam'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ExamPage() {
  const [exam, setExam] = useState();
  const router = useRouter()
  const { exam_id } = router.query;


  const fetchExam = async ()=>{
    const res = await axios.post("/api/faculty/get_exam", {
      paper_id: exam_id
    })

    console.log(res.data)
    setExam(res.data);
  }


  useEffect(() => {
    if (exam_id && !exam) {
      fetchExam();
    }
  }, [exam_id, fetchExam]);


  return (
    
    <BaseLayout title={"Exam | " + exam_id}>
      <DashboardLayout>
      {exam && <Exam exam={exam} />}
      </DashboardLayout>
    </BaseLayout>
  )
}
