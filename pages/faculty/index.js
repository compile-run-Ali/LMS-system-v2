import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import DashboardComponent from '@/components/DashboardComponent/DashboardComponent'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const session = useSession();
  console.log(session)
  const [exams, setExams] = useState(null)

  const fetchExams = async () => {
    const res = await axios.post('http://localhost:3000/api/faculty/get_exams', {
      faculty_id: session.data.user.id
    })
    console.log(res.data.courses)
    setExams(res.data.courses)
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchExams()
    }
  }, [session])
  return (
    <BaseLayout title={"Dashboard"}>
        <DashboardLayout>
        <DashboardComponent exams_data={exams}/>
        </DashboardLayout>
    </BaseLayout>
  )
}