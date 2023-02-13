import AdminPanel from '@/components/AdminPanel'
import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import React from 'react'

export default function index() {
  return (
    <BaseLayout title={"Admin Panel"}>
      <DashboardLayout admin>
          <AdminPanel />
      </DashboardLayout>
    </BaseLayout>
  )
}
