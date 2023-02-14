import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import DashboardComponent from '@/components/DashboardComponent/DashboardComponent'
import React from 'react'

export default function dashboard() {
  return (
    <BaseLayout title={"Dashboard"}>
        <DashboardLayout>
        <DashboardComponent/>
        </DashboardLayout>
    </BaseLayout>
  )
}