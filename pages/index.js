import { useState } from 'react'

import BaseLayout from '@/components/BaseLayout/BaseLayout'
import Login from '@/components/Login/Login'
import LoginAlternative from '@/components/Login/LoginAlternative'
import LoginTopbar from '@/components/Login/LoginTopbar'

export default function Home() {
  const [facultyLogin, setFacultyLogin] = useState(false)
  return (
    <BaseLayout title={"Login"}>
      <LoginTopbar facultyLogin={facultyLogin} setFacultyLogin={ setFacultyLogin} />
      <LoginAlternative facultyLogin={facultyLogin}/>
    </BaseLayout>
  )
}