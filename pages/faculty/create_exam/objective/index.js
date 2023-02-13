import BaseLayout from '@/components/BaseLayout/BaseLayout'
import CreateExam from '@/components/CreateExam/CreateExam'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import axios from 'axios'
import React, { useEffect } from 'react'

const Objective = ({ mcqs_data }) => {

  return (
    <BaseLayout title={"Create Objective Exam"}>
        <DashboardLayout>
        <CreateExam paperType={"Objective"} mcqs={ mcqs_data} />
        </DashboardLayout>
    </BaseLayout>
  )
}

export default Objective

export const getServerSideProps = async (context) => {
  if (context.query.paper_id) {
    const mcqs = await axios.post('http://localhost:3000/api/faculty/get_objective', {
      paper_id: context.query.paper_id
    })
    return {
      props: {
          mcqs_data: mcqs.data
        }
    }
  }
  return {
    props: {
      mcqs_data: []
    }
  }
}
