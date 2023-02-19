import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import DashboardComponent from '@/components/DashboardComponent/DashboardComponent'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Dashboard() {
  const session = useSession();
  console.log(session)
  return (
    <BaseLayout title={"Dashboard"}>
        <DashboardLayout>
        <DashboardComponent/>
        </DashboardLayout>
    </BaseLayout>
  )
}