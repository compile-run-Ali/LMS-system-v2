import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import Exam from '@/components/Exam/Exam'
import React from 'react'
import axios from 'axios'

export default function ExamPage({ examDetails, objectiveQuestions, subjectiveQuestions}) {
  return (
    
    <BaseLayout title={"Exam | " + examDetails.paper_name}>
      <DashboardLayout>
      {examDetails && <Exam exam={examDetails} objectiveQuestions={objectiveQuestions} subjectiveQuestions={subjectiveQuestions} />}
      </DashboardLayout>
    </BaseLayout>
  )
}

export const getServerSideProps = async (context) => {
  const exam_id = context.params.exam_id;
  const examDetails = await axios.post("http://localhost:3000/api/faculty/get_exam", {
    paper_id: exam_id
  })

  const objectiveQuestions = await axios.post("http://localhost:3000/api/faculty/get_objective", {
    paper_id: exam_id
  })

  // const subjectiveQuestions = await axios.post("http://localhost:3000/api/faculty/get_subjective", {
  //   paper_id: exam_id
  // })

  return {
    props: {
      examDetails: examDetails.data,
      objectiveQuestions: objectiveQuestions.data,
      subjectiveQuestions: []
    }
  }
}
