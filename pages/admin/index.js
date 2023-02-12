import AdminPanel from '@/components/AdminPanel'
import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import React from 'react'
import axios from 'axios';

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function index({faculty_data}) {
  return (
    <BaseLayout title={"Admin Panel"}>
      <DashboardLayout admin>
          <AdminPanel faculty_data={faculty_data}/>
      </DashboardLayout>
    </BaseLayout>
  )
}

export async function getServerSideProps(){
  const faculty = await axios.get('http://localhost:3000/api/admin/faculty/get_faculty')
  return {
      props: {faculty_data: faculty.data}
  }
}