
import BaseLayout from '@/components/BaseLayout/BaseLayout'
import Login from '@/components/Login/Login'
import LoginAlternative from '@/components/Login/LoginAlternative'
import LoginTopbar from '@/components/Login/LoginTopbar'

export default function Home() {
  return (
    <BaseLayout title={"Login"}>
      <LoginTopbar facultyLogin />
      <LoginAlternative facultyLogin />
    </BaseLayout>
  )
}