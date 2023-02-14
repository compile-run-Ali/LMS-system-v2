import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import Exam from '@/components/Exam/Exam'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ExamPage({ exam_data, objective_data, subjective_data }) {
  const [exam, setExam] = useState();
  const [objective, setObjective] = useState();
  const [subjective, setSubjective] = useState();

  useEffect(() => {
    if (exam_data !== undefined && exam_data !== null) {
      setExam(exam_data)
      setObjective(objective_data)
      setSubjective(subjective_data)
    }
    console.log(exam_data)
    console.log(objective_data)
    console.log(subjective_data)
  }, [exam_data, objective_data, subjective_data]);


  return (
    
    <BaseLayout title={"Exam | " + exam_data?.paper_name}>
      <DashboardLayout>
        {exam && <Exam exam={exam} mcqs={objective_data} />}
      </DashboardLayout>
    </BaseLayout>
  )
}

export const getServerSideProps = async (context) => {
  const { exam_id } = context.query;
  const res = await axios.post("http://localhost:3000/api/faculty/get_exam", {
    paper_id: exam_id
  })
  const objective_data = await axios.post("http://localhost:3000/api/faculty/get_objective", {
    paper_id: exam_id
  })
  // const subjective_data = await axios.post("http://localhost:3000/api/faculty/get_subjective", {
  //   paper_id: exam_id
  // })

  return {
    props: {
      exam_data: res.data,
      objective_data: objective_data.data,
      subjective_data: []
    }
  }
}
