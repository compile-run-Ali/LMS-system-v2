
import BaseLayout from '@/components/BaseLayout/BaseLayout'
import Login from '@/components/Login/Login'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
  variable: '--poppins-font',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function Home() {
  return (
    <BaseLayout title={"Login"}>
      <style jsx global>
        {`
          :root {
            --poppins-font: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <Login/>
    </BaseLayout>
  )
}
