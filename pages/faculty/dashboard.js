import BaseLayout from '@/components/BaseLayout/BaseLayout'
import DashboardLayout from '@/components/DasboardLayout/DashboardLayout'
import React from 'react'

export default function dashboard() {
  return (
    <BaseLayout title={"Dashboard"}>
        <DashboardLayout>
                Hello
        </DashboardLayout>
    </BaseLayout>
  )
}
